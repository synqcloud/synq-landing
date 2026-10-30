import type { ComparePage } from "./types";
import { BYLINE } from "./hub";

export const TCG_IMPORTER: ComparePage = {
  path: "/compare/tcg-importer",
  parent: { name: "Compare", path: "/compare" },
  seoTitle: "TCG Importer vs Synq: Shopify TCG apps compared (2026)",
  description:
    "TCG Importer and Synq both put trading cards on Shopify. A sourced side-by-side of price sources, rules, conditions, POS barcodes, plans and reviews.",
  keywords: ["tcg importer vs synq", "tcg importer alternative", "tcg importer review", "tcg shopify importer"],
  name: "TCG Importer vs Synq",
  eyebrow: "Head to head",
  h1: "TCG Importer vs Synq",
  intro:
    "Both are Shopify apps for card shops, and both turn a catalog of cards into Shopify products. They differ in where prices come from, how many products stay priced, and what happens at the counter. Here is a fair look at both, with sources.",
  byline: BYLINE,
  blocks: [
    {
      kind: "split",
      label: "The short version",
      left: {
        title: "TCG Importer suits you if",
        points: [
          "You mainly want to import cards fast and price a smaller set of hot products live",
          "You sell graded cards and want them imported (Pro TCG plan)",
          "You want wholesale stock through its partner",
          "Reviews matter to you: it has 8 on the App Store, rated 4.4",
        ],
      },
      right: {
        title: "Synq suits you if",
        points: [
          "You want every product priced every day, not a chosen few",
          "You price by condition, set or rarity, with a minimum from your cost",
          "You sell at a Shopify POS counter and need a code to scan per condition",
          "You sell beyond Pokémon: Synq covers 19 games",
        ],
      },
    },
    {
      kind: "vs",
      label: "Side by side",
      title: "TCG Importer and Synq, row by row",
      them: "TCG Importer",
      note: "TCG Importer facts come from its App Store listing, pricing page, features page and user guide, checked October 2026. Synq facts come from the app itself.",
      rows: [
        {
          topic: "Price source",
          them: {
            v: "Powered by PriceCharting at this stage, the developer says, with more sources planned. The listing names PriceCharting and TCGplayer.",
            s: ["as-tcgi-rev", "as-tcgi"],
          },
          synq: { v: "TCGplayer's market price for each card, printing and condition, in USD, converted to your store's currency." },
        },
        {
          topic: "How often prices move",
          them: { v: "Live Pricing Sync updates every 4 hours.", s: ["tcgi-guide"] },
          synq: {
            v: "The market price comes in once a day. Your prices change when a rule runs: every day, some days or once, at a time you choose.",
          },
          themWins: true,
        },
        {
          topic: "How many products stay priced",
          them: {
            v: "25 live pricing products on Small TCG, 50 on Growing TCG, unlimited on Pro TCG ($129).",
            s: ["tcgi-pricing", "as-tcgi"],
          },
          synq: { v: "Every product a rule covers, on every plan, Free included." },
        },
        {
          topic: "Pricing controls",
          them: {
            v: "A % markup on the synced price and a minimum (safety net) price. Safety net pricing is on Pro TCG.",
            s: ["tcgi-features", "tcgi-pricing"],
          },
          synq: {
            v: "Rules by game, set, rarity, printing and condition: a % and an amount on market, a minimum (fixed or from your cost), rounding to .49, .99 or whole. Preview every price before a run.",
          },
        },
        {
          topic: "Conditions",
          them: { v: "Not stated on its pages.", tone: "unknown", s: ["as-tcgi", "tcgi-guide"] },
          synq: { v: "NM, LP, MP, HP and DMG as variants of one product, each with its own TCGplayer price or a % below Near Mint." },
        },
        {
          topic: "Getting cards in",
          them: {
            v: "Bulk import from its card database: 5 imports on Free, 100 or 300 a week on the middle plans, unlimited on Pro TCG.",
            s: ["as-tcgi", "tcgi-pricing"],
          },
          synq: {
            v: "Search by name or number, link products you already sell, or import a TCGplayer export or spreadsheet (CSV, TSV, TXT), up to 5,000 per import.",
          },
        },
        {
          topic: "Graded cards",
          them: { v: "Graded card imports on Pro TCG.", s: ["as-tcgi", "tcgi-pricing"] },
          synq: { v: "Not built in. Graded cards are not in the catalog." },
          themWins: true,
        },
        {
          topic: "Shopify POS",
          them: {
            v: "No automatic barcodes, per a June 2026 developer reply.",
            tone: "no",
            s: ["as-tcgi-rev"],
          },
          synq: { v: "A unique code per condition for singles and the box UPC for sealed, so a scan rings up the exact card." },
        },
        {
          topic: "Buylist and events",
          them: { v: "Not stated.", tone: "unknown", s: ["as-tcgi"] },
          synq: { v: "No.", tone: "no" },
        },
        {
          topic: "Plans",
          them: { v: "Free, $29, $49 and $129 a month.", s: ["as-tcgi"] },
          synq: { v: "Free up to 100 products, then $29 (2,000), $79 (15,000) and $149 (50,000). Plans differ only by product count." },
        },
        {
          topic: "App Store reviews",
          them: { v: "4.4 from 8 reviews, with developer replies.", s: ["as-tcgi"] },
          synq: { v: "3.8 from 3 reviews.", s: ["as-synq"] },
          themWins: true,
        },
      ],
    },
    {
      kind: "prose",
      label: "Fair to say",
      title: "Where TCG Importer is stronger",
      paragraphs: [
        "TCG Importer's sync runs every 4 hours on the products you pick, which is faster than a daily rule when a card spikes. It imports graded cards on its top plan, offers wholesale stock through its partner, and has more App Store reviews than Synq, with a developer who answers them in public.",
        "If most of your sales come from a few hundred chase cards and new sealed, and you'd like those to track the market closely, its model fits that well.",
      ],
      sources: ["tcgi-guide", "tcgi-pricing", "as-tcgi"],
    },
    {
      kind: "prose",
      label: "Where Synq does more",
      title: "Where Synq is stronger",
      paragraphs: [
        "Synq prices your whole inventory, not a chosen few, on every plan. A rule can be as broad as every game, or as narrow as one set's Near Mint holofoils, and the most specific rule wins. Before a rule runs, the preview shows each price that would go up or down, and every run lands in an activity log you can open later.",
        "Conditions are variants of one Shopify product, so a customer sees NM and LP on the same page. Each condition can follow its own TCGplayer price, or a % below Near Mint. A minimum based on what you paid keeps a card from selling below cost.",
        "At the counter, Synq writes a scannable code per condition, so Shopify POS rings up the exact card. And the catalog covers 19 games, from Pokémon and Magic to Riftbound, Gundam and Union Arena.",
      ],
    },
    {
      kind: "steps",
      label: "Switching",
      title: "Moving from TCG Importer to Synq",
      intro: "Your Shopify products stay where they are. Synq takes over their price and stock.",
      steps: [
        {
          title: "Install and pick your games",
          body: "Setup asks which games you sell and makes your first price rule. Turn off TCG Importer's live pricing on the same products, so only one app sets their price.",
        },
        {
          title: "Link or import",
          body: "Link products you already sell one at a time, or import a spreadsheet with a TCGplayer ID, barcode or name per line. Synq matches each line to its card.",
        },
        {
          title: "Preview, then run",
          body: "Open the rule's preview, check what goes up and down, and run it. From then on it runs on its schedule.",
        },
      ],
    },
  ],
  faqTitle: "TCG Importer and Synq",
  faqBody: "The questions stores ask when they're choosing between the two.",
  faq: [
    {
      q: "Is TCG Importer or Synq better for a Pokémon store?",
      a: "Both handle Pokémon singles and sealed. TCG Importer is a good fit if you want quick imports and close tracking on a smaller set of products, plus graded cards. Synq fits if you want every product repriced daily with rules by set, rarity or condition, Pokémon TCG Japan as its own game, and codes for Shopify POS.",
    },
    {
      q: "Can I use TCG Importer and Synq on the same store?",
      a: "You can, but don't let both set prices on the same products. Whichever runs last wins, and prices will flip between the two. If you keep TCG Importer for imports, leave its live pricing off on products Synq prices.",
    },
    {
      q: "Does Synq update prices every 4 hours like TCG Importer?",
      a: "No. Synq brings in TCGplayer's market price once a day and your rules run on the schedule you set, daily by default. For most singles that's enough; for a card that spikes, set its price by hand and rules leave it alone.",
    },
    {
      q: "Does Synq use PriceCharting?",
      a: "No. Synq uses TCGplayer market prices only, per card, printing and condition, converted to your store's currency.",
    },
    {
      q: "Which is cheaper?",
      a: "At the bottom, both have a free plan and a $29 plan. TCG Importer's $29 plan includes 25 live pricing products; Synq's covers up to 2,000 products, all priced by rules. At the top, TCG Importer's Pro TCG is $129 with unlimited products; Synq's Scale is $149 for 50,000.",
    },
  ],
  closing: {
    title: "Price every card, not a chosen few.",
    body: "Install Synq from the Shopify App Store. Free up to 100 products, with every feature, and 7 days free on paid plans.",
  },
  sources: ["as-tcgi", "as-tcgi-rev", "tcgi-pricing", "tcgi-features", "tcgi-guide", "as-synq"],
};
