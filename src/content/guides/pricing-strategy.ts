import type { GuidePage } from "./types";
import { DOCS, GUIDES_PATH, PAGES, SRC } from "./meta";

/* The worked example uses a made-up card and Synq's default percents below
   Near Mint. It is arithmetic, not market data: keep it labeled as such. */
const EXAMPLE_NM = 19.4;
const OFF: [string, string, number][] = [
  ["NM", "Near Mint", 0],
  ["LP", "Lightly Played", 10],
  ["MP", "Moderately Played", 25],
  ["HP", "Heavily Played", 40],
  ["DMG", "Damaged", 60],
];
const money = (n: number) => `$${n.toFixed(2)}`;
const upTo99 = (n: number) => Math.floor(n) + 0.99;

export const PRICING_STRATEGY: GuidePage = {
  path: "/guides/card-shop-pricing-strategy",
  section: "guide",
  parent: { name: "Guides", path: GUIDES_PATH },
  seoTitle: "Card shop pricing strategy: conditions, minimums, rounding | Synq",
  description:
    "A pricing strategy for TCG singles: pick a market reference, price each condition, set minimums from cost, round to .49 or .99, and run it as Synq price rules.",
  keywords: [
    "tcg card shop pricing strategy",
    "card shop pricing guide",
    "nm lp mp hp condition pricing",
    "how to price singles for your store",
    "trading card pricing strategy",
  ],
  name: "Card shop pricing strategy",
  summary: "How to price singles by condition, protect your cost, round, and reprice on a schedule.",
  eyebrow: "Guide",
  h1: "A pricing strategy for card shop singles",
  intro:
    "Pricing singles is a few decisions made once, then applied to every card: what you price against, how far below Near Mint each condition sits, the least you'll take, how prices end, and how often they move. This guide walks through each one and shows how to set it up in Synq.",
  blocks: [
    {
      kind: "prose",
      label: "Decision 1",
      title: "Pick the number you price against",
      paragraphs: [
        "Every consistent pricing strategy starts from a reference price. For most stores selling in US dollars that is TCGplayer's Market Price. TCGplayer compiles it from recent sales completed on TCGplayer.com, which makes it a measure of what cards sell for rather than what sellers ask. The listed median, by TCGplayer's own explanation, is the median of current listings only and can sit well above what people actually pay. More in [TCGplayer Market Price](/glossary/tcgplayer-market-price).",
        "Then decide where you sit against it. There is no right answer, only a choice that should match how you sell:",
      ],
      bullets: [
        "**At market.** Simple to explain, and fair to customers who check prices on their phone at the counter.",
        "**A little under.** Moves stock faster online, where buyers compare. It costs margin on every sale, so pair it with a minimum.",
        "**A little over.** Pays for the convenience of buying today, in person, with no shipping. It works best for cards people want to play this weekend.",
      ],
      after:
        "In Synq this is the rule's **Modify by** percent. The setup offers -10%, -5%, Market, +5% and +10% to start, and a rule takes anything from -99% to +1000%.",
    },
    {
      kind: "prose",
      label: "Decision 2",
      title: "Price each condition",
      paragraphs: [
        "Played copies sell for less than Near Mint, and how much less varies by game, card and demand. You can price played conditions two ways:",
      ],
      bullets: [
        "**From each condition's own market price.** A Lightly Played copy follows what Lightly Played copies sell for. It tracks reality, but cards that rarely sell in played condition may have no price of their own.",
        "**From Near Mint, less a percent.** Every condition is a fixed step below Near Mint. It is predictable and easy to explain, but ignores the market where played copies are in high demand or hard to find.",
      ],
      after:
        "Synq does the first by default and falls back to the second: a played condition with no market price of its own uses the rule's percent below Near Mint. If you leave a condition's percent empty, that condition isn't priced and keeps the price it has.",
    },
    {
      kind: "table",
      label: "Example",
      title: "One card, five conditions",
      intro: `An illustrative example, not market data: a made-up card with a Near Mint market price of ${money(EXAMPLE_NM)}, priced from Near Mint less Synq's default percents, at market (no Modify by), then rounded up to .99.`,
      caption: "Illustrative example of condition pricing from Near Mint less a percent",
      head: ["Condition", "Below Near Mint", "Before rounding", "Rounded up to .99"],
      rows: OFF.map(([code, name, off]) => {
        const p = Math.round(EXAMPLE_NM * (100 - off)) / 100;
        return [`${name} (${code})`, off === 0 ? "None" : `${off}%`, money(p), money(upTo99(p))];
      }),
      note: "The percents are Synq's defaults (LP 10%, MP 25%, HP 40%, DMG 60%), a starting point you can change per rule, not an industry standard. Check them against what played copies of your games really sell for.",
    },
    {
      kind: "prose",
      label: "Decision 3",
      title: "Set a minimum from your cost",
      paragraphs: [
        "A rule that follows the market follows it down too. A minimum, or floor, is the price a card never goes under, whatever the market does. There are two useful kinds:",
      ],
      bullets: [
        "**From your cost.** What you paid, plus or minus a percent or an amount. It stops a falling market from selling a card at a loss. It only works for cards with a cost recorded, so set one when you add or import them, or give every new product a default cost as a share of its market price in **Settings**.",
        "**A fixed amount.** For cheap cards whose market price is a few cents. Pulling, sleeving and shipping a single costs you the same whatever it sells for, so a floor keeps the cheapest cards worth selling one by one.",
      ],
      after:
        "Both can be the same for every condition, or set per condition. A card with its own minimum keeps the higher of its own and the rule's. Rules have a minimum but no maximum.",
    },
    {
      kind: "prose",
      label: "Decision 4",
      title: "Round your prices",
      paragraphs: [
        "Prices straight from a formula end in odd cents. Rounding gives them clean endings: .99 and .49 read as deliberate prices on a shelf tag or a product page, and whole numbers make cash at the counter quicker.",
        "Round up rather than to the nearest when you sit at or below market, so rounding never takes margin away. Synq offers no rounding, round up to x.49, round up to x.99, round up to x.00, and round to the nearest x.00. Rounding and minimums work in your store's currency, after the conversion from US dollars, so the endings are right in any currency.",
      ],
    },
    {
      kind: "prose",
      label: "Decision 5",
      title: "Decide when to reprice",
      paragraphs: [
        "Synq's catalog takes in TCGplayer market prices once a day, so repricing more than once a day won't pick up new market prices. Whether you reprice every day depends on what you sell:",
      ],
      bullets: [
        "**Every day.** For games and sets that move: new releases, cards seeing play, anything people check before buying. Run it before you open so the counter and the website agree all day.",
        "**Some days.** For slower stock, so prices don't shift under customers who are still deciding.",
        "**Once.** For a sale, say: the rule runs that day and its schedule ends.",
        "**By hand.** After a big buy, or when you change a rule, run it yourself and check the result.",
      ],
      after:
        "Whatever the schedule, look at the preview before the first run of a new rule. It lists every price that would go up, go down or stay the same, and the cards with no market price.",
    },
    {
      kind: "steps",
      label: "In Synq",
      title: "Set the strategy up as price rules",
      intro: "Each decision above is one part of a price rule. A store can have up to 50 rules.",
      steps: [
        {
          title: "Start with one rule for everything",
          body: "The setup makes a rule called \"All products\" for every game, priced as you chose, running every day at 6:00 AM in your store's time zone. Open it in **Price rules** to change it.",
        },
        {
          title: "Define products",
          body: "Leave the limits empty to price everything, or pick a game, then sets, rarities, printings or conditions. **Applies to** decides whether it prices new products as you add them, your inventory each time it runs, or both.",
        },
        {
          title: "Define pricing",
          body: "Base it on the market price, set **Modify by** and **Then add**, pick how each condition is priced and its percent below Near Mint, and pick a rounding.",
        },
        {
          title: "Define minimum",
          body: "None, a fixed amount, or your cost plus or minus a percent or an amount; the same for every condition or per condition.",
        },
        {
          title: "Preview, then schedule",
          body: "Save and the rule opens on its preview. Run it now, or set a schedule: every day, some days or once, at a time in 15-minute steps.",
        },
        {
          title: "Layer rules for the exceptions",
          body: "Add a rule for one game or one hot set on top of the store-wide one. For each condition of each card, the most specific rule that fits wins, so the narrow rule prices its cards and the broad one prices the rest.",
        },
      ],
    },
    {
      kind: "prose",
      label: "Single cards",
      title: "When a card shouldn't follow the rule",
      paragraphs: [
        "Some cards are better priced by hand: a high-end card you watch yourself, one you bought at a price you want to hold, or a local favourite that sells above market in your area. In Synq these are exceptions. A card can follow its own formula (market, market plus a percent, or market minus a percent), have its own minimum, or keep a price you type in, which excludes that condition from rules so no run changes it.",
        "Editing a price in Synq's Inventory sets that exception for you. Editing it in the Shopify admin doesn't, and the next run of its rule overwrites it. See [Exceptions](/docs/exceptions).",
      ],
    },
  ],
  faqTitle: "Pricing questions",
  faqBody: "Common questions from stores setting their first price rules.",
  faq: [
    {
      q: "How much less should a Lightly Played card cost than Near Mint?",
      a: "There is no single right number; it depends on the game and the card. Synq's defaults are 10% below Near Mint for LP, 25% for MP, 40% for HP and 60% for DMG, as a starting point. Where a condition has its own market price, Synq can follow that instead.",
    },
    {
      q: "Should I price at, above or below TCGplayer?",
      a: "It depends on how you sell. At market is simple and fair; a little under helps online sales; a little over pays for buying today in person. Pair any price under market with a minimum from your cost.",
    },
    {
      q: "How often should I reprice singles?",
      a: "No more than daily, since the market prices in Synq update once a day. Daily suits games that move; slower stock can be repriced on some days only.",
    },
    {
      q: "Can I set a maximum price?",
      a: "No. Synq's rules have a minimum but no ceiling. To hold a card at a price, set its own price as an exception.",
    },
    {
      q: "Can I price each game differently?",
      a: "Yes. Make a rule for one game, and narrow it further by set, rarity, printing or condition. The most specific rule that fits a card prices it.",
    },
    {
      q: "Do minimums and rounding work outside the US?",
      a: "Yes. They are applied in your store's currency, after the conversion from US dollars.",
    },
  ],
  closing: {
    title: "Set your prices once.",
    body: "Install Synq, build your rules, and let them run on your schedule.",
  },
  sources: [SRC.tcgpPrices],
  related: [DOCS.rules, DOCS.minimums, DOCS.run, DOCS.whichRule, DOCS.exceptions, DOCS.cost, PAGES.marketPrice, PAGES.conditions, PAGES.tcgplayer, PAGES.guides],
};
