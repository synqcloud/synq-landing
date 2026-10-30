import type { ComparePage } from "./types";
import { BYLINE } from "./hub";

export const CRYSTAL_COMMERCE: ComparePage = {
  path: "/alternatives/crystal-commerce",
  parent: { name: "Compare", path: "/compare" },
  seoTitle: "Crystal Commerce alternative: move a card shop to Shopify (2026)",
  description:
    "Crystal Commerce or Shopify for a card shop: what each gives you, what Synq adds, what it doesn't do (buylist, marketplaces), costs, and moving your stock.",
  keywords: [
    "crystal commerce alternative",
    "crystal commerce vs shopify",
    "crystal commerce pricing",
    "move from crystal commerce to shopify",
  ],
  name: "Crystal Commerce alternative",
  eyebrow: "Alternative",
  h1: "A Crystal Commerce alternative on Shopify",
  intro:
    "Crystal Commerce gives a game store its own webstore, a POS, a buylist and many marketplaces from one inventory. Some stores would rather run on Shopify and add a card app. Here is what you gain, what you give up, and how to move.",
  byline: BYLINE,
  blocks: [
    {
      kind: "prose",
      label: "What you have today",
      title: "What Crystal Commerce does",
      paragraphs: ["From Crystal Commerce's own pages:"],
      bullets: [
        "An online webstore with inventory management",
        "A point of sale for in-store and event sales",
        "A buylist, with 0% commission",
        "Sales channels including eBay, Amazon, TCGplayer, CardTrader, Mana Pool and PriceCharting",
        "Support by daily Zoom calls and weekday live chat",
        "A $99 monthly fee, 2.5% commission on online sales, 0% on POS and buylist, plus a setup fee",
      ],
      sources: ["cc-home", "cc-pricing", "sleeveiq"],
    },
    {
      kind: "split",
      label: "The trade-off",
      title: "Crystal Commerce or Shopify with Synq",
      left: {
        title: "Stay on Crystal Commerce if",
        points: [
          "You sell a lot through Amazon, eBay or the TCGplayer marketplace from one inventory",
          "Your buylist is a big part of how you get stock",
          "You want one vendor for webstore, POS and buylist",
        ],
      },
      right: {
        title: "Move to Shopify with Synq if",
        points: [
          "Your own website and counter are where you sell, and you want Shopify's themes, checkout and apps",
          "You'd rather pay a flat monthly plan than a commission on online sales",
          "You want rules that reprice every card from TCGplayer daily, with a preview",
          "You want Shopify POS at the counter with a code per condition",
        ],
      },
    },
    {
      kind: "prose",
      label: "On Shopify",
      title: "What Synq adds to Shopify",
      paragraphs: [
        "Shopify on its own doesn't know what a Near Mint holofoil is. Synq adds that:",
      ],
      bullets: [
        "A catalog of 19 games, searchable by name, number or set, with the card's image",
        "One product per card and printing, with a variant per condition, and sealed product",
        "TCGplayer market prices every day, converted to your store's currency",
        "Price rules by game, set, rarity, printing and condition, with a minimum from your cost, rounding and a schedule",
        "Scannable codes for Shopify POS, a code per condition for singles and the box UPC for sealed",
        "Every feature on every plan: free up to 100 products, then $29, $79 or $149 a month, with no commission",
      ],
    },
    {
      kind: "prose",
      label: "Said plainly",
      title: "What you give up",
      paragraphs: [
        "Synq has no buylist, no events, no inventory export and no marketplace sync. It prices and lists your Shopify store only. If Amazon, eBay or the TCGplayer marketplace bring you much of your revenue, moving to Shopify with Synq alone means losing those channels or adding other tools. Shopify itself is a separate subscription.",
        "Be honest with yourself about the buylist: if you buy most of your singles over the counter, pair Synq with a buylist app, or look at a platform that has one.",
      ],
    },
    {
      kind: "steps",
      label: "Moving your stock",
      title: "Moving from Crystal Commerce to Shopify",
      steps: [
        {
          title: "Set up Shopify",
          body: "Pick a theme, set your currency and connect Shopify POS if you sell in person. Your store's Shopify currency is the one Synq prices in.",
        },
        {
          title: "Install Synq and pick your games",
          body: "Setup asks which games you sell and how your prices compare with TCGplayer's market price, and makes your first price rule.",
        },
        {
          title: "Get your stock into a spreadsheet",
          body: "Export it from Crystal Commerce if your account offers that, or use a sheet you keep. Save it as CSV, TSV or TXT. Each line needs a card name, a TCGplayer ID or a barcode; set, number, condition, quantity, price and cost columns help. Synq recognises the columns and you confirm them.",
        },
        {
          title: "Import, up to 5,000 products at a time",
          body: "Synq matches each line to its card, creates the Shopify product and adds the stock. When a name fits several printings, you pick the one on your shelf. Lines it can't match download with the reason.",
        },
        {
          title: "Preview prices, then go live",
          body: "New products start as drafts unless you choose otherwise. Check the rule's preview, run it, then publish.",
        },
      ],
    },
  ],
  faqTitle: "Crystal Commerce questions",
  faqBody: "What stores ask us when they're thinking about Shopify.",
  faq: [
    {
      q: "Does Crystal Commerce work with Shopify?",
      a: "Its home page and pricing page don't mention Shopify. It runs its own webstore. Ask Crystal Commerce if you need a definite answer for your account.",
    },
    {
      q: "How much does Crystal Commerce cost compared with Shopify and Synq?",
      a: "Crystal Commerce lists $99 a month plus 2.5% of online sales and a setup fee. On Shopify you pay your Shopify plan plus Synq: free up to 100 products, $29 for 2,000, $79 for 15,000 or $149 for 50,000, with no commission from Synq.",
    },
    {
      q: "Can Synq sell on Amazon, eBay or TCGplayer for me?",
      a: "No. Synq works inside Shopify: your Online Store, the Shop app and Shopify POS.",
    },
    {
      q: "Does Synq have a buylist?",
      a: "No. Synq prices and lists what you sell. Stores that buy from customers use a separate buylist or trade-in app alongside it.",
    },
    {
      q: "Can I import an Excel file?",
      a: "Save it as CSV first (in Excel, File, Save As, CSV). Synq reads CSV, TSV and TXT, finds the separator itself, and offers a template if you'd like to start from one.",
    },
    {
      q: "How does Synq handle conditions coming from my spreadsheet?",
      a: "Map your condition column and Synq reads NM, LP, MP, HP and DMG, and common words like Near Mint or Light Play. Each condition becomes a variant of the card's Shopify product, with its own stock and price. Lines with no condition get your store's default.",
    },
  ],
  closing: {
    title: "Your card shop, on Shopify.",
    body: "Install Synq from the Shopify App Store. Free up to 100 products, with every feature, and 7 days free on paid plans.",
  },
  sources: ["cc-home", "cc-pricing", "sleeveiq"],
};
