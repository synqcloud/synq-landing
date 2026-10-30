import type { GuidePage } from "./types";
import { DOCS, PAGES, SRC } from "./meta";

export const TCGPLAYER: GuidePage = {
  path: "/integrations/tcgplayer",
  section: "integration",
  seoTitle: "TCGplayer Shopify integration: market prices, no API key | Synq",
  description:
    "Bring TCGplayer market prices into Shopify per card, printing and condition, with no API key: how often they update, currency conversion, rules and imports.",
  keywords: [
    "tcgplayer shopify integration",
    "tcg shopify integration",
    "tcgplayer shopify",
    "tcgplayer prices shopify",
    "tcgplayer api alternative",
  ],
  name: "TCGplayer",
  summary: "TCGplayer market prices in Shopify per condition, with no API key, and what Synq does with them.",
  eyebrow: "Integration",
  h1: "TCGplayer prices in Shopify, without an API key",
  intro:
    "Synq brings TCGplayer market prices into your Shopify store, for every card, printing and condition. There is no TCGplayer account to connect and no API key to request. Your price rules turn those prices into yours.",
  blocks: [
    {
      kind: "prose",
      label: "The short version",
      title: "What you get, and what you don't have to do",
      paragraphs: [
        "Many card stores price singles against TCGplayer. Getting those numbers into Shopify usually means copying them by hand, a spreadsheet that goes stale, or a developer account and API access from TCGplayer.",
        "Synq skips that. Its card catalog already carries TCGplayer market prices, so the moment you install it, every card you search shows a price for each printing and condition. You never paste a key, and nothing logs in to your TCGplayer account.",
      ],
      bullets: [
        "**Per condition.** Each condition of each printing has its own market price, so Lightly Played follows what Lightly Played copies sell for.",
        "**In your currency.** Prices are in US dollars on TCGplayer; Synq converts them to your Shopify store's currency.",
        "**Updated daily.** The catalog updates once a day.",
        "**Your rules decide.** Your Shopify prices change only when one of your price rules runs.",
      ],
    },
    {
      kind: "table",
      label: "The data",
      title: "The TCGplayer data Synq uses",
      caption: "TCGplayer data in Synq and what each piece is used for",
      head: ["Data", "What it is", "What Synq does with it"],
      rows: [
        [
          "Market price, per condition",
          "TCGplayer's Market Price for one printing in one condition. TCGplayer compiles it from recent sales completed on TCGplayer.com.",
          "The base of every price rule, shown in the **Market** column of Inventory and on each row in Add products.",
        ],
        [
          "Market price of the printing",
          "The market price for the printing as a whole.",
          "Used when Near Mint or a sealed product has no market price of its own.",
        ],
        [
          "Low, Mid and High",
          "Other TCGplayer price points for the same product.",
          "Shown when you hover the Market price in Inventory, for reference. Rules don't use them.",
        ],
        [
          "TCGplayer SKU",
          "TCGplayer's id for one printing in one condition.",
          "Written as the Shopify SKU of each condition when Shopify POS is installed, and used to match import rows exactly.",
        ],
        [
          "TCGplayer product id",
          "TCGplayer's id for the card or sealed product.",
          "Used to match import rows, and behind **View on TCGPlayer** in Inventory.",
        ],
      ],
      note: "Market Price is TCGplayer's own figure. See [TCGplayer Market Price](/glossary/tcgplayer-market-price) for what it measures and how it differs from the listed median.",
    },
    {
      kind: "prose",
      label: "How often",
      title: "When prices update, and when yours change",
      paragraphs: [
        "There are two clocks. Synq's catalog takes in TCGplayer market prices once a day. Your Shopify prices move only when a price rule runs. Between runs nothing changes them, even if the market moves, so a price on your shelf never changes without a rule you can see and preview.",
        "The setup creates a rule called \"All products\" that prices every game and runs every day at 6:00 AM in your store's time zone. You can change its time, run it on some days only, pause it, or run any rule by hand from **Price rules**. Each run lands in the **Activity** panel with every price it raised or lowered.",
        "New products are priced as you add them, by the rule that applies to new products. If no rule fits a new product, it gets the plain market price.",
      ],
    },
    {
      kind: "prose",
      label: "Currency",
      title: "US dollar prices in your store's currency",
      paragraphs: [
        "TCGplayer prices are US dollars. Synq follows your Shopify store's currency on its own, with no setting to pick, and converts each price with current exchange rates from its catalog. Your rule's minimum and rounding are applied after the conversion, so a rule that rounds up to .99 gives .99 endings in euros, pounds or dollars alike.",
        "If Synq has no rate for your currency, it can't price your cards, and **Settings** says \"Unsupported currency\". Tell us with **Feedback** on Home.",
        "These are US market prices. Where your local market runs higher or lower, move the rule's percent for that game rather than editing cards one by one.",
      ],
    },
    {
      kind: "steps",
      label: "From market to shelf",
      title: "How a TCGplayer price becomes your price",
      intro: "Each run of a rule goes through the same steps for every condition it prices:",
      steps: [
        {
          title: "Take the market price",
          body: "The condition's own TCGplayer market price, or Near Mint's less a percent if the rule prices conditions that way. A played condition with no market price of its own uses the rule's percent below Near Mint.",
        },
        {
          title: "Convert it",
          body: "From US dollars to your store's currency.",
        },
        {
          title: "Apply the rule",
          body: "Move it by the rule's percent (from -99% to +1000%), then add or take off the rule's amount.",
        },
        {
          title: "Round it and hold the minimum",
          body: "Round to the rule's ending and keep it at or above the rule's minimum: a fixed amount, or your cost plus or minus a margin. A price of 0 or less is never sent to Shopify.",
        },
        {
          title: "Write it to Shopify",
          body: "The new price goes on the variant in Shopify. Cards you set yourself, marked **Excluded from rules**, are left as they are.",
        },
      ],
    },
    {
      kind: "prose",
      label: "Your TCGplayer stock",
      title: "Bring a TCGplayer export into Shopify",
      paragraphs: [
        "If you already sell on TCGplayer, your inventory is one CSV away. In TCGplayer's Seller Portal, the **Pricing** tab can export your live inventory to a CSV file (TCGplayer offers this to Level 4 sellers).",
        "In Synq, open **Add products**, then **Import**, then **From TCGplayer**, and upload the file. Synq recognises a TCGplayer export by its own columns and reads each row by its TCGplayer SKU, so card, printing and condition are exact. It usually goes straight to the review, where you choose what happens to stock you already have and how new products are priced. The [import guide](/guides/import-tcgplayer-export-to-shopify) walks through it.",
      ],
    },
    {
      kind: "split",
      label: "Be clear about it",
      title: "What this integration is, and what it isn't",
      left: {
        title: "It is",
        points: [
          "TCGplayer market prices, per condition, inside Shopify",
          "A daily price update in Synq's catalog",
          "Price rules that turn those prices into yours",
          "An import that reads TCGplayer exports exactly",
          "TCGplayer SKUs on your variants for Shopify POS",
        ],
      },
      right: {
        title: "It isn't",
        body: "If you sell on TCGplayer and on Shopify, keep your TCGplayer stock up to date there; Synq won't do it for you.",
        points: [
          "A TCGplayer marketplace listing tool",
          "A sync of your stock or prices back to TCGplayer",
          "A sync of TCGplayer orders",
          "A connection to your TCGplayer account",
          "Cardmarket or other price sources",
        ],
      },
    },
  ],
  faqTitle: "TCGplayer and Synq",
  faqBody: "What Synq takes from TCGplayer, and what it leaves alone.",
  faq: [
    {
      q: "Do I need a TCGplayer API key or developer account?",
      a: "No. TCGplayer market prices come with Synq's catalog. There is nothing to request, paste or renew.",
    },
    {
      q: "Do I need a TCGplayer seller account?",
      a: "Not to use the prices. You only need one if you want to export your TCGplayer inventory and import it into Shopify.",
    },
    {
      q: "Which TCGplayer price does Synq use?",
      a: "The Market Price, for each condition of each printing. Low, Mid and High are shown for reference when you hover the market price in Inventory, but rules are based on the market price.",
    },
    {
      q: "How often do prices update?",
      a: "Synq's catalog updates once a day. Your Shopify prices change when a price rule runs: the setup's rule runs every day at 6:00 AM in your store's time zone, and you can run any rule yourself.",
    },
    {
      q: "Does Synq update my TCGplayer listings or stock?",
      a: "No. Synq only reads TCGplayer prices. It doesn't list on TCGplayer, change your TCGplayer prices or stock, or bring in TCGplayer orders.",
    },
    {
      q: "What if a card has no TCGplayer market price?",
      a: "When you add it, Synq asks you to set your price for that condition. In a rule's preview, those cards are under No market. Set their price yourself with an exception.",
    },
    {
      q: "My store isn't in US dollars. Does it still work?",
      a: "Yes, if Synq has an exchange rate for your currency. Prices are converted from US dollars, then rounded and held to your minimum in your currency.",
    },
  ],
  closing: {
    title: "TCGplayer prices, on your Shopify shelf.",
    body: "Install Synq, pick your games, and every card you add starts from its market price.",
  },
  sources: [SRC.tcgpPrices, SRC.tcgpCsv],
  related: [
    PAGES.app,
    PAGES.marketPrice,
    PAGES.import,
    PAGES.pricing,
    DOCS.market,
    DOCS.rules,
    DOCS.run,
    DOCS.import,
    PAGES.compare,
  ],
};
