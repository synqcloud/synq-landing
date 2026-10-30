import type { ComparePage } from "./types";
import { BYLINE } from "./hub";

export const LGS_FORGE: ComparePage = {
  path: "/compare/lgs-forge",
  parent: { name: "Compare", path: "/compare" },
  seoTitle: "LGS Forge vs Synq: Shopify card pricing apps compared (2026)",
  description:
    "LGS Forge and Synq both sync TCGplayer prices into Shopify with rules. A sourced look at games, free plans, buylist, conditions, POS barcodes and plan limits.",
  keywords: ["lgs forge vs synq", "lgs forge alternative", "lgs forge review", "shopify tcg pricing app"],
  name: "LGS Forge vs Synq",
  eyebrow: "Head to head",
  h1: "LGS Forge vs Synq",
  intro:
    "LGS Forge is the app closest to Synq: daily TCGplayer prices, rules, conditions as variants, and plans sized by product count at similar prices. The differences are in games, the free plan, the buylist and the counter.",
  byline: BYLINE,
  blocks: [
    {
      kind: "split",
      label: "The short version",
      left: {
        title: "LGS Forge suits you if",
        points: [
          "You sell Magic, Pokémon or Riftbound and nothing else",
          "You want a buylist in the same app (it's in beta)",
          "You'd like Card Kingdom prices on Magic",
          "200 free products would cover your store",
        ],
      },
      right: {
        title: "Synq suits you if",
        points: [
          "You sell other games too: Synq covers 19",
          "You want rules on the free plan, not from the first paid one",
          "You sell at Shopify POS and need a code per condition",
          "You import from a spreadsheet as well as a TCGplayer export",
        ],
      },
    },
    {
      kind: "vs",
      label: "Side by side",
      title: "LGS Forge and Synq, row by row",
      them: "LGS Forge",
      note: "LGS Forge facts come from its App Store listing and home page, checked October 2026. Synq facts come from the app itself.",
      rows: [
        {
          topic: "Games",
          them: { v: "Magic, Pokémon and Riftbound, singles and sealed.", s: ["lgsf-home"] },
          synq: {
            v: "19 games, including Pokémon TCG Japan, One Piece, Lorcana, Yu-Gi-Oh!, Flesh and Blood, Gundam and Star Wars Unlimited.",
          },
        },
        {
          topic: "Price source",
          them: { v: "TCGplayer daily, plus Card Kingdom on Magic.", s: ["lgsf-home"] },
          synq: { v: "TCGplayer market price, daily, converted to your store's currency." },
          themWins: true,
        },
        {
          topic: "Price rules",
          them: {
            v: "Markup, per-rarity minimums, condition multipliers, rounding and thresholds. Rules start on Starter ($29.99).",
            s: ["lgsf-home", "as-lgsf"],
          },
          synq: {
            v: "Rules by game, set, rarity, printing and condition, with a minimum from your cost, rounding, a schedule, a preview and a run log. On every plan, Free included.",
          },
        },
        {
          topic: "Conditions",
          them: { v: "NM, LP, MP, HP and Damaged, with holo and foil variants.", s: ["lgsf-home", "as-lgsf"] },
          synq: { v: "NM, LP, MP, HP and DMG as variants; each printing is its own product." },
        },
        {
          topic: "Importing stock",
          them: { v: "Upload a TCGplayer inventory export and review a match report.", s: ["lgsf-home"] },
          synq: {
            v: "A TCGplayer export or any spreadsheet (CSV, TSV, TXT), up to 5,000 per import, plus linking products you already sell.",
          },
        },
        {
          topic: "Buylist",
          them: {
            v: "In beta: per-game, per-condition buy rates, a review queue, payouts and emailed offers.",
            tone: "yes",
            s: ["lgsf-home"],
          },
          synq: { v: "No.", tone: "no" },
          themWins: true,
        },
        {
          topic: "Shopify POS",
          them: { v: "Not stated.", tone: "unknown", s: ["lgsf-home", "as-lgsf"] },
          synq: { v: "A code per condition for singles and the box UPC for sealed." },
        },
        {
          topic: "Other marketplaces",
          them: { v: "CardTrader sync on Growth and up. Works with Card Market.", s: ["lgsf-home", "as-lgsf"] },
          synq: { v: "Shopify only." },
          themWins: true,
        },
        {
          topic: "Free plan",
          them: { v: "200 products, daily pricing.", s: ["as-lgsf"] },
          synq: { v: "100 products, daily pricing, rules and every other feature." },
          themWins: true,
        },
        {
          topic: "Paid plans",
          them: { v: "$29.99 (2,000), $59.99 (15,000), $99.99 (50,000) a month.", s: ["as-lgsf"] },
          synq: { v: "$29 (2,000), $79 (15,000), $149 (50,000) a month." },
          themWins: true,
        },
        {
          topic: "App Store reviews",
          them: { v: "No reviews yet.", tone: "unknown", s: ["as-lgsf"] },
          synq: { v: "3.8 from 3 reviews.", s: ["as-synq"] },
        },
      ],
    },
    {
      kind: "prose",
      label: "Fair to say",
      title: "Where LGS Forge is stronger",
      paragraphs: [
        "On price, LGS Forge is cheaper at the same product counts above 2,000, and its free plan is twice the size. It has a buylist in beta, Card Kingdom prices for Magic and a CardTrader sync. If you sell only Magic, Pokémon and Riftbound and want to buy cards from customers in the same app, it's a strong option.",
      ],
      sources: ["as-lgsf", "lgsf-home"],
    },
    {
      kind: "prose",
      label: "Where Synq does more",
      title: "Where Synq is stronger",
      paragraphs: [
        "Synq covers 19 games, so a store that also sells One Piece, Lorcana, Yu-Gi-Oh! or Gundam keeps everything in one app. Rules are on every plan, and each rule shows a preview of every price before it runs, with an activity log after.",
        "For a store with a counter, Synq writes a scannable code per condition for Shopify POS. And the spreadsheet import takes any columns, so a store coming from its own sheet doesn't need a TCGplayer export first.",
      ],
    },
    {
      kind: "steps",
      label: "Switching",
      title: "Moving from LGS Forge to Synq",
      intro: "Your Shopify products stay where they are. Pick one app to own each product's price, so the two never undo each other.",
      steps: [
        {
          title: "Install Synq and pick your games",
          body: "Setup asks which games you sell and how your prices compare with TCGplayer's market price, and makes your first price rule. Pause LGS Forge's pricing on the products Synq will price.",
        },
        {
          title: "Link what you already sell",
          body: "Link from Shopify adopts a product you already have, one at a time. Synq keeps the product, reads its cost, and takes over price and stock. Nothing is written to Shopify when you link.",
        },
        {
          title: "Import the rest",
          body: "For cards that aren't in Shopify yet, import a TCGplayer export or a spreadsheet, up to 5,000 products at a time. Rows Synq can't match download with the reason.",
        },
        {
          title: "Preview, then run",
          body: "The rule's preview shows every price that would go up or down. Run it, and from then on it runs on its schedule.",
        },
      ],
    },
  ],
  faqTitle: "LGS Forge and Synq",
  faqBody: "What stores ask when choosing between the two.",
  faq: [
    {
      q: "Is LGS Forge or Synq cheaper?",
      a: "At 2,000 products they cost about the same ($29.99 and $29). Above that, LGS Forge is cheaper: $59.99 vs $79 for 15,000, and $99.99 vs $149 for 50,000. Its free plan is 200 products; Synq's is 100.",
    },
    {
      q: "Does Synq have a buylist like LGS Forge?",
      a: "No. Synq prices and lists what you sell. If you buy from customers, use a buylist or trade-in app alongside it, or a tool like LGS Forge.",
    },
    {
      q: "Do both use TCGplayer prices?",
      a: "Yes. LGS Forge also uses Card Kingdom on Magic. Synq uses TCGplayer only, per card, printing and condition, converted to your store's currency.",
    },
    {
      q: "Which games does each support?",
      a: "LGS Forge lists Magic, Pokémon and Riftbound on its site. Synq covers 19 games, including Pokémon TCG Japan, One Piece, Lorcana, Yu-Gi-Oh!, Flesh and Blood, Gundam, Union Arena and Star Wars Unlimited.",
    },
  ],
  closing: {
    title: "Every game you sell, one app.",
    body: "Install Synq from the Shopify App Store. Free up to 100 products, with every feature, and 7 days free on paid plans.",
  },
  sources: ["as-lgsf", "lgsf-home", "as-synq"],
};
