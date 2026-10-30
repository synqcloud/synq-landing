import { getTranslations } from "next-intl/server";
import { JsonLd } from "./ui";
import { PLANS, TRIAL_DAYS } from "@/content/plans";
import {
  CONTENT_UPDATED,
  OG_IMAGE,
  SHOPIFY_APP_URL,
  SITE_NAME,
  SITE_URL,
  SUPPORT_EMAIL,
  absoluteUrl,
  localePath,
} from "@/lib/site";

/* The home's structured data, one @graph: who makes Synq (Organization), the
   app and its plans (SoftwareApplication), the site (WebSite), this page
   (WebPage) and the questions answered on it (FAQPage).
   - No aggregateRating: the App Store rating isn't shown on the page, and
     Google requires ratings in markup to be visible to visitors.
   - No HowTo: Google retired HowTo rich results, and the steps on the page
     are an animated story, not a list of instructions.
   - No SearchAction: the site has no search results page. */

export const ORG_ID = `${SITE_URL}/#organization`;
export const SOFTWARE_ID = `${SITE_URL}/#software`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const fmt = (n: number) => n.toLocaleString("en-US");

export default async function SiteSchema({ locale }: { locale: string }) {
  const meta = await getTranslations({ locale, namespace: "meta" });
  const faq = await getTranslations({ locale, namespace: "landing.faq" });
  const items = faq.raw("items") as { q: string; a: string }[];
  const url = absoluteUrl(localePath(locale, "/"));
  const pricingUrl = absoluteUrl(localePath(locale, "/#pricing"));

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          url: `${SITE_URL}/brand/synq-icon.png`,
          contentUrl: `${SITE_URL}/brand/synq-icon.png`,
          width: 512,
          height: 512,
          caption: "Synq",
        },
        image: { "@id": `${SITE_URL}/#logo` },
        description:
          "Synq makes the Shopify app for trading card shops: add singles and sealed from a catalog or a spreadsheet, and keep prices in step with TCGplayer market data with scheduled price rules.",
        foundingDate: "2024",
        sameAs: [SHOPIFY_APP_URL],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: SUPPORT_EMAIL,
          availableLanguage: ["English"],
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": SOFTWARE_ID,
        name: SITE_NAME,
        description:
          "Shopify app for trading card stores. Add singles, sealed product and decks from a catalog or a spreadsheet, sell each condition as its own variant, and keep prices in step with TCGplayer market data using scheduled price rules, minimums and rounding. Supports 19 games including Magic: The Gathering, Pokémon and Lorcana.",
        url: SITE_URL,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Inventory management",
        operatingSystem: "Shopify",
        dateModified: CONTENT_UPDATED,
        installUrl: SHOPIFY_APP_URL,
        downloadUrl: SHOPIFY_APP_URL,
        screenshot: `${SITE_URL}${OG_IMAGE.url}`,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: "0",
          highPrice: String(Math.max(...PLANS.map((p) => p.monthly))),
          offerCount: PLANS.length,
          offers: PLANS.map((p) => ({
            "@type": "Offer",
            name: p.name,
            price: String(p.monthly),
            priceCurrency: "USD",
            ...(p.monthly > 0
              ? {
                  priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: String(p.monthly),
                    priceCurrency: "USD",
                    billingDuration: "P1M",
                    unitCode: "MON",
                  },
                }
              : {}),
            description:
              p.monthly > 0
                ? `Up to ${fmt(p.cards)} cards. ${TRIAL_DAYS}-day free trial. Billed monthly through Shopify.`
                : `Up to ${fmt(p.cards)} cards, free.`,
            url: pricingUrl,
            availability: "https://schema.org/InStock",
          })),
        },
        featureList: [
          "Add singles, sealed product and decks from a built-in catalog",
          "Each condition (NM, LP, MP, HP, DMG) as its own Shopify variant with its own price and stock",
          "Price rules by game, set, rarity, printing and condition from TCGplayer market data",
          "Scheduled daily repricing, with a preview of every change",
          "Minimums based on cost, and rounding",
          "Import inventory from a spreadsheet or a TCGplayer export",
          "Link existing Shopify products",
          "Bulk inventory editing",
          "Barcodes for Shopify POS",
          "19 games, including Magic: The Gathering, Pokémon, Disney Lorcana, Yu-Gi-Oh!, One Piece and Riftbound",
        ],
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: ["Synq for Shopify", "synq.cards"],
        publisher: { "@id": ORG_ID },
        inLanguage: ["en", "es", "ca", "fr", "de", "pt", "ja", "ko", "it", "eu"],
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: meta("title"),
        description: meta("description"),
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": SOFTWARE_ID },
        primaryImageOfPage: `${SITE_URL}/opengraph-image`,
        dateModified: CONTENT_UPDATED,
        inLanguage: locale,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: locale,
        mainEntity: items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return <JsonLd data={data} />;
}
