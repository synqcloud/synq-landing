/* The knowledge pages in one list: the app page, the TCGplayer page, the
   guides and the glossary. Sitemap and llms.txt read GUIDE_ROUTES; the pages
   read getGuidePage(). English only. */

import type { GuidePage } from "./types";
import { DOCS, GLOSSARY_PATH, GUIDES_PATH, GUIDES_UPDATED, PAGES } from "./meta";
import { SHOPIFY_TCG_APP } from "./shopify-tcg-app";
import { TCGPLAYER } from "./tcgplayer";
import { POS_BARCODES } from "./pos-barcodes";
import { IMPORT_TCGPLAYER } from "./import-tcgplayer";
import { PRICING_STRATEGY } from "./pricing-strategy";
import { GLOSSARY_ENTRIES } from "./glossary";

const GUIDES = [POS_BARCODES, IMPORT_TCGPLAYER, PRICING_STRATEGY];

export const GUIDES_HUB: GuidePage = {
  path: GUIDES_PATH,
  section: "guides",
  seoTitle: "Guides for card shops selling on Shopify | Synq",
  description:
    "Guides for card stores on Shopify: scanning singles with Shopify POS, importing a TCGplayer export or CSV, and pricing NM, LP, MP, HP and DMG singles.",
  keywords: ["card shop guides", "shopify card shop guide", "tcg store guide"],
  name: "Guides",
  summary: "How-to guides for card shops on Shopify.",
  eyebrow: "Guides",
  h1: "Guides for card shops on Shopify",
  intro:
    "Step by step guides for the jobs that take a card store's week: getting stock into Shopify, pricing it by condition, and selling it at the counter. Each one says what to do in Shopify and in Synq.",
  secondary: { href: GLOSSARY_PATH, label: "Open the glossary" },
  blocks: [
    {
      kind: "cards",
      label: "Guides",
      title: "Start with the job in front of you",
      cards: GUIDES.map((g) => ({ href: g.path, title: g.h1, body: g.summary })),
    },
    {
      kind: "cards",
      label: "About Synq",
      title: "How Synq does it",
      cards: [SHOPIFY_TCG_APP, TCGPLAYER].map((g) => ({ href: g.path, title: g.h1, body: g.summary })),
    },
    {
      kind: "links",
      label: "Help center",
      title: "Step by step in the docs",
      intro: "The help center covers every screen in Synq.",
      links: [DOCS.setup, DOCS.addCards, DOCS.import, DOCS.rules, DOCS.pos, DOCS.plans],
    },
  ],
  faqTitle: "About the guides",
  faqBody: "Who writes them and how they are kept current.",
  faq: [
    {
      q: "Who writes these guides?",
      a: "The Synq team. Facts about Synq come from the app itself; facts about TCGplayer and Shopify link to their own help pages.",
    },
    {
      q: "Do I need Synq to use them?",
      a: "No. The advice on pricing, conditions and barcodes works with any setup. Each guide then shows how Synq does that step.",
    },
  ],
  closing: { title: "Run your card store on Shopify.", body: "Install Synq. It's free up to 100 products, with every feature." },
  sources: [],
  related: [PAGES.glossary, PAGES.app, PAGES.tcgplayer, PAGES.compare, PAGES.spreadsheets],
};

export const GLOSSARY_HUB: GuidePage = {
  path: GLOSSARY_PATH,
  section: "glossary",
  seoTitle: "Card glossary: TCGplayer prices, conditions and printings | Synq",
  description:
    "Short definitions of the terms card stores use: TCGplayer Market Price, Listed Median, conditions, sealed vs singles, printings, TCGplayer SKUs and buylists.",
  keywords: ["tcg glossary", "card shop glossary", "tcgplayer terms"],
  name: "Glossary",
  summary: "Short definitions of card shop terms.",
  eyebrow: "Glossary",
  h1: "A glossary for card shops",
  intro:
    "The words that come up when you price and stock trading cards, defined in a few paragraphs each. Where a term is TCGplayer's, the definition follows TCGplayer's own help pages and links to them.",
  secondary: { href: GUIDES_PATH, label: "Read the guides" },
  blocks: [
    {
      kind: "cards",
      label: "Terms",
      title: "Every term",
      cards: GLOSSARY_ENTRIES.map((t) => ({ href: t.path, title: t.h1, body: t.term!.definition })),
    },
  ],
  faqTitle: "About the glossary",
  faqBody: "Where the definitions come from.",
  faq: [
    {
      q: "Where do the definitions come from?",
      a: "TCGplayer terms follow TCGplayer's help center, cited on each page. How Synq uses a term comes from the app itself.",
    },
    {
      q: "Is a term missing?",
      a: "Write to help@synq.cards and we'll add it.",
    },
  ],
  closing: { title: "Put the terms to work.", body: "Synq prices every printing and condition from TCGplayer, inside Shopify." },
  sources: [],
  related: [PAGES.guides, PAGES.pricing, PAGES.tcgplayer, PAGES.app],
};

export const GUIDE_PAGES: GuidePage[] = [
  SHOPIFY_TCG_APP,
  TCGPLAYER,
  GUIDES_HUB,
  ...GUIDES,
  GLOSSARY_HUB,
  ...GLOSSARY_ENTRIES,
];

export const GLOSSARY_TERMS = GLOSSARY_ENTRIES;

/** For sitemap.ts / llms.txt: unprefixed English paths. */
export const GUIDE_ROUTES: { path: string; title: string; description: string; lastModified: string }[] = GUIDE_PAGES.map(
  (p) => ({ path: p.path, title: p.h1, description: p.description, lastModified: GUIDES_UPDATED }),
);

export function getGuidePage(path: string): GuidePage | undefined {
  return GUIDE_PAGES.find((p) => p.path === path);
}

export function slugsUnder(prefix: "/guides/" | "/glossary/"): string[] {
  return GUIDE_PAGES.filter((p) => p.path.startsWith(prefix)).map((p) => p.path.slice(prefix.length));
}

export type { GuidePage };
