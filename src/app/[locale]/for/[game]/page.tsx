import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SeoHero from "@/components/seo/SeoHero";
import CardFan from "@/components/seo/CardFan";
import GameFeatures from "@/components/seo/GameFeatures";
import SeoFaq from "@/components/seo/SeoFaq";
import ClosingBand from "@/components/seo/ClosingBand";
import MoreLinks from "@/components/seo/MoreLinks";
import GameGuide from "@/components/seo/game/GameGuide";
import GameMark from "@/components/seo/game/GameMark";
import { JsonLd, softwareApp } from "@/components/seo/ui";
import "@/components/seo/seo.css";
import { GAMES, SITE, getGame } from "@/content/games";
import { pageMetadata } from "@/lib/seo";

/* English only: these pages keep the old site's indexed slugs */
export const dynamicParams = false;

type Props = { params: Promise<{ locale: string; game: string }> };

export function generateStaticParams() {
  return GAMES.map((g) => ({ locale: "en", game: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, game } = await params;
  const g = getGame(game);
  if (locale !== "en" || !g) return {};
  return {
    ...pageMetadata({
      locale,
      path: `/for/${g.slug}`,
      title: g.seoTitle,
      absoluteTitle: true,
      description: g.description,
      images: [{ url: `/og/for/${g.slug}`, width: 1200, height: 630, alt: g.h1 }],
    }),
    keywords: g.keywords,
  };
}

export default async function GamePage({ params }: Props) {
  const { locale, game } = await params;
  const g = getGame(game);
  if (locale !== "en" || !g) notFound();
  setRequestLocale(locale);

  const url = `${SITE}/for/${g.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: g.name, item: url },
        ],
      },
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: g.seoTitle,
        description: g.description,
        about: softwareApp,
        inLanguage: "en",
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: g.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main className="relative bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <JsonLd data={jsonLd} />
      <Navbar />
      <SeoHero
        eyebrow={`Synq for ${g.name}`}
        icon={g.icon}
        title={g.h1}
        intro={g.intro}
        secondary={{ href: "/#pricing", label: "See plans" }}
        aside={
          g.art.items.length > 0 ? <CardFan kind={g.art.kind} items={g.art.items} /> : <GameMark game={g} />
        }
      />
      <GameFeatures game={g} />
      <GameGuide game={g} />
      <SeoFaq
        title={`${g.name} questions, answered.`}
        body={`Plain answers about selling ${g.noun} on Shopify with Synq.`}
        items={g.faq}
      />
      <ClosingBand
        title={`Your ${g.noun}, for sale and priced.`}
        body="Install Synq from the Shopify App Store. Paid plans start with 7 days free, and under 100 cards Synq is free."
      />
      <MoreLinks current={g.slug} />
      <Footer />
    </main>
  );
}
