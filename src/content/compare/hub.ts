import type { ComparePage, PageLink } from "./types";
import { CHECKED } from "./sources";

/* Links every page in the cluster shares: the other comparisons, the
   spreadsheet page, the game pages and the docs a switching store reads. */
export const CLUSTER_LINKS: PageLink[] = [
  { href: "/compare", label: "Compare Shopify TCG apps" },
  { href: "/best-shopify-apps-for-card-shops", label: "Best Shopify apps for card shops (2026)" },
  { href: "/compare/tcg-importer", label: "TCG Importer vs Synq" },
  { href: "/compare/tcg-automate", label: "TCG Automate vs Synq" },
  { href: "/compare/lgs-forge", label: "LGS Forge vs Synq" },
  { href: "/alternatives/binderpos", label: "BinderPOS alternative" },
  { href: "/alternatives/crystal-commerce", label: "Crystal Commerce alternative" },
  { href: "/synq-vs-spreadsheets", label: "Synq vs spreadsheets" },
];

export const GAME_LINKS: PageLink[] = [
  { href: "/for/pokemon", label: "Pokémon" },
  { href: "/for/magic-the-gathering", label: "Magic: The Gathering" },
  { href: "/for/yu-gi-oh", label: "Yu-Gi-Oh!" },
  { href: "/for/disney-lorcana", label: "Disney Lorcana" },
  { href: "/for/one-piece", label: "One Piece" },
];

export const DOC_LINKS: PageLink[] = [
  { href: "/docs/import", label: "Import a spreadsheet or TCGplayer export" },
  { href: "/docs/price-rules", label: "How price rules work" },
  { href: "/docs/pos", label: "Sell at the counter with Shopify POS" },
  { href: "/docs/plans", label: "Plans and limits" },
];

export const BYLINE = `Written by the Synq team, who make one of the apps compared. Last checked ${CHECKED}. Competitor facts come from their public pages and App Store listings, linked at the bottom.`;

