"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Section from "./Section";
import { openContact } from "@/components/contact/open";
import type { DocsCategory } from "@/lib/docs";
import { localePath } from "@/lib/site";

const CATEGORIES: { key: DocsCategory; icon: () => React.JSX.Element }[] = [
  { key: "start", icon: SetupIcon },
  { key: "stock", icon: CatalogIcon },
  { key: "prices", icon: PricingIcon },
  { key: "inventory", icon: BulkIcon },
  { key: "shopify", icon: IntegrationsIcon },
  { key: "billing", icon: BillingIcon },
];


export default function DocsPortal() {
  /* the search filters the article lists below as you type */
  const [q, setQ] = useState("");
  return (
    <>
      <Hero q={q} setQ={setQ} />
      <Categories q={q} />
      <Support />
    </>
  );
}

/* lower-case, no accents: "precios" finds "Precios", "regle" finds "règle" */
const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function Hero({ q, setQ }: { q: string; setQ: (v: string) => void }) {
  const t = useTranslations("docs.hero");

  return (
    <section className="w-full bg-[var(--color-ink)] text-white">
      <Section innerClassName="pt-28 pb-10 lg:pt-32 lg:pb-14">
        <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          {t("eyebrow")}
        </p>
        <h1 className="mt-4 max-w-[720px] text-[28px] font-medium leading-[1.1] tracking-[-0.02em] lg:text-[40px]">
          {t("title")}
        </h1>

        <p className="mt-3 max-w-[520px] text-[15px] leading-[1.55] text-white/60 lg:text-[16px]">
          {t("subtitle")}
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-6 flex w-full max-w-[600px] items-center gap-3 rounded-full bg-white/[0.06] px-5 ring-1 ring-inset ring-white/10 transition-colors focus-within:ring-white/30"
        >
          <svg
            className="h-4 w-4 flex-none text-white/50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="h-11 w-full bg-transparent text-[14px] text-white placeholder:text-white/40 outline-none"
            aria-label={t("searchPlaceholder")}
          />
        </form>

        <button
          type="button"
          onClick={() => openContact("app")}
          className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-white/60 transition-colors hover:text-[var(--color-accent)]"
        >
          {t("contact")}
          <svg
            className="h-3 w-3"
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
        </button>
      </Section>
    </section>
  );
}

function Categories({ q }: { q: string }) {
  const t = useTranslations("docs");
  const locale = useLocale();
  const words = norm(q).split(/\s+/).filter(Boolean);
  /* an article matches when every word is in its title or intro */
  const matches = (slug: string) => {
    if (!words.length) return true;
    const text = norm(`${t.raw(`articles.${slug}.title`)} ${t.raw(`articles.${slug}.intro`) ?? ""}`);
    return words.every((w) => text.includes(w));
  };
  let shown = 0;

  return (
    <section className="w-full bg-[var(--color-ink)] text-white border-t border-white/10">
      <Section innerClassName="py-16 lg:py-24">
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map(({ key, icon: Icon }) => {
            const articles = (t.raw(`categories.${key}.articles`) as string[]).filter(matches);
            if (!articles.length) return null;
            shown += articles.length;
            return (
              <li key={key} className="flex flex-col bg-[var(--color-ink)] p-7 lg:p-8">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] ring-1 ring-inset ring-white/10">
                    <Icon />
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/40">
                    {articles.length} {t("articlesLabel")}
                  </span>
                </div>
                <h2 className="mt-6 text-[20px] font-medium text-white">
                  {t(`categories.${key}.title`)}
                </h2>
                <p className="mt-2 text-[13px] leading-[1.5] text-white/55">
                  {t(`categories.${key}.body`)}
                </p>

                <ul className="mt-6 flex flex-col">
                  {articles.map((slug) => (
                    <li key={slug} className="border-t border-white/10 first:border-t-0">
                      <a
                        href={localePath(locale, `/docs/${slug}`)}
                        className="group flex w-full items-center justify-between gap-3 py-3 text-[14px] text-white/80 transition-colors hover:text-[var(--color-accent)]"
                      >
                        <span className="flex-1 truncate">
                          {t.raw(`articles.${slug}.title`) as string}
                        </span>
                        <svg
                          className="h-3.5 w-3.5 flex-none text-white/30 transition-all group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
        {words.length > 0 && shown === 0 && (
          <p className="mt-8 text-[15px] text-white/60" role="status">
            {t("hero.noResults")}
          </p>
        )}
      </Section>
    </section>
  );
}

function Support() {
  const t = useTranslations("docs.support");
  return (
    <section className="w-full bg-[var(--color-ink)] text-white border-t border-white/10">
      <Section innerClassName="py-20 lg:py-28">
        <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          {t("eyebrow")}
        </p>
        <h2 className="mt-4 max-w-[720px] text-[28px] font-medium leading-[1.1] tracking-[-0.015em] lg:text-[40px]">
          {t("title")}
        </h2>
        <p className="mt-6 max-w-[520px] text-[16px] leading-[1.6] text-white/65">
          {t("body")}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => openContact("app")}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 text-[14px] font-semibold text-[var(--color-accent-ink)] transition-colors hover:bg-[var(--color-accent)]/85"
          >
            {t("primary")}
          </button>
          <a
            href="https://apps.shopify.com/synq-tcg-card-manager"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-[14px] font-medium text-white/85 transition-colors hover:bg-white/10"
          >
            {t("secondary")}
          </a>
        </div>
      </Section>
    </section>
  );
}

function SetupIcon() {
  return (
    <svg
      className="h-5 w-5 text-[var(--color-accent)]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CatalogIcon() {
  return (
    <svg
      className="h-5 w-5 text-[var(--color-accent)]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18M9 4v16" />
    </svg>
  );
}

function PricingIcon() {
  return (
    <svg
      className="h-5 w-5 text-[var(--color-accent)]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  );
}

function BulkIcon() {
  return (
    <svg
      className="h-5 w-5 text-[var(--color-accent)]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function IntegrationsIcon() {
  return (
    <svg
      className="h-5 w-5 text-[var(--color-accent)]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 17.5h7" />
      <path d="M17.5 14v7" />
    </svg>
  );
}

function BillingIcon() {
  return (
    <svg
      className="h-5 w-5 text-[var(--color-accent)]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 14h4" />
    </svg>
  );
}
