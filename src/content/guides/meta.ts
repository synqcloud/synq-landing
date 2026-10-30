import type { PageLink, Source } from "./types";

/* Dates and shared links for the knowledge pages. Outside sources were read
   on 30 October 2026; when one changes, fix the page and bump these. */

export const GUIDES_CHECKED = "October 2026";
export const GUIDES_UPDATED = "2026-10-30";
export const GUIDES_PUBLISHED = "2026-10-30";

export const GUIDES_PATH = "/guides";
export const GLOSSARY_PATH = "/glossary";

export const SRC = {
  tcgpPrices: {
    label: "TCGplayer Help Center: What do the different price points on TCGplayer.com mean?",
    url: "https://help.tcgplayer.com/hc/en-us/articles/222376867-What-do-the-different-price-points-on-TCGplayer-com-mean",
  },
  tcgpConditions: {
    label: "TCGplayer Help Center: Card Conditioning Overview",
    url: "https://help.tcgplayer.com/hc/en-us/articles/221430307-Card-Conditioning-Overview",
  },
  tcgpSealed: {
    label: "TCGplayer Help Center: What qualifies as a sealed product?",
    url: "https://help.tcgplayer.com/hc/en-us/articles/360036246613-What-qualifies-as-a-sealed-product",
  },
  tcgpCsv: {
    label: "TCGplayer Help Center: Importing and Exporting CSVs to Mass Update Prices and Quantities",
    url: "https://help.tcgplayer.com/hc/en-us/articles/115002358027-Importing-and-Exporting-CSVs-to-Mass-Update-Prices-and-Quantities",
  },
  tcgpBuylist: {
    label: "TCGplayer Help Center: How to Create Buylist Rules",
    url: "https://help.tcgplayer.com/hc/en-us/articles/21514184830615-How-to-Create-Buylist-Rules",
  },
  shopifyLabels: {
    label: "Shopify Help Center: Retail Barcode Labels",
    url: "https://help.shopify.com/en/manual/sell-in-person/hardware/barcode-printer/retail-barcode-labels",
  },
} satisfies Record<string, Source>;

export const DOCS: Record<string, PageLink> = {
  setup: { href: "/docs/setup", label: "The setup: your games and first price rule" },
  pickGames: { href: "/docs/pick-games", label: "Pick your games and collections" },
  addCards: { href: "/docs/add-cards", label: "Add cards and sealed" },
  conditions: { href: "/docs/conditions-printings", label: "Conditions and printings" },
  link: { href: "/docs/link-products", label: "Link products you already have" },
  import: { href: "/docs/import", label: "Import a spreadsheet" },
  market: { href: "/docs/market-prices", label: "How market prices work" },
  rules: { href: "/docs/price-rules", label: "Build a price rule" },
  run: { href: "/docs/run-and-schedule", label: "Preview, run and schedule a rule" },
  minimums: { href: "/docs/minimums-rounding", label: "Minimums and rounding" },
  exceptions: { href: "/docs/exceptions", label: "Exceptions" },
  whichRule: { href: "/docs/which-rule-wins", label: "Which rule prices a product" },
  bulk: { href: "/docs/bulk-edit", label: "Edit many products at once" },
  cost: { href: "/docs/cost-margin", label: "Cost and margin" },
  creates: { href: "/docs/what-synq-creates", label: "What Synq creates in your store" },
  sync: { href: "/docs/sync", label: "What stays in sync with Shopify" },
  pos: { href: "/docs/pos", label: "Sell in your shop with Shopify POS" },
  plans: { href: "/docs/plans", label: "Plans and product limits" },
};

export const PAGES: Record<string, PageLink> = {
  app: { href: "/shopify-tcg-app", label: "The Shopify TCG app" },
  tcgplayer: { href: "/integrations/tcgplayer", label: "TCGplayer prices in Shopify" },
  guides: { href: GUIDES_PATH, label: "All guides" },
  glossary: { href: GLOSSARY_PATH, label: "Glossary" },
  pos: { href: "/guides/shopify-pos-barcodes-for-trading-cards", label: "Shopify POS barcodes for cards" },
  import: { href: "/guides/import-tcgplayer-export-to-shopify", label: "Import a TCGplayer export" },
  pricing: { href: "/guides/card-shop-pricing-strategy", label: "Card shop pricing strategy" },
  marketPrice: { href: "/glossary/tcgplayer-market-price", label: "TCGplayer Market Price" },
  conditions: { href: "/glossary/card-conditions", label: "Card conditions" },
  compare: { href: "/compare", label: "Compare Shopify TCG apps" },
  best: { href: "/best-shopify-apps-for-card-shops", label: "Best Shopify apps for card shops" },
  spreadsheets: { href: "/synq-vs-spreadsheets", label: "Synq vs spreadsheets" },
};
