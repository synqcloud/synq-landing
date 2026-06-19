import { faqs } from "@/lib/faqs";

const BASE_URL = "https://synq.cards";


export function SchemaMarkup() {
  const currentDate = new Date().toISOString().split("T")[0];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization - Required for Google Knowledge Panel
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Synq",
        legalName: "Synq",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${BASE_URL}/#logo`,
          url: `${BASE_URL}/brand/synq-icon.png`,
          contentUrl: `${BASE_URL}/brand/synq-icon.png`,
          width: 512,
          height: 512,
          caption: "Synq Logo",
        },
        image: { "@id": `${BASE_URL}/#logo` },
        description:
          "Synq automates trading card pricing for Shopify stores, syncing with TCGPlayer market data daily.",
        foundingDate: "2024",
        sameAs: ["https://apps.shopify.com/synq-tcg-card-manager"],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          availableLanguage: ["English"],
        },
      },

      // SoftwareApplication - Primary schema for the product
      {
        "@type": "SoftwareApplication",
        "@id": `${BASE_URL}/#software`,
        name: "Synq",
        alternateName: "Synq Card Price Sync",
        description:
          "Shopify app that automatically syncs trading card prices with TCGPlayer market data. Add cards with one click, get daily price updates, and manage condition-based pricing for Magic: The Gathering, Pokemon, and more.",
        url: BASE_URL,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Inventory Management",
        operatingSystem: "Web",
        datePublished: "2024-01-01",
        dateModified: currentDate,
        downloadUrl: "https://apps.shopify.com/synq-tcg-card-manager",
        installUrl: "https://apps.shopify.com/synq-tcg-card-manager",
        permissions: "Shopify store access",
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: "29",
          highPrice: "149",
          offerCount: 3,
          availability: "https://schema.org/InStock",
          seller: { "@id": `${BASE_URL}/#organization` },
          offers: [
            {
              "@type": "Offer",
              name: "Starter",
              price: "29",
              priceCurrency: "USD",
              description: "Up to 2,000 products. 7-day free trial.",
              url: `${BASE_URL}/pricing`,
              availability: "https://schema.org/InStock",
            },
            {
              "@type": "Offer",
              name: "Pro",
              price: "79",
              priceCurrency: "USD",
              description: "Up to 15,000 products, automatic daily repricing. 7-day free trial.",
              url: `${BASE_URL}/pricing`,
              availability: "https://schema.org/InStock",
            },
            {
              "@type": "Offer",
              name: "Scale",
              price: "149",
              priceCurrency: "USD",
              description: "Up to 50,000 products, automatic daily repricing, priority support. 7-day free trial.",
              url: `${BASE_URL}/pricing`,
              availability: "https://schema.org/InStock",
            },
          ],
        },
        featureList: [
          "Automatic daily price sync with market data",
          "TCGPlayer market pricing",
          "One-click card addition with images and descriptions",
          "Condition-based pricing (NM, LP, MP, HP, DMG)",
          "Custom markup percentages and price floors",
          "Bulk price update operations",
          "Daily price-change dashboard with one-click bulk apply",
          "Supports Magic: The Gathering, Pokemon, Pokemon TCG Japan, Disney Lorcana, Yu-Gi-Oh!, One Piece, Flesh and Blood, Riftbound, Sorcery: Contested Realm, Digimon, Grand Archive and Gundam Card Game",
          "Shopify product variant management",
        ],
        screenshot: {
          "@type": "ImageObject",
          url: `${BASE_URL}/brand/synq-eyecatcher-art.png`,
          caption:
            "Synq dashboard showing automated card price sync with market data",
        },
        author: { "@id": `${BASE_URL}/#organization` },
        publisher: { "@id": `${BASE_URL}/#organization` },
      },

      // WebSite - Required for Google Site Names
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Synq",
        alternateName: ["Synq Card Price Sync", "Synq for Shopify"],
        description:
          "Sync your Shopify card prices with TCGPlayer market data automatically.",
        publisher: { "@id": `${BASE_URL}/#organization` },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },

      // WebPage - Homepage
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/#webpage`,
        url: BASE_URL,
        name: "Synq - Automated Card Pricing for Shopify Card Shops",
        description:
          "Keep your Shopify card shop competitive with automated pricing. Synq syncs your card prices with market data daily. Add cards in seconds, update prices in bulk.",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: { "@id": `${BASE_URL}/#software` },
        mainEntity: { "@id": `${BASE_URL}/#software` },
        datePublished: "2024-01-01",
        dateModified: currentDate,
        inLanguage: "en-US",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: BASE_URL,
            },
          ],
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".hero-description", "#faq"],
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${BASE_URL}/brand/synq-eyecatcher-art.png`,
        },
      },

      // FAQPage
      {
        "@type": "FAQPage",
        "@id": `${BASE_URL}/#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
        isPartOf: { "@id": `${BASE_URL}/#webpage` },
      },

      // HowTo - Getting Started
      {
        "@type": "HowTo",
        "@id": `${BASE_URL}/#howto`,
        name: "How to Automate Your Shopify Card Prices",
        description:
          "Get your card shop set up with automated pricing in under 5 minutes",
        totalTime: "PT5M",
        tool: [
          {
            "@type": "HowToTool",
            name: "Shopify store",
          },
        ],
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Install Synq",
            text: "Install Synq from the Shopify App Store and connect it to your store.",
            url: "https://apps.shopify.com/synq-tcg-card-manager",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Add Your Cards",
            text: "Search for cards by name, select conditions, and add them to your store with one click. Images and prices are filled in automatically.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Keep prices current",
            text: "Configure your pricing strategy, then update prices in one click on any plan, or turn on automatic daily repricing on the Pro and Scale plans.",
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
