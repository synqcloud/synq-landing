import { PLANS } from "@/content/plans";
import type { GuidePage } from "./types";
import { DOCS, PAGES } from "./meta";

const fmt = (n: number) => n.toLocaleString("en-US");

export const GAMES_19 = [
  "Magic: The Gathering",
  "Disney Lorcana",
  "Pokémon",
  "Pokémon TCG Japan",
  "One Piece",
  "Flesh and Blood",
  "Riftbound",
  "Sorcery: Contested Realm",
  "Digimon",
  "Yu-Gi-Oh!",
  "Gundam Card Game",
  "Union Arena",
  "UniVersus",
  "Grand Archive",
  "Final Fantasy TCG",
  "Weiss Schwarz",
  "Star Wars Unlimited",
  "Elestrals",
  "Dragon Ball Super: Fusion World",
];

export const SHOPIFY_TCG_APP: GuidePage = {
  path: "/shopify-tcg-app",
  section: "app",
  seoTitle: "Shopify TCG app for singles and sealed, TCGplayer prices | Synq",
  description:
    "Synq is a Shopify TCG app: add singles and sealed from 19 games, one variant per condition, TCGplayer prices and scheduled price rules. Free up to 100 products.",
  keywords: ["tcg shopify app", "shopify tcg app", "shopify tcg plugin", "shopify tcg singles", "trading card shopify app"],
  name: "Shopify TCG app",
  summary: "What a TCG app for Shopify should do, and how Synq does each part.",
  eyebrow: "Shopify TCG app",
  h1: "The Shopify TCG app for singles and sealed",
  intro:
    "Synq is a Shopify app for trading card stores. Search a card, pick its condition and quantity, and it becomes a Shopify product with one variant per condition, priced from TCGplayer. Price rules keep those prices current on a schedule you set.",
  secondary: { href: "#plans", label: "See plans" },
  blocks: [
    {
      kind: "prose",
      label: "The job",
      title: "What a TCG app for Shopify has to do",
      paragraphs: [
        "Shopify is a good shop for cards, but it knows nothing about them. It has no card database, no idea that a Near Mint and a Lightly Played copy are the same card at two prices, and no market price to start from. A store that sells singles by typing products in by hand ends up with hundreds of products to create and thousands of prices that go stale every week.",
        "Whatever you call it, a TCG app, plugin or integration, it should take that work off your hands. Here is the checklist we built Synq against:",
      ],
      bullets: [
        "**Find the card, not type it.** Search a catalog by name, set or number, and pick the exact printing.",
        "**Conditions as variants.** One product per card and printing, with a variant for each condition, so stock and price are per condition.",
        "**A market price per condition.** A played copy should start from what played copies sell for, not from a flat cut off Near Mint.",
        "**Your prices, kept current.** Rules that turn market prices into your prices, with a minimum, and run on their own.",
        "**Bring your stock in.** Import a file or adopt the products you already have, without duplicates.",
        "**Sell it at the counter.** Barcodes on each condition so Shopify POS rings up the right card.",
      ],
    },
    {
      kind: "table",
      label: "How Synq does it",
      title: "Each part of the job, and where you see it in Synq",
      caption: "What Synq does for each part of selling cards on Shopify",
      head: ["Job", "What Synq does", "Where"],
      rows: [
        [
          "Find the card",
          "Search by name or number, or type @ and a set code to pin a set. Each printing shows its market price and your stock.",
          "Add products",
        ],
        [
          "Conditions",
          "NM, LP, MP, HP and DMG are variants under one option called Condition. Sealed products are Unopened.",
          "Your Shopify product",
        ],
        [
          "Printings",
          "Each card and printing is its own product, so a Foil is priced apart from a Normal copy.",
          "Your Shopify product",
        ],
        [
          "Market prices",
          "The TCGplayer market price for each condition, in US dollars, converted to your store's currency.",
          "Inventory, Market column",
        ],
        [
          "Your prices",
          "Price rules: a percent up or down, an amount, rounding and a minimum. Run by hand or on a schedule.",
          "Price rules",
        ],
        [
          "Bulk edits",
          "Stock, cost, conditions, exceptions, active or draft, and manual collections for many products at once.",
          "Inventory",
        ],
        [
          "Bring stock in",
          "Import a CSV, TSV or TXT file (TCGplayer exports included), or link products already in Shopify.",
          "Add products, Import",
        ],
        ["Counter sales", "A barcode on each condition and the TCGplayer SKU, for Shopify POS.", "Settings, Point of Sale"],
      ],
    },
    {
      kind: "steps",
      label: "Singles and sealed",
      title: "How a card gets into your store",
      steps: [
        {
          title: "Pick your games",
          body: "The setup asks which games you sell and ticks the ones your store already carries. Each game gets a singles collection and a sealed collection, or none. You can add more games later in **Settings**.",
        },
        {
          title: "Search the card",
          body: "In **Add products**, type a name or a card number. Type @ and a set name or code to search inside one set. Results come in while you type, with the cards already in your store first.",
        },
        {
          title: "Pick condition, printing and quantity",
          body: "The add window shows a price for each condition, a printing picker when there is more than one, a location picker when you have several, and the price rule that sets the price. Sealed products are always Unopened.",
        },
        {
          title: "Add to store",
          body: "Synq creates the Shopify product as a draft by default, or active if you prefer, in the sales channels you pick and in the game's collection. Add the same printing again and the stock goes to that condition; a new condition becomes a new variant.",
        },
      ],
    },
    {
      kind: "prose",
      label: "Prices",
      title: "TCGplayer prices for every condition",
      paragraphs: [
        "Every price in Synq starts from the [TCGplayer market price](/glossary/tcgplayer-market-price) for that card, printing and condition. A Lightly Played copy follows what Lightly Played copies sell for. When Near Mint or a sealed product has no price of its own, the printing's market price is used.",
        "Synq's catalog updates once a day. Your store's prices change only when a price rule runs, never in between, so nothing moves without a rule you can preview. The setup creates a rule called \"All products\" that runs every day at 6:00 AM in your store's time zone. More on the data on the [TCGplayer page](/integrations/tcgplayer).",
      ],
    },
    {
      kind: "prose",
      label: "Price rules",
      title: "Price rules that run on a schedule",
      paragraphs: [
        "A price rule says which products it prices and how. Make one for every game, or one for a single game narrowed by set, rarity, printing or condition. When rules overlap, the most specific one prices the card, so a rule for one set can sit on top of a store-wide rule.",
      ],
      bullets: [
        "**Base and change.** Start from the market price, move it by a percent (from -99% to +1000%), then add or take off an amount in your currency.",
        "**Each condition.** Follow each condition's own market price, or price every condition from Near Mint less a percent. The defaults are LP 10%, MP 25%, HP 40% and DMG 60% below Near Mint.",
        "**Rounding and a minimum.** Round up to .49, .99 or a whole number, and set a floor: a fixed amount, or your cost plus or minus a margin.",
        "**Preview, then run.** Every rule opens on a preview of each price it would change. Run it now, or schedule it every day, on some days, or once for a sale.",
        "**Exceptions.** A single card can follow its own formula or keep a price you set, and no rule touches it.",
      ],
      after:
        "A store can have up to 50 rules. The [pricing strategy guide](/guides/card-shop-pricing-strategy) shows how to set them up, and the docs cover [every option](/docs/price-rules).",
    },
    {
      kind: "prose",
      label: "The rest of the week",
      title: "Bulk edits, imports and the counter",
      paragraphs: ["The work around the prices is in the same app:"],
      bullets: [
        "**Import.** Bring in a TCGplayer export or your own sheet, up to 5,000 products per import. Synq matches each row to its card and lets you review before anything is created. See [the import guide](/guides/import-tcgplayer-export-to-shopify).",
        "**Link what you have.** Products already in Shopify can be linked to their card one at a time. Synq keeps the product and takes over its price and stock.",
        "**Edit many at once.** In **Inventory**, tick products or select every match, then add or remove stock, set cost, remove conditions, set exceptions, set products active or draft, and add them to collections.",
        "**Shopify POS.** Each condition of a single gets its own barcode and sealed products get the box UPC, so a scan rings up the right card. See [the POS guide](/guides/shopify-pos-barcodes-for-trading-cards).",
      ],
    },
    {
      kind: "links",
      label: "Games",
      title: "19 games in the catalog",
      intro: `${GAMES_19.join(", ")}. Pokémon TCG Japan is its own game, separate from English Pokémon.`,
      links: [
        { href: "/for/pokemon", label: "Pokémon" },
        { href: "/for/magic-the-gathering", label: "Magic: The Gathering" },
        { href: "/for/yu-gi-oh", label: "Yu-Gi-Oh!" },
        { href: "/for/disney-lorcana", label: "Disney Lorcana" },
        { href: "/for/one-piece", label: "One Piece" },
        { href: "/for/riftbound", label: "Riftbound" },
        { href: "/for/flesh-and-blood", label: "Flesh and Blood" },
        { href: "/for/pokemon-tcg-japan", label: "Pokémon TCG Japan" },
      ],
    },
    {
      kind: "table",
      id: "plans",
      label: "Plans",
      title: "Every feature on every plan, including Free",
      intro:
        "Plans differ only in how many products you can have. A product is one card and printing, with all its conditions and any amount of stock. Billing goes through your Shopify invoice.",
      caption: "Synq plans and product limits",
      head: ["Plan", "Monthly", "Yearly", "Products"],
      rows: PLANS.map((p) => [
        p.name,
        p.monthly === 0 ? "$0" : `$${p.monthly}`,
        p.yearly === 0 ? "Free" : `$${fmt(p.yearly)}`,
        `Up to ${fmt(p.cards)}`,
      ]),
      note: "Daily price updates, price rules, all 19 games, import, POS barcodes and bulk edits are on every plan. Over the limit, your products keep working and keep being priced; you just can't add new ones. See [Plans and product limits](/docs/plans).",
    },
    {
      kind: "split",
      label: "Honest limits",
      title: "What Synq does, and what it doesn't",
      left: {
        title: "Synq does",
        points: [
          "Adds singles and sealed from a catalog of 19 games",
          "Prices each condition from TCGplayer, in your store's currency",
          "Runs price rules on your schedule, with a minimum",
          "Imports CSV files and TCGplayer exports",
          "Writes barcodes and SKUs for Shopify POS",
          "Keeps stock in step with Shopify at every location",
        ],
      },
      right: {
        title: "Synq doesn't",
        body: "If one of these is the center of your store, a full POS system may fit better. Our [comparison](/compare) lists the tools that do them.",
        points: [
          "Run a buylist or trade-ins",
          "Run events or tournaments",
          "Export your inventory as a file",
          "List on TCGplayer or update your TCGplayer stock",
          "Use Cardmarket prices",
          "Print labels (Shopify's free Retail Barcode Labels app does)",
        ],
      },
    },
  ],
  faqTitle: "Questions about the app",
  faqBody: "Short answers about what Synq does in a Shopify store. The docs have the detail.",
  faq: [
    {
      q: "Is Synq a Shopify plugin?",
      a: "Shopify calls them apps. Synq installs from the Shopify App Store and opens inside your Shopify admin. It creates and prices normal Shopify products, so your theme, checkout and Shopify POS keep working as they do.",
    },
    {
      q: "Do I need a TCGplayer account or API key?",
      a: "No. TCGplayer market prices come with Synq's card catalog. You only use your TCGplayer account if you want to export your TCGplayer inventory and import it into Shopify.",
    },
    {
      q: "Which games does Synq support?",
      a: `${GAMES_19.join(", ")}. That is 19 games, all on every plan.`,
    },
    {
      q: "Does it work for sealed products?",
      a: "Yes. Booster boxes, packs and other sealed products are added from the same search. They have one condition, Unopened, are priced from their TCGplayer market price, and get the box UPC as their barcode when the catalog has one.",
    },
    {
      q: "What happens to the products already in my store?",
      a: "Nothing until you link them. Link a product to its card and Synq keeps the Shopify product as it is and takes over its price and stock from the next rule run. Linking is one product at a time; to bring in a lot of stock at once, import a file instead.",
    },
    {
      q: "Will Synq overwrite a price I change in the Shopify admin?",
      a: "Yes, at the next run of the rule that prices that card. To keep a price, edit it in Synq's Inventory instead: that marks the condition as excluded from rules, and no run changes it.",
    },
  ],
  closing: {
    title: "Put your singles on Shopify.",
    body: "Install Synq from the Shopify App Store. It's free up to 100 products, with every feature.",
  },
  sources: [],
  related: [
    PAGES.tcgplayer,
    PAGES.pricing,
    PAGES.import,
    PAGES.pos,
    PAGES.compare,
    PAGES.best,
    DOCS.setup,
    DOCS.addCards,
    DOCS.rules,
    DOCS.plans,
  ],
};
