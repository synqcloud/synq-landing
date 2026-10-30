/* server component: the legal text never ships to the browser as JS */
import { useLocale, useTranslations } from "next-intl";
import Section from "./Section";
import { SITE_NAME, absoluteUrl, localePath } from "@/lib/site";
import { JsonLd } from "@/components/seo/ui";
import { ORG_ID, WEBSITE_ID } from "@/components/seo/SiteSchema";
import { bareTitle } from "@/lib/seo";

/* where each legal text lives (English only) */
const PATHS = { terms: "/terms", privacy: "/privacy", cookies: "/cookies", notice: "/legal" } as const;

type LegalBlock = string | { heading: string; text: string } | { list: string[] };
type LegalSection = { id: string; title: string; body: LegalBlock[] };

/* Inline markup in legal strings: **bold**, [label](/path) and bare emails. */
const INLINE_RE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|[\w.+-]+@[\w-]+\.[a-z]{2,})/g;
const LINK_CLASS =
  "text-[var(--color-accent)] underline-offset-2 hover:underline";

function Inline({ text }: { text: string }) {
  const locale = useLocale();
  return (
    <>
      {text.split(INLINE_RE).map((part, i) => {
        if (i % 2 === 0) return part;
        if (part.startsWith("**")) {
          return (
            <strong key={i} className="font-medium text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, href] = link;
          const url = localePath(locale, href);
          return (
            <a key={i} href={url} className={LINK_CLASS}>
              {label}
            </a>
          );
        }
        return (
          <a key={i} href={`mailto:${part}`} className={LINK_CLASS}>
            {part}
          </a>
        );
      })}
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") {
    return (
      <p>
        <Inline text={block} />
      </p>
    );
  }
  if ("list" in block) {
    return (
      <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-white/40">
        {block.list.map((item, i) => (
          <li key={i}>
            <Inline text={item} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div>
      <h3 className="mb-2 text-[15px] font-medium text-white lg:text-[16px]">
        {block.heading}
      </h3>
      <p>
        <Inline text={block.text} />
      </p>
    </div>
  );
}

export default function LegalPage({ docKey }: { docKey: "terms" | "privacy" | "cookies" | "notice" }) {
  const t = useTranslations(`legal.${docKey}`);
  const sections = t.raw("sections") as LegalSection[];
  /* numbered docs prefix "1. " to headings and the index (single-section docs are never numbered) */
  const numbered = t.has("numbered") && sections.length > 1;
  const heading = (s: LegalSection, i: number) =>
    numbered ? `${i + 1}. ${s.title}` : s.title;

  /* a plain WebPage + breadcrumb, tied to the home's site and publisher */
  const url = absoluteUrl(PATHS[docKey]);
  const name = bareTitle(t("meta.title"));
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description: t("meta.description"),
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORG_ID },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name, item: url },
        ],
      },
    ],
  };

  return (
    <article className="w-full bg-[var(--color-ink)] text-white">
      <JsonLd data={schema} />
      <Section innerClassName="pt-28 pb-20 lg:pt-32 lg:pb-24">
        <header className="max-w-[820px]">
          <p className="text-[12px] uppercase tracking-[0.12em] text-white/40">
            {t("updated")}
          </p>
          <h1 className="mt-4 text-[32px] font-medium leading-[1.1] tracking-[-0.02em] lg:text-[44px]">
            {t("title")}
          </h1>
          {t.has("intro") && (
            <p className="mt-6 text-[15px] leading-[1.65] text-white/65 lg:text-[16px]">
              <Inline text={t.raw("intro") as string} />
            </p>
          )}
        </header>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_240px] lg:gap-16">
          <div className="flex flex-col gap-10 lg:max-w-[760px]">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-[20px] font-medium leading-[1.25] tracking-[-0.01em] lg:text-[24px]">
                  {heading(s, i)}
                </h2>
                <div className="mt-4 flex flex-col gap-3 text-[14px] leading-[1.7] text-white/70 lg:text-[15px]">
                  {s.body.map((b, i) => (
                    <Block key={i} block={b} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {sections.length > 1 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
                On this page
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-[13px] leading-[1.5] text-white/65 transition-colors hover:text-[var(--color-accent)]"
                    >
                      {heading(s, i)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          )}
        </div>
      </Section>
    </article>
  );
}
