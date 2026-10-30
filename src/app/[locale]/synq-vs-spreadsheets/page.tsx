import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Section from "@/components/landing/Section";
import SeoHero from "@/components/seo/SeoHero";
import CompareTable from "@/components/seo/CompareTable";
import ClosingBand from "@/components/seo/ClosingBand";
import MoreLinks from "@/components/seo/MoreLinks";
import { JsonLd, Label, softwareApp } from "@/components/seo/ui";
import "@/components/seo/seo.css";
import { SITE } from "@/content/games";
import { pageMetadata } from "@/lib/seo";
import { BRING, COMPARE, ENOUGH, ROWS } from "@/content/synq-vs-spreadsheets";

/* English only: this page keeps the old site's indexed slug */
export const dynamicParams = false;

type Props = { params: Promise<{ locale: string }> };

const URL = `${SITE}/${COMPARE.slug}`;

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return {};
  const meta = pageMetadata({
    locale,
    path: `/${COMPARE.slug}`,
    title: COMPARE.seoTitle,
    absoluteTitle: true,
    description: COMPARE.description,
  });
  /* the old page's share wording */
  return {
    ...meta,
    keywords: COMPARE.keywords,
    openGraph: { ...meta.openGraph, title: COMPARE.ogTitle, description: COMPARE.ogDescription },
    twitter: { ...meta.twitter, title: COMPARE.ogTitle, description: COMPARE.ogDescription },
  };
}

export default async function SynqVsSpreadsheetsPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: COMPARE.h1, item: URL },
        ],
      },
      {
        "@type": "WebPage",
        "@id": URL,
        url: URL,
        name: COMPARE.seoTitle,
        description: COMPARE.description,
        about: softwareApp,
        inLanguage: "en",
      },
    ],
  };

  return (
    <main className="relative bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <JsonLd data={jsonLd} />
      <Navbar />
      <SeoHero
        eyebrow={COMPARE.label}
        title={COMPARE.h1}
        intro={COMPARE.intro}
        secondary={{ href: "/#pricing", label: "See plans" }}
      />

      <section aria-labelledby="table-title" className="w-full">
        <Section as="div" innerClassName="pt-16 pb-6 lg:pt-24">
          <Label>Side by side</Label>
          <h2
            id="table-title"
            className="mt-4 max-w-[24ch] text-[30px] font-[650] leading-[1.08] tracking-[-0.02em] [text-wrap:balance] lg:text-[40px]"
          >
            Pricing cards for a Shopify store, both ways
          </h2>
          <div className="mt-10">
            <CompareTable rows={ROWS} />
          </div>
        </Section>
      </section>

      <section aria-label="When to use which" className="w-full">
        <Section as="div" innerClassName="py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
            <div className="synq-card flex flex-col p-6 lg:p-8">
              <h2 className="text-[22px] font-[650] leading-[1.2] tracking-[-0.015em] lg:text-[26px]">{ENOUGH.title}</h2>
              <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-ink-2)]">{ENOUGH.body}</p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {ENOUGH.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[14.5px] leading-[1.5]">
                    <span className="mt-[8px] h-[5px] w-[5px] flex-none rounded-full bg-[var(--color-ink)]" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="synq-card flex flex-col p-6 lg:p-8">
              <h2 className="text-[22px] font-[650] leading-[1.2] tracking-[-0.015em] lg:text-[26px]">{BRING.title}</h2>
              <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-ink-2)]">{BRING.body}</p>
              <p className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-green-bg)] px-3 py-1 text-[12px] font-semibold text-[var(--color-green)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-green)]" aria-hidden="true" />
                No duplicates
              </p>
            </div>
          </div>
        </Section>
      </section>

      <ClosingBand
        title="Leave the price lookups to Synq."
        body="Install Synq from the Shopify App Store. Paid plans start with 7 days free, and under 100 cards Synq is free."
      />
      <MoreLinks current={COMPARE.slug} />
      <Footer />
    </main>
  );
}
