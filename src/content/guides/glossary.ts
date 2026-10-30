import type { GuidePage } from "./types";
import { DOCS, GLOSSARY_PATH, PAGES, SRC } from "./meta";

/* Short, precise definitions for card shop owners. Outside facts (what
   TCGplayer means by a term) come from TCGplayer's own help pages, cited on
   the page. How Synq uses a term comes from the app. */

const parent = { name: "Glossary", path: GLOSSARY_PATH };
const faqBody = "Short answers. The rest of the glossary is one click away.";

export const MARKET_PRICE: GuidePage = {
  path: "/glossary/tcgplayer-market-price",
  section: "term",
  parent,
  seoTitle: "TCGplayer Market Price: what it means for card stores | Synq",
  description:
    "TCGplayer Market Price comes from recent sales on TCGplayer.com. What it measures, how it differs from the listed median, and how stores price from it.",
  keywords: ["tcgplayer market price meaning", "tcgplayer market price", "market price vs listed median", "tcgplayer price points"],
  name: "TCGplayer Market Price",
  summary: "TCGplayer's price compiled from recent completed sales, and the base of most singles pricing.",
  eyebrow: "Glossary",
  h1: "TCGplayer Market Price",
  intro:
    "TCGplayer Market Price is a price point compiled from recent sales completed on TCGplayer.com. It measures what a card sells for, not what sellers ask, which is why most card stores price their singles from it.",
  term: {
    name: "TCGplayer Market Price",
    alternateNames: ["Market Price", "TCG market price"],
    definition:
      "A price point compiled by TCGplayer from recent sales completed on TCGplayer.com, updated as transactions complete, for a product in a given printing and condition.",
  },
  blocks: [
    {
      kind: "prose",
      label: "Definition",
      title: "What TCGplayer says it is",
      paragraphs: [
        "In TCGplayer's own words, Market Price \"is compiled from recent sales completed on TCGplayer.com\" and \"is updated as transactions complete\". TCGplayer describes it as reflecting \"the best suggested retail price of a product\". TCGplayer doesn't publish the exact formula.",
        "The price points on a TCGplayer product page reflect the printing and condition you filter by. So a card has a Market Price for each printing and condition: a Near Mint Foil and a Lightly Played Normal copy are two different numbers.",
      ],
    },
    {
      kind: "table",
      label: "Next to it",
      title: "Market Price and the other price points",
      caption: "TCGplayer price points compared",
      head: ["Price point", "Built from", "What it tells you"],
      rows: [
        ["Market Price", "Recent completed sales", "What the card actually sells for"],
        ["Most Recent Sale", "The last sale for the filters applied", "One data point, which can be an outlier"],
        [
          "Listed Median",
          "Current listings only",
          "What sellers ask; TCGplayer notes it can differ a lot from what people pay, especially on older products",
        ],
      ],
      note: "TCGplayer also shows a Market Price Volatility scale, based on sales volume and price spread over a 30 day period.",
    },
    {
      kind: "prose",
      label: "For your store",
      title: "How card stores use it",
      paragraphs: [
        "Because it comes from sales, Market Price is a fair anchor for a store's own prices: customers recognise it, and it moves when the market does. Stores usually price at it, a little under it for online sales, or a little over for the convenience of buying in person.",
        "In Synq, every price rule starts from the TCGplayer market price of each card, printing and condition, converted from US dollars to your store's currency. The catalog updates once a day, and your prices change when a rule runs. See [TCGplayer prices in Shopify](/integrations/tcgplayer).",
      ],
    },
  ],
  faqTitle: "Market Price questions",
  faqBody,
  faq: [
    {
      q: "Is Market Price the same as the lowest listing?",
      a: "No. Market Price is compiled from completed sales. Listings are what sellers ask, and TCGplayer shows those separately, for example as the Listed Median.",
    },
    {
      q: "Is Market Price an average of sales?",
      a: "TCGplayer doesn't publish the formula. It says Market Price is compiled from recent sales completed on TCGplayer.com and updated as transactions complete.",
    },
    {
      q: "Why is there no Market Price for some cards?",
      a: "It comes from sales, so a card or condition that hasn't sold recently may not have one. In Synq, set your own price for those cards.",
    },
  ],
  closing: { title: "Price from what cards sell for.", body: "Synq brings TCGplayer market prices into Shopify for every condition." },
  sources: [SRC.tcgpPrices],
  related: [PAGES.tcgplayer, PAGES.pricing, DOCS.market, PAGES.conditions, PAGES.glossary],
};

