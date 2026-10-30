"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Section from "./Section";
import { PLANS } from "@/content/plans";

/* Pricing, picked the way a shop owner thinks about it: by how many cards
   they sell. Plans and prices are the ones on the Shopify App Store listing.

   What it leans on (from the pricing research): the dearest plan first as the
   anchor; one plan lit (the one that fits) carrying the section's only
   primary button; each price also as a cost per card; each plan listing only
   what it adds; the facts that lower the risk right under the plans; a real
   shop's words underneath. Free sits below the paid plans as a quiet line:
   a $0 card next to them pulls more than its share (the zero-price effect). */

const PAID = PLANS.filter((p) => p.monthly > 0);

/* the slider's stops: denser where most shops are */
const STOPS = [100, 250, 500, 1000, 2000, 3500, 5000, 7500, 10000, 15000, 25000, 35000, 50000];
const START = STOPS.indexOf(1000);

const INSTALL = "https://apps.shopify.com/synq-tcg-card-manager";
const fmt = (n: number) => n.toLocaleString("en-US");

/* cents per card a month, at the plan's full size */
function perCard(perMonth: number, cards: number) {
  return ((perMonth * 100) / cards).toFixed(1).replace(/\.0$/, "");
}

export default function Pricing() {
  const t = useTranslations("landing.pricing");
  const [yearly, setYearly] = useState(false);
  const [stop, setStop] = useState(START);
  const cards = STOPS[stop];
  const fit = PLANS.find((p) => cards <= p.cards) ?? PLANS[PLANS.length - 1];
  const trust = t.raw("trust") as string[];
  const freeFits = fit.key === "free";

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="w-full scroll-mt-24 bg-[var(--color-canvas)] text-[var(--color-ink)]"
    >
      <Section innerClassName="py-24 lg:py-32">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
          <h2
            id="pricing-title"
            className="max-w-[14ch] text-[36px] font-[650] leading-[1.03] tracking-[-0.025em] [text-wrap:balance] lg:text-[56px]"
          >
            {t("title")}
          </h2>
          <p className="text-[16px] leading-[1.6] text-[var(--color-ink-2)] lg:text-[17px]">{t("subtitle")}</p>
        </div>

        {/* how many cards: the slider picks the plan */}
        <div className="synq-card mt-12 flex flex-col gap-6 p-6 lg:mt-14 lg:flex-row lg:items-center lg:gap-10 lg:p-7">
          <div className="flex-none">
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[var(--color-ink-3)]">
              {t("slider.label")}
            </p>
            <p className="mt-1.5 text-[28px] font-[650] leading-none tracking-[-0.02em] tabular-nums">
              {fmt(cards)}
              <span className="ml-2 text-[15px] font-medium tracking-normal text-[var(--color-ink-2)]">
                {t("slider.unit")}
              </span>
            </p>
          </div>
          <div className="flex-1">
            <input
              type="range"
              min={0}
              max={STOPS.length - 1}
              step={1}
              value={stop}
              onChange={(e) => setStop(Number(e.target.value))}
              aria-label={t("slider.label")}
              aria-valuetext={`${fmt(cards)} ${t("slider.unit")}`}
              className="pricing-range w-full"
              style={{ "--p": `${(stop / (STOPS.length - 1)) * 100}%` } as React.CSSProperties}
            />
            {/* each plan's limit, marked where it sits on the slider */}
            <div className="relative mt-2 h-4 text-[12px] font-medium tabular-nums text-[var(--color-ink-3)]">
              {PLANS.map((p, k) => {
                const at = (STOPS.indexOf(p.cards) / (STOPS.length - 1)) * 100;
                return (
                  <span
                    key={p.key}
                    className="absolute top-0 whitespace-nowrap"
                    style={{
                      left: `${at}%`,
                      transform: k === 0 ? "none" : k === PLANS.length - 1 ? "translateX(-100%)" : "translateX(-50%)",
                    }}
                  >
                    {fmt(p.cards)}
                  </span>
                );
              })}
            </div>
          </div>
          <p className="flex-none text-[15px] text-[var(--color-ink-2)] lg:w-[220px]">
            {t.rich("slider.fit", {
              plan: () => <b className="font-[650] text-[var(--color-ink)]">{t(`plans.${fit.key}.name`)}</b>,
            })}
          </p>
        </div>

        {/* billing period */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {/* two toggle buttons (not tabs: there are no panels to switch) */}
          <div
            role="group"
            aria-label={`${t("billing.monthly")} / ${t("billing.yearly")}`}
            className="synq-card inline-flex items-center gap-1 rounded-full p-1"
          >
            {([false, true] as const).map((y) => (
              <button
                key={String(y)}
                type="button"
                aria-pressed={yearly === y}
                onClick={() => setYearly(y)}
                className={`inline-flex h-9 items-center gap-2 rounded-full px-4 text-[13px] font-semibold transition-colors ${
                  yearly === y ? "bg-[var(--color-ink)] text-white" : "text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
                }`}
              >
                {t(y ? "billing.yearly" : "billing.monthly")}
                {y && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10.5px] font-semibold transition-colors ${
                      yearly ? "bg-white/15 text-white" : "bg-[var(--color-green-bg)] text-[var(--color-green)]"
                    }`}
                  >
                    {t("billing.save")}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* the paid plans, dearest first */}
        <ul className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
          {[...PAID].reverse().map((p) => {
            const on = p.key === fit.key;
            const perMonth = yearly ? p.yearly / 12 : p.monthly;
            return (
              <li key={p.key} className="plan-card synq-card relative flex flex-col p-6 lg:p-8" data-on={on || undefined}>
                {on && (
                  <span className="absolute -top-2.5 left-6 rounded-full bg-[var(--color-green-bg)] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.06em] text-[var(--color-green)] shadow-[0_0_0_2px_#fff] lg:left-8">
                    {t("fits")}
                  </span>
                )}
                <h3 className="text-[19px] font-[650] tracking-[-0.01em]">{t(`plans.${p.key}.name`)}</h3>
                <p className="mt-1 text-[14px] font-medium tabular-nums text-[var(--color-ink-2)]">
                  {t("upTo", { n: fmt(p.cards) })}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-[48px] font-[650] leading-none tracking-[-0.03em] tabular-nums">
                    ${Math.round(perMonth)}
                  </span>
                  <span className="text-[14px] text-[var(--color-ink-2)]">{t("perMonth")}</span>
                </div>

                {/* the same price, as a cost per card */}
                <p className="mt-2.5 inline-flex w-fit items-center rounded-full bg-[var(--color-green-bg)] px-2.5 py-1 text-[12.5px] font-semibold tabular-nums text-[var(--color-green)]">
                  {t("perCard", { c: perCard(perMonth, p.cards) })}
                </p>
                <p className="mt-2 text-[12.5px] tabular-nums text-[var(--color-ink-3)]">
                  {yearly ? t("billedYearly", { total: fmt(p.yearly) }) : t("orYearly", { total: fmt(p.yearly) })}
                </p>

                {/* the section's one primary button goes on the plan that fits */}
                <a
                  href={INSTALL}
                  target="_blank"
                  rel="noreferrer"
                  className={`plan-cta mt-6 inline-flex h-11 items-center justify-center rounded-full px-5 text-[14px] font-semibold ${
                    on
                      ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:bg-[var(--color-accent)]/85"
                      : "plan-cta-secondary bg-white text-[var(--color-ink)] shadow-[inset_0_0_0_1.5px_rgb(0_0_0/0.14)]"
                  }`}
                >
                  {t("cta")}
                </a>

              </li>
            );
          })}
        </ul>

        {/* plans differ only in how many cards: everything else is in all of them */}
        <div className="mt-4 rounded-[16px] bg-black/[0.03] px-6 py-6 lg:px-8">
          <p className="text-[15px] font-[650] tracking-[-0.01em]">{t("includes.title")}</p>
          <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {(t.raw("includes.items") as string[]).map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[14px] leading-[1.4] text-[var(--color-set)]">
                <svg className="mt-[2px] h-4 w-4 flex-none text-[var(--color-green)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Free, as a quiet line under the paid plans; it lights up only when it fits */}
        <div
          className={`plan-free mt-4 flex flex-col gap-4 rounded-[16px] px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8 ${
            freeFits ? "synq-card" : "bg-black/[0.03]"
          }`}
          data-on={freeFits || undefined}
        >
          <p className="text-[15px] text-[var(--color-set)]">
            {t.rich("free.line", {
              b: (c) => <b className="font-[650] text-[var(--color-ink)]">{c}</b>,
            })}
            <span className="ml-2 text-[13px] text-[var(--color-ink-3)]">{t("free.same")}</span>
          </p>
          <a
            href={INSTALL}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex h-10 flex-none items-center justify-center rounded-full px-5 text-[14px] font-semibold transition-colors ${
              freeFits
                ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:bg-[var(--color-accent)]/85"
                : "text-[var(--color-ink)] underline decoration-black/20 underline-offset-4 hover:decoration-[var(--color-ink)]"
            }`}
          >
            {t("ctaFree")}
          </a>
        </div>

        {/* what lowers the risk, right under the plans */}
        <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-10">
          {trust.map((line, k) => (
            <li key={line} className="flex items-center gap-2.5 text-[14px] font-medium text-[var(--color-set)]">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white text-[var(--color-ink-2)] shadow-[0_0_0_1px_rgb(0_0_0/0.06)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {k === 0 && (
                    <>
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </>
                  )}
                  {k === 1 && <path d="M18 6 6 18M6 6l12 12" />}
                  {k === 2 && (
                    <>
                      <rect x="4" y="3" width="16" height="18" rx="2" />
                      <path d="M8 8h8M8 12h8M8 16h5" />
                    </>
                  )}
                </svg>
              </span>
              {line}
            </li>
          ))}
        </ul>

        {/* a real shop, underneath */}
        <figure className="mx-auto mt-16 flex max-w-[720px] flex-col items-center text-center">
          <blockquote className="text-[20px] font-[550] leading-[1.45] tracking-[-0.01em] text-[var(--color-ink)] lg:text-[22px]">
            “{t("proof.quote")}”
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            <span className="flex h-10 items-center justify-center rounded-[10px] bg-white px-2 shadow-[0_0_0_1px_rgb(0_0_0/0.06)]">
              <img src="/stores/mint.webp" width={210} height={96} alt="" className="h-7 w-auto object-contain" />
            </span>
            <span className="flex flex-col text-left leading-[1.3]">
              <b className="text-[14px] font-[650]">{t("proof.store")}</b>
              <span className="text-[12.5px] text-[var(--color-ink-3)]">{t("proof.source")}</span>
            </span>
          </figcaption>
        </figure>
      </Section>
    </section>
  );
}
