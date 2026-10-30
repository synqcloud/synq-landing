/* SEO pages for each game (/for/<slug>). English only, kept out of
   messages/*.json on purpose: these pages are indexed under their old slugs
   and are not part of the translated home. Synq claims are checked against
   the app (synq-shopify, fact sheet of 2026-10-30); game facts are kept to
   what the publishers and TCGplayer show publicly, worded as examples. */

import { SITE_URL as SITE } from "@/lib/site";
export { SITE };
export const SHOPIFY_URL = "https://apps.shopify.com/synq-tcg-card-manager";

/* real figures from the home's result band (landing.chapters.result.week) */
export const FIGURES = [
  { value: "66,000+", label: "cards put up for sale on Shopify with Synq" },
  { value: "2.2M", label: "prices checked against the market, automatically" },
  { value: "19", label: "games in the catalog, from Magic and Pokémon to Riftbound" },
] as const;
export const FIGURES_NOTE = "Live figures from Synq across real card shops, October 2026";

export type Scan = { src: string; alt: string; width: number; height: number };

export type Faq = { q: string; a: string };

/** one sealed format a shop stocks for this game */
export type SealedFormat = { name: string; note: string };

/** inputs of the worked pricing example; the page does the maths */
export type PriceExample = {
  /** what the card is, in words, e.g. "a Near Mint Holofoil rare" */
  what: string;
  /** illustrative Near Mint market price, in USD */
  market: number;
  /** the rule's "Modify by", in percent */
  markup: number;
};

export type GamePage = {
  slug: string;
  /** full name, as the game calls itself */
  name: string;
  /** the name used inside sentences, e.g. "Riftbound" */
  short: string;
  /** who makes the game */
  publisher: string;
  /** what the merchant sells, e.g. "Pokémon cards" */
  noun: string;
  /** game logo; games without one get a typographic mark */
  icon?: string;
  /** short letters for the typographic mark, e.g. "SWU" */
  monogram: string;
  seoTitle: string;
  description: string;
  keywords: string[];
  h1: string;
  intro: string;
  /** the hero's art: real card scans or sealed product; empty for a typographic hero */
  art: { kind: "cards" | "sealed"; items: Scan[] };
  /** where to find the cards: example sets */
  sets: string;
  /** printing names shown as chips; empty when they vary too much to name */
  printings: { names: string[]; body: string };
  sealed: string;
  /** what a shop for this game puts on its shelves */
  shelf: { singles: string; sealed: SealedFormat[] };
  /** how printings, foils and editions work in this game, a paragraph each */
  printingNotes: string[];
  example: PriceExample;
  /** a product-title idea for this game */
  titleTip: string;
  /** what to know when importing this game's inventory */
  importNote: string;
  faq: Faq[];
};

/* the same five conditions on every game */
export const CONDITIONS = ["NM", "LP", "MP", "HP", "DMG"];
export const CONDITION_NAMES: Record<string, string> = {
  NM: "Near Mint",
  LP: "Lightly Played",
  MP: "Moderately Played",
  HP: "Heavily Played",
  DMG: "Damaged",
};
/* "Standard" in setup, and the rule editor's "Below Near Mint" defaults */
export const STANDARD_OFF: Record<string, number> = { NM: 0, LP: 10, MP: 25, HP: 40, DMG: 60 };
export const CONDITIONS_BODY =
  "Each condition is its own variant on the card's Shopify product, with its own price and stock, and can follow its own TCGplayer market price.";

const scan = (src: string, alt: string): Scan => ({ src: `/wall/${src}.webp`, alt, width: 300, height: 419 });
const none = { kind: "cards" as const, items: [] as Scan[] };

/* questions every game page answers the same way, worded for that game */
const shared = (noun: string): Faq[] => [
  {
    q: `Where do the prices for ${noun} come from?`,
    a: "From TCGplayer's market price, which is based on recent completed sales of each card, printing and condition. Synq brings it in every day and converts it to your store's currency. Your prices change only when one of your price rules runs, on the schedule you set.",
  },
  {
    q: `Can I bring in the ${noun} I already sell?`,
    a: "Yes. Import a TCGplayer inventory export or your own CSV, and Synq matches each row to the catalog, creates what's new and updates stock on what you already have, without duplicates. Products already in your Shopify store can be linked one by one instead, keeping their titles and descriptions.",
  },
  {
    q: "Can I set my own price on a card?",
    a: "Yes. Edit its price in Synq and that condition is excluded from price rules, so no run changes it. A price edited directly in the Shopify admin is overwritten on the rule's next run, so make the change in Synq.",
  },
];

const noAccount = (noun: string): Faq => ({
  q: `Do I need a TCGplayer account to sell ${noun}?`,
  a: "No. Synq brings in the TCGplayer market data for you. You only need your Shopify store.",
});

