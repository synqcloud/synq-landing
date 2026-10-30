/* /synq-vs-spreadsheets: an honest side-by-side. English only, outside
   messages/*.json like the game pages. */

export const COMPARE = {
  slug: "synq-vs-spreadsheets",
  seoTitle: "Synq vs spreadsheets for card pricing on Shopify",
  description:
    "Pricing cards in a spreadsheet means manual TCGplayer lookups and no write-back to Shopify. How Synq compares on pricing, conditions and keeping prices current.",
  ogTitle: "Synq vs spreadsheets",
  ogDescription: "How Synq compares to pricing trading cards in a spreadsheet for a Shopify store.",
  keywords: [
    "card inventory spreadsheet vs app",
    "stop pricing cards in a spreadsheet",
    "shopify card pricing spreadsheet",
    "synq vs spreadsheet",
  ],
  label: "Comparison",
  h1: "Synq vs spreadsheets",
  intro:
    "A spreadsheet is a fine place to start. It doesn't write prices to your Shopify store, though, and every market move means another round of lookups and re-entry. Synq does the pricing and the Shopify side for you. Here is how the two compare for a card shop on Shopify.",
};

export type CompareRow = {
  task: string;
  sheet: string;
  synq: string;
  /** the spreadsheet does this one as well or better: said plainly */
  sheetWins?: boolean;
};

export const ROWS: CompareRow[] = [
  {
    task: "Getting market prices",
    sheet: "Look up each card on TCGplayer by hand.",
    synq: "TCGplayer's market price for each card and printing, brought in every day and converted to your store's currency.",
  },
  {
    task: "Putting prices in Shopify",
    sheet: "Copy and paste each price into its Shopify product.",
    synq: "Synq updates the prices in Shopify for you.",
  },
  {
    task: "Conditions",
    sheet: "Extra columns for NM, LP, MP, HP and DMG, kept in step by hand.",
    synq: "Each condition is a variant on the card's Shopify product, and can follow its own market price.",
  },
  {
    task: "Keeping prices current",
    sheet: "Re-check and re-enter, as often as you find the time.",
    synq: "Price rules run on your schedule, or whenever you press run. Every run lands in Activity.",
  },
  {
    task: "Adding new cards",
    sheet: "Type the title, set and number, find a photo, set up the variants.",
    synq: "Search by name or number and tap +. Synq creates the product with its photo and the condition you chose.",
  },
  {
    task: "Mistakes",
    sheet: "A mistyped price or a pasted wrong cell goes live in your store.",
    synq: "The same rule on every card, with a minimum based on your cost so nothing sells below it.",
  },
  {
    task: "Your own formulas",
    sheet: "Any column and any formula you can write.",
    synq: "Rules cover your margin, a minimum from your cost and rounding. Set a card's price by hand when you want, and rules skip it.",
    sheetWins: true,
  },
  {
    task: "Cost",
    sheet: "Free, apart from your time.",
    synq: "Free up to 100 cards. Paid plans start with 7 days free.",
    sheetWins: true,
  },
];

export const ENOUGH = {
  title: "When a spreadsheet is enough",
  body: "If you sell a handful of cards and rarely change their prices, a spreadsheet works. The work shows up as your stock grows, because it scales with the number of cards and with how fast the market moves.",
  points: [
    "Fewer cards than you can re-check in an afternoon",
    "Prices you change a few times a year",
    "No conditions to keep apart",
  ],
};

export const BRING = {
  title: "Your spreadsheet comes with you",
  body: "When you move to Synq, save the spreadsheet you already have as CSV and import it, or import a TCGplayer export. Synq matches each row to the catalog and creates what's new, without duplicates. For what you already sell, you choose whether the file adds to your stock, replaces it or leaves it as it is. When a name fits several printings, you pick the one on your shelf.",
};
