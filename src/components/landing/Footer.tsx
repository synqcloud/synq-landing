"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import SynqLogo from "./SynqLogo";
import { openContact } from "@/components/contact/open";
import { localePath } from "@/lib/site";
import { analyticsEnabled, openCookieSettings } from "@/lib/consent";

/* The English-only pages for each game and the comparison: proper nouns, so
   the same labels in every language. Linked from every page so they aren't
   orphans (they rank on their own). Never on the home page: the home stays
   about the product, not a list of landing pages. */
const SEO_LINKS = [
  { href: "/for/pokemon", label: "Pokémon" },
  { href: "/for/magic-the-gathering", label: "Magic: The Gathering" },
  { href: "/for/yu-gi-oh", label: "Yu-Gi-Oh!" },
  { href: "/for/disney-lorcana", label: "Disney Lorcana" },
  { href: "/for/one-piece", label: "One Piece" },
  { href: "/synq-vs-spreadsheets", label: "Synq vs spreadsheets" },
  { href: "/compare", label: "Compare Shopify card apps" },
  { href: "/guides", label: "Guides" },
  { href: "/glossary", label: "Glossary" },
];

type ColumnKey = "product" | "company" | "legal";

const COLUMNS: Record<
  ColumnKey,
  { linkKeys: readonly string[]; hrefs: Record<string, string> }
> = {
  product: {
    linkKeys: ["features", "pricing", "docs"],
    hrefs: {
      features: "#features",
      pricing: "#pricing",
      docs: "/docs",
    },
  },
  company: {
    linkKeys: ["contact", "blog"],
    hrefs: {
      contact: "#contact",
      blog: "/blog",
    },
  },
  legal: {
    /* cookieSettings reopens the consent banner; only there when GA is on */
    linkKeys: analyticsEnabled
      ? ["terms", "privacy", "cookies", "cookieSettings", "legal"]
      : ["terms", "privacy", "cookies", "legal"],
    hrefs: {
      terms: "/terms",
      privacy: "/privacy",
      cookies: "/cookies",
      cookieSettings: "#cookie-settings",
      legal: "/legal",
    },
  },
};

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const onHome = usePathname() === "/";
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[var(--color-ink)] text-white">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <div className="border-t border-white/10" />
      </div>

      <div className="mx-auto w-full max-w-[1240px] px-6 pb-10 pt-16 lg:pb-12 lg:pt-20">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-16">
          <div className="col-span-2 flex flex-col gap-4 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex w-fit text-white transition-opacity hover:opacity-80"
            >
              <SynqLogo className="h-7" invert />
            </Link>
            <p className="max-w-[280px] text-[13px] leading-[1.55] text-white/55">
              {t("tagline")}
            </p>
          </div>

          {(Object.keys(COLUMNS) as ColumnKey[]).map((colKey) => {
            const col = COLUMNS[colKey];
            return (
              <div key={colKey} className="flex flex-col gap-4">
                <h3 className="text-[12px] font-medium uppercase tracking-[0.12em] text-white/40">
                  {t(`columns.${colKey}.title`)}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {col.linkKeys.map((linkKey) => {
                    const raw = col.hrefs[linkKey];
                    const label = t(`columns.${colKey}.links.${linkKey}`);
                    /* contact opens the write-to-us modal instead of a mail client */
                    if (raw === "#contact" || raw === "#cookie-settings") {
                      return (
                        <li key={linkKey}>
                          <button
                            type="button"
                            onClick={() =>
                              raw === "#contact" ? openContact() : openCookieSettings()
                            }
                            className="text-left text-[14px] text-white/70 transition-colors hover:text-white"
                          >
                            {label}
                          </button>
                        </li>
                      );
                    }
                    const isExternal =
                      raw.startsWith("mailto:") || raw.startsWith("http");
                    const isAnchor = raw.startsWith("#");
                    const href = isExternal ? raw : localePath(locale, raw);
                    if (isExternal || isAnchor) {
                      return (
                        <li key={linkKey}>
                          <a
                            href={href}
                            className="text-[14px] text-white/70 transition-colors hover:text-white"
                          >
                            {label}
                          </a>
                        </li>
                      );
                    }
                    return (
                      <li key={linkKey}>
                        <a
                          href={href}
                          className="text-[14px] text-white/70 transition-colors hover:text-white"
                        >
                          {label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-[13px] text-white/40 lg:flex-row lg:items-center">
          {/* the year is the reader's: a page built in one year and opened in
              the next may differ from the prerendered text, harmlessly */}
          <p suppressHydrationWarning>
            © {year} Synq. {t("rights")}
          </p>
          {!onHome && (
            <ul className="flex flex-wrap gap-x-4 gap-y-2" lang="en">
              {SEO_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} hrefLang="en" className="transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