export const GAMES: GamePage[] = [
  /* ---------------------------------------------------------------- Pokémon */
  {
    slug: "pokemon",
    name: "Pokémon",
    short: "Pokémon",
    publisher: "The Pokémon Company",
    noun: "Pokémon cards",
    icon: "/games/icon_pokemon.png",
    monogram: "PK",
    seoTitle: "Sell Pokémon cards on Shopify | Synq",
    description:
      "Sell Pokémon singles, ETBs and booster boxes on Shopify. Synq prices each printing and condition from TCGplayer market data and updates prices on your schedule.",
    keywords: [
      "sell pokemon cards on shopify",
      "pokemon card pricing shopify",
      "pokemon tcg shopify app",
      "pokemon card store inventory",
      "pokemon reverse holo pricing",
    ],
    h1: "Sell and price Pokémon cards on Shopify",
    intro:
      "Synq prices your Pokémon singles and sealed product from TCGplayer market data and creates the Shopify products for you. Find the card, pick its printing and condition, and it's in your store with its photo and price, for sale as soon as you publish it. From then on your prices follow the market on your schedule. No spreadsheets, and no TCGplayer account needed.",
    art: {
      kind: "cards",
      items: [
        scan("pk-umbreon-vmax", "Umbreon VMAX card"),
        scan("pk-charizard-ex", "Charizard ex card"),
        scan("pk-pikachu-151", "Pikachu card from Pokémon 151"),
      ],
    },
    sets: "Search by name, set or collector number across Scarlet & Violet sets like 151, Surging Sparks, Prismatic Evolutions and Destined Rivals, or the older sets you carry. Type @ and a set name to pin a set.",
    printings: {
      names: ["Normal", "Holofoil", "Reverse Holofoil"],
      body: "Each printing is its own Shopify product priced from its own market price, so a Reverse Holo never sells at the Normal price.",
    },
    sealed:
      "Elite Trainer Boxes, booster boxes and booster bundles are one product each with a single Unopened variant. With Shopify POS installed, each can carry the box barcode (UPC) from the catalog, or a Synq code when there is none.",
    shelf: {
      singles:
        "Most Pokémon shops make their margin on singles: chase cards like Special Illustration Rares and other secret rares numbered above the set count, playable ex cards and trainers for Standard decks, and binders of reverse holos and commons. A single card can exist in two printings, such as Normal and Reverse Holofoil, and each one sells for a different price.",
      sealed: [
        { name: "Booster boxes", note: "The display of booster packs, sold whole or opened for packs." },
        { name: "Elite Trainer Boxes", note: "Packs plus sleeves, dice and energy, a common gift purchase." },
        { name: "Booster bundles", note: "A smaller pack bundle at a lower price point." },
        { name: "Collection boxes, tins and blisters", note: "Packs with a promo card, often bought for the promo." },
      ],
    },
    printingNotes: [
      "In Scarlet & Violet sets, commons and uncommons come as Normal and Reverse Holofoil, rares as Holofoil and Reverse Holofoil, and ex cards and higher rarities as Holofoil only. TCGplayer tracks a separate market price for each, and so does Synq: each card and printing is its own Shopify product, so the Reverse Holo of a card is never priced from its Normal copy.",
      "Some sets add special reverse holo patterns, such as the Poké Ball and Master Ball Pattern versions in Prismatic Evolutions. TCGplayer lists these as their own entries, so each is priced from its own market. Older Wizards of the Coast era sets also carry 1st Edition and Unlimited printings, which the catalog lists apart when they exist.",
      "Japanese Pokémon is a separate game in Synq, Pokémon TCG Japan, with its own catalog and prices, so an English card is never priced from a Japanese one.",
    ],
    example: { what: "a Holofoil ex card", market: 24, markup: 5 },
    titleTip:
      "Shoppers often search a Pokémon card by name and number. A title template of Product name, Set and Number gives a product title like \"Card name - 151 - number\", so two copies of the same Pokémon from different sets are easy to tell apart.",
    importNote:
      "If you sell on TCGplayer, its inventory export is read as exact SKUs, so the card, printing and condition come in exactly. From your own sheet, a name column is enough to start; Synq asks you to pick when a name fits several cards, for example a Pikachu printed in many sets.",
    faq: [
      noAccount("Pokémon cards"),
      {
        q: "Can I sell sealed Pokémon product as well as singles?",
        a: "Yes. Elite Trainer Boxes, booster boxes and bundles are their own products with a single Unopened variant, separate from singles. With Shopify POS installed, the box UPC from the catalog can go on the product as its barcode.",
      },
      {
        q: "Are Reverse Holo and Holofoil copies priced separately?",
        a: "Yes. Each printing is its own Shopify product with its own TCGplayer market price, and each condition of it is a variant with its own price and stock.",
      },
      {
        q: "Does Synq support Japanese Pokémon cards?",
        a: "Yes, as a separate game called Pokémon TCG Japan, with its own catalog and its own market prices. You can sell both in one store.",
      },
      {
        q: "Can I price chase cards differently from bulk?",
        a: "Yes. A rule made for Pokémon alone can be limited to certain sets, rarities, printings or conditions. The most specific rule wins, so a rule for Special Illustration Rares can sit beside your general Pokémon rule.",
      },
      ...shared("Pokémon cards"),
    ],
  },

  /* ------------------------------------------------------------------ Magic */
  {
    slug: "magic-the-gathering",
    name: "Magic: The Gathering",
    short: "Magic",
    publisher: "Wizards of the Coast",
    noun: "Magic cards",
    icon: "/games/icon_mtg.png",
    monogram: "MTG",
    seoTitle: "Sell Magic: The Gathering cards on Shopify | Synq",
    description:
      "List and price MTG singles, foils and sealed product on Shopify. Synq prices every printing and condition from TCGplayer market data and keeps prices current.",
    keywords: [
      "sell magic the gathering cards shopify",
      "mtg card pricing shopify",
      "mtg singles shopify app",
      "mtg inventory shopify",
      "mtg foil pricing",
    ],
    h1: "Sell and price Magic: The Gathering cards on Shopify",
    intro:
      "Synq prices your Magic: The Gathering singles and sealed product from TCGplayer market data and creates the Shopify products for you. Find the card, pick its printing and condition, and it's in your store with its photo and price, for sale as soon as you publish it. From then on your prices follow the market on your schedule. No spreadsheets, and no TCGplayer account needed.",
    art: {
      kind: "cards",
      items: [
        scan("mtg-atraxa", "Atraxa card"),
        scan("mtg-bowmasters", "Orcish Bowmasters card"),
        scan("mtg-bolt", "Lightning Bolt card"),
      ],
    },
    sets: "Search by name, set or collector number across sets like Foundations, Bloomburrow, Aetherdrift and Modern Horizons 3, or any set in your inventory. Type @ and a set code to pin a set.",
    printings: {
      names: ["Normal", "Foil"],
      body: "Foil and nonfoil are separate Shopify products, each priced from its own market price, so a foil copy is never sold at the nonfoil price.",
    },
    sealed:
      "Play Booster and Collector Booster boxes, bundles and Commander decks are one product each with a single Unopened variant. With Shopify POS installed, each can carry the box barcode (UPC) from the catalog, or a Synq code when there is none.",
    shelf: {
      singles:
        "Magic singles are where most Magic shops earn: staples for Commander, Modern and Pioneer, the chase rares and mythics of each new set, and a deep tail of cheap cards players need to finish a deck. The same card name can be printed in dozens of sets and frames, each at its own price, which is why a Magic catalog gets large fast.",
      sealed: [
        { name: "Play Booster boxes", note: "The main booster of each set, for drafts and cracking packs." },
        { name: "Collector Booster boxes", note: "Fewer, pricier packs full of foils and special frames." },
        { name: "Bundles", note: "Packs plus lands and a spindown, a gift-friendly box." },
        { name: "Commander decks", note: "Ready-to-play decks, steady sellers between sets." },
      ],
    },
    printingNotes: [
      "Most Magic cards come in a nonfoil and a foil printing, and TCGplayer tracks a market price for each. In Synq each card and printing is its own Shopify product, so the foil copy has its own price and stock.",
      "Special frames such as borderless, extended art and showcase versions usually appear in the catalog as their own cards with their own collector number, and each of those also has its own printings. That keeps a borderless mythic from ever borrowing the price of its regular frame.",
      "Reprints are separate cards too. A Lightning Bolt from one set and a Lightning Bolt from another are different products with different prices, and you pick the one on your shelf when you add it.",
    ],
    example: { what: "a nonfoil mythic", market: 18, markup: 0 },
    titleTip:
      "With many printings of the same name, a title template of Product name, Set and Printing gives titles like \"Card name - Foundations - Foil\", which reads clearly on your store and in the Shopify admin.",
    importNote:
      "A TCGplayer inventory export comes in as exact SKUs, so set, printing and condition all match. From your own sheet, include a set or a TCGplayer ID column when you can: a bare card name like Sol Ring fits many printings, and Synq will ask you to pick one for each.",
    faq: [
      {
        q: "Does Synq handle foil and nonfoil Magic cards separately?",
        a: "Yes. Each printing is its own Shopify product priced from its own market data, and each condition is a variant with its own price and stock.",
      },
      {
        q: "How are borderless and extended art cards handled?",
        a: "They usually appear in the catalog as their own cards, with their own collector number and market price, so they are priced apart from the regular frame.",
      },
      {
        q: "Can I sell sealed Magic product like booster boxes?",
        a: "Yes. Booster boxes, bundles and Commander decks are their own products with a single Unopened variant, and with Shopify POS installed can carry the box UPC as their barcode.",
      },
      noAccount("Magic cards"),
      {
        q: "Can I keep cheap Magic singles above a minimum price?",
        a: "Yes. A price rule can set a minimum, a fixed amount or your cost plus a margin, per condition or for all of them, so low-value cards never drop below it.",
      },
      ...shared("Magic cards"),
    ],
  },

  /* --------------------------------------------------------------- Yu-Gi-Oh */
  {
    slug: "yu-gi-oh",
    name: "Yu-Gi-Oh!",
    short: "Yu-Gi-Oh!",
    publisher: "Konami",
    noun: "Yu-Gi-Oh! cards",
    icon: "/games/icon_yugioh.png",
    monogram: "YGO",
    seoTitle: "Sell Yu-Gi-Oh! cards on Shopify | Synq",
    description:
      "Sell Yu-Gi-Oh! singles and sealed product on Shopify, with 1st Edition and Unlimited priced apart. Synq prices each condition from TCGplayer market data.",
    keywords: [
      "sell yugioh cards shopify",
      "yu-gi-oh card pricing shopify",
      "yugioh singles shopify app",
      "1st edition unlimited yugioh pricing",
      "yugioh card store inventory",
    ],
    h1: "Sell and price Yu-Gi-Oh! cards on Shopify",
    intro:
      "Synq prices your Yu-Gi-Oh! singles and sealed product from TCGplayer market data and creates the Shopify products for you. Find the card, pick its edition and condition, and it's in your store with its photo and price, for sale as soon as you publish it. From then on your prices follow the market on your schedule. No spreadsheets, and no TCGplayer account needed.",
    art: {
      kind: "cards",
      items: [
        scan("ygo-dark-magician", "Dark Magician card"),
        scan("ygo-blue-eyes", "Blue-Eyes White Dragon card"),
        scan("ygo-dark-magician-girl", "Dark Magician Girl card"),
      ],
    },
    sets: "Search by name, set or set code across releases like the 25th Anniversary sets, Maze of Millennia and Alliance Insight, or any set you stock.",
    printings: {
      names: ["1st Edition", "Unlimited", "Limited"],
      body: "Each edition is its own Shopify product priced from its own market price, so a 1st Edition copy and an Unlimited copy of the same card stay correctly priced.",
    },
    sealed:
      "Booster boxes, structure decks and tins are one product each with a single Unopened variant. With Shopify POS installed, each can carry the box barcode (UPC) from the catalog, or a Synq code when there is none.",
    shelf: {
      singles:
        "Yu-Gi-Oh! shops sell meta staples and hand traps to tournament players, high-rarity versions to collectors, and older cards to nostalgia buyers. The same card is reprinted often, across booster sets, tins and collections, each with its own set code and rarity, and prices between those versions can be far apart.",
      sealed: [
        { name: "Booster boxes", note: "Core sets and special sets, for players and pack openers." },
        { name: "Structure decks", note: "Low-priced, often bought in threes to build one deck." },
        { name: "Tins", note: "Yearly tins of reprints, popular with new players." },
        { name: "Collector sets", note: "Rarity-focused releases bought mostly for chase cards." },
      ],
    },
    printingNotes: [
      "Yu-Gi-Oh! cards are printed in editions: 1st Edition, Unlimited, and Limited for some tins and promotional products. TCGplayer lists a market price per edition, and in Synq each card and edition is its own Shopify product.",
      "Every print run also carries a set code, such as LOB-EN001, and a rarity, from Common up to Secret, Starlight or Quarter Century Secret Rare. A reprint of the same card in another set, or at another rarity, is a different card in the catalog with its own price, so you pick the exact version on your shelf.",
    ],
    example: { what: "a 1st Edition Secret Rare", market: 32, markup: -5 },
    titleTip:
      "Yu-Gi-Oh! buyers often look for the set code. A title template of Product name, Number and Printing gives titles like \"Card name - set code - 1st Edition\", so each version is clear at a glance.",
    importNote:
      "A TCGplayer export comes in as exact SKUs, edition included. From your own sheet, a set code in a Card number column helps you find each row quickly in Review, since card names alone fit many reprints.",
    faq: [
      {
        q: "Does Synq price 1st Edition and Unlimited Yu-Gi-Oh! cards separately?",
        a: "Yes. Each edition is its own Shopify product priced from its own market data, so 1st Edition and Unlimited copies of the same card get their own prices, and each condition is its own variant.",
      },
      {
        q: "Are reprints at different rarities priced apart?",
        a: "Yes. A card reprinted in another set or at another rarity is its own catalog entry with its own TCGplayer market price.",
      },
      {
        q: "Can I sell structure decks and tins?",
        a: "Yes, as sealed products with a single Unopened variant. With Shopify POS installed, the catalog's UPC can go on the product as its barcode.",
      },
      noAccount("Yu-Gi-Oh! cards"),
      ...shared("Yu-Gi-Oh! cards"),
    ],
  },

  /* ---------------------------------------------------------------- Lorcana */
  {
    slug: "disney-lorcana",
    name: "Disney Lorcana",
    short: "Lorcana",
    publisher: "Ravensburger",
    noun: "Disney Lorcana cards",
    icon: "/games/icon_lorcana.png",
    monogram: "LOR",
    seoTitle: "Sell Disney Lorcana cards on Shopify | Synq",
    description:
      "Sell Disney Lorcana singles, Enchanted cards and Illumineer's Troves on Shopify. Synq prices Cold Foil and normal copies apart, per condition, from TCGplayer.",
    keywords: [
      "sell disney lorcana cards shopify",
      "lorcana card pricing shopify",
      "lorcana singles shopify app",
      "lorcana enchanted pricing",
      "lorcana sealed shopify",
    ],
    h1: "Sell and price Disney Lorcana cards on Shopify",
    intro:
      "Synq prices your Disney Lorcana singles and sealed product from TCGplayer market data and creates the Shopify products for you. Find the card, pick its printing and condition, and it's in your store with its photo and price, for sale as soon as you publish it. From then on your prices follow the market on your schedule. No spreadsheets, and no TCGplayer account needed.",
    art: {
      kind: "cards",
      items: [
        scan("lor-maleficent", "Maleficent card"),
        scan("lor-elsa", "Elsa card"),
        scan("lor-stitch", "Stitch card"),
      ],
    },
    sets: "Search by name, set or collector number across sets like Shimmering Skies, Azurite Sea and Fabled, back to The First Chapter, or any set you carry.",
    printings: {
      names: ["Normal", "Cold Foil"],
      body: "Normal and Cold Foil copies are separate Shopify products, each priced from its own market price, so a foil copy is never sold at the normal price.",
    },
    sealed:
      "Booster boxes, Illumineer's Troves, starter decks and gift sets are one product each with a single Unopened variant. With Shopify POS installed, each can carry the box barcode (UPC) from the catalog, or a Synq code when there is none.",
    shelf: {
      singles:
        "Lorcana shops sell playable cards to league and Set Championship players, and Enchanted cards, the full-art foil versions numbered above each set's main list, to collectors. Decks use up to two inks, so cards of each ink tend to move together after a new set lands.",
      sealed: [
        { name: "Booster boxes", note: "The display of packs for each set." },
        { name: "Illumineer's Troves", note: "Packs plus dice, a deck box and dividers." },
        { name: "Starter decks", note: "Two-ink decks, an easy first purchase." },
        { name: "Gift sets", note: "Packs with a promo card, popular around holidays." },
      ],
    },
    printingNotes: [
      "Most Lorcana cards can be pulled as a normal or a Cold Foil copy, and the two sell for different prices. TCGplayer tracks them as separate printings, and in Synq each card and printing is its own Shopify product with its own price and stock.",
      "Enchanted cards carry their own collector numbers above the main set and come only as Holofoil, so they are separate cards in the catalog, priced from their own market rather than from the regular version of the same character.",
    ],
    example: { what: "a Cold Foil Legendary", market: 15, markup: 5 },
    titleTip:
      "A title template of Product name, Set and Printing gives titles like \"Elsa - Spirit of Winter - The First Chapter - Cold Foil\", so foil and normal copies are easy to tell apart in your store.",
    importNote:
      "A TCGplayer export comes in as exact SKUs. From your own sheet, add a Printing or a set column when you can, since the same character often has several versions in one set.",
    faq: [
      {
        q: "Can I sell both Lorcana singles and sealed product?",
        a: "Yes. Singles get a variant per condition, and sealed product like Illumineer's Troves is one product with a single Unopened variant, each priced from market data.",
      },
      {
        q: "Are Enchanted cards priced separately from the regular version?",
        a: "Yes. Enchanted cards have their own collector numbers and their own TCGplayer market price, so they are separate products in your store.",
      },
      noAccount("Lorcana cards"),
      {
        q: "Can I mark up only Enchanted and Legendary cards?",
        a: "Yes. A rule made for Lorcana alone can be limited to certain rarities. The most specific rule wins, so it sits beside your general Lorcana rule.",
      },
      ...shared("Lorcana cards"),
    ],
  },

  /* -------------------------------------------------------------- One Piece */
  {
    slug: "one-piece",
    name: "One Piece Card Game",
    short: "One Piece",
    publisher: "Bandai",
    noun: "One Piece cards",
    icon: "/games/icon_onepiece.png",
    monogram: "OP",
    seoTitle: "Sell One Piece Card Game cards on Shopify | Synq",
    description:
      "Sell One Piece TCG singles, alternate arts and booster boxes on Shopify. Synq prices each version and condition from TCGplayer market data on your schedule.",
    keywords: [
      "sell one piece cards shopify",
      "one piece tcg shopify",
      "one piece card game pricing",
      "one piece alternate art pricing",
      "one piece booster box shopify",
    ],
    h1: "Sell and price One Piece Card Game cards on Shopify",
    intro:
      "Synq prices your One Piece Card Game singles and sealed product from TCGplayer market data and creates the Shopify products for you. Find the card, pick its printing and condition, and it's in your store with its photo and price, for sale as soon as you publish it. From then on your prices follow the market on your schedule. No spreadsheets, and no TCGplayer account needed.",
    art: {
      kind: "sealed",
      items: [
        { src: "/wall/sealed-op-op09-booster-box.webp", alt: "One Piece Card Game OP-09 booster box", width: 300, height: 326 },
        { src: "/wall/sealed-op-op10-booster-pack.webp", alt: "One Piece Card Game OP-10 booster pack", width: 300, height: 493 },
      ],
    },
    sets: "Search by name, set or card number across the OP booster sets, EB extra boosters, premium boosters and ST starter decks, or any set you stock. Card numbers like OP09-001 work too.",
    printings: {
      names: [],
      body: "Each printing is its own Shopify product priced from its own market price, and each condition is its own variant.",
    },
    sealed:
      "Booster boxes, starter decks and premium boosters are one product each with a single Unopened variant. With Shopify POS installed, each can carry the box barcode (UPC) from the catalog, or a Synq code when there is none.",
    shelf: {
      singles:
        "One Piece shops sell Leaders and the playable cards around them to tournament players, and parallel, Manga and SP versions to collectors. Alternate art DON!! cards are collected too. New booster sets move prices quickly, so the first weeks after a release are when stale prices cost the most.",
      sealed: [
        { name: "Booster boxes", note: "The OP and EB displays, often allocated and sold fast." },
        { name: "Starter decks", note: "ST decks built around one Leader." },
        { name: "Premium boosters", note: "Higher-priced packs of reprints and special versions." },
        { name: "Double Pack Sets", note: "Smaller sets of packs for casual buyers." },
      ],
    },
    printingNotes: [
      "A single One Piece card number can exist in several versions: the regular card, a parallel or alternate art, and in some sets Manga, SP or Wanted Poster versions. On TCGplayer these appear as their own entries, each with its own market price, and Synq prices each one from its own market.",
      "Because the regular and parallel versions share a card number, pick the version from the photo when you add it. Each one is its own Shopify product, with a variant per condition.",
    ],
    example: { what: "a parallel Leader", market: 22, markup: 5 },
    titleTip:
      "One Piece players search by card number. A title template of Product name, Number and Rarity gives titles like \"Card name - OP09 number - rarity\", so Leaders and their parallels are easy to find.",
    importNote:
      "A TCGplayer export comes in as exact SKUs, version included. From your own sheet, a card number column helps you find each row in Review, and you pick between the regular and parallel versions when a number fits both.",
    faq: [
      {
        q: "Can I sell both One Piece singles and sealed product?",
        a: "Yes. Singles get a variant per condition, and sealed product is one product with a single Unopened variant, each priced from market data.",
      },
      {
        q: "Are parallel and alternate art One Piece cards priced separately?",
        a: "Yes. When TCGplayer lists a version as its own entry, it has its own market price and becomes its own Shopify product.",
      },
      {
        q: "Can I update One Piece prices right after a new set releases?",
        a: "Yes. Besides its schedule, a rule can be run by hand whenever you want, and its preview shows which prices go up or down before it runs.",
      },
      noAccount("One Piece cards"),
      ...shared("One Piece cards"),
    ],
  },

  /* ---------------------------------------------------------- Pokémon Japan */
  {
    slug: "pokemon-tcg-japan",
    name: "Pokémon TCG Japan",
    short: "Japanese Pokémon",
    publisher: "The Pokémon Company",
    noun: "Japanese Pokémon cards",
    icon: "/games/icon_pokemon_japan.png",
    monogram: "PKJ",
    seoTitle: "Sell Japanese Pokémon cards on Shopify | Synq",
    description:
      "Sell Japanese Pokémon singles and booster boxes on Shopify, priced from their own TCGplayer market, never the English card's. Conditions and sealed included.",
    keywords: [
      "sell japanese pokemon cards shopify",
      "japanese pokemon card pricing",
      "pokemon japan shopify app",
      "japanese pokemon booster box shopify",
      "japanese pokemon singles store",
    ],
    h1: "Sell and price Japanese Pokémon cards on Shopify",
    intro:
      "Synq prices your Japanese Pokémon singles and sealed product from TCGplayer market data and creates the Shopify products for you. Japanese and English Pokémon are separate games in Synq, so a Japanese card is always priced from its own market, never from its English counterpart.",
    art: none,
    sets: "Search by name, set or collector number across Japanese main expansions and high-class packs, such as Pokémon Card 151 (SV2a), or any Japanese set you stock.",
    printings: {
      names: [],
      body: "Each printing is its own Shopify product priced from its own TCGplayer market price, converted to your store's currency.",
    },
    sealed:
      "Japanese booster boxes and high-class pack boxes are one product each with a single Unopened variant, separate from singles. With Shopify POS installed, each can carry the box barcode (UPC) from the catalog, or a Synq code when there is none.",
    shelf: {
      singles:
        "Shops carry Japanese Pokémon for collectors who want art rares and promos, for players who like the card stock, and for sets that release in Japan months before their English version. Japanese sets are also split differently from English ones, so the same artwork can sit in a different set with a different number.",
      sealed: [
        { name: "Main expansion boxes", note: "Boxes of short Japanese packs, often sold whole." },
        { name: "High-class pack boxes", note: "Special sets packed with art rares." },
        { name: "Starter and deck sets", note: "Ready-made decks for the Japanese format." },
        { name: "Promotional products", note: "Boxes and files bought for an exclusive promo." },
      ],
    },
    printingNotes: [
      "Japanese sets have their own set codes and numbering, for example SV2a for Japanese Pokémon Card 151. The catalog follows that numbering, so a Japanese card is matched and priced as itself.",
      "Japanese prices often move differently from English ones, both after a Japanese release and again when the English version comes out. Keeping the two as separate games means each follows its own TCGplayer market, and you can give each its own price rule.",
    ],
    example: { what: "a Japanese art rare", market: 12, markup: 10 },
    titleTip:
      "Product templates can differ by game, so Japanese Pokémon can have its own title template, for example Product name, Set and Number, and read differently from your English stock.",
    importNote:
      "Japanese stock often lives in its own sheet. A Game column and a Card number column help each row land on the Japanese card, and in Review you pick the right card whenever a name fits more than one.",
    faq: [
      noAccount("Japanese Pokémon cards"),
      {
        q: "Can I sell English and Japanese Pokémon in the same store?",
        a: "Yes. Pick both games in Synq. Each keeps its own catalog and market prices, and a price rule can cover one game or every game.",
      },
      {
        q: "Is a Japanese card ever priced from the English version?",
        a: "No. Japanese Pokémon is its own game in Synq, so each card is priced from its own TCGplayer market price.",
      },
      {
        q: "My store isn't in US dollars. How are Japanese cards priced?",
        a: "TCGplayer prices are in US dollars. Synq converts them to your store's Shopify currency, then applies your rule's minimum and rounding in that currency.",
      },
      ...shared("Japanese Pokémon cards"),
    ],
  },

  /* -------------------------------------------------------- Flesh and Blood */
  {
    slug: "flesh-and-blood",
    name: "Flesh and Blood",
    short: "Flesh and Blood",
    publisher: "Legend Story Studios",
    noun: "Flesh and Blood cards",
    icon: "/games/icon_fab.png",
    monogram: "FAB",
    seoTitle: "Sell Flesh and Blood cards on Shopify | Synq",
    description:
      "Sell Flesh and Blood singles, Cold Foils and Armory decks on Shopify. Synq prices each foil treatment and condition from its own TCGplayer market price.",
    keywords: [
      "sell flesh and blood cards shopify",
      "flesh and blood card pricing",
      "fab tcg shopify app",
      "flesh and blood cold foil price",
      "fab singles store",
    ],
    h1: "Sell and price Flesh and Blood cards on Shopify",
    intro:
      "Synq prices your Flesh and Blood singles and sealed product from TCGplayer market data and creates the Shopify products for you. Foil treatments that sell for very different prices are priced apart, so a Cold Foil never inherits the price of its Rainbow Foil. No spreadsheets, and no TCGplayer account needed.",
    art: none,
    sets: "Search by name, set or card number across sets like Usurp the Shadow Throne, Omens of the Third Age, The Hunted and High Seas, back to Welcome to Rathe, or any set you carry.",
    printings: {
      names: ["Normal", "Rainbow Foil", "Cold Foil"],
      body: "Each foil treatment is its own Shopify product priced from its own market price, and each condition is its own variant.",
    },
    sealed:
      "Booster boxes, Armory decks and Silver Age decks are one product each with a single Unopened variant. With Shopify POS installed, each can carry the box barcode (UPC) from the catalog, or a Synq code when there is none.",
    shelf: {
      singles:
        "Flesh and Blood players build around one hero, so shops sell hero-specific staples, the Majestic and Legendary cards of each set, and Cold Foil versions that collectors chase. Armory events bring in a steady weekly crowd that buys singles in person.",
      sealed: [
        { name: "Booster boxes", note: "The display for each set, including first-edition runs on older sets." },
        { name: "Blitz and Silver Age decks", note: "Ready-to-play hero decks, Blitz on older sets and Silver Age since 2026." },
        { name: "Armory decks", note: "Preconstructed decks aimed at local Armory events." },
        { name: "Compendium and history packs", note: "Reprint products such as Compendium of Rathe and History Pack Vol.1." },
      ],
    },
    printingNotes: [
      "Flesh and Blood cards come in a regular finish, Rainbow Foil and Cold Foil, and the gap between them can be large. TCGplayer tracks each treatment, and in Synq each card and treatment is its own Shopify product with its own price.",
      "Early sets, such as Arcane Rising and Crucible of War, were printed in 1st Edition and Unlimited runs. Where the catalog lists them apart, each edition has its own market price too.",
    ],
    example: { what: "a Rainbow Foil Majestic", market: 20, markup: 5 },
    titleTip:
      "A title template of Product name, Set and Printing gives titles like \"Card name - The Hunted - Cold Foil\", so a shopper can see the treatment before opening the product.",
    importNote:
      "A TCGplayer export comes in as exact SKUs, treatment included. From your own sheet, a Printing column matters for Flesh and Blood, since a name alone fits the regular, Rainbow and Cold Foil copies.",
    faq: [
      noAccount("Flesh and Blood cards"),
      {
        q: "Can I price Cold Foils differently from the rest of a set?",
        a: "Yes. Each treatment has its own market price, and a rule made for Flesh and Blood alone can be limited to certain printings or rarities, with its own markup and minimum.",
      },
      {
        q: "Are 1st Edition and Unlimited copies priced apart?",
        a: "Yes, where the catalog lists them as separate printings, each has its own TCGplayer market price.",
      },
      {
        q: "Can I sell Armory and Silver Age decks?",
        a: "Yes, as sealed products with a single Unopened variant, separate from singles.",
      },
      ...shared("Flesh and Blood cards"),
    ],
  },

  /* -------------------------------------------------------------- Riftbound */
  {
    slug: "riftbound",
    name: "Riftbound",
    short: "Riftbound",
    publisher: "Riot Games",
    noun: "Riftbound cards",
    icon: "/games/icon_riftbound.png",
    monogram: "RB",
    seoTitle: "Sell Riftbound cards on Shopify, priced daily | Synq",
    description:
      "Sell Riftbound, the League of Legends TCG, on Shopify. Synq prices Riftbound singles, foils and Showcase cards from TCGplayer market data, per condition, daily.",
    keywords: [
      "sell riftbound cards shopify",
      "riftbound card pricing",
      "riftbound tcg shopify app",
      "sell riftbound cards online",
      "league of legends tcg shopify",
      "riftbound singles store",
    ],
    h1: "Sell and price Riftbound cards on Shopify",
    intro:
      "Synq prices your Riftbound singles and sealed product from TCGplayer market data and creates the Shopify products for you. Riftbound, Riot Games' League of Legends trading card game, is still young, and its prices move fast between releases. Price rules keep your store in step without checking every card by hand.",
    art: none,
    sets: "Search by name, set or card number across Origins, Spiritforged, Unleashed, Vendetta, Radiance and every later Riftbound set the catalog lists. Type @ and a set name to see a whole set in order.",
    printings: {
      names: ["Normal", "Foil"],
      body: "Foil and non-foil copies are separate Shopify products, each priced from its own market price, and each condition is its own variant.",
    },
    sealed:
      "Booster boxes, Champion Decks and starter products are one product each with a single Unopened variant. With Shopify POS installed, each can carry the box barcode (UPC) from the catalog, or a Synq code when there is none.",
    shelf: {
      singles:
        "Riftbound decks are built around a Champion Legend, so the Champions and Legends of popular League of Legends characters are the cards players ask for first, along with Epics and Showcase versions such as alternate arts. Runes move as bulk. For a new game, singles let players finish decks without buying box after box, which keeps them coming back to your store.",
      sealed: [
        { name: "Booster boxes", note: "The display of each set's packs, the main sealed sale." },
        { name: "Champion Decks", note: "Ready-to-play decks built around one champion." },
        { name: "Starter products", note: "Boxes like Proving Grounds that teach the game to new players." },
        { name: "Packs", note: "Single packs from an opened display, sold at the counter." },
      ],
    },
    printingNotes: [
      "Riftbound packs mix regular and foil cards, with every Rare and Epic printed as foil, plus Showcase cards: alternate arts, overnumbered and signed versions. TCGplayer tracks a foil and a non-foil copy as separate printings, and lists Showcase versions as their own entries. In Synq each one is its own Shopify product, priced from its own market.",
      "Because the game is new, some cards and conditions have only a thin sales history, and a played condition may have no market price of its own. A Synq rule can price played copies from Near Mint's market less a percent, and when a card has no market price at all, Synq asks you to set your price when you add it.",
    ],
    example: { what: "a foil Epic", market: 16, markup: 5 },
    titleTip:
      "A title template of Product name, Set, Number and Printing gives titles like \"Card name - Origins - number - Foil\", which helps shoppers tell regular, foil and Showcase copies apart.",
    importNote:
      "If you list Riftbound on TCGplayer, its export comes in as exact SKUs. If you started on a spreadsheet at launch, a name and quantity are enough; add a Printing column so foils go to the right product.",
    faq: [
      noAccount("Riftbound cards"),
      {
        q: "Are Riftbound foils and Showcase cards priced apart?",
        a: "Yes. A foil copy is its own printing with its own TCGplayer market price, and Showcase versions such as alternate arts are listed as their own entries, so each becomes its own Shopify product.",
      },
      {
        q: "Riftbound prices move a lot. How often do my prices update?",
        a: "A price rule runs on the schedule you choose, every day, on the days you pick, or once, at a time in your store's time zone. You can also run it by hand right after a release, and preview which prices go up or down first.",
      },
      {
        q: "Can I set a minimum price on Riftbound commons and Runes?",
        a: "Yes. Every price rule can carry a minimum, a fixed amount or your cost plus a margin, so low-value cards never fall below it.",
      },
      {
        q: "What if a new Riftbound card has no market price yet?",
        a: "Synq shows that there's no TCGplayer market price for that condition and asks you to set your price when you add it.",
      },
      ...shared("Riftbound cards"),
    ],
  },

  /* ---------------------------------------------------------------- Sorcery */
  {
    slug: "sorcery-contested-realm",
    name: "Sorcery: Contested Realm",
    short: "Sorcery",
    publisher: "Erik's Curiosa",
    noun: "Sorcery cards",
    icon: "/games/icon_sorcery.png",
    monogram: "SCR",
    seoTitle: "Sell Sorcery: Contested Realm cards on Shopify | Synq",
    description:
      "Sell Sorcery: Contested Realm singles on Shopify, with Alpha, Beta and foil copies priced apart. Synq prices each condition from TCGplayer market data.",
    keywords: [
      "sell sorcery contested realm cards shopify",
      "sorcery tcg pricing",
      "sorcery contested realm shopify",
      "sorcery alpha beta price",
      "sorcery singles store",
    ],
    h1: "Sell and price Sorcery: Contested Realm cards on Shopify",
    intro:
      "Synq prices your Sorcery: Contested Realm singles and sealed product from TCGplayer market data and creates the Shopify products for you. Alpha and Beta copies of the same card are separate sets, each priced from its own market, so an Alpha card never sells at a Beta price.",
    art: none,
    sets: "Search by name or set across Alpha, Beta, Arthurian Legends, Dragonlord, Gothic and later sets, or any set you carry.",
    printings: {
      names: ["Normal", "Foil"],
      body: "Normal and foil copies are separate Shopify products, each priced from its own market price, and each condition is its own variant.",
    },
    sealed:
      "Booster boxes and preconstructed decks are one product each with a single Unopened variant. With Shopify POS installed, each can carry the box barcode (UPC) from the catalog, or a Synq code when there is none.",
    shelf: {
      singles:
        "Sorcery players build an Atlas of sites and a Spellbook around one Avatar, and collectors chase its traditional, painted art. Shops sell Elite and Unique cards to both, plus Avatars and sites for new decks. Alpha cards, from the game's first print run, carry a premium over the same cards in Beta.",
      sealed: [
        { name: "Booster boxes", note: "The display for each set." },
        { name: "Preconstructed decks", note: "Ready-to-play decks for new players." },
        { name: "Packs", note: "Single packs from an opened display." },
      ],
    },
    printingNotes: [
      "Sorcery rarities run Ordinary, Exceptional, Elite and Unique, and cards come as normal and foil copies. TCGplayer tracks a market price per printing, and in Synq each card and printing is its own Shopify product.",
      "Alpha and Beta share most of their cards but are different sets in the catalog. Each set's copy is its own product with its own price, so when you add an Avatar from Alpha it never picks up the Beta price.",
    ],
    example: { what: "an Alpha Elite", market: 40, markup: 0 },
    titleTip:
      "Make the set obvious. A title template of Product name, Set and Printing gives titles like \"Card name - Alpha - Foil\", which matters when the same card exists in Alpha and Beta.",
    importNote:
      "A TCGplayer export comes in as exact SKUs, set included. From your own sheet, a Set column matters most for Sorcery, so Alpha and Beta copies of the same card go to the right product.",
    faq: [
      noAccount("Sorcery cards"),
      {
        q: "Are Alpha and Beta Sorcery cards priced separately?",
        a: "Yes. They are separate sets in the catalog, each with its own TCGplayer market price.",
      },
      {
        q: "Can I price each condition from its own market for Sorcery?",
        a: "Yes. A rule can use each condition's own TCGplayer market price, which matters for older sets where played copies can sell close to Near Mint. Where a condition has no market of its own, it falls back to Near Mint's price less the percent you set.",
      },
      {
        q: "Can I add a markup to Unique cards only?",
        a: "Yes. A rule made for Sorcery alone can be limited to certain rarities, sets or printings, and the most specific rule wins.",
      },
      ...shared("Sorcery cards"),
    ],
  },

  /* ---------------------------------------------------------------- Digimon */
  {
    slug: "digimon-card-game",
    name: "Digimon Card Game",
    short: "Digimon",
    publisher: "Bandai",
    noun: "Digimon cards",
    icon: "/games/icon_digimon.png",
    monogram: "DCG",
    seoTitle: "Sell Digimon Card Game cards on Shopify | Synq",
    description:
      "Sell Digimon Card Game singles, alternate arts and booster boxes on Shopify. Synq prices each version and condition from TCGplayer market data on your schedule.",
    keywords: [
      "sell digimon cards shopify",
      "digimon card game pricing",
      "digimon tcg shopify app",
      "digimon alternate art price",
      "digimon singles store",
    ],
    h1: "Sell and price Digimon Card Game cards on Shopify",
    intro:
      "Synq prices your Digimon Card Game singles and sealed product from TCGplayer market data and creates the Shopify products for you. Alternate arts are priced as their own versions instead of sharing the regular card's price. No spreadsheets, and no TCGplayer account needed.",
    art: none,
    sets: "Search by name, set or card number across the BT and EX booster sets and ST starter decks, or any set you carry. Card numbers like BT1-001 work too.",
    printings: {
      names: [],
      body: "Each version, regular or alternate art, is its own Shopify product priced from its own market price, and each condition is its own variant.",
    },
    sealed:
      "Booster boxes, starter decks and advanced decks are one product each with a single Unopened variant. With Shopify POS installed, each can carry the box barcode (UPC) from the catalog, or a Synq code when there is none.",
    shelf: {
      singles:
        "Digimon players build decks around evolution lines, from Digi-Eggs up to Mega level Digimon, so shops sell full lines of a color as well as the Secret Rares and alternate arts collectors want. Reprints in later sets and starter decks keep many playable cards affordable.",
      sealed: [
        { name: "Booster boxes", note: "BT and EX displays for each release." },
        { name: "Starter decks", note: "ST decks around one color or character." },
        { name: "Advanced decks and special sets", note: "Higher-power decks and collector releases." },
      ],
    },
    printingNotes: [
      "Digimon cards carry a card number like BT1-001 and a rarity such as Common, Uncommon, Rare, Super Rare or Secret Rare. Many cards also have alternate art versions with the same number, which TCGplayer usually lists as their own entries with their own price.",
      "In Synq each version is its own Shopify product, so a regular card and its alternate art never share a price. Pick the one on your shelf from its photo when you add it.",
    ],
    example: { what: "an alternate art Secret Rare", market: 25, markup: 5 },
    titleTip:
      "Digimon players search by card number. A title template of Product name, Number and Rarity gives titles like \"Card name - BT number - SR\", so each version is easy to find.",
    importNote:
      "A TCGplayer export comes in as exact SKUs. From your own sheet, include a card number column so rows are easier to check in Review, and pick between regular and alternate art when a number fits both.",
    faq: [
      noAccount("Digimon cards"),
      {
        q: "Are Digimon alternate arts priced separately?",
        a: "Yes. When TCGplayer lists an alternate art as its own entry, it has its own market price and becomes its own Shopify product.",
      },
      {
        q: "Can I import my existing Digimon inventory?",
        a: "Yes. Import a TCGplayer export or a CSV. Synq matches each row to the catalog and shows every match for review before anything is created, with up to 5,000 products per import.",
      },
      {
        q: "Can I price Digi-Eggs and commons as bulk?",
        a: "Yes. A rule made for Digimon alone can be limited to certain rarities, with a minimum that keeps every card above a set amount.",
      },
      ...shared("Digimon cards"),
    ],
  },

  /* ----------------------------------------------------------------- Gundam */
  {
    slug: "gundam-card-game",
    name: "Gundam Card Game",
    short: "Gundam",
    publisher: "Bandai",
    noun: "Gundam Card Game cards",
    icon: "/games/icon_gundam.png",
    monogram: "GCG",
    seoTitle: "Sell Gundam Card Game cards on Shopify | Synq",
    description:
      "Sell Gundam Card Game singles, parallels and booster boxes on Shopify. Synq prices every version and condition from TCGplayer market data on your schedule.",
    keywords: [
      "sell gundam card game shopify",
      "gundam card game pricing",
      "gundam tcg shopify app",
      "gundam card game singles",
      "gundam card game booster box",
    ],
    h1: "Sell and price Gundam Card Game cards on Shopify",
    intro:
      "Synq prices your Gundam Card Game singles and sealed product from TCGplayer market data and creates the Shopify products for you. Bandai's Gundam game launched worldwide in 2025, and prices for a young game move fast between releases. Scheduled price rules keep your store in step without daily checking.",
    art: none,
    sets: "Search by name, set or card number across the GD booster sets, from GD01 Newtype Rising and GD02 Dual Impact onward, and the ST starter decks, or any set the catalog lists. Card numbers like GD01-001 work too.",
    printings: {
      names: [],
      body: "Each version, regular or parallel, is its own Shopify product priced from its own market price, and each condition is its own variant.",
    },
    sealed:
      "Booster boxes and starter decks are one product each with a single Unopened variant. With Shopify POS installed, each can carry the box barcode (UPC) from the catalog, or a Synq code when there is none.",
    shelf: {
      singles:
        "Gundam decks pair Units with the Pilots who fly them, plus Commands and Bases, built in two colors. Shops sell the playable Units and Pilots of the current sets, and parallel versions and high rarities to collectors who follow the Gundam series. In a young game, a single strong card can swing in price within days.",
      sealed: [
        { name: "Booster boxes", note: "The GD display for each set." },
        { name: "Starter decks", note: "Ready-to-play ST decks, an easy first purchase." },
        { name: "Packs", note: "Single packs from an opened display." },
      ],
    },
    printingNotes: [
      "Gundam cards carry a card number like GD01-001 and a rarity. Many cards also come in parallel versions with special art or finish, shown with a plus in the rarity such as LR+, which TCGplayer lists as their own entries with their own market price.",
      "In Synq each version is its own Shopify product, so a parallel never sells at the regular card's price. Where a played condition has no sales history yet, a rule can price it from Near Mint's market less a percent.",
    ],
    example: { what: "a parallel Unit", market: 14, markup: 5 },
    titleTip:
      "A title template of Product name, Number and Rarity gives titles like \"Card name - GD01 number - rarity\", which matches how Gundam players look cards up.",
    importNote:
      "A TCGplayer export comes in as exact SKUs. If you've tracked Gundam in a spreadsheet since launch, a name or card number column and a quantity are enough to start.",
    faq: [
      noAccount("Gundam Card Game cards"),
      {
        q: "How often are Gundam Card Game prices updated?",
        a: "Your price rules run on the schedule you choose, every day, on the days you pick, or once, at a time in your store's time zone. You can also run a rule by hand right after a release.",
      },
      {
        q: "Are parallel Gundam cards priced apart from the regular version?",
        a: "Yes. When TCGplayer lists a parallel as its own entry, it has its own market price and becomes its own Shopify product.",
      },
      {
        q: "What if a new Gundam card has no market price yet?",
        a: "Synq shows that there's no TCGplayer market price for that condition and asks you to set your price when you add it. Cards that do have a market price are priced by your rule as usual.",
      },
      {
        q: "Can I preview price changes before they hit my store?",
        a: "Yes. Every rule opens on a preview of each product and condition, with the original and updated price, sorted into what goes up, down or stays the same.",
      },
      ...shared("Gundam Card Game cards"),
    ],
  },

  /* ------------------------------------------------------------ Union Arena */
  {
    slug: "union-arena",
    name: "Union Arena",
    short: "Union Arena",
    publisher: "Bandai",
    noun: "Union Arena cards",
    monogram: "UA",
    seoTitle: "Sell Union Arena cards on Shopify | Synq",
    description:
      "Sell Union Arena singles and booster boxes on Shopify, series by series. Synq prices each card, parallel and condition from TCGplayer data on your schedule.",
    keywords: [
      "sell union arena cards shopify",
      "union arena tcg pricing",
      "union arena shopify app",
      "union arena singles store",
      "union arena booster box",
    ],
    h1: "Sell and price Union Arena cards on Shopify",
    intro:
      "Synq prices your Union Arena singles and sealed product from TCGplayer market data and creates the Shopify products for you. Bandai's Union Arena is built from anime series, one per booster set, so your customers often shop by series. Find the card, pick its version and condition, and it's in your store with its photo and price, for sale as soon as you publish it.",
    art: none,
    sets: "Search by name, set or card number across Union Arena sets for series such as Code Geass, Jujutsu Kaisen and Hunter x Hunter, or any set the catalog lists. Type @ and a series name to pin its sets.",
    printings: {
      names: [],
      body: "Each version, regular or parallel, is its own Shopify product priced from its own market price, and each condition is its own variant.",
    },
    sealed:
      "Booster boxes and starter decks are one product each with a single Unopened variant. With Shopify POS installed, each can carry the box barcode (UPC) from the catalog, or a Synq code when there is none.",
    shelf: {
      singles:
        "Union Arena decks are usually built from one series, so a Jujutsu Kaisen player buys Jujutsu Kaisen cards. Shops sell playable cards series by series, and star-marked parallels and Super Rares to fans of each anime, who may never play the game at all.",
      sealed: [
        { name: "Booster boxes", note: "One series per set, so stock follows which series sells." },
        { name: "Starter decks", note: "A ready deck for one series, an easy first purchase." },
        { name: "Packs", note: "Single packs from an opened display." },
      ],
    },
    printingNotes: [
      "Each Union Arena card has a card number tied to its series and set, and a rarity. Many cards also have parallel versions marked with one to three stars, such as Super Rare 2-Star. TCGplayer lists these as their own entries with their own market price.",
      "In Synq each version is its own Shopify product priced from its own market, so a star parallel never sells at the regular card's price.",
    ],
    example: { what: "a star parallel Super Rare", market: 19, markup: 5 },
    titleTip:
      "Since fans shop by series, put the set in the title. A title template of Product name, Set and Rarity gives titles like \"Card name - Jujutsu Kaisen - SR\", so search on your store finds every card of a series.",
    importNote:
      "A TCGplayer export comes in as exact SKUs. From your own sheet, a set column helps, because character names repeat across Union Arena sets for the same series.",
    faq: [
      noAccount("Union Arena cards"),
      {
        q: "Are Union Arena star parallels priced separately?",
        a: "Yes. When TCGplayer lists a parallel as its own entry, it has its own market price and becomes its own Shopify product.",
      },
      {
        q: "Can I set different prices for different Union Arena series?",
        a: "Yes. A rule made for Union Arena alone can be limited to certain sets, so you can price one series apart from the rest. The most specific rule wins.",
      },
      {
        q: "Can customers find all the cards of one series in my store?",
        a: "Put the set name in your product titles with a title template, and your store's search finds every card of that series. Synq files each game's singles and sealed into the collections you pick.",
      },
      ...shared("Union Arena cards"),
    ],
  },

  /* -------------------------------------------------------------- UniVersus */
  {
    slug: "universus",
    name: "UniVersus",
    short: "UniVersus",
    publisher: "UVS Games",
    noun: "UniVersus cards",
    monogram: "UVS",
    seoTitle: "Sell UniVersus cards on Shopify | Synq",
    description:
      "Sell UniVersus singles and sealed product on Shopify. Synq prices each UniVersus printing and condition from TCGplayer market data and keeps prices current.",
    keywords: [
      "sell universus cards shopify",
      "universus ccg pricing",
      "universus shopify app",
      "universus singles store",
      "my hero academia ccg shopify",
    ],
    h1: "Sell and price UniVersus cards on Shopify",
    intro:
      "Synq prices your UniVersus singles and sealed product from TCGplayer market data and creates the Shopify products for you. UniVersus brings licensed series like My Hero Academia into one game, and Synq prices each card, printing and condition from its own market. No spreadsheets, and no TCGplayer account needed.",
    art: none,
    sets: "Search by name, set or card number across UniVersus sets, including the My Hero Academia releases, or any set the catalog lists.",
    printings: {
      names: [],
      body: "Each printing is its own Shopify product priced from its own market price, and each condition is its own variant.",
    },
    sealed:
      "Booster boxes and decks are one product each with a single Unopened variant. With Shopify POS installed, each can carry the box barcode (UPC) from the catalog, or a Synq code when there is none.",
    shelf: {
      singles:
        "UniVersus players build around a Character card with a deck of Attacks, Foundations, Actions and Assets, often from one licensed series. Shops sell playable cards for local events, and foils, alternate arts and Secret Rares to fans of the series.",
      sealed: [
        { name: "Booster boxes", note: "The display for each set." },
        { name: "Challenger Series decks", note: "Ready-to-play decks, such as the My Hero Academia ones." },
        { name: "Packs", note: "Single packs from an opened display." },
      ],
    },
    printingNotes: [
      "UniVersus cards come in normal and foil printings, and alternate art versions are listed as their own entries, each with its own market price on TCGplayer. In Synq each card and printing is its own Shopify product.",
      "UniVersus has a smaller market than the largest games, so some cards and played conditions sell rarely. A rule can price played copies from Near Mint's market less a percent, and a minimum keeps rarely traded cards from being listed too low.",
    ],
    example: { what: "a foil Character card", market: 8, markup: 10 },
    titleTip:
      "A title template of Product name, Set and Printing gives titles like \"Card name - Set name - Foil\", so shoppers can tell versions apart.",
    importNote:
      "A TCGplayer export comes in as exact SKUs. From your own sheet, a name and quantity are enough to start; Synq asks you to pick when a name fits several cards.",
    faq: [
      noAccount("UniVersus cards"),
      {
        q: "Does Synq cover UniVersus My Hero Academia sets?",
        a: "Synq prices the UniVersus sets that TCGplayer lists, including My Hero Academia releases. Search by name or set to see what's there.",
      },
      {
        q: "What if a UniVersus card has no market price?",
        a: "Synq shows that there's no TCGplayer market price for that condition and asks you to set your price when you add it.",
      },
      {
        q: "Can I keep cheap UniVersus cards above a minimum?",
        a: "Yes. A rule can set a minimum, a fixed amount or your cost plus a margin, so low-value cards never drop below it.",
      },
      ...shared("UniVersus cards"),
    ],
  },

  /* ---------------------------------------------------------- Grand Archive */
  {
    slug: "grand-archive",
    name: "Grand Archive",
    short: "Grand Archive",
    publisher: "Weebs of the Shore",
    noun: "Grand Archive cards",
    monogram: "GA",
    seoTitle: "Sell Grand Archive cards on Shopify | Synq",
    description:
      "Sell Grand Archive singles, foils and collector rarities on Shopify. Synq prices each printing and condition from its own TCGplayer market, on your schedule.",
    keywords: [
      "sell grand archive cards shopify",
      "grand archive tcg pricing",
      "grand archive shopify app",
      "grand archive foil price",
      "grand archive singles store",
    ],
    h1: "Sell and price Grand Archive cards on Shopify",
    intro:
      "Synq prices your Grand Archive singles and sealed product from TCGplayer market data and creates the Shopify products for you, with each foil treatment priced from its own market. Find the card, pick its printing and condition, and it's in your store with its photo and price, for sale as soon as you publish it. No spreadsheets, and no TCGplayer account needed.",
    art: none,
    sets: "Search by name, set or card number across sets like Dawn of Ashes, Alchemical Revolution and Mortal Ambition, or any Grand Archive set the catalog lists.",
    printings: {
      names: ["Normal", "Foil"],
      body: "Normal and foil copies are separate Shopify products, each priced from its own market price, and each condition is its own variant.",
    },
    sealed:
      "Booster boxes and starter decks are one product each with a single Unopened variant. With Shopify POS installed, each can carry the box barcode (UPC) from the catalog, or a Synq code when there is none.",
    shelf: {
      singles:
        "Grand Archive players build around a Champion who levels up during the game, so shops sell Champion lines and the playable cards around them, plus foils and collector rarities to collectors.",
      sealed: [
        { name: "Booster boxes", note: "The display for each set." },
        { name: "Starter decks", note: "Ready decks around one Champion." },
        { name: "Packs", note: "Single packs from an opened display." },
      ],
    },
    printingNotes: [
      "Grand Archive cards come in normal and foil copies, and collector rarities such as Collector Super Rare (CSR) are special versions of a card. TCGplayer tracks a market price per printing, and in Synq each card and printing is its own Shopify product.",
      "Collector versions with the same name as a regular card usually appear as their own entries, so they carry their own price instead of the regular one.",
    ],
    example: { what: "a foil Champion", market: 12, markup: 5 },
    titleTip:
      "A title template of Product name, Set and Printing gives titles like \"Card name - Mortal Ambition - Foil\", so foil and regular copies read differently in your store.",
    importNote:
      "A TCGplayer export comes in as exact SKUs. From your own sheet, add a Printing column so foils go to the right product.",
    faq: [
      noAccount("Grand Archive cards"),
      {
        q: "Are Grand Archive foils priced apart from normal copies?",
        a: "Yes. Each printing is its own Shopify product with its own TCGplayer market price.",
      },
      {
        q: "Does Synq work for a store that sells only a few games?",
        a: "Yes. Pick only the games you sell. You can add more later in Settings, and enabling a game imports nothing on its own.",
      },
      {
        q: "Can I price Grand Archive differently from my other games?",
        a: "Yes. Make a rule for Grand Archive alone. A rule for one game is more specific than a rule for every game, so it wins for those cards.",
      },
      ...shared("Grand Archive cards"),
    ],
  },

  /* ------------------------------------------------------- Final Fantasy TCG */
  {
    slug: "final-fantasy-tcg",
    name: "Final Fantasy TCG",
    short: "Final Fantasy TCG",
    publisher: "Square Enix",
    noun: "Final Fantasy TCG cards",
    monogram: "FF",
    seoTitle: "Sell Final Fantasy TCG cards on Shopify | Synq",
    description:
      "Sell Final Fantasy Trading Card Game singles and Opus boxes on Shopify. Synq prices each foil and condition from TCGplayer market data and keeps prices current.",
    keywords: [
      "sell final fantasy tcg cards shopify",
      "final fantasy tcg pricing",
      "fftcg shopify app",
      "fftcg singles store",
      "final fantasy opus booster box",
    ],
    h1: "Sell and price Final Fantasy TCG cards on Shopify",
    intro:
      "Synq prices your Final Fantasy Trading Card Game singles and sealed product from TCGplayer market data and creates the Shopify products for you. Find the card, pick its printing and condition, and it's in your store with its photo and price, for sale as soon as you publish it. From then on your prices follow the market on your schedule.",
    art: none,
    sets: "Search by name, set or card number across the numbered Opus sets and the named sets that followed, or any set you carry. Card numbers work too.",
    printings: {
      names: ["Normal", "Foil"],
      body: "Normal and foil copies are separate Shopify products, each priced from its own market price, and each condition is its own variant.",
    },
    sealed:
      "Booster boxes and starter sets are one product each with a single Unopened variant. With Shopify POS installed, each can carry the box barcode (UPC) from the catalog, or a Synq code when there is none.",
    shelf: {
      singles:
        "FFTCG players build decks from the game's elements, with Forwards, Backups and Summons from across the Final Fantasy series. Shops sell Legend and Hero rarity cards to players, and foils and full arts to collectors.",
      sealed: [
        { name: "Booster boxes", note: "The display for each Opus or named set." },
        { name: "Starter sets", note: "Ready decks themed on one Final Fantasy game." },
        { name: "Packs", note: "Single packs from an opened display." },
      ],
    },
    printingNotes: [
      "FFTCG card numbers combine the set, the card and its rarity letter, where the closing letter is the rarity, such as H for Hero or L for Legend. Cards come in normal and foil copies, and TCGplayer tracks a price for each. In Synq each card and printing is its own Shopify product.",
      "One thing to watch: Magic: The Gathering also has a Final Fantasy set. Those cards are Magic cards and live under Magic in Synq. The Final Fantasy Trading Card Game is its own game with its own catalog, so the two never get mixed up.",
    ],
    example: { what: "a foil Legend", market: 10, markup: 5 },
    titleTip:
      "A title template of Product name, Number and Printing gives titles like \"Card name - number - Foil\", which matches how FFTCG players look cards up and keeps them apart from Magic's Final Fantasy cards.",
    importNote:
      "A TCGplayer export comes in as exact SKUs. From your own sheet, a Game column helps keep FFTCG rows apart from Magic's Final Fantasy set, and in Review you pick the right card whenever a name fits more than one.",
    faq: [
      noAccount("Final Fantasy TCG cards"),
      {
        q: "Is Magic's Final Fantasy set the same as the Final Fantasy TCG?",
        a: "No. Magic: The Gathering's Final Fantasy cards are Magic cards and live under Magic in Synq. The Final Fantasy Trading Card Game by Square Enix is its own game with its own catalog and prices.",
      },
      {
        q: "Are FFTCG foils priced apart from normal copies?",
        a: "Yes. Each printing is its own Shopify product with its own TCGplayer market price.",
      },
      {
        q: "Can I search FFTCG cards by card number?",
        a: "Yes. Search takes a name or a number, and @ followed by a set name pins one set.",
      },
      ...shared("Final Fantasy TCG cards"),
    ],
  },

  /* ---------------------------------------------------------- Weiss Schwarz */
  {
    slug: "weiss-schwarz",
    name: "Weiss Schwarz",
    short: "Weiss Schwarz",
    publisher: "Bushiroad",
    noun: "Weiss Schwarz cards",
    monogram: "WS",
    seoTitle: "Sell Weiss Schwarz cards on Shopify | Synq",
    description:
      "Sell Weiss Schwarz singles, signed SP cards and booster boxes on Shopify. Synq prices each card and condition from TCGplayer market data on your schedule.",
    keywords: [
      "sell weiss schwarz cards shopify",
      "weiss schwarz pricing",
      "weiss schwarz shopify app",
      "weiss schwarz singles store",
      "weiss schwarz sp card price",
    ],
    h1: "Sell and price Weiss Schwarz cards on Shopify",
    intro:
      "Synq prices your Weiss Schwarz singles and sealed product from TCGplayer market data and creates the Shopify products for you. Bushiroad's game is built from anime and game series, and its high rarities sell for many times the regular card. Synq prices each version from its own market.",
    art: none,
    sets: "Search by name, set or card number across Weiss Schwarz booster sets and trial decks for each series, or any set the catalog lists.",
    printings: {
      names: [],
      body: "Each version is its own Shopify product priced from its own market price, and each condition is its own variant.",
    },
    sealed:
      "Booster boxes and trial decks are one product each with a single Unopened variant. With Shopify POS installed, each can carry the box barcode (UPC) from the catalog, or a Synq code when there is none.",
    shelf: {
      singles:
        "Weiss Schwarz decks are usually built from one series, so shops stock by series and sell playable cards to players and high rarities, such as signed SP cards and other special rarities, to fans of each title.",
      sealed: [
        { name: "Booster boxes", note: "One series per set." },
        { name: "Trial decks", note: "A ready deck for one series." },
        { name: "Packs", note: "Single packs from an opened display." },
      ],
    },
    printingNotes: [
      "Each Weiss Schwarz card number carries its series and set code. The same character often appears at several rarities, from Common up to special and signed rarities, each listed apart. TCGplayer gives each its own market price, so each becomes its own Shopify product in Synq.",
      "High-rarity versions can sell for many times the regular card. Since Synq prices each from its own market, a signed version never sells at the price of its regular copy.",
    ],
    example: { what: "an SP signed card", market: 45, markup: 0 },
    titleTip:
      "Fans search by series and card number. A title template of Product name, Set and Number keeps each version of a character clear in your store.",
    importNote:
      "A TCGplayer export comes in as exact SKUs. From your own sheet, a card number column is the clearest way to check each row in Review.",
    faq: [
      noAccount("Weiss Schwarz cards"),
      {
        q: "Are SP and other high rarities priced separately?",
        a: "Yes. Each version is its own TCGplayer entry with its own market price, so it becomes its own Shopify product.",
      },
      {
        q: "Can I price one Weiss Schwarz series apart from the rest?",
        a: "Yes. A rule made for Weiss Schwarz alone can be limited to certain sets, and the most specific rule wins.",
      },
      ...shared("Weiss Schwarz cards"),
    ],
  },

  /* ---------------------------------------------------- Star Wars Unlimited */
  {
    slug: "star-wars-unlimited",
    name: "Star Wars: Unlimited",
    short: "Star Wars: Unlimited",
    publisher: "Fantasy Flight Games",
    noun: "Star Wars: Unlimited cards",
    monogram: "SWU",
    seoTitle: "Sell Star Wars: Unlimited cards on Shopify | Synq",
    description:
      "Sell Star Wars: Unlimited singles, Hyperspace and Showcase cards on Shopify. Synq prices each version and condition from TCGplayer market data on your schedule.",
    keywords: [
      "sell star wars unlimited cards shopify",
      "star wars unlimited card pricing",
      "swu shopify app",
      "star wars unlimited hyperspace price",
      "swu singles store",
    ],
    h1: "Sell and price Star Wars: Unlimited cards on Shopify",
    intro:
      "Synq prices your Star Wars: Unlimited singles and sealed product from TCGplayer market data and creates the Shopify products for you. Hyperspace, Showcase and foil versions are priced as their own products, so each one follows its own market. No spreadsheets, and no TCGplayer account needed.",
    art: none,
    sets: "Search by name, set or card number across Spark of Rebellion, Shadows of the Galaxy, Twilight of the Republic, Jump to Lightspeed, Legends of the Force and later sets.",
    printings: {
      names: ["Normal", "Foil"],
      body: "Normal and foil copies, and Hyperspace and Showcase versions, are separate Shopify products, each priced from its own market price, and each condition is its own variant.",
    },
    sealed:
      "Booster boxes, Two-Player Starters and prerelease kits are one product each with a single Unopened variant. With Shopify POS installed, each can carry the box barcode (UPC) from the catalog, or a Synq code when there is none.",
    shelf: {
      singles:
        "Star Wars: Unlimited decks are built around a Leader and a Base, so Leaders and the playable units of each aspect are what players ask for. Collectors chase Hyperspace versions, foils and Showcase Leaders. One card name can exist in four or more versions at very different prices.",
      sealed: [
        { name: "Booster boxes", note: "The display for each set." },
        { name: "Two-Player Starters", note: "A ready way into the game for two players." },
        { name: "Prerelease kits", note: "Sold around each release for prerelease events." },
        { name: "Packs", note: "Single packs from an opened display." },
      ],
    },
    printingNotes: [
      "A Star Wars: Unlimited card can come as a normal copy, a foil, a Hyperspace version with full-bleed art, a Hyperspace foil, and for Leaders a Showcase version. TCGplayer lists Hyperspace and Showcase as their own entries, with their own printings and market price.",
      "In Synq each card and printing is its own Shopify product, so a Showcase Leader is never priced from its normal copy, and each condition is its own variant with its own stock.",
    ],
    example: { what: "a Hyperspace foil Leader", market: 28, markup: 5 },
    titleTip:
      "With so many versions of one card, a title template of Product name, Set and Printing gives titles like \"Darth Vader (Hyperspace) - Spark of Rebellion - Foil\", so each version reads clearly.",
    importNote:
      "A TCGplayer export comes in as exact SKUs, version included. From your own sheet, a name alone fits several versions of a card, so add a Printing or TCGplayer ID column when you can, or pick the version in Review.",
    faq: [
      noAccount("Star Wars: Unlimited cards"),
      {
        q: "Are Hyperspace and Showcase cards priced separately?",
        a: "Yes. They appear as their own entries on TCGplayer with their own market price, and each becomes its own Shopify product in Synq.",
      },
      {
        q: "Can I add a markup only to Showcase Leaders?",
        a: "Yes. A rule made for Star Wars: Unlimited alone can be limited to certain rarities or printings. The most specific rule wins, so the rest of the game keeps its own rule.",
      },
      {
        q: "Can I sell prerelease kits and starters?",
        a: "Yes, as sealed products with a single Unopened variant, separate from singles.",
      },
      ...shared("Star Wars: Unlimited cards"),
    ],
  },

  /* -------------------------------------------------------------- Elestrals */
  {
    slug: "elestrals",
    name: "Elestrals",
    short: "Elestrals",
    publisher: "Elestrals",
    noun: "Elestrals cards",
    monogram: "EL",
    seoTitle: "Sell Elestrals cards on Shopify | Synq",
    description:
      "Sell Elestrals singles and sealed product on Shopify. Synq prices each Elestrals printing and condition from TCGplayer market data and keeps prices current.",
    keywords: [
      "sell elestrals cards shopify",
      "elestrals tcg pricing",
      "elestrals shopify app",
      "elestrals singles store",
      "elestrals booster box",
    ],
    h1: "Sell and price Elestrals cards on Shopify",
    intro:
      "Synq prices your Elestrals singles and sealed product from TCGplayer market data and creates the Shopify products for you. Find the card, pick its printing and condition, and it's in your store with its photo and price, for sale as soon as you publish it. For a smaller game with a thinner market, minimums and per-condition rules keep prices sensible.",
    art: none,
    sets: "Search by name, set or card number across sets like Base Set, Divine Champions: Firestorm and Shattered Stars, or any Elestrals set the catalog lists.",
    printings: {
      names: ["Normal", "Holo", "Reverse Holo"],
      body: "Each printing is its own Shopify product priced from its own market price, and each condition is its own variant.",
    },
    sealed:
      "Booster boxes and decks are one product each with a single Unopened variant. With Shopify POS installed, each can carry the box barcode (UPC) from the catalog, or a Synq code when there is none.",
    shelf: {
      singles:
        "Elestrals shops sell playable singles to a growing player base and higher-rarity art versions to collectors. In a smaller game, fewer copies change hands, so a fair price for a played card is harder to see from sales alone.",
      sealed: [
        { name: "Booster boxes", note: "The display for each set." },
        { name: "Starter decks", note: "Ready decks for new players." },
        { name: "Packs", note: "Single packs from an opened display." },
      ],
    },
    printingNotes: [
      "Elestrals cards come as Normal, Holo or Reverse Holo printings, and Full Art and Stellar versions are listed as their own entries, each with its own market price on TCGplayer, and in Synq each one is its own Shopify product.",
      "Played conditions of a smaller game often have no market price of their own. A Synq rule can price them from Near Mint's market less a percent, so every condition still gets a price.",
    ],
    example: { what: "a rare foil", market: 6, markup: 10 },
    titleTip:
      "A title template of Product name, Set and Printing gives clear titles like \"Card name - Set name - Foil\".",
    importNote:
      "A TCGplayer export comes in as exact SKUs. From your own sheet, a name and quantity are enough; rows Synq can't place download as a list with the reason for each.",
    faq: [
      noAccount("Elestrals cards"),
      {
        q: "What if an Elestrals card has no market price?",
        a: "Synq shows that there's no TCGplayer market price for that condition and asks you to set your price when you add it.",
      },
      {
        q: "How are played Elestrals cards priced with little sales data?",
        a: "Choose \"Near Mint's, less a percent\" in your rule, and every condition is priced from Near Mint's market less the percent you set, for example 10% off for Lightly Played.",
      },
      ...shared("Elestrals cards"),
    ],
  },

  /* ---------------------------------------------- Dragon Ball Fusion World */
  {
    slug: "dragon-ball-super-fusion-world",
    name: "Dragon Ball Super: Fusion World",
    short: "Fusion World",
    publisher: "Bandai",
    noun: "Dragon Ball Super: Fusion World cards",
    monogram: "DBS",
    seoTitle: "Sell Dragon Ball Super: Fusion World cards on Shopify | Synq",
    description:
      "Sell Dragon Ball Super: Fusion World singles, alternate arts and booster boxes on Shopify. Synq prices each version and condition from TCGplayer market data.",
    keywords: [
      "sell dragon ball super fusion world cards shopify",
      "fusion world card pricing",
      "dragon ball fusion world shopify",
      "fusion world singles store",
      "fusion world booster box",
    ],
    h1: "Sell and price Dragon Ball Super: Fusion World cards on Shopify",
    intro:
      "Synq prices your Dragon Ball Super: Fusion World singles and sealed product from TCGplayer market data and creates the Shopify products for you. Find the card, pick its version and condition, and it's in your store with its photo and price, for sale as soon as you publish it. From then on your prices follow the market on your schedule.",
    art: none,
    sets: "Search by name, set or card number across the FB booster sets, such as FB01 Awakened Pulse and FB02 Blazing Aura, and the FS starter decks. Card numbers like FB01-001 work too.",
    printings: {
      names: [],
      body: "Each version, regular or alternate art, is its own Shopify product priced from its own market price, and each condition is its own variant.",
    },
    sealed:
      "Booster boxes and starter decks are one product each with a single Unopened variant. With Shopify POS installed, each can carry the box barcode (UPC) from the catalog, or a Synq code when there is none.",
    shelf: {
      singles:
        "Fusion World decks are built around a Leader card, so Leaders and the playable cards of their colors are what players ask for. Collectors chase Secret Rares and alternate art versions, which players also call parallels.",
      sealed: [
        { name: "Booster boxes", note: "The FB display for each set." },
        { name: "Starter decks", note: "FS decks built around one Leader." },
        { name: "Packs", note: "Single packs from an opened display." },
      ],
    },
    printingNotes: [
      "Fusion World cards carry a card number like FB01-001 and a rarity. Many also have alternate art versions, which TCGplayer lists as their own entries with their own market price. In Synq each version is its own Shopify product.",
      "Fusion World is a different game from the earlier Dragon Ball Super Card Game. Synq's game list names Fusion World; if you carry a game that's missing, you can request it from the spreadsheet import.",
    ],
    example: { what: "an alternate art Leader", market: 15, markup: 5 },
    titleTip:
      "A title template of Product name, Number and Rarity gives titles like \"Card name - FB01 number - rarity\", which matches how Fusion World players look cards up.",
    importNote:
      "A TCGplayer export comes in as exact SKUs. From your own sheet, a card number column makes rows easy to check in Review, and you pick between regular and alternate art when a number fits both.",
    faq: [
      noAccount("Fusion World cards"),
      {
        q: "Does Synq support the older Dragon Ball Super Card Game?",
        a: "Synq's game list names Dragon Ball Super: Fusion World. If you carry a game that isn't in the catalog, you can ask for it from the spreadsheet import with \"Request this game\".",
      },
      {
        q: "Are Fusion World alternate arts priced separately?",
        a: "Yes. TCGplayer lists each alternate art as its own entry, so it has its own market price and becomes its own Shopify product.",
      },
      ...shared("Fusion World cards"),
    ],
  },
];

/** every game page, for the sitemap, llms.txt and cross-links */
export const GAME_LINKS = GAMES.map((g) => ({
  slug: g.slug,
  name: g.name,
  path: `/for/${g.slug}`,
  title: g.seoTitle,
  description: g.description,
}));

export function getGame(slug: string): GamePage | undefined {
  return GAMES.find((g) => g.slug === slug);
}
