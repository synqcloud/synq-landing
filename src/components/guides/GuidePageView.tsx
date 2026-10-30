import { Fragment, type ReactNode } from "react";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Section from "@/components/landing/Section";
import SeoHero from "@/components/seo/SeoHero";
import SeoFaq from "@/components/seo/SeoFaq";
import ClosingBand from "@/components/seo/ClosingBand";
import { JsonLd, Label, softwareApp } from "@/components/seo/ui";
import { LinkChips } from "@/components/compare/blocks";
import "@/components/seo/seo.css";
import { pageMetadata } from "@/lib/seo";
import { OG_IMAGE, SITE_URL, absoluteUrl } from "@/lib/site";
import { GUIDES_CHECKED, GUIDES_UPDATED, GUIDES_PUBLISHED, GLOSSARY_PATH } from "@/content/guides/meta";
import { GLOSSARY_TERMS, GUIDE_PAGES } from "@/content/guides";
import type { GuideBlock, GuidePage } from "@/content/guides/types";

/* One template for the knowledge pages (the app page, the TCGplayer page,
   guides and glossary): the dark hero, a byline with the check date, the
   page's blocks, its FAQ, its sources, links on, and the close. Light
   sections on the canvas, ink everywhere, lime only on Add to Shopify. */

export function guideMetadata(page: GuidePage): Metadata {
  const isArticle = page.section === "guide";
  return {
    ...pageMetadata({
      locale: "en",
      path: page.path,
      title: page.seoTitle,
      description: page.description,
      absoluteTitle: true,
      type: isArticle ? "article" : "website",
      article: isArticle
        ? { publishedTime: GUIDES_PUBLISHED, modifiedTime: GUIDES_UPDATED, authors: ["Synq"], section: "Guides" }
        : undefined,
    }),
    keywords: page.keywords,
  };
}

/* ---------- inline markup: **bold** and [label](href) ---------- */

const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

export function rich(text: string): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of text.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    if (m[1] !== undefined) {
      out.push(
        <strong key={k++} className="font-[650] text-[var(--color-ink)]">
          {rich(m[1])}
        </strong>,
      );
    } else {
      const href = m[3];
      const cls =
        "font-medium text-[var(--color-ink)] underline decoration-black/25 underline-offset-4 transition-colors hover:decoration-[var(--color-ink)]";
      out.push(
        href.startsWith("http") ? (
          <a key={k++} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
            {m[2]}
          </a>
        ) : (
          <Link key={k++} href={href} className={cls}>
            {m[2]}
          </Link>
        ),
      );
    }
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.map((n, i) => <Fragment key={i}>{n}</Fragment>);
}

/** Plain text for JSON-LD and llms.txt. */
export function plain(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}

/* ---------- blocks ---------- */

const H2 = "mt-4 max-w-[30ch] text-[28px] font-[650] leading-[1.1] tracking-[-0.02em] [text-wrap:balance] lg:text-[34px]";
const P = "mt-5 text-[16px] leading-[1.7] text-[var(--color-ink-2)]";

function Wrap({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <section id={id} className="w-full scroll-mt-24">
      <Section as="div" innerClassName="py-12 lg:py-16">
        {children}
      </Section>
    </section>
  );
}

function Dot({ quiet = false }: { quiet?: boolean }) {
  return (
    <span
      className={`mt-[10px] h-[5px] w-[5px] flex-none rounded-full ${quiet ? "bg-[var(--color-ink-4)]" : "bg-[var(--color-ink)]"}`}
      aria-hidden="true"
    />
  );
}

function Head({ label, title }: { label?: string; title?: string }) {
  return (
    <>
      {label && <Label>{label}</Label>}
      {title && <h2 className={H2}>{title}</h2>}
    </>
  );
}

