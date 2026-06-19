import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { faqs } from "@/lib/faqs";

const SHOPIFY_URL = "https://apps.shopify.com/synq-tcg-card-manager";
const URL = "https://synq.cards/faq";

export const metadata: Metadata = {
  title: { absolute: "Synq FAQ: trading card pricing on Shopify" },
  description:
    "Answers to common questions about Synq: supported games, automatic price syncing, custom prices, conditions, plans, and whether Synq touches your existing products.",
  keywords: [
    "synq faq",
    "synq questions",
    "does synq change my shopify products",
    "do i need a tcgplayer account",
    "shopify card pricing faq",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "Synq FAQ",
    description: "Common questions about Synq, the Shopify app for trading card pricing.",
    url: URL,
    siteName: "Synq",
    type: "website",
    images: ["/brand/synq-eyecatcher-art.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Synq FAQ",
    description: "Common questions about Synq, the Shopify app for trading card pricing.",
    images: ["/brand/synq-eyecatcher-art.png"],
  },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://synq.cards" },
          { "@type": "ListItem", position: 2, name: "FAQ", item: URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${URL}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
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
            <span className="inline-block text-xs font-semibold text-subtle uppercase tracking-widest mb-3">FAQ</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-[-0.02em] mb-8">
              Frequently asked questions
            </h1>

            <dl className="border-t border-border">
              {faqs.map((f) => (
                <div key={f.question} className="border-b border-border py-5">
                  <dt className="text-sm font-semibold text-foreground mb-1.5">{f.question}</dt>
                  <dd className="text-sm text-muted-foreground leading-7">{f.answer}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 p-5 bg-card rounded-xl border border-border">
              <p className="text-sm font-medium text-foreground mb-1">Still have questions?</p>
              <p className="text-sm text-muted-foreground mb-4">
                Browse the <a href="/help" className="text-primary underline underline-offset-4">help center</a> or install Synq and try it free for 7 days.
              </p>
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
