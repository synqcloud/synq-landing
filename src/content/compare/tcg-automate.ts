import type { ComparePage } from "./types";
import { BYLINE } from "./hub";

export const TCG_AUTOMATE: ComparePage = {
  path: "/compare/tcg-automate",
  parent: { name: "Compare", path: "/compare" },
  seoTitle: "TCG Automate vs Synq: card scanning vs catalog pricing (2026)",
  description:
    "TCG Automate scans cards from photos and lists them on eBay, Shopify and Misprint. Synq prices a Shopify card shop from TCGplayer with rules. Side by side.",
  keywords: ["tcg automate vs synq", "tcg automate alternative", "tcg automate review", "shopify card listing app"],
  name: "TCG Automate vs Synq",
  eyebrow: "Head to head",
  h1: "TCG Automate vs Synq",
  intro:
    "These two start from different places. TCG Automate starts from photos of your cards and lists them on several marketplaces. Synq starts from a catalog of cards and keeps a Shopify store priced. Many sellers need one more than the other. Here is how to tell which.",
  byline: BYLINE,
  blocks: [
    {
      kind: "split",
      label: "The short version",
      left: {
        title: "TCG Automate suits you if",
        points: [
          "You list from piles of cards and want photos to do the typing",
          "You sell on eBay or Misprint as well as Shopify",
          "You sell sports cards, or PSA and CGC graded cards",
          "You run a Roca sorter and want its exports listed",
        ],
      },
      right: {
        title: "Synq suits you if",
        points: [
          "Shopify is your store, online and at the counter",
          "You want each condition as a variant of one product, with its own price",
          "You want prices set by your own rules on a daily schedule, with a preview",
          "Your plan should grow with products in the store, not with scans",
        ],
      },
    },
    {
      kind: "vs",
      label: "Side by side",
      title: "TCG Automate and Synq, row by row",
      them: "TCG Automate",
      note: "TCG Automate facts come from its App Store listing, home page and repricing page, checked October 2026. Synq facts come from the app itself.",
      rows: [
        {
          topic: "How cards get in",
          them: {
            v: "AI scans of card photos fill in title, price and details; you review matches, then list a batch.",
            s: ["tcga-home", "as-tcga"],
          },
          synq: {
            v: "Search by name or number and add, or import a TCGplayer export or spreadsheet (CSV, TSV, TXT), up to 5,000 per import. No photo scanning.",
          },
          themWins: true,
        },
        {
          topic: "Photos",
          them: { v: "Your own front and back photos on the product.", s: ["as-tcga"] },
          synq: { v: "The catalog's printing or card image. You can't upload your own photo." },
          themWins: true,
        },
        {
          topic: "Where it sells",
          them: {
            v: "eBay, Shopify and Misprint, with cross-listing on Pro and up; CSV exports for TCGplayer and Whatnot.",
            s: ["tcga-home", "as-tcga"],
          },
          synq: { v: "Shopify: Online Store, Shop and Point of Sale." },
          themWins: true,
        },
        {
          topic: "Price source",
          them: { v: "TCGplayer and eBay market values.", s: ["tcga-home"] },
          synq: { v: "TCGplayer market price per card, printing and condition, converted to your store's currency." },
        },
        {
          topic: "Repricing",
          them: {
            v: "Rules filtered by category, set, rarity, printing, condition and price range, run daily or weekly. Beta on Pro.",
            s: ["tcga-reprice", "tcga-home"],
          },
          synq: {
            v: "Rules by game, set, rarity, printing and condition, run daily, some days or once, at a time you choose. Minimum from your cost, rounding, preview and run log, on every plan.",
          },
        },
        {
          topic: "Conditions",
          them: { v: "Set per card before you publish.", s: ["as-tcga"] },
          synq: { v: "NM, LP, MP, HP and DMG as variants of one Shopify product, so stock and price stay per condition." },
        },
        {
          topic: "Games",
          them: {
            v: "Pokémon (with Japanese), Magic, Yu-Gi-Oh!, One Piece, Lorcana, Weiss Schwarz, Dragon Ball Super, Digimon and Riftbound, plus sports and non-sports.",
            s: ["tcga-home"],
          },
          synq: { v: "19 trading card games, including Pokémon TCG Japan, Flesh and Blood, Gundam, Union Arena and Star Wars Unlimited. No sports cards." },
        },
        {
          topic: "Shopify POS",
          them: { v: "Not stated.", tone: "unknown", s: ["as-tcga"] },
          synq: { v: "A code per condition for singles and the box UPC for sealed, written for Shopify POS." },
        },
        {
          topic: "Plans",
          them: { v: "$10 to $200 a month, sized by scans (500 to 30,000).", s: ["as-tcga"] },
          synq: { v: "Free up to 100 products, then $29, $79 and $149, sized by products in your store." },
        },
        {
          topic: "App Store reviews",
          them: { v: "No reviews yet.", tone: "unknown", s: ["as-tcga"] },
          synq: { v: "3.8 from 3 reviews.", s: ["as-synq"] },
        },
      ],
    },
    {
      kind: "prose",
      label: "Fair to say",
      title: "Where TCG Automate is stronger",
      paragraphs: [
        "If your cards arrive as boxes of unknown singles, scanning them is faster than searching for each one, and your own photos show the exact copy a buyer gets. TCG Automate also lists the same cards on eBay and Misprint, handles sports cards and graded slabs, and connects to Roca sorting machines. Synq does none of that.",
      ],
      sources: ["tcga-home", "as-tcga"],
    },
    {
      kind: "prose",
      label: "Where Synq does more",
      title: "Where Synq is stronger",
      paragraphs: [
        "Synq is built around a Shopify card shop that keeps stock over time. Each card and printing is one product with a variant per condition, linked to the catalog so it never duplicates. Your rules reprice the whole store on a schedule, and you see every change before it runs.",
        "For a store with a counter, Synq writes a scannable code per condition, so Shopify POS rings up the right card and the right condition. And because plans count products in the store, not scans, a store that adds the same popular cards over and over doesn't pay for each scan.",
      ],
    },
    {
      kind: "prose",
      label: "Both",
      title: "Using them together",
      paragraphs: [
        "Some sellers scan with one tool and price with another. If you do, pick one app to own each product's price. Two apps repricing the same Shopify product will undo each other's work.",
      ],
    },
  ],
  faqTitle: "TCG Automate and Synq",
  faqBody: "What stores ask when they're choosing between scanning and catalog pricing.",
  faq: [
    {
      q: "Does Synq scan cards from photos?",
      a: "No. You add cards by searching name or number (type @ to pick a set), by linking products you already sell, or by importing a TCGplayer export or spreadsheet. If photo scanning is the main thing you need, TCG Automate or NeoSatoshi fit better.",
    },
    {
      q: "Does Synq list on eBay?",
      a: "No. Synq works inside Shopify only: your Online Store, the Shop app and Shopify POS.",
    },
    {
      q: "Can Synq price sports cards or graded cards?",
      a: "No. Synq covers 19 trading card games, singles and sealed, priced from TCGplayer. Sports and graded cards are where TCG Automate is the better fit.",
    },
    {
      q: "Which one is cheaper?",
      a: "It depends on how you grow. TCG Automate starts at $10 a month for 500 scans. Synq is free up to 100 products, and $29 a month covers up to 2,000 products however often you restock them.",
    },
  ],
  closing: {
    title: "Keep your Shopify card shop priced.",
    body: "Install Synq from the Shopify App Store. Free up to 100 products, with every feature, and 7 days free on paid plans.",
  },
  sources: ["as-tcga", "tcga-home", "tcga-reprice", "as-synq"],
};
