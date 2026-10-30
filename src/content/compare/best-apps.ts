import type { ComparePage } from "./types";
import { BYLINE } from "./hub";
import { CHECKED } from "./sources";

/* Order on the page, said in the methodology: Shopify apps by number of App
   Store reviews (then by launch date), then the platforms. */
export const ROUNDUP_ORDER = [
  "tcg-importer",
  "synq",
  "kori",
  "lgs-forge",
  "tcg-automate",
  "neosatoshi",
  "sortswift",
  "crystal-commerce",
  "binderpos",
];

export const BEST_APPS: ComparePage = {
  path: "/best-shopify-apps-for-card-shops",
  seoTitle: "Best Shopify apps for card shops (2026): TCG apps compared",
  description:
    "A sourced 2026 roundup of Shopify apps for card shops: TCG Importer, Synq, Kori, LGS Forge, TCG Automate, NeoSatoshi, SortSwift, Crystal Commerce, BinderPOS.",
  keywords: [
    "best shopify app for trading card store",
    "best tcg app shopify",
    "shopify apps for card shops",
    "tcg shopify app",
    "pokemon card shopify app",
  ],
  name: "Best Shopify apps for card shops",
  eyebrow: `Roundup, ${CHECKED}`,
  h1: "The best Shopify apps for card shops in 2026",
  intro:
    "There isn't one best app for every card shop. There's a best fit for how you get stock, where you sell and how you price. Here are nine tools card stores use, what each is good at, and where each falls short, with a source for every fact.",
  byline: BYLINE,
  itemList: true,
  blocks: [
    {
      kind: "prose",
      label: "Start here",
      title: "How to choose",
      paragraphs: ["Four things decide it. Settle them before you open the App Store."],
      bullets: [
        "How stock arrives. Mostly new sealed and known singles: a catalog app (Synq, TCG Importer, LGS Forge, Kori). Boxes of unknown cards: a scanner (TCG Automate, NeoSatoshi).",
        "Where you sell. Only Shopify, online and at the counter: a Shopify app. Shopify plus eBay or other marketplaces: TCG Automate, or a platform like SortSwift or Crystal Commerce.",
        "How prices move. A markup on market price is enough for some stores. If you price by condition, set or rarity with a floor, check that the app has rules and on which plan.",
        "Buying and events. If you buy from customers or run events, few Shopify apps do. LGS Forge has a buylist in beta; SortSwift and BinderPOS have buylists and events.",
      ],
    },
    {
      kind: "apps",
      label: "App by app",
      title: "The nine tools",
      intro:
        "Each one with who it suits, what it does well and what to know before you install. Links go to the app's own listing or site.",
    },
    {
      kind: "matrix",
      label: `Checked ${CHECKED}`,
      title: "All nine, side by side",
      intro: "The columns that most often decide it. The compare page has the full table. Small numbers link to sources.",
      columns: ["prices", "rules", "buylist", "plans", "rating"],
    },
    {
      kind: "prose",
      label: "How we made this",
      title: "Methodology",
      paragraphs: [
        `We make Synq, one of the apps listed. To keep this fair, we only state what each tool's own App Store listing or website says, checked in ${CHECKED}, and we link every source. When a page didn't say, we wrote Not stated. We didn't install the other apps, so this isn't a hands-on test.`,
        "Shopify apps are listed by their number of App Store reviews, then by launch date. The platforms (SortSwift, Crystal Commerce and BinderPOS) come after, because they replace more of your store than an app does. BinderPOS is last because new sign-ups are paused.",
        "Most of these apps are under a year old, so a few reviews move their ratings a lot. If you make one of these tools and something here is wrong, write to us and we'll correct it.",
      ],
    },
  ],
  faqTitle: "Choosing a Shopify app for cards",
  faqBody: "Short answers to what store owners ask most.",
  faq: [
    {
      q: "What is the best Shopify app for a trading card store?",
      a: "It depends on the job. For daily TCGplayer prices with rules and Shopify POS codes across many games, Synq. For quick imports and graded cards, TCG Importer. For a buylist, LGS Forge (beta). For photo scanning and eBay, TCG Automate. For Cardmarket prices, NeoSatoshi.",
    },
    {
      q: "Which Shopify card apps have a free plan?",
      a: "Synq (100 products), LGS Forge (200 products) and TCG Importer (5 imports) list free plans on the App Store. SortSwift, a platform, has a free tier of 5,000 items without a Shopify sync slot.",
    },
    {
      q: "Which app is best for European card shops?",
      a: "If you price from Cardmarket, NeoSatoshi is the only Shopify app here that names Cardmarket as a price source. Synq prices from TCGplayer in USD and converts to your store currency, and a UK store raised that as a drawback in an App Store review.",
    },
    {
      q: "Is this list sponsored?",
      a: "No. Nobody paid to be included. We make Synq, which is in the list, and say so at the top.",
    },
  ],
  closing: {
    title: "Try Synq on your own cards.",
    body: "Install Synq from the Shopify App Store. Free up to 100 products, with every feature, and 7 days free on paid plans.",
  },
  sources: [
    "as-synq",
    "as-tcgi",
    "as-tcgi-rev",
    "tcgi-pricing",
    "tcgi-features",
    "tcgi-guide",
    "as-kori",
    "as-lgsf",
    "lgsf-home",
    "as-tcga",
    "tcga-home",
    "tcga-reprice",
    "as-neo",
    "ss-pricing",
    "ss-binder",
    "cc-home",
    "cc-pricing",
    "sleeveiq",
    "tcgp-pos",
  ],
};