export const HUB: ComparePage = {
  path: "/compare",
  seoTitle: "Shopify TCG apps compared: Synq, TCG Importer, LGS Forge (2026)",
  description:
    "A sourced comparison of Shopify apps and POS systems for card shops: price sources, rules, conditions, sealed, imports, POS barcodes, buylist and ratings.",
  keywords: [
    "shopify tcg app comparison",
    "tcg shopify app",
    "card shop software comparison",
    "binderpos alternative",
    "tcg importer vs synq",
  ],
  name: "Compare",
  eyebrow: "Comparison",
  h1: "Shopify apps for card shops, compared",
  intro:
    "Eight tools that card stores use to sell on Shopify or next to it, side by side. Each fact links to the page it came from, and where a page doesn't say, the table says Not stated. We make Synq, so we've tried to be strict about the others.",
  byline: BYLINE,
  itemList: true,
  blocks: [
    {
      kind: "prose",
      label: "Before the table",
      title: "What to compare",
      paragraphs: [
        "Most card stores don't need every feature in this table. Start from the work that takes your week, then check the columns that cover it.",
      ],
      bullets: [
        "Where you sell. A Shopify app keeps your store, theme and checkout as they are. A platform such as Crystal Commerce or SortSwift brings its own webstore or treats Shopify as one channel among several.",
        "Where prices come from. TCGplayer is the usual US reference. PriceCharting and eBay sold prices suit graded and sports cards. Cardmarket matters in Europe. Each app names one or more of these, or doesn't say.",
        "How prices change. A sync copies the market price, with a markup. Rules let you price by game, set, condition or rarity, with a minimum, rounding and a schedule. Check whether rules are on every plan.",
        "Conditions. Check whether each condition is its own variant on one product, so a customer picks LP or NM on the same page and your stock stays per condition.",
        "Getting cards in. Searching a catalog, scanning photos and importing a TCGplayer export or spreadsheet are three different jobs. Pick the one that matches how your stock arrives.",
        "The counter. If you sell in person, check whether the app gives each card a code your POS can scan.",
        "Buylist and events. These are store operations, not pricing. If you buy from customers or run tournaments through your software, only a few tools here cover it.",
      ],
    },
    {
      kind: "matrix",
      label: `Checked ${CHECKED}`,
      title: "The table",
      intro:
        "Scroll sideways on a phone. Small numbers link to the source for that cell. Ratings are from the Shopify App Store on the day we checked, and change often.",
    },
    {
      kind: "prose",
      label: "Reading it",
      title: "What the table shows",
      paragraphs: [
        "The Shopify apps split into three kinds. Importers and catalog apps (TCG Importer, LGS Forge, Synq, Kori) add cards from a database and keep their prices current. Scanners (TCG Automate, NeoSatoshi) start from photos of your cards. Platforms (BinderPOS, Crystal Commerce, SortSwift) run the whole store, including a POS and a buylist, and either sit on Shopify or next to it.",
        "No tool wins every column. TCG Importer has the most App Store reviews of the Shopify apps here. LGS Forge has the largest free plan and a buylist in beta. TCG Automate lists on eBay too and handles sports and graded cards. Kori is the cheapest paid option and prints shelf labels. The platforms are the only ones with events.",
        "Synq is strongest on price rules (by game, set, rarity, printing and condition, with a preview before every run), on condition variants, on codes for Shopify POS and on game coverage (19 games). It has no buylist, no events, no export and only one price source, TCGplayer. Its App Store rating is 3.8 from 3 reviews.",
      ],
    },
    {
      kind: "links",
      label: "One at a time",
      title: "Head-to-head pages",
      intro: "Each one says who the other tool suits better, and where Synq does more.",
      links: [
        { href: "/compare/tcg-importer", label: "TCG Importer vs Synq" },
        { href: "/compare/tcg-automate", label: "TCG Automate vs Synq" },
        { href: "/compare/lgs-forge", label: "LGS Forge vs Synq" },
        { href: "/alternatives/binderpos", label: "Moving off BinderPOS, or can't sign up" },
        { href: "/alternatives/crystal-commerce", label: "Crystal Commerce or Shopify" },
        { href: "/best-shopify-apps-for-card-shops", label: "The 2026 roundup, app by app" },
      ],
    },
  ],
  faqTitle: "Questions about this comparison",
  faqBody: "How we built the table, and what it leaves out.",
  faq: [
    {
      q: "Who wrote this comparison?",
      a: "The Synq team. We make one of the apps in the table, so read it with that in mind. To keep it fair, every competitor cell links to that company's own page or App Store listing, and anything a page doesn't say is marked Not stated instead of guessed.",
    },
    {
      q: "Why do some cells say Not stated?",
      a: "Because the tool's public pages didn't say. It may well have the feature. If you rely on one of those cells, ask the company, and if you're that company and we got something wrong, write to us and we'll fix it.",
    },
    {
      q: "Which app is best for a Shopify card shop?",
      a: "It depends on the work. For daily prices with your own rules across many games, and POS codes, Synq fits. For fast imports and graded cards, TCG Importer. For photo scanning and eBay, TCG Automate. For a buylist on Shopify, LGS Forge (beta) or a platform. For one system that also runs events, a platform such as SortSwift or Crystal Commerce.",
    },
    {
      q: "Can I use two of these apps together?",
      a: "Sometimes, but don't let two apps set prices on the same products: the last one to run wins. A common split is one app for pricing and stock, and a separate buylist or trade-in app for buying from customers.",
    },
    {
      q: "Why isn't my app in the table?",
      a: "We picked the tools card stores ask us about most, and the ones that show up when you search the App Store for tcg. Write to us and we'll look at adding it on the next check.",
    },
    {
      q: "How often is this updated?",
      a: `We check every source and the App Store ratings each quarter. This version was checked in ${CHECKED}.`,
    },
  ],
  closing: {
    title: "Try Synq on your own cards.",
    body: "Install Synq from the Shopify App Store. Up to 100 products it's free, with every feature, and paid plans start with 7 days free.",
  },
  sources: [
    "as-synq",
    "as-tcgi",
    "as-tcgi-rev",
    "tcgi-pricing",
    "tcgi-features",
    "tcgi-guide",
    "as-tcga",
    "tcga-home",
    "tcga-reprice",
    "as-lgsf",
    "lgsf-home",
    "as-kori",
    "as-neo",
    "tcgp-pos",
    "ss-binder",
    "sleeveiq",
    "cc-home",
    "cc-pricing",
    "ss-pricing",
  ],
};