export const LISTED_MEDIAN: GuidePage = {
  path: "/glossary/listed-median",
  section: "term",
  parent,
  seoTitle: "TCGplayer Listed Median vs Market Price | Synq",
  description:
    "TCGplayer's Listed Median is the median of current listed prices only. Why it can sit far above the Market Price, and which one to price a store from.",
  keywords: ["tcgplayer listed median", "listed median vs market price", "tcgplayer listing vs market price"],
  name: "Listed Median",
  summary: "The median of TCGplayer's current listings, and why it can mislead.",
  eyebrow: "Glossary",
  h1: "Listed Median",
  intro:
    "The Listed Median is TCGplayer's median of all current listed prices for a product. It describes what sellers are asking, not what buyers pay, and on some cards the gap is large.",
  term: {
    name: "Listed Median",
    alternateNames: ["TCGplayer Listed Median"],
    definition: "The median of all current listed prices for a product on TCGplayer, based on listed prices only, not on sales.",
  },
  blocks: [
    {
      kind: "prose",
      label: "Definition",
      title: "Asking prices, not sales",
      paragraphs: [
        "TCGplayer defines the Listed Median as \"the median from all listed prices for a product based on listed prices only\". It adds that, especially on older products with low quantities, it \"can vary significantly from the actual price that people are paying for the card\".",
        "TCGplayer's example explains why. When only a few copies of an old card are listed, every copy listed near the real selling price sells quickly. The ones left are priced far above it, and they pull the median up. In TCGplayer's example, the Listed Median was almost double the Market Price. TCGplayer notes the gap matters most on older products with low quantities listed, so check both numbers before pricing an old or scarce card.",
      ],
    },
    {
      kind: "prose",
      label: "For your store",
      title: "Which one to price from",
      paragraphs: [
        "For a store's own prices, the [Market Price](/glossary/tcgplayer-market-price) is the steadier anchor, because it comes from completed sales. The Listed Median is still useful as a signal: when it sits far above the Market Price, few copies are for sale, and a card you have in stock may be worth holding at your own price.",
        "Synq prices from the TCGplayer market price and doesn't use the Listed Median. To hold a scarce card at a price you choose, set it as an exception, and no rule run changes it.",
      ],
    },
  ],
  faqTitle: "Listed Median questions",
  faqBody,
  faq: [
    {
      q: "Why is the Listed Median higher than the Market Price?",
      a: "Copies listed near the real selling price sell first. What stays listed is often priced high, which lifts the median of the listings.",
    },
    {
      q: "Does Synq use the Listed Median?",
      a: "No. Synq's price rules start from the TCGplayer market price for each condition.",
    },
  ],
  closing: { title: "Price from sales, not asks.", body: "Synq's rules start from TCGplayer market prices for every condition." },
  sources: [SRC.tcgpPrices],
  related: [PAGES.marketPrice, PAGES.pricing, DOCS.exceptions, PAGES.glossary],
};

