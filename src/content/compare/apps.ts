/* The shared fact table behind /compare and the 2026 roundup. Synq's cells
   come from the app's own code; every other cell comes from the public page
   named in `s` (checked October 2026). Anything a page doesn't say is "Not
   stated", never a guess. */

import type { Cell } from "./types";
import type { SourceId } from "./sources";

export const COLUMNS = [
  { key: "shopify", label: "Shopify-native" },
  { key: "prices", label: "Price source" },
  { key: "rules", label: "Price rules and automation" },
  { key: "conditions", label: "Condition variants" },
  { key: "sealed", label: "Sealed" },
  { key: "imports", label: "Bulk import" },
  { key: "pos", label: "POS barcodes" },
  { key: "buylist", label: "Buylist" },
  { key: "events", label: "Events" },
  { key: "plans", label: "Pricing" },
  { key: "rating", label: "App Store rating" },
] as const;

export type ColumnKey = (typeof COLUMNS)[number]["key"];

export type AppEntry = {
  id: string;
  name: string;
  /** where a reader can check it themselves */
  url: string;
  kind: "Shopify app" | "Platform";
  /** our own page about it, if there is one */
  page?: string;
  bestFor: string;
  summary: string;
  /** the roundup shows the first two of each: put the most useful first */
  strengths: string[];
  limits: string[];
  sources: SourceId[];
  cells: Record<ColumnKey, Cell>;
};

const NS = (s?: SourceId[]): Cell => ({ v: "Not stated", tone: "unknown", s });

export const SYNQ: AppEntry = {
  id: "synq",
  name: "Synq",
  url: "https://apps.shopify.com/synq-tcg-card-manager",
  kind: "Shopify app",
  page: "/",
  bestFor:
    "Shopify stores that sell singles and sealed across several games and want daily TCGplayer-based prices with their own rules, plus scannable codes at the Shopify POS counter.",
  summary:
    "Synq is our app. It adds cards from a catalog of 19 games, makes one Shopify product per card and printing with a variant per condition, and prices them from TCGplayer market prices through rules you schedule. It doesn't do buylists, events or exports.",
  strengths: [
    "Price rules by game, set, rarity, printing and condition, with a minimum from your cost, rounding, a preview before every run and a log of every run",
    "Every feature on every plan, Free included; plans differ only by how many products you can have",
    "A scannable code per condition for Shopify POS",
  ],
  limits: [
    "TCGplayer is the only price source (in USD, converted to your store currency)",
    "No buylist, no events, no export",
    "Three App Store reviews so far",
  ],
  sources: ["as-synq"],
  cells: {
    shopify: { v: "Yes, an embedded Shopify app", tone: "yes", s: ["as-synq"] },
    prices: { v: "TCGplayer market price, daily, converted to your store currency" },
    rules: {
      v: "Rules by game, set, rarity, printing and condition; margin, minimum, rounding; daily, some days or once; preview and run log",
      tone: "yes",
    },
    conditions: { v: "NM, LP, MP, HP, DMG as variants of one product", tone: "yes" },
    sealed: { v: "Yes", tone: "yes" },
    imports: { v: "TCGplayer export or spreadsheet (CSV, TSV, TXT), up to 5,000 per import", tone: "yes" },
    pos: { v: "Yes, a code per condition for singles, box UPC for sealed", tone: "yes" },
    buylist: { v: "No", tone: "no" },
    events: { v: "No", tone: "no" },
    plans: { v: "Free (100 products), $29, $79, $149 a month", s: ["as-synq"] },
    rating: { v: "3.8 (3 reviews)", s: ["as-synq"] },
  },
};

