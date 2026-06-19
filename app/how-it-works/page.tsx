import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const SHOPIFY_URL = "https://apps.shopify.com/synq-tcg-card-manager";
const URL = "https://synq.cards/how-it-works";

export const metadata: Metadata = {
  title: { absolute: "How Synq works: automated card pricing for Shopify" },
  description:
    "How Synq works: add cards from a built-in catalog, Synq creates the Shopify products priced from TCGplayer market data, and keeps prices current automatically or in one click.",
  keywords: [
    "how does synq work",
    "automate shopify card pricing",
    "tcgplayer shopify pricing",
    "synq how it works",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "How Synq works",
    description:
      "Add cards from a catalog, Synq creates the Shopify products priced from TCGplayer market data, and keeps prices current.",
    url: URL,
    siteName: "Synq",
    type: "website",
    images: ["/brand/synq-eyecatcher-art.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Synq works",
    description:
      "Add cards from a catalog, Synq creates the Shopify products priced from TCGplayer market data, and keeps prices current.",
    images: ["/brand/synq-eyecatcher-art.png"],
  },
};

const steps = [
  {
    n: "1",
    title: "Install and pick your games",
    body: "Install Synq from the Shopify App Store and choose the trading card games you sell. Every plan starts with a 7-day free trial.",
  },
  {
    n: "2",
    title: "Set up your template and pricing",
    body: "Set up a product template first, because every product Synq creates is built from it (title, description, and optional fields like category, SKU and barcode). Then choose a store strategy (Market price, Market + %, or Market - %), set a discount for each condition, and optionally add floor, ceiling and rounding rules for the whole store.",
  },
  {
    n: "3",
    title: "Add cards from the catalog",
    body: "Search Synq's built-in catalog by name, set or collector number, pick the printing and conditions, and Synq creates the Shopify product for you from your template, priced from TCGplayer market data. Synq only manages products it creates; it never scans or remaps your existing listings.",
  },
  {
    n: "4",
    title: "Keep prices current",
    body: "Re-price your whole store in one click with Sync all prices on any plan, or turn on automatic daily repricing at an hour you choose on Pro and Scale.",
  },
];

export default function HowItWorksPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://synq.cards" },
          { "@type": "ListItem", position: 2, name: "How it works", item: URL },
        ],
      },
      {
        "@type": "WebPage",
        "@id": URL,
        url: URL,
        name: "How Synq works",
        description: metadata.description as string,
        about: {
          "@type": "SoftwareApplication",
          name: "Synq",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Shopify",
          url: "https://synq.cards",
        },
        inLanguage: "en",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main className="pt-20">
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-6">
            <span className="inline-block text-xs font-semibold text-subtle uppercase tracking-widest mb-3">How it works</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-[-0.02em] mb-5">
              How Synq works
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed mb-10">
              Synq is a Shopify app for trading card sellers. You add cards from a built-in catalog,
              Synq creates the Shopify products priced from TCGplayer market data, and then keeps those
              prices current. You do not need a TCGplayer account.
            </p>

            <ol className="space-y-6 mb-12">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center">
                    {s.n}
                  </span>
                  <div>
                    <h2 className="text-base font-semibold text-foreground mb-1">{s.title}</h2>
                    <p className="text-sm text-muted-foreground leading-7">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <section className="mb-10">
              <h2 className="text-lg font-semibold text-foreground mb-2">How Synq works out a price</h2>
              <p className="text-sm text-muted-foreground leading-7 mb-3">
                Synq works out every price step by step:
              </p>
              <ol className="ml-5 list-decimal space-y-1.5 text-sm text-muted-foreground">
                <li>Start from the TCGplayer market price and apply your strategy.</li>
                <li>Apply a discount for each condition (NM, LP, MP, HP, DMG).</li>
                <li>Convert to your store&apos;s currency.</li>
                <li>Keep it between your floor and ceiling, if set.</li>
                <li>Round it up to a clean ending, if set.</li>
              </ol>
              <p className="text-sm text-muted-foreground leading-7 mt-3">
                Floor, ceiling and rounding are off by default. Learn more in{" "}
                <Link href="/help/price-rules" className="text-primary underline underline-offset-4">price rules</Link>.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-lg font-semibold text-foreground mb-2">What Synq does not touch</h2>
              <p className="text-sm text-muted-foreground leading-7">
                The price sync updates the price only. It never changes your stock, titles,
                descriptions or images, so any manual edit you make is preserved. See{" "}
                <Link href="/help/what-synq-writes-to-shopify" className="text-primary underline underline-offset-4">what Synq writes to Shopify</Link>.
              </p>
            </section>

            <div className="p-5 bg-card rounded-xl border border-border">
              <p className="text-sm font-medium text-foreground mb-1">Ready to try it?</p>
              <p className="text-sm text-muted-foreground mb-4">Every plan starts with a 7-day free trial.</p>
              <a
                href={SHOPIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-80 transition-opacity"
              >
                <Image src="/shopify.svg" alt="" width={13} height={13} className="opacity-90" aria-hidden />
                Install on Shopify
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