export const CARD_CONDITIONS: GuidePage = {
  path: "/glossary/card-conditions",
  section: "term",
  parent,
  seoTitle: "Card conditions NM, LP, MP, HP and DMG explained | Synq",
  description:
    "The five TCG card conditions, Near Mint, Lightly Played, Moderately Played, Heavily Played and Damaged, as TCGplayer defines them, and how stores price each.",
  keywords: ["card conditions nm lp mp hp", "nm lp mp hp condition pricing", "near mint lightly played", "tcg card condition guide"],
  name: "Card conditions",
  summary: "NM, LP, MP, HP and DMG, as TCGplayer defines them.",
  eyebrow: "Glossary",
  h1: "Card conditions: NM, LP, MP, HP and DMG",
  intro:
    "A card's condition is how much wear or damage it shows. Singles are sold in five conditions, from Near Mint to Damaged, and each one is priced and stocked on its own.",
  term: {
    name: "Card condition",
    alternateNames: ["NM", "LP", "MP", "HP", "DMG"],
    definition:
      "The grade of wear on a trading card single: Near Mint (NM), Lightly Played (LP), Moderately Played (MP), Heavily Played (HP) or Damaged (DMG), set by the number and extent of its imperfections.",
  },
  blocks: [
    {
      kind: "table",
      label: "The five conditions",
      title: "What each condition means",
      intro:
        "TCGplayer's marketplace lists cards in these five conditions, and doesn't sell Mint or Gem Mint cards. Summarised from TCGplayer's Card Conditioning Overview:",
      caption: "TCG card conditions summarised from TCGplayer",
      head: ["Condition", "What it looks like"],
      rows: [
        ["Near Mint (NM)", "Minimal wear from shuffling, play or handling. May have slight edge wear or a couple of minor scratches, but looks nearly unplayed."],
        ["Lightly Played (LP)", "Minor edge wear, scuffs or scratches. No significant imperfections and no problem with the card's structure."],
        ["Moderately Played (MP)", "Edge wear, surface wear, scratching or scuffing, bends with creases, as long as the card's structure isn't affected."],
        ["Heavily Played (HP)", "A major amount of wear, creasing and whitening, but the card can still be authenticated and isn't structurally damaged."],
        ["Damaged (DMG)", "Wear beyond the other conditions, or damage to the card's integrity: tears, splitting, major bends, or foreign substances."],
      ],
      note: "TCGplayer also treats some manufacturing defects (such as crimping and significant miscuts) and alterations (stamps, signatures, paint, marker) as Damaged.",
    },
    {
      kind: "prose",
      label: "For your store",
      title: "How conditions work in a Shopify store",
      paragraphs: [
        "Each condition is a different price and a different stock count, so in Shopify it should be a variant, not a separate product or a note in the description. Grade by the back of the card as well as the front, and grade the same way every time: a customer who gets what the label says comes back.",
        "In Synq, each card and printing is one Shopify product with one variant per condition, under an option called Condition. Sealed products have one condition, Unopened. Each condition gets its own TCGplayer market price, and price rules can price played conditions from their own market price or from Near Mint less a percent. See the [pricing strategy guide](/guides/card-shop-pricing-strategy) for an example.",
      ],
    },
  ],
  faqTitle: "Condition questions",
  faqBody,
  faq: [
    {
      q: "Is there a Mint condition?",
      a: "Not on TCGplayer's marketplace, which lists Near Mint, Lightly Played, Moderately Played, Heavily Played and Damaged only. Synq uses the same five, plus Unopened for sealed.",
    },
    {
      q: "Can I show NM instead of Near Mint in my store?",
      a: "Yes. In Synq, Settings, Online Store, Condition variants lets you pick full names or abbreviations for new products.",
    },
    {
      q: "How much less is a played card worth?",
      a: "It depends on the card. Synq can follow each condition's own market price, or start from Near Mint less a percent: by default 10% for LP, 25% for MP, 40% for HP and 60% for DMG.",
    },
  ],
  closing: { title: "Every condition, its own price.", body: "Synq creates a variant for each condition and prices each from TCGplayer." },
  sources: [SRC.tcgpConditions],
  related: [DOCS.conditions, PAGES.pricing, PAGES.marketPrice, PAGES.pos, PAGES.glossary],
};

