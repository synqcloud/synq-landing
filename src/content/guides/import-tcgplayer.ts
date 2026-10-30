import type { GuidePage } from "./types";
import { DOCS, GUIDES_PATH, PAGES, SRC } from "./meta";

export const IMPORT_TCGPLAYER: GuidePage = {
  path: "/guides/import-tcgplayer-export-to-shopify",
  section: "guide",
  parent: { name: "Guides", path: GUIDES_PATH },
  seoTitle: "Import a TCGplayer export or CSV of cards into Shopify | Synq",
  description:
    "Import a TCGplayer export or CSV into Shopify with Synq: check the matches, choose how stock and prices are set, and fix rows that didn't match.",
  keywords: [
    "tcgplayer export to shopify",
    "import tcgplayer inventory into shopify",
    "bulk upload trading cards shopify csv",
    "how to bulk import trading cards to shopify",
    "shopify card inventory csv import",
  ],
  name: "Import a TCGplayer export into Shopify",
  summary: "Move your TCGplayer inventory or your own spreadsheet into Shopify, matched card by card.",
  eyebrow: "Guide",
  h1: "Import a TCGplayer export or card spreadsheet into Shopify",
  intro:
    "Your inventory already lives somewhere: a TCGplayer seller account, a spreadsheet, another app's export. This guide moves it into Shopify with Synq, matched to the exact card, printing and condition, and reviewed before anything is created.",
  blocks: [
    {
      kind: "prose",
      label: "Before you start",
      title: "What a good import file looks like",
      paragraphs: [
        "Shopify's own product import expects one row per variant with Shopify's column names, and it has no idea which card a row is. Synq's import works the other way round: you bring the file you have, and Synq finds the card for each row, then creates the Shopify product with its conditions as variants.",
        "The file needs to be text, one row per line:",
      ],
      bullets: [
        "**CSV, TSV or TXT.** Excel and Numbers workbooks are refused. In Excel, use File, Save As, and pick CSV. In Google Sheets, use File, Download, Comma-separated values.",
        "**Any separator.** Commas, semicolons and tabs are found for you, and so is the text encoding.",
        "**Title rows are fine.** Lines above the header row don't get in the way.",
        "**Something to find the card by.** Each row needs a product name, a barcode or a TCGplayer ID.",
        "**Up to 5,000 products per import.** Split a bigger file into several imports.",
      ],
      after: "Not sure how to lay out your own sheet? The import page has a **Download a template** link with the columns ready.",
    },
    {
      kind: "steps",
      label: "From TCGplayer",
      title: "Export your inventory from TCGplayer",
      intro:
        "TCGplayer offers CSV export of your inventory to Level 4 sellers, from the **Pricing** tab of the Seller Portal.",
      steps: [
        {
          title: "Open the Pricing tab",
          body: "In TCGplayer's Seller Portal, go to **Pricing**.",
        },
        {
          title: "Export your inventory",
          body: "Pick **Export From Live** for your whole live inventory, or **Export Filtered CSV** for a part of it. TCGplayer's export includes every product with a price, even ones with no quantity.",
        },
        {
          title: "Leave the file as it is",
          body: "Don't open it and save it as a workbook. Synq reads the CSV as TCGplayer wrote it.",
        },
      ],
    },
    {
      kind: "steps",
      label: "Into Shopify",
      title: "Import the file with Synq",
      intro: "The page is called **Import a spreadsheet** and has four steps: Spreadsheet, Columns, Review and Import.",
      steps: [
        {
          title: "Open the import",
          body: "In **Add products**, open **Import** and pick **From TCGplayer** or **From a spreadsheet**. During the setup, the same import is behind **Import my file**.",
        },
        {
          title: "Upload the file",
          body: "Upload the CSV. A TCGplayer export is recognised by its own columns (TCGplayer Id and Product Line). Synq reads its TCGplayer Id as the exact SKU, so card, printing and condition are certain, and it usually skips straight to Review.",
        },
        {
          title: "Check the columns",
          body: "For your own sheet, Synq guesses each column from its header, in English or Spanish. Check each one, or set it to **Don't import**. It understands Product name, TCGplayer ID, TCGplayer SKU, Barcode, Game, Set, Card number, Printing, Condition, Quantity, Location, Price, Cost and Status.",
        },
        {
          title: "Review the matches",
          body: "Tabs show **All**, **New**, **In your store** and **To answer**. A row that fits several products says how many fit: pick the one on your shelf. A row that matched nothing can be searched by hand or left out.",
        },
        {
          title: "Choose the options",
          body: "Decide what happens to products you already sell, how new products are priced, whether they start as drafts, and which sales channels they go to. The next section explains each choice.",
        },
        {
          title: "Run it",
          body: "The import runs in the background, so you can leave the page. When it's done, rows that were left out download as a CSV with the reason on each row, and the import is listed under **Sheets you imported**.",
        },
      ],
    },
    {
      kind: "table",
      label: "Matching",
      title: "How each row finds its card",
      intro: "Synq tries these in order and stops at the first that works. The higher up the list your file is, the fewer rows you answer by hand.",
      caption: "The order Synq uses to match import rows to cards",
      head: ["Order", "Column", "How sure"],
      rows: [
        ["1", "TCGplayer SKU", "Exact: one printing in one condition"],
        ["2", "TCGplayer ID", "Exact card or product"],
        ["3", "Barcode", "Exact, when the catalog has that UPC or EAN"],
        ["4", "Exact name", "Can fit several printings or sets"],
        ["5", "Close name", "A suggestion to confirm"],
      ],
      note: "When a column is missing, each row gets a quantity of 1, your first location, your default condition and the market price.",
    },
    {
      kind: "table",
      label: "Options",
      title: "The choices that decide stock and price",
      caption: "Import options in Synq",
      head: ["Option", "Choices", "When to pick what"],
      rows: [
        [
          "Products you already sell",
          "Add the sheet's stock, Make the sheet's stock their stock, or Leave them as they are",
          "Add for a new delivery; make it their stock for a fresh count. A TCGplayer export replaces stock by default.",
        ],
        [
          "Price of new products",
          "Your price rules (default) or The price in your sheet",
          "Rules keep new cards in line with the rest of the store. Your sheet's price keeps what you charge today, until the next run of a rule that prices those cards. To keep a price for good, set it as an exception.",
        ],
        ["New products start as", "What your sheet says, Draft or Active", "Draft lets you check them in Shopify before customers see them."],
        ["Channels", "Your sales channels", "Where new products are published."],
        ["Barcodes", "Save the barcodes from your sheet", "Turn on if your sheet has the codes on your labels."],
      ],
    },
    {
      kind: "prose",
      label: "Good to know",
      title: "Limits and what happens next",
      paragraphs: ["A few things to plan around:"],
      bullets: [
        "**Plan limit.** New products past your plan's limit aren't created. Stock for products you already have still goes in.",
        "**One product per printing.** A Normal and a Foil copy are two products; each condition is a variant. A sheet of 3,000 rows can become fewer products than rows.",
        "**Missing games.** If a row is for a game Synq doesn't carry, use **Request this game** in the import.",
        "**No export back.** Synq doesn't download your inventory as a file. Keep your original file.",
        "**After the import.** From then on, your price rules price the imported cards each time they run. Open a rule's preview in **Price rules** to see every price it would change before it runs.",
      ],
    },
    {
      kind: "prose",
      label: "Other ways in",
      title: "When an import isn't the right tool",
      paragraphs: [
        "If your cards are already Shopify products, you don't need a file. Use **Link from Shopify** in the same Import menu to link each product to its card; Synq keeps the product, its title and description, and takes over price and stock. It is one product at a time, so for a large store an import of fresh products may be faster.",
        "If you are starting from nothing, skip the file and add cards from the search. See [the Shopify TCG app](/shopify-tcg-app) for how adding works.",
      ],
    },
  ],
  faqTitle: "Importing cards",
  faqBody: "What works, what doesn't, and what to do with rows that don't match.",
  faq: [
    {
      q: "Can I upload an Excel file?",
      a: "No. Save it as CSV first: in Excel, File, Save As, CSV. Synq refuses Excel and Numbers workbooks.",
    },
    {
      q: "How many cards can I import at once?",
      a: "Up to 5,000 products per import. Split a bigger file, and stay within your plan's product limit.",
    },
    {
      q: "Does a TCGplayer export need any editing?",
      a: "No. Synq recognises it and reads each row by its TCGplayer SKU, so card, printing and condition are exact.",
    },
    {
      q: "Will the import create duplicates?",
      a: "No. Each card and printing is one product in Synq. Rows for a printing you already sell update that product's stock, using the option you choose.",
    },
    {
      q: "What happens to rows that don't match?",
      a: "You can search them by hand in the review or leave them out. Rows left out download as a CSV with the reason on each line.",
    },
    {
      q: "Can I keep the prices from my sheet?",
      a: "Yes, until a price rule runs. Choose The price in your sheet for new products, and they start at that price. The next run of a rule that covers them reprices them, unless you exclude those cards from rules.",
    },
  ],
  closing: {
    title: "Bring your whole inventory in.",
    body: "Install Synq, open Import, and drop in your TCGplayer export or your own sheet.",
  },
  sources: [SRC.tcgpCsv],
  related: [DOCS.import, DOCS.link, DOCS.rules, DOCS.plans, PAGES.tcgplayer, PAGES.app, PAGES.pos, PAGES.spreadsheets, PAGES.guides],
};
