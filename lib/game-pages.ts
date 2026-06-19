export interface GamePage {
  slug: string;
  name: string;
  logo: string;
  /** Short marketing label, e.g. "Pokémon cards" */
  noun: string;
  seoTitle: string;
  description: string;
  keywords: string[];
  /** Answer-first intro paragraph. */
  intro: string;
  /** Example recent sets, woven into the "add" section. */
  exampleSets: string;
  /** Game-specific sealed product types. */
  sealed: string;
  /** A printing/edition note unique to this game. */
  printings: string;
  faq: { question: string; answer: string }[];
}

export const GAME_PAGES: GamePage[] = [
  {
    slug: "pokemon",
    name: "Pokémon",
    logo: "/games/pokemon.png",
    noun: "Pokémon cards",
    seoTitle: "Sell and price Pokémon cards on Shopify with Synq",
    description:
      "Price your Pokémon singles and sealed product from TCGplayer market data and list them on Shopify in one click. Synq keeps prices current automatically.",
    keywords: [
      "sell pokemon cards on shopify",
      "pokemon card pricing shopify",
      "pokemon tcg shopify app",
      "price pokemon singles online",
      "pokemon sealed shopify",
    ],
    intro:
      "Synq prices your Pokémon singles and sealed product from live TCGplayer market data and creates the Shopify products for you. You add a card from the catalog, Synq sets a price for every condition, and from then on it keeps those prices current. No spreadsheets, and no TCGplayer account required.",
    exampleSets:
      "Search by set or collector number across modern sets like Surging Sparks, Prismatic Evolutions and 151, or older sets you carry.",
    sealed:
      "Sealed Pokémon product, like Elite Trainer Boxes, booster boxes and booster bundles, is listed as a single Unopened unit and can carry the box barcode (UPC/GTIN) from the catalog, which helps with Google Shopping.",
    printings:
      "Each printing, for example Normal, Holofoil and Reverse Holofoil, is priced separately, and each condition (NM, LP, MP, HP, DMG) is its own Shopify variant.",
    faq: [
      {
        question: "Do I need a TCGplayer account to sell Pokémon cards with Synq?",
        answer:
          "No. Synq provides the Pokémon market data for you. You only need your Shopify store.",
      },
      {
        question: "Can I sell sealed Pokémon product as well as singles?",
        answer:
          "Yes. Sealed product like Elite Trainer Boxes and booster boxes is listed as a single Unopened unit, separate from singles, and can carry its UPC/GTIN barcode.",
      },
    ],
  },
  {
    slug: "magic-the-gathering",
    name: "Magic: The Gathering",
    logo: "/games/mtg.png",
    noun: "Magic cards",
    seoTitle: "Sell and price Magic: The Gathering cards on Shopify with Synq",
    description:
      "Price your Magic: The Gathering singles and sealed product from TCGplayer market data and list them on Shopify in one click. Synq keeps prices current automatically.",
    keywords: [
      "sell magic the gathering cards shopify",
      "mtg card pricing shopify",
      "mtg singles shopify app",
      "price magic cards online",
      "mtg sealed shopify",
    ],
    intro:
      "Synq prices your Magic: The Gathering singles and sealed product from live TCGplayer market data and creates the Shopify products for you. Add a card from the catalog, Synq prices every condition, and it keeps those prices current over time. No spreadsheets, and no TCGplayer account required.",
    exampleSets:
      "Search by set or collector number across sets like Foundations, Bloomburrow and Modern Horizons 3, or any set in your inventory.",
    sealed:
      "Sealed Magic product, like Play and Collector Booster boxes, bundles and Commander decks, is listed as a single Unopened unit and can carry its barcode (UPC/GTIN) for Google Shopping.",
    printings:
      "Foil and nonfoil printings are priced separately, and each condition (NM, LP, MP, HP, DMG) is its own Shopify variant.",
    faq: [
      {
        question: "Does Synq handle foil and nonfoil Magic cards separately?",
        answer:
          "Yes. Each printing is priced on its own from market data, and each condition is a separate Shopify variant with its own price and stock.",
      },
      {
        question: "Can I list sealed Magic product like booster boxes?",
        answer:
          "Yes. Sealed product is listed as a single Unopened unit, separate from singles, and can carry its UPC/GTIN barcode.",
      },
    ],
  },
  {
    slug: "yu-gi-oh",
    name: "Yu-Gi-Oh!",
    logo: "/games/yugioh.png",
    noun: "Yu-Gi-Oh! cards",
    seoTitle: "Sell and price Yu-Gi-Oh! cards on Shopify with Synq",
    description:
      "Price your Yu-Gi-Oh! singles and sealed product from TCGplayer market data and list them on Shopify in one click. Synq keeps prices current automatically.",
    keywords: [
      "sell yugioh cards shopify",
      "yu-gi-oh card pricing shopify",
      "yugioh singles shopify app",
      "price yugioh cards online",
      "1st edition unlimited yugioh pricing",
    ],
    intro:
      "Synq prices your Yu-Gi-Oh! singles and sealed product from live TCGplayer market data and creates the Shopify products for you. Add a card from the catalog, Synq prices every condition, and it keeps those prices current. No spreadsheets, and no TCGplayer account required.",
    exampleSets:
      "Search by set or collector number across sets like 25th Anniversary releases and Maze of Millennia, or any set you stock.",
    sealed:
      "Sealed Yu-Gi-Oh! product, like booster boxes, structure decks and collector tins, is listed as a single Unopened unit and can carry its barcode (UPC/GTIN) for Google Shopping.",
    printings:
      "Printings such as 1st Edition and Unlimited are priced separately, and each condition (NM, LP, MP, HP, DMG) is its own Shopify variant, so a 1st Edition copy and an Unlimited copy stay correctly priced.",
    faq: [
      {
        question: "Does Synq price 1st Edition and Unlimited Yu-Gi-Oh! cards separately?",
        answer:
          "Yes. Each printing is priced on its own from market data, so 1st Edition and Unlimited copies of the same card get their own prices, and each condition is its own variant.",
      },
      {
        question: "Do I need a TCGplayer account?",
        answer: "No. Synq provides the market data for you. You only need your Shopify store.",
      },
    ],
  },
  {
    slug: "disney-lorcana",
    name: "Disney Lorcana",
    logo: "/games/lorcana.png",
    noun: "Disney Lorcana cards",
    seoTitle: "Sell and price Disney Lorcana cards on Shopify with Synq",
    description:
      "Price your Disney Lorcana singles and sealed product from TCGplayer market data and list them on Shopify in one click. Synq keeps prices current automatically.",
    keywords: [
      "sell disney lorcana cards shopify",
      "lorcana card pricing shopify",
      "lorcana singles shopify app",
      "price lorcana cards online",
      "lorcana sealed shopify",
    ],
    intro:
      "Synq prices your Disney Lorcana singles and sealed product from live TCGplayer market data and creates the Shopify products for you. Add a card from the catalog, Synq prices every condition, and it keeps those prices current. No spreadsheets, and no TCGplayer account required.",
    exampleSets:
      "Search by set or collector number across sets like Azurite Sea and Shimmering Skies, or any set you carry.",
    sealed:
      "Sealed Lorcana product, like booster boxes, gift sets and Illumineer's Troves, is listed as a single Unopened unit and can carry its barcode (UPC/GTIN) for Google Shopping.",
    printings:
      "Foil and nonfoil printings are priced separately, and each condition (NM, LP, MP, HP, DMG) is its own Shopify variant.",
    faq: [
      {
        question: "Can I sell both Lorcana singles and sealed product?",
        answer:
          "Yes. Singles are listed per condition, and sealed product is a single Unopened unit, each priced from market data.",
      },
      {
        question: "Do I need a TCGplayer account?",
        answer: "No. Synq provides the market data for you. You only need your Shopify store.",
      },
    ],
  },
  {
    slug: "one-piece",
    name: "One Piece Card Game",
    logo: "/games/onepiece.png",
    noun: "One Piece cards",
    seoTitle: "Sell and price One Piece Card Game cards on Shopify with Synq",
    description:
      "Price your One Piece Card Game singles and sealed product from TCGplayer market data and list them on Shopify in one click. Synq keeps prices current automatically.",
    keywords: [
      "sell one piece cards shopify",
      "one piece card game pricing shopify",
      "one piece singles shopify app",
      "price one piece cards online",
      "one piece sealed shopify",
    ],
    intro:
      "Synq prices your One Piece Card Game singles and sealed product from live TCGplayer market data and creates the Shopify products for you. Add a card from the catalog, Synq prices every condition, and it keeps those prices current. No spreadsheets, and no TCGplayer account required.",
    exampleSets:
      "Search by set or collector number across the latest OP and EB sets, or any set you stock.",
    sealed:
      "Sealed One Piece product, like booster boxes and starter decks, is listed as a single Unopened unit and can carry its barcode (UPC/GTIN) for Google Shopping.",
    printings:
      "Printings are priced separately, and each condition (NM, LP, MP, HP, DMG) is its own Shopify variant.",
    faq: [
      {
        question: "Can I sell both One Piece singles and sealed product?",
        answer:
          "Yes. Singles are listed per condition, and sealed product is a single Unopened unit, each priced from market data.",
      },
      {
        question: "Do I need a TCGplayer account?",
        answer: "No. Synq provides the market data for you. You only need your Shopify store.",
      },
    ],
  },
];

export function getGamePage(slug: string): GamePage | undefined {
  return GAME_PAGES.find((g) => g.slug === slug);
}