export const SEALED_VS_SINGLES: GuidePage = {
  path: "/glossary/sealed-vs-singles",
  section: "term",
  parent,
  seoTitle: "Sealed vs singles: what card shops mean by each | Synq",
  description:
    "Singles are cards sold one by one, graded by condition; sealed is unopened packaging like booster boxes. How each is priced, stocked and scanned on Shopify.",
  keywords: ["sealed vs singles", "sealed product tcg", "tcg singles meaning", "what is sealed product"],
  name: "Sealed vs singles",
  summary: "Individual cards by condition, and unopened factory product.",
  eyebrow: "Glossary",
  h1: "Sealed vs singles",
  intro:
    "Card shops sell two kinds of product. Singles are individual cards, each graded by condition. Sealed product is unopened factory packaging, such as booster boxes, packs and decks. They are bought, priced and stocked differently.",
  term: {
    name: "Sealed product",
    alternateNames: ["Sealed", "Singles"],
    definition:
      "Sealed product is trading card product in its original, unopened factory packaging, such as booster boxes, packs and decks. Singles are individual cards sold one by one and graded by condition.",
  },
  blocks: [
    {
      kind: "prose",
      label: "Definitions",
      title: "Two kinds of product",
      paragraphs: [
        "**Singles** are individual cards, usually pulled from packs and sold one at a time. Two copies of the same card can differ in printing and condition, so each is its own price.",
        "**Sealed product** is unopened. TCGplayer's standard for \"factory sealed\" is an item in its original, unopened packaging, undamaged, with seals not broken, not tampered with, and not re-shrink-wrapped or re-sealed. Booster boxes, booster packs, cases and preconstructed decks are typical examples.",
      ],
    },
    {
      kind: "table",
      label: "Side by side",
      title: "How they differ in a store",
      caption: "Singles and sealed product compared",
      head: ["", "Singles", "Sealed"],
      rows: [
        ["Condition", "NM, LP, MP, HP or DMG", "One: Unopened"],
        ["Barcode", "None printed; the store adds one", "Usually a UPC on the box"],
        ["Checked for", "Wear on each copy", "An intact factory seal"],
        ["In Shopify", "One product per printing, a variant per condition", "One product, one variant"],
      ],
    },
    {
      kind: "prose",
      label: "In Synq",
      title: "How Synq handles each",
      paragraphs: [
        "Both are added from the same search. A single becomes one Shopify product per printing, with a variant for each condition. A sealed product has one variant, Unopened, and gets the box UPC from the catalog as its barcode when there is one. Each game can send singles and sealed to different collections, so your store can have a singles page and a sealed page per game.",
        "Price rules can cover both, or one: the rule's conditions include Unopened, so a rule can price sealed only. See [Shopify POS barcodes](/guides/shopify-pos-barcodes-for-trading-cards) for scanning each.",
      ],
    },
  ],
  faqTitle: "Sealed and singles questions",
  faqBody,
  faq: [
    {
      q: "Can I sell sealed and singles in the same store?",
      a: "Yes. In Synq, each game has a singles collection and a sealed collection, and both are added from the same search.",
    },
    {
      q: "Can I price sealed differently from singles?",
      a: "Yes. Make a price rule limited to the Unopened condition for sealed, and another for the played and Near Mint conditions.",
    },
  ],
  closing: { title: "Singles and sealed, one app.", body: "Synq adds both from one search, with the right variants and barcodes." },
  sources: [SRC.tcgpSealed],
  related: [DOCS.addCards, DOCS.pickGames, PAGES.conditions, PAGES.pos, PAGES.glossary],
};

