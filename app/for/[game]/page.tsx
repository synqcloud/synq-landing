import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { GAME_PAGES, getGamePage } from "@/lib/game-pages";

const SHOPIFY_URL = "https://apps.shopify.com/synq-tcg-card-manager";

interface Props {
  params: Promise<{ game: string }>;
}

export function generateStaticParams() {
  return GAME_PAGES.map((g) => ({ game: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game } = await params;
  const g = getGamePage(game);
  if (!g) return {};
  const url = `https://synq.cards/for/${g.slug}`;
  return {
    title: { absolute: g.seoTitle },
    description: g.description,
    keywords: g.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: g.seoTitle,
      description: g.description,
      url,
      siteName: "Synq",
      type: "website",
      images: ["/brand/synq-eyecatcher-art.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: g.seoTitle,
      description: g.description,
      images: ["/brand/synq-eyecatcher-art.png"],
    },
  };
}

export default async function GameLandingPage({ params }: Props) {
  const { game } = await params;
  const g = getGamePage(game);
  if (!g) notFound();

  const url = `https://synq.cards/for/${g.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://synq.cards" },
          { "@type": "ListItem", position: 2, name: g.name, item: url },
        ],
      },
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: g.seoTitle,
        description: g.description,
        about: {
          "@type": "SoftwareApplication",
          name: "Synq",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Shopify",
          url: "https://synq.cards",
        },
        inLanguage: "en",
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: g.faq.map((f) => ({
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
            <div className="flex items-center gap-3 mb-6">
              <Image src={g.logo} alt={g.name} width={40} height={40} className="h-10 w-10 object-contain" />
              <span className="text-xs font-semibold text-subtle uppercase tracking-widest">{g.name}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-[-0.02em] mb-5">
              Sell and price {g.noun} on Shopify
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">{g.intro}</p>

            <div className="flex flex-wrap items-center gap-3 mb-12">
              <a
                href={SHOPIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-80 transition-opacity"
              >
                <Image src="/shopify.svg" alt="" width={13} height={13} className="opacity-90" aria-hidden />
                Install on Shopify
              </a>
              <span className="text-xs text-muted-foreground">7-day free trial</span>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-2">How Synq prices {g.noun}</h2>
                <p className="text-sm text-muted-foreground leading-7">
                  Every price starts from the live TCGplayer market price for that exact card, set and
                  printing. {g.printings} You choose a store strategy, Market price, Market + %, or
                  Market - %, and Synq applies it, then keeps prices current. Learn more in{" "}
                  <Link href="/help/how-synq-prices-your-cards" className="text-primary underline underline-offset-4">how Synq prices your cards</Link>.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-2">Singles and sealed</h2>
                <p className="text-sm text-muted-foreground leading-7">{g.sealed}</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-2">Add {g.noun} in one click</h2>
                <p className="text-sm text-muted-foreground leading-7">
                  {g.exampleSets} Pick the printing and conditions, and Synq creates the Shopify product
                  for you, priced from market data. See{" "}
                  <Link href="/help/adding-products-to-your-store" className="text-primary underline underline-offset-4">adding products</Link>.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-2">Keep prices current</h2>
                <p className="text-sm text-muted-foreground leading-7">
                  Re-price everything in one click with Sync all prices on any plan, or turn on
                  automatic daily repricing on Pro and Scale. See{" "}
                  <Link href="/pricing" className="text-primary underline underline-offset-4">plans and pricing</Link>.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-4">Frequently asked questions</h2>
                <dl className="space-y-5">
                  {g.faq.map((f) => (
                    <div key={f.question}>
                      <dt className="text-sm font-semibold text-foreground mb-1">{f.question}</dt>
                      <dd className="text-sm text-muted-foreground leading-7">{f.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>

            <div className="mt-12 p-5 bg-card rounded-xl border border-border">
              <p className="text-sm font-medium text-foreground mb-1">Ready to sell {g.noun} on Shopify?</p>
              <p className="text-sm text-muted-foreground mb-4">
                Install Synq and price your catalog from TCGplayer market data.
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
