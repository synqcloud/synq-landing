import { Metadata } from "next";
import { Suspense } from "react";
import { getAllDocs, groupDocsByCategory } from "@/lib/docs";
import { TicketButton } from "@/components/help/ticket-button";
import { Portal } from "@/components/help/portal";
import { CommunityPosts } from "@/components/help/community-posts";
import { SearchBox } from "@/components/help/search-box";

export const metadata: Metadata = {
  title: {
    absolute: "Synq Help Center: Knowledge Base, Support and Community",
  },
  description:
    "Find answers, guides, and support for Synq. The Shopify app for TCGPlayer card price syncing. Browse the knowledge base or ask the community.",
  keywords: [
    "synq help",
    "synq support",
    "synq knowledge base",
    "synq help center",
    "synq docs",
    "shopify card price sync help",
    "tcgplayer shopify integration support",
    "synq community",
    "synq discussions",
  ],
  alternates: { canonical: "https://synq.cards/help" },
  openGraph: {
    title: "Synq Help Center: Knowledge Base, Support and Community",
    description:
      "Find answers, guides, and support for Synq. The Shopify app for TCGPlayer card price syncing.",
    url: "https://synq.cards/help",
    siteName: "Synq",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Synq Help Center: Knowledge Base, Support and Community",
    description:
      "Find answers, guides, and support for Synq. The Shopify app for TCGPlayer card price syncing.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://synq.cards",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Help Center",
          "item": "https://synq.cards/help",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://synq.cards/help",
      "url": "https://synq.cards/help",
      "name": "Synq Help Center: Knowledge Base, Support and Community",
      "description":
        "Find answers, guides, and support for Synq. The Shopify app for TCGPlayer card price syncing. Browse the knowledge base or ask the community.",
      "isPartOf": { "@id": "https://synq.cards/#website" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://synq.cards/help?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function SupportPage() {
  const docs = getAllDocs();
  const grouped = groupDocsByCategory(docs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-muted">
        {/* Hero */}
        <div className="bg-background border-b">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <h1 className="text-2xl font-bold text-primary mb-4">
              How can we help you today?
            </h1>

            <div className="mb-4">
              <SearchBox />
            </div>

            <div className="flex items-center gap-6">
              <TicketButton />
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8">
          <Suspense>
            <Portal grouped={grouped} communitySlot={<CommunityPosts />} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
