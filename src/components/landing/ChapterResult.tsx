"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Section from "./Section";
import { artSize } from "@/lib/demo-art";

/* The payoff, and the page's climax: a dark band lit like the shop owner's
   desk in the hero (the story started there), real figures from Synq across
   real shops, the one call to action, and those shops in their own words. */

type Tally = {
  label: string;
  value: number;
  decimals?: number;
  suffix?: string;
};
type Quote = {
  text: string;
  name: string;
  store: string;
  source: string;
  logo: string;
  tone: "light" | "dark";
};

export default function ChapterResult() {
  const t = useTranslations("landing.chapters.result");
  const tallies = t.raw("week.rows") as Tally[];
  const quotes = t.raw("quotes") as Quote[];
  const figures = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = figures.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    /* the canvas around the band shows at its rounded corners and while it opens */
    <div className="bg-[var(--color-canvas)]">
      <section
        id="result"
        aria-labelledby="result-title"
        className="result-band relative w-full scroll-mt-16 overflow-hidden text-white"
      >
        <Section innerClassName="relative pt-24 pb-20 lg:pt-32 lg:pb-28">
          <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
            <h2
              id="result-title"
              className="text-[44px] font-[650] leading-[1] tracking-[-0.03em] [text-wrap:balance] lg:text-[72px]"
            >
              {t("title")}
            </h2>
            <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.6] text-white/65 lg:text-[18px]">
              {t("body")}
            </p>
          </div>

          {/* the week, in four figures */}
          <div
            ref={figures}
            className="mx-auto mt-14 grid max-w-[960px] grid-cols-1 gap-y-8 sm:grid-cols-3 lg:mt-16"
            data-run={run || undefined}
          >
            {tallies.map((r, k) => (
              <div
                key={r.label}
                className={`flex flex-col items-center px-4 text-center ${
                  k > 0 ? "sm:border-l sm:border-white/10" : ""
                }`}
              >
                <Count
                  to={r.value}
                  run={run}
                  delay={k * 180}
                  decimals={r.decimals}
                  suffix={r.suffix}
                />
                <span className="mt-2.5 max-w-[26ch] text-[14px] font-medium leading-[1.4] text-white/65">
                  {r.label}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-[12.5px] text-white/40">
            {t("week.note")}
          </p>

          <div className="mt-10 flex justify-center">
            <a
              href="https://apps.shopify.com/synq-tcg-card-manager"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 text-[15px] font-semibold text-[var(--color-accent-ink)] transition-colors hover:bg-[var(--color-accent)]/85"
            >
              {t("cta")}
            </a>
          </div>

          {/* real shops, in their words */}
          <ul className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-28 lg:grid-cols-3 lg:gap-5">
            {quotes.map((q, k) => (
              <li
                key={q.store}
                className={`flex flex-col justify-between gap-6 rounded-[18px] bg-white/[0.05] p-6 ring-1 ring-inset ring-white/10 lg:p-7 ${
                  k === 0 ? "md:col-span-2" : ""
                } ${k === 3 ? "md:col-span-2" : ""}`}
              >
                <blockquote
                  className={`font-[550] leading-[1.45] tracking-[-0.01em] text-white/90 ${
                    k === 0
                      ? "text-[22px] lg:text-[26px] lg:leading-[1.35]"
                      : "text-[17px]"
                  }`}
                >
                  “{q.text}”
                </blockquote>
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-11 flex-none items-center justify-center rounded-[10px] px-2 ${
                      q.tone === "dark"
                        ? "bg-black/40 ring-1 ring-inset ring-white/10"
                        : "bg-white"
                    }`}
                  >
                    <img
                      src={q.logo}
                      {...artSize(q.logo)}
                      alt=""
                      className="h-8 w-auto max-w-[96px] object-contain"
                    />
                  </span>
                  <span className="flex flex-col leading-[1.3]">
                    <b className="text-[14px] font-[650] text-white">
                      {q.name ? `${q.name}, ` : ""}
                      {q.store}
                    </b>
                    <span className="text-[12.5px] text-white/45">
                      {q.source}
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13px] text-white/45">
            <a
              href="https://apps.shopify.com/synq-tcg-card-manager/reviews"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              {t("reviewsLink")}
            </a>
          </p>
        </Section>
      </section>
    </div>
  );
}

/* a figure that counts up once, in step with its neighbours */
function Count({
  to,
  run,
  delay,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  run: boolean;
  delay: number;
  decimals?: number;
  suffix?: string;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    const dur = 1200;
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - start) / dur));
      setN(to * (1 - (1 - p) ** 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to, delay]);
  const fmt = (v: number) =>
    v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  /* the real figure is in the HTML for readers and crawlers; the counting
     one is only a show */
  return (
    <b className="text-[44px] font-[650] leading-none tracking-[-0.03em] tabular-nums text-white lg:text-[56px]">
      <span className="sr-only">
        {fmt(to)}
        {suffix}
      </span>
      <span aria-hidden="true">
        {fmt(n)}
        {suffix}
      </span>
    </b>
  );
}
