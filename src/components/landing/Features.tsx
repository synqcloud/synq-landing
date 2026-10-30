import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import Section from "./Section";
import InventoryDemo from "./InventoryDemo";
import PosDemo from "./PosDemo";
import ImportDemo from "./ImportDemo";
import { localePath } from "@/lib/site";

/* Two arrows in a disc; hover slides the second one in. */
function ArrowDisc() {
  return (
    <span className="arrow-disc" aria-hidden="true">
      <span className="arrow-track">
        <span>→</span>
        <span>→</span>
      </span>
    </span>
  );
}

const ICONS = {
  rules: (
    <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Zm5-5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
  ),
  add: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  import: (
    <>
      <path d="M12 3v12M7 10l5 5 5-5" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </>
  ),
  inventory: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 10h18M9 10v10" />
    </>
  ),
  pos: <path d="M4 5v14M7.5 5v14M10 5v14M13.5 5v14M17 5v14M20 5v14" />,
} satisfies Record<string, ReactNode>;

const CARDS = [
  /* adding cards and price rules have their own chapters above; this is the
     rest, each card a small live mock of its screen */
  { key: "inventory", href: "/docs", wide: true },
  { key: "import", href: "/docs" },
  { key: "pos", href: "/docs" },
] as const;

export default function Features() {
  const t = useTranslations("landing.features");
  const locale = useLocale();

  return (
    <section
      id="features"
      className="w-full scroll-mt-24 bg-[var(--color-canvas)] text-[var(--color-ink)]"
    >
      <Section innerClassName="py-20 lg:py-28">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-[minmax(auto,40rem)_minmax(0,26rem)] lg:justify-between lg:gap-10">
          <div className="flex flex-col items-start">
            <a
              href={localePath(locale, "/docs")}
              className="synq-card synq-card-hover mb-4 inline-flex items-center gap-2.5 rounded-full py-1.5 pl-4 pr-1.5 text-[13px] font-semibold"
            >
              {t("pill")}
              <ArrowDisc />
            </a>
            <h2 className="text-[32px] font-[650] leading-[1.05] tracking-[-0.02em] [text-wrap:balance] lg:text-[44px]">
              {t("title")}
            </h2>
          </div>
          <p className="text-[16px] leading-[1.6] text-[var(--color-ink-2)]">
            {t("body")}{" "}
            <a
              href={localePath(locale, "/docs")}
              className="font-semibold text-[var(--color-ink)] underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-[var(--color-ink)]"
            >
              {t("link")}
            </a>
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:gap-5">
          {CARDS.map((c) => (
            <a
              key={c.key}
              href={localePath(locale, c.href)}
              className={`feature-card synq-card synq-card-hover group flex flex-col overflow-hidden ${
                "wide" in c ? "sm:col-span-2" : ""
              }`}
            >
              <div className="p-6 pb-4 lg:p-7 lg:pb-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="flex items-center gap-3 text-[18px] font-[650] tracking-[-0.015em]">
                    <span className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[10px] bg-[var(--color-well)]">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        {ICONS[c.key]}
                      </svg>
                    </span>
                    {t(`cards.${c.key}.title`)}
                  </h3>
                  <ArrowDisc />
                </div>
                <p className="mt-3 text-[14px] leading-[1.5] text-[var(--color-ink-2)]">
                  <strong className="font-[650] text-[var(--color-ink)]">
                    {t(`cards.${c.key}.lead`)}
                  </strong>{" "}
                  {t(`cards.${c.key}.body`)}
                </p>
              </div>
              {c.key === "inventory" ? (
                /* the inventory plays a bulk edit */
                <div className="relative mt-auto overflow-hidden bg-[radial-gradient(120%_100%_at_50%_0%,#fafafa_0%,#ececec_100%)] px-6 pt-5 lg:px-7">
                  <div className="feature-shot overflow-hidden rounded-t-[12px]">
                    <InventoryDemo />
                  </div>
                </div>
              ) : (
                <div
                  className={`relative mt-auto aspect-[3/2] overflow-hidden bg-[radial-gradient(120%_100%_at_50%_0%,#fafafa_0%,#ececec_100%)] px-6 lg:px-7 ${
                    c.key === "import" ? "pt-5" : ""
                  }`}
                >
                  {/* a spreadsheet matched row by row; a label and a box scanned at the counter */}
                  {c.key === "import" ? <ImportDemo /> : <PosDemo />}
                </div>
              )}
            </a>
          ))}
        </div>
      </Section>
    </section>
  );
}
