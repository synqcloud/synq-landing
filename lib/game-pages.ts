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
      "Price your Pokémon singles and sealed product from TCGplayer market data and list them on Shopify. Synq keeps prices current with scheduled price rules.",
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
      "Price your Magic: The Gathering singles and sealed product from TCGplayer market data and list them on Shopify. Synq keeps prices current with scheduled price rules.",
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
      "Price your Yu-Gi-Oh! singles and sealed product from TCGplayer market data and list them on Shopify. Synq keeps prices current with scheduled price rules.",
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
      "Price your Disney Lorcana singles and sealed product from TCGplayer market data and list them on Shopify. Synq keeps prices current with scheduled price rules.",
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
      "Price your One Piece Card Game singles and sealed product from TCGplayer market data and list them on Shopify. Synq keeps prices current with scheduled price rules.",
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
  {
    slug: "pokemon-japan",
    name: "Pokémon TCG Japan",
    logo: "/games/pokemon_japan.png",
    noun: "Japanese Pokémon cards",
    seoTitle: "Sell and price Pokémon TCG Japan cards on Shopify with Synq",
    description: "Price your Pokémon TCG Japan singles and sealed product from TCGplayer market data and list them on Shopify. Synq keeps prices current with scheduled price rules.",
    keywords: [
      "sell japanese pokemon cards shopify",
      "japanese pokemon card pricing",
      "pokemon japan shopify app",
      "price japanese pokemon cards",
      "japanese pokemon booster box shopify",
    ],
    intro: "Synq prices Japanese Pokémon singles and sealed product from TCGplayer market data and creates the Shopify products for you. Japanese and English Pokémon are separate games in Synq, so a Japanese card is never priced from its English counterpart.",
    exampleSets: "Search by name, set or collector number across Japanese main sets and high-class packs, or any set you stock.",
    sealed: "Japanese booster boxes and other sealed product are listed as a single Unopened unit, separate from singles.",
    printings: "Each printing is priced separately from TCGplayer's market price in USD and converted to your store's currency, and each condition (NM, LP, MP, HP, DMG) is its own Shopify variant.",
    faq: [
      {
        question: "Do I need a TCGplayer account to sell Japanese Pokémon cards with Synq?",
        answer: "No. Synq provides the Japanese Pokémon market data for you. You only need your Shopify store.",
      },
      {
        question: "Can I sell English and Japanese Pokémon in the same store?",
        answer: "Yes. Pick both games in Synq. Each keeps its own catalog and market prices, and price rules can cover one, the other or both.",
      },
    ],
  },
  {
    slug: "flesh-and-blood",
    name: "Flesh and Blood",
    logo: "/games/fab.png",
    noun: "Flesh and Blood cards",
    seoTitle: "Sell and price Flesh and Blood cards on Shopify with Synq",
    description: "Price your Flesh and Blood singles and sealed product from TCGplayer market data and list them on Shopify. Synq keeps prices current with scheduled price rules.",
    keywords: [
      "sell flesh and blood cards shopify",
      "flesh and blood card pricing",
      "fab tcg shopify app",
      "price flesh and blood singles",
      "flesh and blood cold foil price",
    ],
    intro: "Synq prices your Flesh and Blood singles and sealed product from TCGplayer market data and creates the Shopify products for you. Foil treatments that sell for very different prices are priced separately, so a Cold Foil never inherits the price of its Rainbow Foil.",
    exampleSets: "Search by name, set or collector number across sets like Rosetta, The Hunted and High Seas, or any set you carry.",
    sealed: "Sealed Flesh and Blood product, like booster boxes, Blitz decks and Armory decks, is listed as a single Unopened unit.",
    printings: "Printings such as Rainbow Foil, Cold Foil and, on older sets, 1st Edition and Unlimited are priced separately, and each condition (NM, LP, MP, HP, DMG) is its own Shopify variant.",
    faq: [
      {
        question: "Do I need a TCGplayer account to sell Flesh and Blood cards with Synq?",
        answer: "No. Synq provides the Flesh and Blood market data for you. You only need your Shopify store.",
      },
      {
        question: "Can I price Cold Foils differently from the rest of a set?",
        answer: "Yes. Each printing has its own market price, and you can add a price rule that covers only certain printings or rarities with its own markup and minimum.",
      },
    ],
  },
  {
    slug: "star-wars-unlimited",
    name: "Star Wars: Unlimited",
    logo: "/games/swu.webp",
    noun: "Star Wars: Unlimited cards",
    seoTitle: "Sell and price Star Wars: Unlimited cards on Shopify with Synq",
    description: "Price your Star Wars: Unlimited singles and sealed product from TCGplayer market data and list them on Shopify. Synq keeps prices current with scheduled price rules.",
    keywords: [
      "sell star wars unlimited cards shopify",
      "star wars unlimited card pricing",
      "swu shopify app",
      "price star wars unlimited singles",
      "star wars unlimited hyperspace price",
    ],
    intro: "Synq prices your Star Wars: Unlimited singles and sealed product from TCGplayer market data and creates the Shopify products for you. Hyperspace, Showcase and foil versions are priced as their own printings, so each one follows its own market.",
    exampleSets: "Search by name, set or collector number across sets like Spark of Rebellion, Shadows of the Galaxy, Twilight of the Republic and Jump to Lightspeed, or any set you stock.",
    sealed: "Sealed Star Wars: Unlimited product, like booster boxes, starter decks and prerelease boxes, is listed as a single Unopened unit.",
    printings: "Normal, Foil, Hyperspace and Showcase printings are priced separately, and each condition (NM, LP, MP, HP, DMG) is its own Shopify variant.",
    faq: [
      {
        question: "Do I need a TCGplayer account to sell Star Wars: Unlimited cards with Synq?",
        answer: "No. Synq provides the Star Wars: Unlimited market data for you. You only need your Shopify store.",
      },
      {
        question: "Can I add a markup only to Showcase cards?",
        answer: "Yes. Create a price rule that covers only those printings or rarities. The most specific rule wins, so the rest of the game keeps its own rule.",
      },
    ],
  },
  {
    slug: "digimon",
    name: "Digimon Card Game",
    logo: "/games/digimon.png",
    noun: "Digimon cards",
    seoTitle: "Sell and price Digimon Card Game cards on Shopify with Synq",
    description: "Price your Digimon Card Game singles and sealed product from TCGplayer market data and list them on Shopify. Synq keeps prices current with scheduled price rules.",
    keywords: [
      "sell digimon cards shopify",
      "digimon card pricing",
      "digimon tcg shopify app",
      "price digimon singles",
      "digimon alternate art price",
    ],
    intro: "Synq prices your Digimon Card Game singles and sealed product from TCGplayer market data and creates the Shopify products for you. Alternate arts are priced as their own printings instead of sharing the regular card's price.",
    exampleSets: "Search by name, set or card number across the BT and EX booster sets, or any set you carry.",
    sealed: "Sealed Digimon product, like booster boxes and starter decks, is listed as a single Unopened unit.",
    printings: "Regular and alternate art printings are priced separately, and each condition (NM, LP, MP, HP, DMG) is its own Shopify variant.",
    faq: [
      {
        question: "Do I need a TCGplayer account to sell Digimon cards with Synq?",
        answer: "No. Synq provides the Digimon market data for you. You only need your Shopify store.",
      },
      {
        question: "Can I import my existing Digimon inventory?",
        answer: "Yes. Import a CSV, Excel file or TCGplayer export. Synq matches each row to its catalog and shows every match for review before anything is created.",
      },
    ],
  },
  {
    slug: "gundam",
    name: "Gundam Card Game",
    logo: "/games/gundam.png",
    noun: "Gundam Card Game cards",
    seoTitle: "Sell and price Gundam Card Game cards on Shopify with Synq",
    description: "Price your Gundam Card Game singles and sealed product from TCGplayer market data and list them on Shopify. Synq keeps prices current with scheduled price rules.",
    keywords: [
      "sell gundam card game shopify",
      "gundam card game pricing",
      "gundam tcg shopify app",
      "price gundam card game singles",
      "gundam card game booster box",
    ],
    intro: "Synq prices your Gundam Card Game singles and sealed product from TCGplayer market data and creates the Shopify products for you. For a newer game whose prices move fast between releases, scheduled price rules keep your store in step without daily checking.",
    exampleSets: "Search by name, set or card number across the booster and starter sets, or any set you stock.",
    sealed: "Sealed Gundam Card Game product, like booster boxes and starter decks, is listed as a single Unopened unit.",
    printings: "Each printing, including parallel versions, is priced separately, and each condition (NM, LP, MP, HP, DMG) is its own Shopify variant.",
    faq: [
      {
        question: "Do I need a TCGplayer account to sell Gundam Card Game cards with Synq?",
        answer: "No. Synq provides the Gundam Card Game market data for you. You only need your Shopify store.",
      },
      {
        question: "How often are Gundam Card Game prices updated?",
        answer: "Your price rules run on the schedule you choose, every day or on chosen weekdays, at an hour in your store's timezone. You can also run a rule by hand right after a release.",
      },
    ],
  },
  {
    slug: "riftbound",
    name: "Riftbound",
    logo: "/games/riftbound.png",
    noun: "Riftbound cards",
    seoTitle: "Sell and price Riftbound cards on Shopify with Synq",
    description: "Price your Riftbound singles and sealed product from TCGplayer market data and list them on Shopify. Synq keeps prices current with scheduled price rules.",
    keywords: [
      "sell riftbound cards shopify",
      "riftbound card pricing",
      "riftbound tcg shopify app",
      "price riftbound singles",
      "league of legends tcg shopify",
    ],
    intro: "Synq prices your Riftbound singles and sealed product from TCGplayer market data and creates the Shopify products for you. Riftbound, the League of Legends trading card game, is supported with the same price rules as every other game.",
    exampleSets: "Search by name, set or card number across every Riftbound set TCGplayer lists, or any set you stock.",
    sealed: "Sealed Riftbound product, like booster boxes and decks, is listed as a single Unopened unit.",
    printings: "Each printing, including foil and alternate art versions, is priced separately, and each condition (NM, LP, MP, HP, DMG) is its own Shopify variant.",
    faq: [
      {
        question: "Do I need a TCGplayer account to sell Riftbound cards with Synq?",
        answer: "No. Synq provides the Riftbound market data for you. You only need your Shopify store.",
      },
      {
        question: "Can I set a minimum price on Riftbound commons?",
        answer: "Yes. Every price rule can carry a minimum, a fixed amount or your cost plus a margin, so low-value cards never fall below what they cost you to list and ship.",
      },
    ],
  },
  {
    slug: "sorcery",
    name: "Sorcery: Contested Realm",
    logo: "/games/sorcery.png",
    noun: "Sorcery cards",
    seoTitle: "Sell and price Sorcery: Contested Realm cards on Shopify with Synq",
    description: "Price your Sorcery: Contested Realm singles and sealed product from TCGplayer market data and list them on Shopify. Synq keeps prices current with scheduled price rules.",
    keywords: [
      "sell sorcery contested realm cards shopify",
      "sorcery tcg pricing",
      "sorcery contested realm shopify",
      "price sorcery singles",
      "sorcery alpha beta price",
    ],
    intro: "Synq prices your Sorcery: Contested Realm singles and sealed product from TCGplayer market data and creates the Shopify products for you. Alpha and Beta copies of the same card are priced from their own markets, so an Alpha card never sells at a Beta price.",
    exampleSets: "Search by name or set across Alpha, Beta, Arthurian Legends and later sets, or any set you carry.",
    sealed: "Sealed Sorcery product, like booster boxes and preconstructed decks, is listed as a single Unopened unit.",
    printings: "Standard and foil printings in each set are priced separately, and each condition (NM, LP, MP, HP, DMG) is its own Shopify variant.",
    faq: [
      {
        question: "Do I need a TCGplayer account to sell Sorcery cards with Synq?",
        answer: "No. Synq provides the Sorcery market data for you. You only need your Shopify store.",
      },
      {
        question: "Can I price each condition from its own market for Sorcery?",
        answer: "Yes. A price rule can use each condition's own TCGplayer market price, which matters for older sets where played copies sell close to Near Mint. Where a condition has no market of its own, it falls back to Near Mint minus the percentage you set.",
      },
    ],
  },
  {
    slug: "grand-archive",
    name: "Grand Archive",
    logo: "/games/grand_archive.png",
    noun: "Grand Archive cards",
    seoTitle: "Sell and price Grand Archive cards on Shopify with Synq",
    description: "Price your Grand Archive singles and sealed product from TCGplayer market data and list them on Shopify. Synq keeps prices current with scheduled price rules.",
    keywords: [
      "sell grand archive cards shopify",
      "grand archive tcg pricing",
      "grand archive shopify app",
      "price grand archive singles",
      "grand archive foil price",
    ],
    intro: "Synq prices your Grand Archive singles and sealed product from TCGplayer market data and creates the Shopify products for you, with each foil treatment priced from its own market.",
    exampleSets: "Search by name, set or card number across every Grand Archive set TCGplayer lists, or any set you stock.",
    sealed: "Sealed Grand Archive product, like booster boxes and decks, is listed as a single Unopened unit.",
    printings: "Normal and foil printings are priced separately, and each condition (NM, LP, MP, HP, DMG) is its own Shopify variant.",
    faq: [
      {
        question: "Do I need a TCGplayer account to sell Grand Archive cards with Synq?",
        answer: "No. Synq provides the Grand Archive market data for you. You only need your Shopify store.",
      },
      {
        question: "Does Synq work for a store that sells only a few games?",
        answer: "Yes. Pick only the games you sell. Every plan includes all games and every feature; plans differ only by how many products they manage.",
      },
    ],
  },
];

export function getGamePage(slug: string): GamePage | undefined {
  return GAME_PAGES.find((g) => g.slug === slug);
}
