import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const SHOPIFY_URL = "https://apps.shopify.com/synq-tcg-card-manager";
const URL = "https://synq.cards/synq-vs-spreadsheets";

export const metadata: Metadata = {
  title: { absolute: "Synq vs spreadsheets for card pricing on Shopify" },
  description:
    "Pricing trading cards in a spreadsheet means manual TCGplayer lookups and no write-back to Shopify. See how Synq compares for pricing, conditions and keeping prices current.",
  keywords: [
    "card inventory spreadsheet vs app",
    "stop pricing cards in a spreadsheet",
    "shopify card pricing spreadsheet",
    "synq vs spreadsheet",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "Synq vs spreadsheets",
    description:
      "How Synq compares to pricing trading cards in a spreadsheet for a Shopify store.",
    url: URL,
    siteName: "Synq",
    type: "website",
    images: ["/brand/synq-eyecatcher-art.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Synq vs spreadsheets",
    description:
      "How Synq compares to pricing trading cards in a spreadsheet for a Shopify store.",
    images: ["/brand/synq-eyecatcher-art.png"],
  },
};

const rows = [
  ["Get market prices", "Look up each card on TCGplayer by hand", "Priced from TCGplayer market data"],
  ["Write prices to Shopify", "Copy and paste each price into Shopify", "Synq writes prices to Shopify for you"],
  ["Conditions", "Track NM/LP/MP/HP/DMG in extra columns", "Each condition is its own Shopify variant"],
  ["Keeping prices current", "Re-check and re-enter manually", "One-click Sync all prices, or automatic daily repricing on Pro and Scale"],
  ["Creating products", "Type titles, find images, set variants", "One-click creation from a built-in catalog"],
  ["Errors", "Easy to mistype a price or paste the wrong cell", "Consistent rules applied every time"],
];

export default function SynqVsSpreadsheetsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://synq.cards" },
          { "@type": "ListItem", position: 2, name: "Synq vs spreadsheets", item: URL },
        ],
      },
      {
        "@type": "WebPage",
        "@id": URL,
        url: URL,
        name: "Synq vs spreadsheets for card pricing on Shopify",
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
            <span className="inline-block text-xs font-semibold text-subtle uppercase tracking-widest mb-3">Comparison</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-[-0.02em] mb-5">
              Synq vs spreadsheets
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed mb-10">
              A spreadsheet is a fine place to start, but it does not write prices back to your Shopify
              store, and every market move means manual lookups and re-entry. Synq does the pricing and
              the listing for you. Here is how the two compare for a Shopify card shop.
            </p>

            <div className="overflow-x-auto rounded-xl border border-border mb-10">
              <table className="w-full text-sm">
                <thead className="bg-muted/60 text-left">
                  <tr>
                    <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Task</th>
                    <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Spreadsheet</th>
                    <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Synq</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r[0]} className="border-t border-border">
                      <td className="px-4 py-2.5 text-foreground font-medium">{r[0]}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{r[1]}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-2">When a spreadsheet is enough</h2>
              <p className="text-sm text-muted-foreground leading-7">
                If you list only a handful of cards and rarely reprice, a spreadsheet works. The pain
                shows up as your catalog grows, because the work scales with the number of cards and the
                pace of the market.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-2">Where Synq helps</h2>
              <p className="text-sm text-muted-foreground leading-7">
                Synq prices from TCGplayer market data, writes prices straight to Shopify, handles a
                variant per condition, and keeps prices current with a one-click sync or automatic daily
                repricing. See{" "}
                <Link href="/how-it-works" className="text-primary underline underline-offset-4">how Synq works</Link>{" "}
                and{" "}
                <Link href="/help/how-synq-prices-your-cards" className="text-primary underline underline-offset-4">how it prices your cards</Link>.
              </p>
            </section>

            <div className="p-5 bg-card rounded-xl border border-border">
              <p className="text-sm font-medium text-foreground mb-1">Ready to leave the spreadsheet behind?</p>
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
