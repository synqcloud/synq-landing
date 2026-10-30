"use client";

import { useLocale, useTranslations } from "next-intl";
import Section from "./Section";
import HeroWall from "./HeroWall";
import Features from "./Features";
import ChapterAdd from "./ChapterAdd";
import ChapterPrices from "./ChapterPrices";
import ChapterResult from "./ChapterResult";
import Pricing from "./Pricing";
import Faq from "./Faq";
import { openContact } from "@/components/contact/open";
import { localePath } from "@/lib/site";


export default function Landing() {
  return (
    <>
      {/* the hero stays put and recedes while Monday slides over it */}
      <div className="hero-stack">
        <div className="hero-pin"><HeroWall /></div>
        <ChapterAdd />
      </div>
      <ChapterPrices />
      <Features />
      <ChapterResult />
      <Pricing />
      <Faq />
      <KnowledgeCenter />
      <FinalCta />
    </>
  );
}

const GUIDES = [
  { key: "install", href: "/docs/install" },
  { key: "firstCards", href: "/docs/add-cards" },
  { key: "rules", href: "/docs/price-rules" },
  { key: "bulk", href: "/docs/bulk-edit" },
  { key: "marketPrices", href: "/docs/market-prices" },
  { key: "variants", href: "/docs/conditions-printings" },
] as const;

function KnowledgeCenter() {
  const t = useTranslations("landing.getStarted");
  const locale = useLocale();

  return (
    <section className="w-full bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <Section innerClassName="py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[var(--color-ink-3)]">
              {t("label")}
            </p>
            <h2 className="mt-4 text-[28px] font-[650] leading-[1.1] tracking-[-0.02em] lg:text-[36px]">
              {t("title")}
            </h2>
          </div>
          <p className="text-[16px] leading-[1.65] text-[var(--color-ink-2)] lg:pt-3">
            {t("subtitle")}
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-4">
          {GUIDES.map(({ key, href }) => (
            <li key={key}>
              <a
                href={localePath(locale, href)}
                className="synq-card synq-card-hover group flex h-full flex-col gap-4 p-6 lg:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-[var(--color-well)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-[var(--color-ink-2)]">
                    {t(`guides.${key}.category`)}
                  </span>
                  <svg
                    className="h-4 w-4 text-[var(--color-ink-4)] transition-all group-hover:translate-x-0.5 group-hover:text-[var(--color-ink)]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-medium leading-[1.3] text-[var(--color-ink)]">
                  {t(`guides.${key}.title`)}
                </h3>
                <p className="text-[14px] leading-[1.55] text-[var(--color-ink-2)]">
                  {t(`guides.${key}.body`)}
                </p>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex">
          <a
            href={localePath(locale, "/docs")}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[var(--color-ink)] underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-[var(--color-ink)]"
          >
            {t("cta")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </Section>
    </section>
  );
}

function FinalCta() {
  const t = useTranslations("landing.cta");
  return (
    <section className="w-full bg-[var(--color-ink)] text-white border-t border-white/10">
      <Section innerClassName="py-24 lg:py-32">
        <h2 className="max-w-[720px] text-[32px] font-medium leading-[1.1] tracking-[-0.015em] lg:text-[48px]">
          {t("title")}
        </h2>
        <p className="mt-6 max-w-[520px] text-[16px] leading-[1.6] text-white/65">
          {t("body")}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="https://apps.shopify.com/synq-tcg-card-manager"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 text-[14px] font-semibold text-[var(--color-accent-ink)] transition-colors hover:bg-[var(--color-accent)]/85"
          >
            {t("primary")}
          </a>
          <button
            type="button"
            onClick={() => openContact()}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-[14px] font-medium text-white/85 transition-colors hover:bg-white/10"
          >
            {t("secondary")}
          </button>
        </div>
      </Section>
    </section>
  );
}