export const PRINTING: GuidePage = {
  path: "/glossary/printing",
  section: "term",
  parent,
  seoTitle: "Card printings: Normal, Foil, Holofoil, 1st Edition | Synq",
  description:
    "A printing is a card version set apart by finish or edition: Normal, Foil, Holofoil, Reverse Holofoil, 1st Edition. Why each has its own price on Shopify.",
  keywords: ["card printing", "foil vs normal printing", "reverse holofoil", "1st edition printing", "tcg printings"],
  name: "Printing",
  summary: "Normal, Foil, Holofoil, 1st Edition: versions of a card with their own price.",
  eyebrow: "Glossary",
  h1: "Printing",
  intro:
    "A printing is one version of a card, set apart by its finish or edition: Normal, Foil, Holofoil, Reverse Holofoil, 1st Edition and others. Two printings of the same card are different items to a buyer, with different prices.",
  term: {
    name: "Printing",
    alternateNames: ["Card printing", "Finish"],
    definition:
      "A version of a trading card distinguished by its finish or edition, such as Normal, Foil, Holofoil, Reverse Holofoil or 1st Edition, priced separately from the card's other printings.",
  },
  blocks: [
    {
      kind: "prose",
      label: "Definition",
      title: "One card, several versions",
      paragraphs: [
        "Many cards are printed more than once in the same set: a regular version and a foil, a holofoil and a reverse holofoil, or a 1st Edition run and a later one. The name, art and number can be the same, but collectors and players treat them as different cards, and they sell at different prices.",
        "The names depend on the game. Magic: The Gathering has Normal and Foil. Pokémon has Normal, Holofoil and Reverse Holofoil. Yu-Gi-Oh! has 1st Edition and Unlimited. TCGplayer's price points reflect the printing you filter by, so each printing has its own market price.",
      ],
    },
    {
      kind: "prose",
      label: "For your store",
      title: "Printings in a Shopify store",
      paragraphs: [
        "Shopify gives a product a few options, and a card already needs one for condition. Putting printing and condition into the same product doubles the variants and mixes two prices that move on their own.",
        "Synq makes each card and printing its own Shopify product, with the conditions as its variants. A Normal and a Foil copy of the same card are two products, each priced from its own market price. In **Add products**, each search result lists one row per printing with its market price and your stock, and the add window has a printing picker when there is more than one. Price rules can be limited to some printings, for example a rule for foils only.",
      ],
    },
  ],
  faqTitle: "Printing questions",
  faqBody,
  faq: [
    {
      q: "Is a printing the same as a condition?",
      a: "No. The printing is which version of the card it is, such as Foil. The condition is how worn that copy is, such as Lightly Played. A card has both.",
    },
    {
      q: "Does a printing count as a separate product on my Synq plan?",
      a: "Yes. Synq's plan limits count products, and each card and printing is one product, with all its conditions and any stock.",
    },
  ],
  closing: { title: "Every printing, priced on its own.", body: "Synq creates a product per printing and prices each from TCGplayer." },
  sources: [SRC.tcgpPrices],
  related: [DOCS.conditions, PAGES.conditions, PAGES.marketPrice, DOCS.plans, PAGES.glossary],
};

export const TCGPLAYER_SKU: GuidePage = {
  path: "/glossary/tcgplayer-sku",
  section: "term",
  parent,
  seoTitle: "TCGplayer SKU vs TCGplayer product ID | Synq",
  description:
    "A TCGplayer SKU identifies one printing of a product in one condition; the product ID, the product. How both appear in exports and how Synq uses them.",
  keywords: ["tcgplayer sku", "tcgplayer id", "tcgplayer product id", "tcgplayer sku shopify"],
  name: "TCGplayer SKU",
  summary: "TCGplayer's id for one printing in one condition.",
  eyebrow: "Glossary",
  h1: "TCGplayer SKU",
  intro:
    "A TCGplayer SKU is the number TCGplayer uses for one specific item: a product in one printing and one condition. The product ID, by contrast, names the card or sealed product as a whole.",
  term: {
    name: "TCGplayer SKU",
    alternateNames: ["TCGplayer Id (in inventory exports)"],
    definition:
      "TCGplayer's identifier for one printing of a product in one condition, as opposed to the product ID, which identifies the card or sealed product as a whole.",
  },
  blocks: [
    {
      kind: "table",
      label: "Two ids",
      title: "SKU and product ID",
      caption: "TCGplayer SKU compared with TCGplayer product ID",
      head: ["Id", "Identifies", "Example use"],
      rows: [
        ["Product ID", "A card or sealed product", "Finding the card itself"],
        ["SKU", "That product in one printing and one condition", "Knowing exactly which copy a row of stock is"],
      ],
    },
    {
      kind: "prose",
      label: "In exports",
      title: "Where you see it",
      paragraphs: [
        "A TCGplayer inventory export has a column called TCGplayer Id and another called Product ID. In that file, TCGplayer Id is the SKU, one per printing and condition, and Product ID is the product. They are easy to mix up: matching on TCGplayer Id as if it were the product loses the printing and condition.",
        "Synq reads a TCGplayer export this way on its own, which is why each row lands on the exact card, printing and condition. See [importing a TCGplayer export](/guides/import-tcgplayer-export-to-shopify).",
      ],
    },
    {
      kind: "prose",
      label: "In Synq",
      title: "How Synq uses it in Shopify",
      paragraphs: [
        "With Shopify POS installed and TCGplayer SKUs turned on (the default), Synq writes each condition's TCGplayer SKU as that variant's SKU in Shopify. When you link a product you already have, a SKU of 1 to 9 digits is read as a TCGplayer SKU to find its card. In an import, the TCGplayer SKU is the first thing Synq matches on, before the TCGplayer product ID, the barcode and the card name. Because the SKU already says which printing and condition a row is, a row matched by SKU lands on the exact card, printing and condition.",
      ],
    },
  ],
  faqTitle: "SKU questions",
  faqBody,
  faq: [
    {
      q: "Is the TCGplayer SKU the same as a barcode?",
      a: "No. The SKU is TCGplayer's reference number. A barcode is what a scanner reads. Synq writes the TCGplayer SKU to the Shopify SKU field and a separate barcode for scanning.",
    },
    {
      q: "Do I need TCGplayer SKUs on my products?",
      a: "No, but they help: imports and linking match on them exactly. You can turn them off in Synq's Point of Sale settings.",
    },
  ],
  closing: { title: "Exact matches, every row.", body: "Synq reads TCGplayer SKUs so imports land on the right card and condition." },
  sources: [SRC.tcgpCsv],
  related: [PAGES.import, PAGES.pos, DOCS.import, DOCS.link, PAGES.glossary],
};

