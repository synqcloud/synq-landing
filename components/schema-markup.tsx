const BASE_URL = "https://synq.cards";

// FAQ data matching the actual FAQ section
const FAQ_DATA = [
  {
    question: "What trading card games are supported?",
    answer:
      "Currently, Synq fully supports Magic: The Gathering, Disney Lorcana, and Riftbound with price data from TCGPlayer (US). EU / Cardmarket support is on the roadmap. Pokemon, Yu-Gi-Oh, and other games are coming soon.",
  },
  {
    question: "How does price syncing work?",
    answer:
      "Synq pulls the latest market prices every 24 hours from TCGPlayer. When prices change, you'll see which products need updates on your dashboard and can apply new prices with one click.",
  },
  {
    question: "Can I set my own prices instead of using market prices?",
    answer:
      "Yes. You can set custom prices for any card at any time. You can also configure a markup percentage (e.g., market price + 10%) or set minimum and maximum price limits to protect your margins.",
  },
  {
    question: "How do condition-based prices work?",
    answer:
      "When you add a card, Synq creates a Shopify variant for each condition you select (NM, LP, MP, HP, DMG). Each condition has a price adjustment based on market standards (e.g., LP is typically 10% below NM). You can customize these percentages in settings.",
  },
  {
    question: "What happens to my existing Shopify products?",
    answer:
      "Synq only manages products you create through the app. Your existing products are not affected. If you want Synq to manage an existing product, you would need to recreate it through the app.",
  },
  {
    question: "Can I use Synq with multiple Shopify stores?",
    answer:
      "Each Shopify store needs its own Synq installation. You can install Synq on multiple stores, and each store can have its own settings (different regions, templates, pricing strategies).",
  },
  {
    question: "Is there a limit to how many cards I can add?",
    answer:
      "It depends on your plan. Starter supports up to 2,000 cards, Pro up to 15,000, and Scale up to 50,000. All plans include a 7-day free trial so you can try before you commit.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel anytime from your Shopify admin under Apps > Synq. Your products remain in Shopify, but price syncing will stop. There are no cancellation fees.",
  },
];


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
        softwareVersion: "2.0",
        datePublished: "2024-01-01",
        dateModified: currentDate,
        downloadUrl: "https://apps.shopify.com/synq-tcg-card-manager",
        installUrl: "https://apps.shopify.com/synq-tcg-card-manager",
        permissions: "Shopify store access",
        offers: {
          "@type": "Offer",
          description: "Available on the Shopify App Store. 7-day free trial.",
          availability: "https://schema.org/PreOrder",
          seller: { "@id": `${BASE_URL}/#organization` },
        },
        featureList: [
          "Automatic daily price sync with market data",
          "TCGPlayer integration for US pricing",
          "EU / Cardmarket pricing (coming soon)",
          "Support for additional price sources",
          "One-click card addition with images and descriptions",
          "Condition-based pricing (NM, LP, MP, HP, DMG)",
          "Custom markup percentages and price floors",
          "Bulk price update operations",
          "Real-time price change dashboard",
          "Magic: The Gathering full support",
          "Disney Lorcana full support",
          "Riftbound full support",
          "Pokemon and Yu-Gi-Oh support coming soon",
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
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          ratingCount: "1",
          bestRating: "5",
          worstRating: "1",
        },
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
        mainEntity: FAQ_DATA.map((faq) => ({
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
            name: "Enable Price Sync",
            text: "Configure your pricing strategy and let Synq update your prices automatically every 24 hours based on TCGPlayer market data.",
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
