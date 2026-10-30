import type { ComparePage } from "./types";
import { BYLINE } from "./hub";

export const BINDERPOS: ComparePage = {
  path: "/alternatives/binderpos",
  parent: { name: "Compare", path: "/compare" },
  seoTitle: "BinderPOS alternative for Shopify card shops (2026)",
  description:
    "TCGplayer has paused new BinderPOS sign-ups. What it means for Shopify card shops, the Shopify-native path with Synq, what it doesn't do, and moving your stock.",
  keywords: [
    "binderpos alternative",
    "binderpos sign up",
    "binderpos shopify",
    "binderpos pricing",
    "binderpos replacement",
  ],
  name: "BinderPOS alternative",
  eyebrow: "Alternative",
  h1: "A BinderPOS alternative for Shopify card shops",
  intro:
    "TCGplayer is not taking new BinderPOS customers. If you were planning to open a Shopify card store on it, or want to move off it, here is where things stand, what Synq covers, what it doesn't, and how to bring your stock across.",
  byline: BYLINE,
  blocks: [
    {
      kind: "prose",
      label: "Where things stand",
      title: "What happened to BinderPOS sign-ups",
      paragraphs: [
        "BinderPOS is a Shopify-based POS and inventory system for card stores, owned by TCGplayer. TCGplayer's own page says it is pausing new seller onboarding and sign-ups, and asks interested stores to fill in a form instead.",
        "Other sources date the change to February 2025 and say existing stores can keep using it. TCG Sync, which sells a competing product, notes that binderpos.com now redirects to TCGplayer's point-of-sale page and that it has seen no shutdown date.",
        "So if you already run BinderPOS, nothing forces you to move today. If you're starting a store, you'll need something else.",
      ],
      sources: ["tcgp-pos", "ss-binder", "sleeveiq", "tcgsync-binder"],
    },
    {
      kind: "prose",
      label: "What you'd be replacing",
      title: "What BinderPOS does",
      paragraphs: ["Per TCGplayer's page, BinderPOS covers more than pricing:"],
      bullets: [
        "Inventory and a website on your Shopify store (it needs a Shopify account)",
        "A point of sale",
        "A buylist for buying cards from customers",
        "Ticketed and non-ticketed events, online and at the POS",
        "A TCGplayer integration (USA only)",
        "$100 or $150 a month, plus 2% on online sales and 2.5% on sales through the TCGplayer integration",
      ],
      sources: ["tcgp-pos"],
    },
    {
      kind: "prose",
      label: "The Shopify-native path",
      title: "What Synq covers",
      paragraphs: [
        "Synq is a Shopify app, so your store, theme, checkout and Shopify POS stay exactly as they are. It handles the card side:",
      ],
      bullets: [
        "A catalog of 19 games. Search by name or number, or type @ to pick a set, and add the card in the condition and quantity you have.",
        "One Shopify product per card and printing, with a variant per condition (NM, LP, MP, HP, DMG), plus sealed product.",
        "TCGplayer market prices, every day, converted to your store's currency.",
        "Price rules by game, set, rarity, printing and condition, with a minimum from your cost and rounding. Preview the changes, then run, or schedule it.",
        "A scannable code per condition for singles and the box UPC for sealed, so Shopify POS rings up the right card.",
        "No commission on your sales. Plans are free up to 100 products, then $29, $79 or $149 a month.",
      ],
    },
    {
      kind: "split",
      label: "Said plainly",
      title: "What Synq doesn't do",
      left: {
        title: "Not in Synq",
        body: "If these run your store, Synq alone won't replace BinderPOS.",
        points: [
          "No buylist or trade-in. Use a separate buylist app, or a platform that has one.",
          "No events or tournaments. Run them in another tool.",
          "No export of your inventory.",
          "No TCGplayer marketplace sync. Synq prices your Shopify store only.",
          "No label printing. Use Shopify's free Retail Barcode Labels app with Synq's codes.",
        ],
      },
      right: {
        title: "If you need all of it in one place",
        body: "Platforms that include a buylist, events and their own POS:",
        points: [
          "SortSwift: buylist from its $219 bundle, POS and events (beta) from $249, with Shopify as a sync.",
          "Crystal Commerce: its own webstore, POS and buylist, at $99 a month plus 2.5% of online sales.",
          "LGS Forge: a Shopify app with a buylist in beta, for Magic, Pokémon and Riftbound.",
        ],
      },
    },
    {
      kind: "steps",
      label: "Moving your stock",
      title: "Moving to Synq, step by step",
      intro: "You can bring stock in a batch at a time and keep selling while you do.",
      steps: [
        {
          title: "Install Synq and pick your games",
          body: "Setup asks which games you sell and what your prices should be compared with TCGplayer's market price. That becomes your first price rule, which runs daily at 6:00 in your store's time zone.",
        },
        {
          title: "Decide: link or import",
          body: "If your cards are already Shopify products, link them so Synq keeps those products and takes over price and stock. Linking is one product at a time. For cards not in Shopify yet, import a file instead, so you don't end up with two products for one card.",
        },
        {
          title: "Import a TCGplayer export or a spreadsheet",
          body: "CSV, TSV or TXT (save Excel files as CSV first), up to 5,000 products per import. A TCGplayer export is read as exact SKUs. A spreadsheet needs a name, TCGplayer ID or barcode per line. Rows Synq can't match download as a file with the reason.",
        },
        {
          title: "Preview the rule, then run it",
          body: "The preview shows every price that would go up or down. Run it when it looks right. Prices you set by hand inside Synq are left alone.",
        },
        {
          title: "Turn on POS codes",
          body: "In Settings, Point of Sale, turn on codes for singles and sealed. Print labels with Shopify's Retail Barcode Labels app.",
        },
      ],
    },
  ],
  faqTitle: "BinderPOS questions",
  faqBody: "What stores ask us when they can't sign up, or want to move.",
  faq: [
    {
      q: "Can I still sign up for BinderPOS?",
      a: "Not right now. TCGplayer's point-of-sale page says it is pausing new seller onboarding and sign-ups, with a form to register interest. Check that page for the latest.",
    },
    {
      q: "Is BinderPOS shutting down?",
      a: "We haven't seen a shutdown date, and existing stores are reported to keep running. What changed is that new stores can't sign up.",
    },
    {
      q: "Does Synq replace BinderPOS completely?",
      a: "No. Synq covers the catalog, pricing, conditions and POS codes on Shopify. It has no buylist, no events and no inventory export. Stores that rely on those keep a separate tool for them, or pick a platform that has them.",
    },
    {
      q: "Does Synq take a commission on sales?",
      a: "No. You pay the monthly plan only: free up to 100 products, then $29, $79 or $149, billed on your Shopify invoice.",
    },
    {
      q: "Can I import from BinderPOS directly?",
      a: "There's no BinderPOS-specific importer. Any spreadsheet saved as CSV, TSV or TXT, with a card name, TCGplayer ID or barcode per line, works, as does a TCGplayer inventory export. Synq matches each line to its card and asks you when a name fits more than one printing.",
    },
  ],
  closing: {
    title: "Open on Shopify, priced from day one.",
    body: "Install Synq from the Shopify App Store. Free up to 100 products, with every feature, and 7 days free on paid plans.",
  },
  sources: ["tcgp-pos", "ss-binder", "sleeveiq", "tcgsync-binder", "ss-pricing", "cc-pricing", "lgsf-home"],
};
