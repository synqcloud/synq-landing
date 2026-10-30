import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Section from "@/components/landing/Section";
import SeoHero from "@/components/seo/SeoHero";
import SeoFaq from "@/components/seo/SeoFaq";
import ClosingBand from "@/components/seo/ClosingBand";
import { JsonLd, Label, softwareApp } from "@/components/seo/ui";
import "@/components/seo/seo.css";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import { ALL_APPS, type AppEntry } from "@/content/compare/apps";
import { ROUNDUP_ORDER } from "@/content/compare/best-apps";
import { CLUSTER_LINKS, DOC_LINKS, GAME_LINKS } from "@/content/compare/hub";
import { CHECKED, CHECKED_ISO, SOURCES, type SourceId } from "@/content/compare/sources";
import type { ComparePage } from "@/content/compare/types";
import { BlockView, LinkChips, type SourceIndex } from "./blocks";

/* One template for every page in the comparison cluster: the dark hero, a
   byline that says who wrote it and when it was checked, the page's blocks,
   its FAQ, the numbered sources, links across the cluster, and the close. */

export function compareMetadata(page: ComparePage): Metadata {
  return {
    ...pageMetadata({
      locale: "en",
      path: page.path,
      title: page.seoTitle,
      description: page.description,
      absoluteTitle: true,
    }),
    keywords: page.keywords,
  };
}

/** The apps a page shows, in the order it shows them. */
function appsFor(page: ComparePage): AppEntry[] {
  if (page.itemList) {
    return ROUNDUP_ORDER.map((id) => ALL_APPS.find((a) => a.id === id)!).filter(Boolean);
  }
  return [];
}

/** Number the sources: the page's own order first, then anything a cell
    cites that the list forgot, so no mark points nowhere. */
function sourceIndex(page: ComparePage, apps: AppEntry[]): SourceId[] {
  const used: SourceId[] = [...page.sources];
  const add = (ids?: readonly SourceId[]) => ids?.forEach((id) => !used.includes(id) && used.push(id));
  for (const b of page.blocks) {
    if (b.kind === "prose") add(b.sources);
    if (b.kind === "vs") b.rows.forEach((r) => (add(r.them.s), add(r.synq.s)));
  }
  for (const a of apps) {
    add(a.sources);
    Object.values(a.cells).forEach((c) => add(c.s));
  }
  return used;
}

function jsonLd(page: ComparePage, apps: AppEntry[]) {
  const url = absoluteUrl(page.path);
  const crumbs = [
    { name: "Home", item: SITE_URL },
    ...(page.parent ? [{ name: page.parent.name, item: absoluteUrl(page.parent.path) }] : []),
    { name: page.name, item: url },
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: page.seoTitle,
        description: page.description,
        inLanguage: "en",
        dateModified: CHECKED_ISO,
        isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Synq" },
        author: { "@type": "Organization", name: "Synq", url: SITE_URL },
        about: softwareApp,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.item })),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: page.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      ...(apps.length
        ? [
            {
              "@type": "ItemList",
              "@id": `${url}#apps`,
              name: page.h1,
              numberOfItems: apps.length,
              itemListElement: apps.map((a, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: a.name,
                url: a.id === "synq" ? SITE_URL : a.url,
              })),
            },
          ]
        : []),
    ],
  };
}

export default function ComparePageView({ page }: { page: ComparePage }) {
  const apps = appsFor(page);
  const order = sourceIndex(page, apps);
  const index: SourceIndex = new Map(order.map((id, i) => [id, i + 1]));
  const others = CLUSTER_LINKS.filter((l) => l.href !== page.path);

  return (
    <main className="relative bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <JsonLd data={jsonLd(page, apps)} />
      <Navbar />
      <SeoHero
        eyebrow={page.eyebrow}
        title={page.h1}
        intro={page.intro}
        secondary={
          page.itemList ? { href: "#matrix", label: "Jump to the table" } : { href: "#sources", label: "See the sources" }
        }
      />

      <Section as="div" innerClassName="pt-8 lg:pt-10">
        <p className="flex max-w-[90ch] items-start gap-2.5 text-[13.5px] leading-[1.55] text-[var(--color-ink-2)]">
          <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-ink-3)]" aria-hidden="true" />
          <span>
            {page.byline}{" "}
            <time dateTime={CHECKED_ISO} className="sr-only">
              {CHECKED}
            </time>
          </span>
        </p>
        {page.parent && (
          <nav aria-label="Breadcrumb" className="mt-3 text-[13px] text-[var(--color-ink-3)]">
            <Link href="/" className="hover:text-[var(--color-ink)]">
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            <Link href={page.parent.path} className="hover:text-[var(--color-ink)]">
              {page.parent.name}
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{page.name}</span>
          </nav>
        )}
      </Section>

      {page.blocks.map((b, i) => (
        <BlockView key={i} b={b} apps={apps.length ? apps : ALL_APPS} index={index} />
      ))}

      <SeoFaq title={page.faqTitle} body={page.faqBody} items={page.faq} />

      <section id="sources" aria-labelledby="sources-title" className="w-full scroll-mt-24">
        <Section as="div" innerClassName="pb-14 lg:pb-20">
          <Label>{`Last checked ${CHECKED}`}</Label>
          <h2 id="sources-title" className="mt-4 text-[24px] font-[650] tracking-[-0.02em] lg:text-[28px]">
            Sources
          </h2>
          <p className="mt-3 max-w-[70ch] text-[14.5px] leading-[1.6] text-[var(--color-ink-2)]">
            Facts about other tools come from these pages, read in {CHECKED}. Facts about Synq come from the app itself. If
            something here is out of date, write to help@synq.cards and we&apos;ll fix it.
          </p>
          <ol className="synq-card mt-6 flex flex-col p-2 text-[14px] leading-[1.5]">
            {order.map((id, i) => (
              <li
                key={id}
                id={`src-${id}`}
                className={`flex scroll-mt-24 gap-3 px-4 py-3 ${i > 0 ? "border-t border-black/[0.06]" : ""}`}
              >
                <span className="w-6 flex-none font-[650] tabular-nums text-[var(--color-ink-3)]">{i + 1}</span>
                <span className="min-w-0">
                  <span className="text-[var(--color-ink)]">{SOURCES[id].label}</span>
                  <a
                    href={SOURCES[id].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block break-all text-[13px] text-[var(--color-ink-2)] underline decoration-black/15 underline-offset-2 hover:text-[var(--color-ink)]"
                  >
                    {SOURCES[id].url}
                  </a>
                </span>
              </li>
            ))}
          </ol>
        </Section>
      </section>

      <nav aria-label="More comparisons and guides" className="w-full">
        <Section as="div" innerClassName="pb-16 lg:pb-20">
          <div className="flex flex-col gap-10">
            <div>
              <Label>More comparisons</Label>
              <div className="mt-5">
                <LinkChips links={others} />
              </div>
            </div>
            <div>
              <Label>Synq for your game</Label>
              <div className="mt-5">
                <LinkChips links={GAME_LINKS} />
              </div>
            </div>
            <div>
              <Label>From the docs</Label>
              <div className="mt-5">
                <LinkChips links={DOC_LINKS} />
              </div>
            </div>
          </div>
        </Section>
      </nav>

      <ClosingBand title={page.closing.title} body={page.closing.body} />
      <Footer />
    </main>
  );
}