export const BUYLIST: GuidePage = {
  path: "/glossary/buylist",
  section: "term",
  parent,
  seoTitle: "What is a buylist? Card shop buylists explained | Synq",
  description:
    "A buylist is the list of cards a store will buy from customers and what it pays. How buylists work, how stores set them, and which tools run them; Synq doesn't.",
  keywords: ["what is a buylist", "card shop buylist", "tcg buylist", "buylist software"],
  name: "Buylist",
  summary: "The cards a store buys from customers, and what it pays.",
  eyebrow: "Glossary",
  h1: "Buylist",
  intro:
    "A buylist is the list of cards a store is willing to buy from customers, with the price it pays for each, in cash or store credit. It is how most card shops restock singles.",
  term: {
    name: "Buylist",
    alternateNames: ["Buy list", "Trade-in list"],
    definition:
      "The list of cards a store will buy from customers and the price it pays for each, usually set below the store's selling price and offered as cash or store credit.",
  },
  blocks: [
    {
      kind: "prose",
      label: "Definition",
      title: "Buying, the other half of selling singles",
      paragraphs: [
        "Packs give a store some singles, but most stores buy cards from players and collectors too. A buylist says which cards the store wants and what it pays. Stores usually pay less than they sell for, often more in store credit than in cash, and limit how many copies they take so they don't overstock.",
        "Buylist tools set those offers with rules, much like selling price rules. TCGplayer's help center, for example, documents buylist rules by game, set and card, with settings by card condition and for whether to keep buying a card when stock is already high.",
      ],
    },
    {
      kind: "prose",
      label: "And Synq",
      title: "Synq doesn't run a buylist",
      paragraphs: [
        "Synq prices what you sell, not what you buy. It has no buylist, trade-in or store credit features. If buying from customers is a big part of your store, a full point of sale system with a buylist may suit you better, or you can run your buylist elsewhere and bring the cards into Shopify with Synq afterwards.",
        "Where Synq helps after a buy: add the cards from the search, or import the list, record what you paid as each card's cost, and set a minimum from cost so no rule sells them at a loss. Our [comparison of Shopify card apps](/compare) shows which tools have a buylist.",
      ],
    },
  ],
  faqTitle: "Buylist questions",
  faqBody,
  faq: [
    {
      q: "Does Synq have a buylist?",
      a: "No. Synq prices and stocks what you sell on Shopify. Use another tool for buying from customers.",
    },
    {
      q: "How do I protect margin on cards I bought?",
      a: "Record what you paid as the card's cost, and use a minimum based on your cost in your price rule, so a falling market never sells it under what you paid.",
    },
  ],
  closing: { title: "Sell what you buy, at the right price.", body: "Synq prices your singles from TCGplayer with a minimum from your cost." },
  sources: [SRC.tcgpBuylist],
  related: [PAGES.compare, PAGES.pricing, DOCS.cost, DOCS.minimums, PAGES.glossary],
};

export const GLOSSARY_ENTRIES: GuidePage[] = [
  MARKET_PRICE,
  LISTED_MEDIAN,
  CARD_CONDITIONS,
  SEALED_VS_SINGLES,
  PRINTING,
  TCGPLAYER_SKU,
  BUYLIST,
];