function Block({ b }: { b: GuideBlock }) {
  switch (b.kind) {
    case "prose":
      return (
        <Wrap id={b.id}>
          <div className="max-w-[760px]">
            <Head label={b.label} title={b.title} />
            {b.paragraphs.map((p, i) => (
              <p key={i} className={P}>
                {rich(p)}
              </p>
            ))}
            {b.bullets && (
              <ul className="mt-6 flex flex-col gap-3">
                {b.bullets.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15.5px] leading-[1.65] text-[var(--color-ink-2)]">
                    <Dot />
                    <span>{rich(t)}</span>
                  </li>
                ))}
              </ul>
            )}
            {b.after && <p className={P}>{rich(b.after)}</p>}
          </div>
        </Wrap>
      );
    case "steps":
      return (
        <Wrap id={b.id}>
          <Head label={b.label} title={b.title} />
          {b.intro && <p className={`${P} max-w-[70ch]`}>{rich(b.intro)}</p>}
          <ol className="synq-card mt-8 flex max-w-[900px] flex-col">
            {b.steps.map((s, i) => (
              <li key={s.title} className={`flex gap-4 p-6 lg:gap-5 lg:p-7 ${i > 0 ? "border-t border-black/[0.06]" : ""}`}>
                <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full bg-[var(--color-ink)] text-[12.5px] font-[650] text-white tabular-nums">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[16px] font-[650] tracking-[-0.01em]">{s.title}</h3>
                  <p className="mt-1.5 max-w-[70ch] text-[15px] leading-[1.65] text-[var(--color-ink-2)]">{rich(s.body)}</p>
                </div>
              </li>
            ))}
          </ol>
        </Wrap>
      );
    case "table":
      return (
        <Wrap id={b.id}>
          <Head label={b.label} title={b.title} />
          {b.intro && <p className={`${P} max-w-[70ch]`}>{rich(b.intro)}</p>}
          <div className="synq-card mt-8 max-w-[1000px] overflow-hidden">
            <table className="compare-table text-[14.5px] leading-[1.55]">
              <caption className="sr-only">{b.caption}</caption>
              <thead>
                <tr className="border-b border-black/[0.06] bg-[#fafafa]">
                  {b.head.map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[var(--color-ink-3)]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r) => (
                  <tr key={r[0]}>
                    <th scope="row" className="text-[15px] font-[650] tracking-[-0.01em] text-[var(--color-ink)]">
                      {rich(r[0])}
                    </th>
                    {r.slice(1).map((c, i) => (
                      <td key={i} data-label={b.head[i + 1]} className="text-[var(--color-ink-2)]">
                        {rich(c)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {b.note && <p className="mt-4 max-w-[75ch] text-[13.5px] leading-[1.6] text-[var(--color-ink-3)]">{rich(b.note)}</p>}
        </Wrap>
      );
    case "split":
      return (
        <Wrap id={b.id}>
          <Head label={b.label} title={b.title} />
          <div className={`grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4 ${b.label || b.title ? "mt-8" : ""}`}>
            {[b.left, b.right].map((side, k) => (
              <div key={side.title} className="synq-card flex flex-col p-6 lg:p-8">
                <h3 className="text-[20px] font-[650] leading-[1.2] tracking-[-0.015em] lg:text-[22px]">{side.title}</h3>
                {side.body && <p className="mt-3 text-[15px] leading-[1.6] text-[var(--color-ink-2)]">{rich(side.body)}</p>}
                <ul className="mt-5 flex flex-col gap-2.5">
                  {side.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[14.5px] leading-[1.6] text-[var(--color-ink-2)]">
                      <Dot quiet={k === 1} />
                      <span>{rich(p)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Wrap>
      );
    case "cards":
      return (
        <Wrap id={b.id}>
          <Head label={b.label} title={b.title} />
          {b.intro && <p className={`${P} max-w-[70ch]`}>{rich(b.intro)}</p>}
          <ul className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {b.cards.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="synq-card synq-card-hover flex h-full flex-col p-6 lg:p-7">
                  <h3 className="text-[18px] font-[650] leading-[1.25] tracking-[-0.015em]">{c.title}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.6] text-[var(--color-ink-2)]">{c.body}</p>
                  <span className="mt-auto pt-5 text-[14px] font-semibold underline decoration-black/20 underline-offset-4">
                    Read it
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Wrap>
      );
    case "links":
      return (
        <Wrap id={b.id}>
          <Head label={b.label} title={b.title} />
          {b.intro && <p className={`${P} max-w-[70ch]`}>{rich(b.intro)}</p>}
          <div className="mt-6">
            <LinkChips links={b.links} />
          </div>
        </Wrap>
      );
  }
}

/* ---------- JSON-LD ---------- */

function crumbsOf(page: GuidePage) {
  return [
    { name: "Home", item: SITE_URL },
    ...(page.parent ? [{ name: page.parent.name, item: absoluteUrl(page.parent.path) }] : []),
    { name: page.name, item: absoluteUrl(page.path) },
  ];
}

function jsonLd(page: GuidePage) {
  const url = absoluteUrl(page.path);
  const isHub = page.section === "guides" || page.section === "glossary";
  const graph: object[] = [
    {
      "@type": isHub ? "CollectionPage" : "WebPage",
      "@id": url,
      url,
      name: page.seoTitle,
      description: page.description,
      inLanguage: "en",
      dateModified: GUIDES_UPDATED,
      isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Synq" },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      ...(page.section === "app" || page.section === "integration" ? { about: softwareApp } : {}),
      ...(page.term ? { mainEntity: { "@id": `${url}#term` } } : {}),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: crumbsOf(page).map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.item })),
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
      })),
    },
  ];

  if (page.section === "guide" || page.section === "integration") {
    graph.push({
      "@type": page.section === "guide" && !page.path.includes("pricing") ? "TechArticle" : "Article",
      "@id": `${url}#article`,
      headline: page.h1,
      description: page.description,
      url,
      mainEntityOfPage: { "@id": url },
      inLanguage: "en",
      datePublished: GUIDES_PUBLISHED,
      dateModified: GUIDES_UPDATED,
      image: absoluteUrl(OG_IMAGE.url),
      author: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Synq", url: SITE_URL },
      publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Synq", url: SITE_URL },
      about: softwareApp,
      ...(page.sources.length ? { citation: page.sources.map((s) => s.url) } : {}),
    });
  }

  if (page.term) {
    graph.push({
      "@type": "DefinedTerm",
      "@id": `${url}#term`,
      name: page.term.name,
      ...(page.term.alternateNames ? { alternateName: page.term.alternateNames } : {}),
      description: page.term.definition,
      url,
      inDefinedTermSet: { "@id": `${absoluteUrl(GLOSSARY_PATH)}#terms` },
      ...(page.sources.length ? { subjectOf: page.sources.map((s) => ({ "@type": "WebPage", url: s.url, name: s.label })) } : {}),
    });
  }

  if (page.section === "glossary") {
    graph.push({
      "@type": "DefinedTermSet",
      "@id": `${url}#terms`,
      name: "Synq glossary for card shops",
      url,
      hasDefinedTerm: GLOSSARY_TERMS.map((t) => ({
        "@type": "DefinedTerm",
        "@id": `${absoluteUrl(t.path)}#term`,
        name: t.term!.name,
        description: t.term!.definition,
        url: absoluteUrl(t.path),
      })),
    });
  }

  if (page.section === "guides") {
    const guides = GUIDE_PAGES.filter((p) => p.section === "guide");
    graph.push({
      "@type": "ItemList",
      "@id": `${url}#guides`,
      name: page.h1,
      numberOfItems: guides.length,
      itemListElement: guides.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.h1, url: absoluteUrl(g.path) })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/* ---------- page ---------- */

export default function GuidePageView({ page }: { page: GuidePage }) {
  return (
    <main className="relative bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <JsonLd data={jsonLd(page)} />
      <Navbar />
      <SeoHero
        eyebrow={page.eyebrow}
        title={page.h1}
        intro={page.intro}
        secondary={page.secondary ?? (page.sources.length ? { href: "#sources", label: "See the sources" } : undefined)}
      />

      <Section as="div" innerClassName="pt-8 lg:pt-10">
        <nav aria-label="Breadcrumb" className="text-[13px] text-[var(--color-ink-3)]">
          {crumbsOf(page).map((c, i, all) => (
            <Fragment key={c.item}>
              {i > 0 && <span aria-hidden="true"> / </span>}
              {i < all.length - 1 ? (
                <Link href={i === 0 ? "/" : page.parent!.path} className="hover:text-[var(--color-ink)]">
                  {c.name}
                </Link>
              ) : (
                <span aria-current="page">{c.name}</span>
              )}
            </Fragment>
          ))}
        </nav>
        <p className="mt-3 flex max-w-[90ch] items-start gap-2.5 text-[13.5px] leading-[1.55] text-[var(--color-ink-2)]">
          <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-ink-3)]" aria-hidden="true" />
          <span>
            Written by the Synq team. Last checked <time dateTime={GUIDES_UPDATED}>{GUIDES_CHECKED}</time>. Facts about
            Synq come from the app itself{page.sources.length ? "; outside facts link to their source below" : ""}.
          </span>
        </p>
      </Section>

      {page.blocks.map((b, i) => (
        <Block key={i} b={b} />
      ))}

      <SeoFaq title={page.faqTitle} body={page.faqBody} items={page.faq.map((f) => ({ q: f.q, a: plain(f.a) }))} />

      {page.sources.length > 0 && (
        <section id="sources" aria-labelledby="sources-title" className="w-full scroll-mt-24">
          <Section as="div" innerClassName="pb-14 lg:pb-20">
            <Label>{`Last checked ${GUIDES_CHECKED}`}</Label>
            <h2 id="sources-title" className="mt-4 text-[24px] font-[650] tracking-[-0.02em] lg:text-[28px]">
              Sources
            </h2>
            <ol className="synq-card mt-6 flex max-w-[900px] flex-col p-2 text-[14px] leading-[1.5]">
              {page.sources.map((s, i) => (
                <li key={s.url} className={`flex gap-3 px-4 py-3 ${i > 0 ? "border-t border-black/[0.06]" : ""}`}>
                  <span className="w-6 flex-none font-[650] tabular-nums text-[var(--color-ink-3)]">{i + 1}</span>
                  <span className="min-w-0">
                    <span className="text-[var(--color-ink)]">{s.label}</span>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block break-all text-[13px] text-[var(--color-ink-2)] underline decoration-black/15 underline-offset-2 hover:text-[var(--color-ink)]"
                    >
                      {s.url}
                    </a>
                  </span>
                </li>
              ))}
            </ol>
          </Section>
        </section>
      )}

      <nav aria-label="Related pages" className="w-full">
        <Section as="div" innerClassName="pb-16 lg:pb-20">
          <Label>Read next</Label>
          <div className="mt-5">
            <LinkChips links={page.related} />
          </div>
        </Section>
      </nav>

      <ClosingBand title={page.closing.title} body={page.closing.body} />
      <Footer />
    </main>
  );
}
