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
      "Synq supports 19 games: Magic: The Gathering, Pokémon, Pokémon TCG Japan, Disney Lorcana, Yu-Gi-Oh!, One Piece, Flesh and Blood, Riftbound, Sorcery: Contested Realm, Digimon, Gundam Card Game, Union Arena, UniVersus, Grand Archive, Final Fantasy TCG, Weiss Schwarz, Star Wars Unlimited, Elestrals, and Dragon Ball Super: Fusion World, all with TCGplayer market pricing. We add games by demand, so let us know what you need.",
  },
  {
    question: "How does automatic repricing work?",
    answer:
      "You create price rules: which products they cover (game, set, rarity, printing, condition) and how to price them from TCGplayer market data. Preview every price that would change, then schedule the rule to run daily or on the days you choose, at an hour in your store's timezone. Scheduling is available on every plan.",
  },
  {
    question: "Can I use my own prices instead of market prices?",
    answer:
      "Yes, you are always in control. Each rule prices at market plus or minus a percentage or a dollar amount, with an optional minimum (a fixed amount or based on your cost) and rounding to .49, .99 or .00. Any product can have its own formula or minimum, or be excluded from rules entirely.",
  },
  {
    question: "How does condition-based pricing work?",
    answer:
      "When you add a card, Synq creates a Shopify variant for each condition you stock (NM, LP, MP, HP, DMG), each with its own price and stock. A price rule can price each condition from its own TCGplayer market price, or from Near Mint minus a percentage you set per condition.",
  },
  {
    question: "Can Synq work with the products already in my store?",
    answer:
      "Yes. You can link existing Shopify products to Synq's catalog, or import your inventory from a CSV, an Excel file or a TCGplayer export and review every match before anything is created. Synq only reprices products that are linked to it.",
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
