"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import Section from "./Section";

/* scroll the scene holds still for, in screen heights: the chapter title,
   one stretch per step, then a tail so the last frame stays pinned while the
   mock freezes into a picture */
const LEAD = 0.35;
const TAIL = 0.5;

/* A chapter told by scroll. One scene pinned to the screen: the words on the
   left (the chapter title, then each step) and the mock on the right stay side
   by side while the reader scrolls. The scroll is the playback: progress
   (-1 before the steps, then 0..3, one unit per step) drives the bars, the
   words and the mock's frame. Native scroll, nothing held against the reader.

   Copy lives under landing.chapters.<ns>: title, body, steps.<key>.{short,
   label,title,body}. */
export default function ScrollChapter({
  id,
  ns,
  steps,
  dwell,
  sheet = false,
  mock,
}: {
  id: string;
  ns: string;
  steps: readonly string[];
  /* screen heights per step: give the busiest step the most */
  dwell: readonly number[];
  /* the first chapter rises over the hero like a new sheet */
  sheet?: boolean;
  mock: (progress: number) => ReactNode;
}) {
  const t = useTranslations(`landing.chapters.${ns}`);
  const track = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);
  /* the mock is a still picture until the scene pins, alive through the steps,
     and a still picture again on the way out */
  const life = useRef<HTMLDivElement>(null);
  const last = useRef(-1);
  const [progress, setProgress] = useState(-1);
  const acting = progress < 0 ? -1 : Math.min(steps.length - 1, Math.floor(progress));

  const starts = dwell.map((_, k) => dwell.slice(0, k).reduce((a, b) => a + b, 0));
  const total = dwell.reduce((a, b) => a + b, 0);
  const run = LEAD + total + TAIL;

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = track.current;
      if (!el) return;
      /* the pinned scene is 100svh tall: measure it, not innerHeight, so the
         boundaries hold while a phone's address bar comes and goes */
      const sv = pin.current?.clientHeight || window.innerHeight;
      const top = el.getBoundingClientRect().top;
      const at = (-top - LEAD * sv) / sv;
      let pos = -1;
      starts.forEach((start, k) => {
        if (at >= start) pos = k + Math.min(1, (at - start) / dwell[k]);
      });
      /* quantised so React renders only when the frame can change */
      const next = pos < 0 ? -1 : Math.round(pos * 400) / 400;
      if (next !== last.current) {
        last.current = next;
        setProgress(next);
      }
      const wake = Math.min(1, Math.max(0, 1 - top / sv));
      const freeze = Math.min(1, Math.max(0, (at - total) / TAIL));
      life.current?.style.setProperty("--still", `${1 - Math.min(wake, 1 - freeze)}`);
      /* the progress bars fill with the scroll, written straight to the DOM */
      fills.current.forEach((f, k) => {
        if (f) {
          const p = Math.min(1, Math.max(0, (at - starts[k]) / dwell[k]));
          f.style.transform = `scaleX(${p})`;
        }
      });
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
    // dwell and starts are constants per chapter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative z-10 w-full scroll-mt-16 bg-[var(--color-canvas)] text-[var(--color-ink)] ${
        sheet ? "chapter-sheet" : ""
      }`}
    >
      {/* the scene: pinned while the reader scrolls through the steps */}
      <div ref={track} className="relative" style={{ height: `calc(100svh + ${run * 100}svh)` }}>
        <div ref={pin} className="sticky top-0 flex h-[100svh] flex-col justify-center">
          <Section innerClassName="pt-[88px] pb-6 lg:pt-[104px] lg:pb-10">
            <div className="flex flex-col-reverse gap-6 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
              <div>
                {/* the steps as a track: each bar fills with the scroll */}
                <ol className="mb-10 grid max-w-[460px] grid-cols-3 gap-4 lg:mb-14">
                  {steps.map((s, k) => {
                    const lit = k <= acting;
                    return (
                      <li key={s} aria-current={k === acting ? "step" : undefined}>
                        <span className="block h-[2px] overflow-hidden rounded-full bg-black/[0.08]">
                          <span
                            ref={(el) => {
                              fills.current[k] = el;
                            }}
                            className="block h-full origin-left rounded-full bg-[var(--color-ink)]"
                            style={{ transform: "scaleX(0)" }}
                          />
                        </span>
                        <span
                          className={`mt-3 block text-[11.5px] font-semibold uppercase tabular-nums tracking-[0.04em] transition-colors duration-300 ${
                            lit ? "text-[var(--color-ink)]" : "text-[var(--color-ink-3)]"
                          }`}
                        >
                          0{k + 1} · {t(`steps.${s}.short`)}
                        </span>
                        <span
                          className={`mt-0.5 block text-[13px] leading-[1.3] transition-colors duration-300 ${
                            lit ? "font-[650] text-[var(--color-ink)]" : "font-medium text-[var(--color-ink-2)]"
                          }`}
                        >
                          {t(`steps.${s}.label`)}
                        </span>
                      </li>
                    );
                  })}
                </ol>
                {/* the chapter title, then each step's words, swapped in place */}
                <div className="grid">
                  <div className="step-swap [grid-area:1/1]" data-on={acting < 0 || undefined}>
                    <h2
                      id={`${id}-title`}
                      className="max-w-[14ch] text-[32px] font-[650] leading-[1.05] tracking-[-0.025em] [text-wrap:balance] lg:text-[48px]"
                    >
                      {t("title")}
                    </h2>
                    <p className="mt-3 max-w-[40ch] text-[15px] leading-[1.6] text-[var(--color-ink-2)] lg:mt-4 lg:text-[17px]">
                      {t("body")}
                    </p>
                  </div>
                  {steps.map((s, k) => {
                    const on = k === acting;
                    return (
                      <div
                        key={s}
                        aria-hidden={!on}
                        className="step-swap [grid-area:1/1]"
                        data-on={on || undefined}
                      >
                        <h3 className="max-w-[18ch] text-[26px] font-[650] leading-[1.08] tracking-[-0.025em] [text-wrap:balance] lg:text-[40px]">
                          {t(`steps.${s}.title`)}
                        </h3>
                        <p className="mt-3 max-w-[40ch] text-[15px] leading-[1.6] text-[var(--color-ink-2)] lg:mt-4 lg:text-[17px]">
                          {t(`steps.${s}.body`)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div ref={life} className="demo-end demo-life min-w-0">
                {mock(progress)}
              </div>
            </div>
          </Section>
        </div>
      </div>

    </section>
  );
}
