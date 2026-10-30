"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Section from "./Section";
import RulesDemo from "./RulesDemo";
/* the still / alive picture effect is shared with chapter 1 */
import "./search-demo.css";

/* how much scroll the run takes, in screen heights, while the section holds still */
const RUN = 5.5;
/* then a tail, held still, while the screen freezes back into a picture */
const TAIL = 0.6;
/* on phones the run plays by itself, this long */
const FLOW_MS = 9000;

/* Chapter 2, prices: one section, no steps. It holds still for a short run of
   scroll, and that scroll plays the Price rules screen: tap Run, watch the run
   go by in Activity. */
export default function ChapterPrices() {
  const t = useTranslations("landing.chapters.prices");
  const track = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const last = useRef(-1);
  /* the screen is a still picture until the section pins, alive through the
     run, and a still picture again on the way out (as in chapter 1) */
  const life = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  /* below lg the screen and its words are taller than a phone: the section
     stays in the flow and the run plays as it scrolls through the view */
  const [flow, setFlow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const on = () => setFlow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    /* crossing back from the phone layout: redraw the frame for this scroll */
    last.current = -1;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = track.current;
      if (!el) return;
      const vh = window.innerHeight;
      const sv = pin.current?.clientHeight || vh;
      const box = el.getBoundingClientRect();
      const top = box.top;
      if (flow) return;
      const p = Math.min(1, Math.max(0, -top / (RUN * sv)));
      const wake = Math.min(1, Math.max(0, 1 - top / sv));
      const freeze = Math.min(1, Math.max(0, (-top - RUN * sv) / (TAIL * sv)));
      life.current?.style.setProperty("--still", `${1 - Math.min(wake, 1 - freeze)}`);
      const next = Math.round(p * 400) / 400;
      if (next !== last.current) {
        last.current = next;
        setProgress(next);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    const ro = new ResizeObserver(onScroll);
    if (pin.current) ro.observe(pin.current);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [flow]);

  /* phones: a scroll is too short a ride for the run, so it plays on its own
     at reading pace once the screen is in view, and again on each new visit */
  useEffect(() => {
    const el = life.current;
    if (!flow || !el) return;
    el.style.setProperty("--still", "0");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    let raf = 0;
    let start = 0;
    const play = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / FLOW_MS);
      setProgress(Math.round(p * 400) / 400);
      raf = p < 1 ? requestAnimationFrame(play) : 0;
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !raf) {
          start = 0;
          raf = requestAnimationFrame(play);
        } else if (!e.isIntersecting && e.boundingClientRect.top > 0) {
          /* left below: rewind for the next visit */
          cancelAnimationFrame(raf);
          raf = 0;
          setProgress(0);
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [flow]);

  return (
    <section
      id="prices"
      aria-labelledby="prices-title"
      className="relative z-[1] w-full scroll-mt-16 bg-[var(--color-canvas)] text-[var(--color-ink)]"
    >
      {/* the layout is decided by CSS (lg:), not by JS state, so the server
          HTML already has the phone layout and nothing jumps on hydration */}
      <div
        ref={track}
        className="relative lg:h-[var(--run-h)]"
        style={{ "--run-h": `calc(100svh + ${(RUN + TAIL) * 100}svh)` } as React.CSSProperties}
      >
        {/* anchored to the top, not centred: the run adds a row to Activity and the
            screen must not shift when it does */}
        <div ref={pin} className="pb-16 lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:flex-col lg:justify-start lg:pb-0">
          <Section innerClassName="pt-[112px] pb-8 lg:pt-[128px]">
            <div className="grid grid-cols-1 items-end gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
              <h2
                id="prices-title"
                className="max-w-[16ch] text-[32px] font-[650] leading-[1.05] tracking-[-0.025em] [text-wrap:balance] lg:text-[48px]"
              >
                {t("title")}
              </h2>
              <p className="text-[16px] leading-[1.6] text-[var(--color-ink-2)] lg:text-[17px]">{t("body")}</p>
            </div>
            <div ref={life} className="demo-life mt-8 lg:mt-10">
              <RulesDemo
                progress={progress}
                notes={{
                  rule: { title: t("notes.rule.title"), body: t("notes.rule.body") },
                  activity: { title: t("notes.activity.title"), body: t("notes.activity.body") },
                }}
              />
            </div>
          </Section>
        </div>
      </div>
    </section>
  );
}