export const COMPETITORS: AppEntry[] = [
  {
    id: "tcg-importer",
    name: "TCG Importer",
    url: "https://apps.shopify.com/tcgapp",
    kind: "Shopify app",
    page: "/compare/tcg-importer",
    bestFor:
      "Pokémon-led Shopify stores that want fast imports from a card database, live price sync on selected products, and graded card imports on the top plan.",
    summary:
      "A Shopify app from GG Trading & Collectables in Perth, Australia, launched March 2026. It imports singles and sealed into Shopify and keeps chosen products in line with market prices, with a markup and a minimum price.",
    strengths: [
      "A 4.4 rating from 8 reviews, the most of the Shopify apps compared here, and public replies from the developer",
      "Live Pricing Sync that updates every 4 hours",
      "Graded card imports and wholesale stock access",
    ],
    limits: [
      "Live pricing covers 25 or 50 products on the two smaller paid plans",
      "Pricing is powered by PriceCharting at this stage, per the developer",
      "No barcode generation, per a June 2026 developer reply",
    ],
    sources: ["as-tcgi", "as-tcgi-rev", "tcgi-pricing", "tcgi-features", "tcgi-guide"],
    cells: {
      shopify: { v: "Yes, a Shopify app", tone: "yes", s: ["as-tcgi"] },
      prices: {
        v: "PriceCharting at this stage, per the developer; the listing also names TCGplayer",
        s: ["as-tcgi", "as-tcgi-rev"],
      },
      rules: {
        v: "Live Pricing Sync every 4 hours with a % markup and a minimum; 25, 50 or unlimited products by plan",
        tone: "yes",
        s: ["tcgi-features", "tcgi-guide", "tcgi-pricing"],
      },
      conditions: NS(["as-tcgi", "tcgi-guide"]),
      sealed: { v: "Yes", tone: "yes", s: ["as-tcgi"] },
      imports: {
        v: "Bulk import from its card database; 5 total, 100 or 300 a week, or unlimited by plan",
        tone: "yes",
        s: ["as-tcgi", "tcgi-pricing"],
      },
      pos: { v: "No barcode generation, per a June 2026 developer reply", tone: "no", s: ["as-tcgi-rev"] },
      buylist: NS(["as-tcgi"]),
      events: NS(["as-tcgi"]),
      plans: { v: "Free (5 imports), $29, $49, $129 a month", s: ["as-tcgi"] },
      rating: { v: "4.4 (8 reviews)", s: ["as-tcgi"] },
    },
  },
  {
    id: "tcg-automate",
    name: "TCG Automate",
    url: "https://apps.shopify.com/tcg-automate-2",
    kind: "Shopify app",
    page: "/compare/tcg-automate",
    bestFor:
      "Sellers who list from photos of their cards, sell on eBay as well as Shopify, or handle sports and graded cards.",
    summary:
      "An AI card scanner and bulk lister from Troy, Michigan, launched on the App Store in August 2026. It identifies cards from photos and creates listings on eBay, Shopify, Misprint and more, with scheduled repricing.",
    strengths: [
      "Photo scanning that fills in titles, prices and details",
      "Lists on eBay, Shopify and Misprint, with cross-listing on Pro and up",
      "Sports, graded (PSA and CGC on Standard and up) and TCG cards",
    ],
    limits: [
      "Plans are sized by scans a month, not by products in your store",
      "No reviews on the App Store yet",
      "POS barcodes, buylist and events are not stated",
    ],
    sources: ["as-tcga", "tcga-home", "tcga-reprice"],
    cells: {
      shopify: { v: "Yes, a Shopify app; also lists on eBay and Misprint", tone: "yes", s: ["as-tcga", "tcga-home"] },
      prices: { v: "TCGplayer and eBay market values", s: ["tcga-home"] },
      rules: {
        v: "Repricing rules run daily or weekly across eBay, Shopify and Misprint (beta on Pro)",
        tone: "yes",
        s: ["tcga-reprice", "tcga-home"],
      },
      conditions: { v: "Condition set per card before publishing", tone: "yes", s: ["as-tcga", "tcga-reprice"] },
      sealed: { v: "A sealed category in repricing rules", s: ["tcga-reprice"] },
      imports: {
        v: "AI photo scans in batches; Roca Sifter CSV imports on Pro and up",
        tone: "yes",
        s: ["as-tcga", "tcga-home"],
      },
      pos: NS(["as-tcga"]),
      buylist: NS(["as-tcga"]),
      events: NS(["as-tcga"]),
      plans: { v: "$10 to $200 a month, by scans", s: ["as-tcga"] },
      rating: { v: "No reviews yet", tone: "unknown", s: ["as-tcga"] },
    },
  },
  {
    id: "lgs-forge",
    name: "LGS Forge",
    url: "https://apps.shopify.com/lgs-forge",
    kind: "Shopify app",
    page: "/compare/lgs-forge",
    bestFor:
      "Shopify stores focused on Magic, Pokémon or Riftbound that want a buylist (in beta) or Card Kingdom prices for Magic.",
    summary:
      "A Shopify app from Loveland, Ohio, launched May 2026. It adds singles and sealed, syncs prices daily and has pricing rules from its Starter plan up, with a buylist in beta.",
    strengths: [
      "A bigger free plan: 200 products",
      "Card Kingdom prices on Magic, alongside TCGplayer",
      "A buylist in beta with per-game, per-condition buy rates",
    ],
    limits: [
      "Three games on its site: Magic, Pokémon and Riftbound",
      "Pricing rules start on the paid Starter plan",
      "No reviews on the App Store yet",
    ],
    sources: ["as-lgsf", "lgsf-home"],
    cells: {
      shopify: { v: "Yes, a Shopify app", tone: "yes", s: ["as-lgsf"] },
      prices: { v: "TCGplayer daily, plus Card Kingdom on Magic", s: ["lgsf-home"] },
      rules: {
        v: "Daily sync on every plan; pricing rules from Starter up (markup, rarity minimums, condition multipliers, rounding)",
        tone: "yes",
        s: ["as-lgsf", "lgsf-home"],
      },
      conditions: { v: "NM, LP, MP, HP, Damaged", tone: "yes", s: ["lgsf-home", "as-lgsf"] },
      sealed: { v: "Yes", tone: "yes", s: ["as-lgsf", "lgsf-home"] },
      imports: { v: "TCGplayer inventory export with a match report", tone: "yes", s: ["lgsf-home"] },
      pos: NS(["as-lgsf", "lgsf-home"]),
      buylist: { v: "Yes, in beta", tone: "yes", s: ["lgsf-home"] },
      events: NS(["lgsf-home"]),
      plans: { v: "Free (200 products), $29.99, $59.99, $99.99 a month", s: ["as-lgsf"] },
      rating: { v: "No reviews yet", tone: "unknown", s: ["as-lgsf"] },
    },
  },
  {
    id: "kori",
    name: "Kori TCG Manager",
    url: "https://apps.shopify.com/kori-tcg-manager",
    kind: "Shopify app",
    bestFor:
      "Stores that want shelf labels, raw and graded stock, profit tracking and a public card show page, at a lower monthly price.",
    summary:
      "A Shopify app from Kori Collectibles, launched July 2026. It lists singles and sealed with market prices by condition, prints shelf labels with optional POS barcodes, and shares card show pages.",
    strengths: [
      "The lowest paid prices here: $14.99 and $24.99 a month",
      "Shelf labels with optional barcodes for POS",
      "Raw, graded and sealed stock, with cost and profit tracking",
    ],
    limits: [
      "The listing doesn't name its price source",
      "Automatic repricing is not stated",
      "One App Store review so far",
    ],
    sources: ["as-kori"],
    cells: {
      shopify: { v: "Yes, a Shopify app", tone: "yes", s: ["as-kori"] },
      prices: { v: "Market data; source not named", tone: "unknown", s: ["as-kori"] },
      rules: NS(["as-kori"]),
      conditions: { v: "Market prices shown by condition", tone: "yes", s: ["as-kori"] },
      sealed: { v: "Yes, plus graded", tone: "yes", s: ["as-kori"] },
      imports: { v: "Bulk import mentioned", tone: "yes", s: ["as-kori"] },
      pos: { v: "Shelf labels with optional barcodes for POS", tone: "yes", s: ["as-kori"] },
      buylist: { v: "Mentions customer buy lists; not described", tone: "unknown", s: ["as-kori"] },
      events: { v: "Card show pages; events not stated", tone: "unknown", s: ["as-kori"] },
      plans: { v: "$14.99 and $24.99 a month, 14 days free", s: ["as-kori"] },
      rating: { v: "5.0 (1 review)", s: ["as-kori"] },
    },
  },
  {
    id: "neosatoshi",
    name: "NeoSatoshi",
    url: "https://apps.shopify.com/neosatoshi-tcg-sync",
    kind: "Shopify app",
    bestFor: "Pokémon and One Piece sellers, often in Europe, who list from photos and want Cardmarket prices.",
    summary:
      "A card scanner from NeoGen Solutions in Bern, launched September 2026. It reads set, number, rarity, language and finish from a photo and creates the Shopify product with a Cardmarket or TCGplayer price.",
    strengths: [
      "Cardmarket prices, which matter for European stores",
      "Recognises the card's language and finish from your photo",
      "Uses your own photo on the product",
    ],
    limits: ["Pokémon and One Piece only", "Repricing and conditions are not stated", "No reviews on the App Store yet"],
    sources: ["as-neo"],
    cells: {
      shopify: { v: "Yes, a Shopify app", tone: "yes", s: ["as-neo"] },
      prices: { v: "Cardmarket or TCGplayer", s: ["as-neo"] },
      rules: NS(["as-neo"]),
      conditions: NS(["as-neo"]),
      sealed: NS(["as-neo"]),
      imports: { v: "Photo scans in bulk; CSV product export", tone: "yes", s: ["as-neo"] },
      pos: NS(["as-neo"]),
      buylist: NS(["as-neo"]),
      events: NS(["as-neo"]),
      plans: { v: "$39 and $89 a month, plus scans past 10,000", s: ["as-neo"] },
      rating: { v: "No reviews yet", tone: "unknown", s: ["as-neo"] },
    },
  },
  {
    id: "binderpos",
    name: "BinderPOS (TCGplayer)",
    url: "https://seller.tcgplayer.com/point-of-sale",
    kind: "Platform",
    page: "/alternatives/binderpos",
    bestFor: "Stores that already run on it. TCGplayer has paused new seller sign-ups.",
    summary:
      "A Shopify-based POS and inventory system for card stores, owned by TCGplayer. TCGplayer's page says it is pausing new seller onboarding and sign-ups.",
    strengths: ["Buylist, ticketed and non-ticketed events, and a POS in one system", "A TCGplayer integration (USA only)"],
    limits: ["New sign-ups paused", "Commission on online sales on top of the monthly fee"],
    sources: ["tcgp-pos", "ss-binder", "sleeveiq"],
    cells: {
      shopify: { v: "Built on Shopify; needs a Shopify account", tone: "yes", s: ["tcgp-pos"] },
      prices: NS(["tcgp-pos"]),
      rules: NS(["tcgp-pos"]),
      conditions: NS(["tcgp-pos"]),
      sealed: NS(["tcgp-pos"]),
      imports: NS(["tcgp-pos"]),
      pos: { v: "Its own POS", tone: "yes", s: ["tcgp-pos"] },
      buylist: { v: "Yes", tone: "yes", s: ["tcgp-pos"] },
      events: { v: "Yes, ticketed and non-ticketed", tone: "yes", s: ["tcgp-pos"] },
      plans: {
        v: "$100 or $150 a month, plus 2% online and 2.5% on TCGplayer integration sales; sign-ups paused",
        s: ["tcgp-pos"],
      },
      rating: { v: "Not rated here (a platform)", tone: "unknown" },
    },
  },
  {
    id: "crystal-commerce",
    name: "Crystal Commerce",
    url: "https://www.crystalcommerce.com/",
    kind: "Platform",
    page: "/alternatives/crystal-commerce",
    bestFor: "Stores that want one system for their own webstore, a POS, a buylist and many marketplaces, and don't need Shopify.",
    summary:
      "A long-running platform for game stores with its own webstore, a POS and sales channel integrations including eBay, Amazon, TCGplayer, CardTrader and Mana Pool. Its pages don't mention Shopify.",
    strengths: [
      "Many marketplaces from one inventory",
      "Buylist and POS with 0% commission",
      "Daily support calls and live chat on weekdays",
    ],
    limits: ["Its own webstore, not Shopify", "2.5% commission on online sales on top of the monthly fee"],
    sources: ["cc-home", "cc-pricing", "sleeveiq"],
    cells: {
      shopify: { v: "No, its own webstore; Shopify not mentioned", tone: "no", s: ["cc-home", "cc-pricing"] },
      prices: NS(["cc-home"]),
      rules: NS(["cc-home"]),
      conditions: NS(["cc-home"]),
      sealed: NS(["cc-home"]),
      imports: NS(["cc-home"]),
      pos: { v: "Its own POS", tone: "yes", s: ["cc-home", "cc-pricing"] },
      buylist: { v: "Yes", tone: "yes", s: ["cc-pricing"] },
      events: NS(["cc-home"]),
      plans: { v: "$99 a month plus 2.5% of online sales, and a setup fee", s: ["cc-pricing", "sleeveiq"] },
      rating: { v: "Not rated here (a platform)", tone: "unknown" },
    },
  },
  {
    id: "sortswift",
    name: "SortSwift",
    url: "https://sortswift.com/",
    kind: "Platform",
    bestFor: "Stores that want sorting hardware, a POS, a buylist and events in one system, with Shopify as one of several sales channels.",
    summary:
      "A store platform with card recognition, inventory, POS, buylist and events, sold in bundles. Shopify is a sync option, not the core of it.",
    strengths: [
      "Free plan up to 5,000 items",
      "Buylist, events (beta) and POS in higher bundles",
      "0% commission on POS and marketplace syncs",
    ],
    limits: ["Shopify uses a sync slot, from the $19 plan up", "Buylist from $219 a month, POS and events from $249"],
    sources: ["ss-pricing", "ss-binder"],
    cells: {
      shopify: { v: "A sync option from Entry+ ($19) up", s: ["ss-pricing"] },
      prices: { v: "Live market data; sources not named", tone: "unknown", s: ["ss-pricing"] },
      rules: { v: "Rule-based repricing", tone: "yes", s: ["ss-pricing"] },
      conditions: NS(["ss-pricing"]),
      sealed: NS(["ss-pricing"]),
      imports: NS(["ss-pricing"]),
      pos: { v: "Its own POS, from Core ($249)", tone: "yes", s: ["ss-pricing"] },
      buylist: { v: "From Online ($219)", tone: "yes", s: ["ss-pricing"] },
      events: { v: "Beta, from Core ($249)", tone: "yes", s: ["ss-pricing"] },
      plans: { v: "$0 (5,000 items) to $499 a month; 2% on storefront orders", s: ["ss-pricing"] },
      rating: { v: "Not rated here (a platform)", tone: "unknown" },
    },
  },
];

export const ALL_APPS: AppEntry[] = [SYNQ, ...COMPETITORS];

export function getApp(id: string): AppEntry {
  const a = ALL_APPS.find((x) => x.id === id);
  if (!a) throw new Error(`unknown app ${id}`);
  return a;
}
