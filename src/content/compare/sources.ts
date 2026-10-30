/* Every public page a competitor fact comes from. All were fetched on
   30 October 2026. When a fact changes, fix the cell and bump CHECKED. */

export const CHECKED = "October 2026";
export const CHECKED_ISO = "2026-10-30";

export const SOURCES = {
  "as-synq": { label: "Synq on the Shopify App Store", url: "https://apps.shopify.com/synq-tcg-card-manager" },
  "as-tcgi": { label: "TCG Importer on the Shopify App Store", url: "https://apps.shopify.com/tcgapp" },
  "as-tcgi-rev": {
    label: "TCG Importer reviews and developer replies, Shopify App Store",
    url: "https://apps.shopify.com/tcgapp/reviews",
  },
  "tcgi-pricing": { label: "TCG Importer pricing page", url: "https://tcgimporter.com/pricing/" },
  "tcgi-features": { label: "TCG Importer features page", url: "https://tcgimporter.com/features/" },
  "tcgi-guide": { label: "TCG Importer user guide", url: "https://tcgimporter.com/full-user-guide" },
  "as-tcga": { label: "TCG Automate on the Shopify App Store", url: "https://apps.shopify.com/tcg-automate-2" },
  "tcga-home": { label: "TCG Automate home page", url: "https://www.tcgautomate.com/" },
  "tcga-reprice": {
    label: "TCG Automate automatic card repricing page",
    url: "https://www.tcgautomate.com/automatic-card-repricing",
  },
  "as-kori": { label: "Kori TCG Manager on the Shopify App Store", url: "https://apps.shopify.com/kori-tcg-manager" },
  "as-lgsf": { label: "LGS Forge on the Shopify App Store", url: "https://apps.shopify.com/lgs-forge" },
  "lgsf-home": { label: "LGS Forge home page", url: "https://lgsforge.com/" },
  "as-neo": {
    label: "NeoSatoshi TCG Card Scanner on the Shopify App Store",
    url: "https://apps.shopify.com/neosatoshi-tcg-sync",
  },
  "tcgp-pos": { label: "TCGplayer Point of Sale (BinderPOS) page", url: "https://seller.tcgplayer.com/point-of-sale" },
  "ss-binder": { label: "SortSwift: SortSwift vs BinderPOS", url: "https://sortswift.com/compare/binderpos" },
  "sleeveiq": {
    label: "SleeveIQ: LGS inventory management software compared",
    url: "https://www.sleeveiq.com/tools/lgs/inventory-management",
  },
  "tcgsync-binder": {
    label: "TCG Sync blog: BinderPOS ownership change and migration path",
    url: "https://tcgsync.com/blog/binderpos-going-dark-migration-path",
  },
  "cc-home": { label: "Crystal Commerce home page", url: "https://www.crystalcommerce.com/" },
  "cc-pricing": { label: "Crystal Commerce pricing page", url: "https://www.crystalcommerce.com/pricing" },
  "ss-pricing": { label: "SortSwift pricing page", url: "https://sortswift.com/pricing" },
} as const;

export type SourceId = keyof typeof SOURCES;
