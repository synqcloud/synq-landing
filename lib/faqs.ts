export interface Faq {
  question: string;
  answer: string;
}

// Single source of truth for the homepage FAQ. Rendered visibly by
// components/faq-section.tsx AND emitted as FAQPage JSON-LD by
// components/schema-markup.tsx, so the structured data always matches the
// visible content (a Google requirement).
export const faqs: Faq[] = [
  {
    question: "Which trading card games are supported?",
    answer:
      "Synq supports Magic: The Gathering, Pokémon, Pokémon TCG Japan, Disney Lorcana, Yu-Gi-Oh!, One Piece, Flesh and Blood, Riftbound, Sorcery: Contested Realm, Digimon, Grand Archive, and the Gundam Card Game, all with TCGPlayer market pricing. We add games by demand, so let us know what you need.",
  },
  {
    question: "How does automatic price syncing work?",
    answer:
      "Synq checks TCGPlayer market prices once a day. Your dashboard shows which listings have drifted from the market, and you can apply updates with one click on any plan. On the Pro and Scale plans, Synq can apply them automatically at an hour you choose.",
  },
  {
    question: "Can I use my own prices instead of market prices?",
    answer:
      "Yes, you are always in control. Price at market, at market plus a percentage, or at market minus a percentage, set a specific price for any listing when you add it, or add store-wide floor and ceiling rules to protect your margins.",
  },
  {
    question: "How does condition-based pricing work?",
    answer:
      "When you add a card, Synq creates a Shopify variant for each condition you stock (NM, LP, MP, HP, DMG), each with its own price and stock. Each condition uses a sensible default percentage adjustment that you can change in settings.",
  },
  {
    question: "Does Synq change my existing Shopify products?",
    answer:
      "No. Synq only manages products you create through the app, and it does not scan, import, or remap your existing listings. To have Synq manage an existing product, recreate it through the app.",
  },
  {
    question: "How many cards can I manage?",
    answer:
      "Starter handles up to 2,000 cards, Pro up to 15,000, and Scale up to 50,000. Every plan starts with a 7-day free trial so you can see the value before you commit.",
  },
  {
    question: "Can I use it across multiple stores?",
    answer:
      "Yes. Each Shopify store gets its own Synq installation with independent settings, which is great if you run separate stores for different games or regions.",
  },
  {
    question: "What if I want to cancel?",
    answer:
      "Cancel any time from your Shopify admin under Apps, then Synq. Your products stay in Shopify and price syncing simply stops. There are no cancellation fees.",
  },
];
