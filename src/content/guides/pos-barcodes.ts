import type { GuidePage } from "./types";
import { DOCS, GUIDES_PATH, PAGES, SRC } from "./meta";

export const POS_BARCODES: GuidePage = {
  path: "/guides/shopify-pos-barcodes-for-trading-cards",
  section: "guide",
  parent: { name: "Guides", path: GUIDES_PATH },
  seoTitle: "Shopify POS barcodes for trading cards: scan singles | Synq",
  description:
    "Scan TCG singles and sealed with Shopify POS: a barcode per condition, box UPCs for sealed, Synq codes for singles, and labels from Retail Barcode Labels.",
  keywords: [
    "shopify pos barcode trading cards",
    "scan singles shopify pos",
    "shopify pos trading cards",
    "barcode labels for singles",
    "shopify pos card shop",
  ],
  name: "Shopify POS barcodes for trading cards",
  summary: "Give every single and sealed product a scannable code, print labels, and ring up the right condition.",
  eyebrow: "Guide",
  h1: "Scan singles at the counter with Shopify POS",
  intro:
    "A booster box has a barcode on the shrink. A single doesn't, and the same card in two conditions is two prices. This guide shows how to give every condition its own code, print labels, and ring up the exact card with Shopify POS.",
  blocks: [
    {
      kind: "prose",
      label: "The problem",
      title: "Why singles are hard to scan",
      paragraphs: [
        "Shopify POS adds an item to the cart when you scan a barcode it knows. That works out of the box for sealed product, because the manufacturer printed a UPC on the box. Singles have nothing printed that a scanner can use, and the card itself isn't the thing you sell: you sell one copy in one condition.",
        "So the code has to point at a variant, not a card. A Near Mint and a Lightly Played copy of the same printing are two variants in Shopify, with two prices and two stock counts. If both carry the same code, the cashier has to pick the right one by hand, and that is where counter mistakes and stock drift come from.",
        "Two Shopify fields matter here. The **SKU** is your own reference for a variant. The **barcode** is the code a scanner reads. A variant can have both, and they don't have to match.",
      ],
    },
    {
      kind: "table",
      label: "What Synq writes",
      title: "The codes on each product",
      intro:
        "With Shopify POS installed, Synq fills both fields as it creates each product. You choose which kinds of product get a barcode in **Settings**, **Point of Sale**.",
      caption: "Barcodes and SKUs Synq writes for Shopify POS",
      head: ["Product", "Barcode", "SKU"],
      rows: [
        [
          "Single card",
          "A Synq code, one per condition (a 13-digit EAN-13 number)",
          "The TCGplayer SKU of that printing and condition",
        ],
        [
          "Sealed product",
          "The box UPC from the catalog, or a Synq code when there isn't one",
          "The TCGplayer SKU of the product",
        ],
      ],
      note: "A scan of a Synq code rings up one printing in one condition. The TCGplayer SKU on each variant also helps when you import files later, because it matches rows to the exact card and condition.",
    },
    {
      kind: "steps",
      label: "Set it up",
      title: "From no barcodes to scanning at the counter",
      steps: [
        {
          title: "Install Shopify POS",
          body: "Synq's Point of Sale settings need the Shopify POS sales channel installed. Without it they are greyed out. Once it is installed, Home shows a step called **Set up Shopify POS**.",
        },
        {
          title: "Check the Point of Sale settings",
          body: "Open **Settings**, then **Point of Sale**. These are all on at first: **Include new products in Point of Sale** (adds new products to the POS sales channel), **Sealed products** and **Single cards** under the barcodes, and **TCGplayer SKUs**.",
        },
        {
          title: "Add your cards",
          body: "Codes are made when a product is created, so cards you add from now on get them. Products created before POS was installed may not have them. To set or change one card's code, open it in the add window and use the **Point of Sale** section: Catalog UPC, Synq code or Custom.",
        },
        {
          title: "Print labels",
          body: "Synq doesn't print labels. Install Shopify's free **Retail Barcode Labels** app and print from your product list. Skip that app's option to create barcodes: Synq already wrote one on every variant.",
        },
        {
          title: "Label the sleeve, not the card",
          body: "Stick the label on the card's sleeve, top loader or bag. A label stuck on the card itself can damage it.",
        },
        {
          title: "Scan at the counter",
          body: "A scan rings up the exact card and condition at its Shopify price. Stock goes down for that condition, and your online store sees it too.",
        },
      ],
    },
    {
      kind: "prose",
      label: "Day to day",
      title: "Habits that keep the counter right",
      paragraphs: [
        "A code per condition only helps if the label on the sleeve matches the card inside. A few habits keep it that way:",
      ],
      bullets: [
        "**Label when you add.** Print the label right after you add a card to Synq, before it goes in the case or the binder.",
        "**Regrade means relabel.** If a Near Mint copy turns out to be Lightly Played, take it off Near Mint with the **Stock** panel in **Inventory**, add it back as Lightly Played from **Add products**, and print the LP label.",
        "**One label per copy.** Each copy of a card in a sleeve gets its own label, so the last copy can be scanned just like the first.",
        "**Sealed scans as is.** Boxes with a UPC printed on them can be scanned straight off the shrink once the product is in Synq; no label needed.",
        "**Prices stay in step.** POS sells at the product's Shopify price, which your price rules set. A rule run changes the price at the counter and online at the same time, so print prices on shelf tags only if you reprint them after a run.",
      ],
    },
    {
      kind: "prose",
      label: "Stock you already have",
      title: "Existing products and barcodes from a file",
      paragraphs: [
        "If your cards are already in Shopify with your own barcodes, linking them to Synq keeps those products as they are. Nothing is written to Shopify when you link, and a 10 to 14 digit barcode or SKU helps Synq find the right card as a UPC or EAN.",
        "If your barcodes are in a spreadsheet, the import has an option called **Save the barcodes from your sheet**, which saves them on the products. See the [import guide](/guides/import-tcgplayer-export-to-shopify).",
      ],
    },
    {
      kind: "split",
      label: "Limits",
      title: "What Synq does at the counter, and what it doesn't",
      left: {
        title: "Synq does",
        points: [
          "A unique barcode for each condition of each single",
          "The box UPC on sealed product, when the catalog has one",
          "The TCGplayer SKU on every variant",
          "Adds new products to the POS sales channel",
          "Keeps POS and online stock the same, at every location",
        ],
      },
      right: {
        title: "Synq doesn't",
        points: [
          "Print labels (use Retail Barcode Labels)",
          "Run a buylist or trade-ins at the counter",
          "Add codes to products created before POS was installed on its own",
          "Replace Shopify POS: checkout, payments and receipts are Shopify's",
        ],
      },
    },
  ],
  faqTitle: "Barcodes and POS",
  faqBody: "Quick answers for selling cards in person with Shopify POS.",
  faq: [
    {
      q: "Do singles really need barcodes?",
      a: "Not to sell them, but without one the cashier searches for the card and picks the condition by hand. A code per condition makes each sale one scan, and the right variant's stock goes down.",
    },
    {
      q: "What is a Synq code?",
      a: "A 13-digit EAN-13 number Synq generates for each condition of a single, and for sealed products the catalog has no UPC for. It is written to the variant's barcode field in Shopify.",
    },
    {
      q: "Can Synq print my labels?",
      a: "No. Use Shopify's free Retail Barcode Labels app, and skip its option to create barcodes, since Synq already wrote them.",
    },
    {
      q: "Does a sale at the counter update my online stock?",
      a: "Yes. A POS sale lowers stock in Shopify, and Synq copies that back, so the online store and Synq both show the new count.",
    },
    {
      q: "I added cards before installing Shopify POS. Do they have codes?",
      a: "They may not, because codes are made when a product is created. Set a code for one card in the add window, under Point of Sale.",
    },
    {
      q: "Is the price at the counter the same as online?",
      a: "Yes. Shopify POS sells at the product's Shopify price, and your price rules set that price for both.",
    },
  ],
  closing: {
    title: "One scan, the right card.",
    body: "Install Synq, turn on Point of Sale, and every card you add gets a code for each condition.",
  },
  sources: [SRC.shopifyLabels],
  related: [DOCS.pos, DOCS.addCards, DOCS.sync, DOCS.bulk, PAGES.app, PAGES.import, PAGES.conditions, PAGES.guides],
};
