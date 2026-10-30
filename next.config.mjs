import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const LOCALES_BUT_EN = "es|ca|fr|de|pt|ja|ko|it|eu";

/* Pages that exist in English only (blog, game pages, comparison, legal).
   Their translated-looking URLs (/es/blog, /fr/terms...) 308 to the English
   URL instead of 404ing. Keep in step with ENGLISH_ONLY in src/lib/site.ts. */
const ENGLISH_ONLY =
  "blog|for|synq-vs-spreadsheets|compare|alternatives|best-shopify-apps-for-card-shops|shopify-tcg-app|integrations|guides|glossary|terms|privacy|cookies|legal";

/* Help-center articles of the old site (synq.cards/help/<slug>, and
   /docs/<slug>, which redirected there), mapped to the article that now
   covers the same ground. Old indexed URLs, bookmarks and in-app links keep
   landing on the right page. */
const OLD_DOCS = {
  "get-started-with-synq": "/docs/install",
  "install-synq-and-run-your-first-sync": "/docs/install",
  "synq-in-5-minutes": "/docs/install",
  "do-i-need-a-tcgplayer-account": "/docs/install",
  "getting-started": "/docs/install",
  "choose-your-games-and-collections": "/docs/pick-games",
  "adding-products-to-your-store": "/docs/add-cards",
  "singles-vs-sealed": "/docs/add-cards",
  "conditions-and-stock": "/docs/conditions-printings",
  "migrating-from-manual-pricing": "/docs/import",
  "find-and-organize-products": "/docs/find-products",
  "search-the-catalog-efficiently": "/docs/find-products",
  "filter-and-save-product-views": "/docs/find-products",
  "how-synq-prices-your-cards": "/docs/market-prices",
  "currencies-and-conversion": "/docs/market-prices",
  "choosing-a-pricing-strategy": "/docs/price-rules",
  "keep-prices-current": "/docs/run-and-schedule",
  "the-daily-price-sync": "/docs/run-and-schedule",
  "bulk-update-prices": "/docs/bulk-edit",
  "plans-and-what-is-included": "/docs/plans",
  "product-templates": "/docs/templates",
  "vendors": "/docs/templates",
  "storefront-formatting-and-theme-issues": "/docs/templates",
  "formatting-looks-off-on-my-storefront": "/docs/templates",
  "theme-template-selector-is-empty": "/docs/templates",
  "publishing-and-sales-channels": "/docs/what-synq-creates",
  "sales-channels-and-auto-publish": "/docs/what-synq-creates",
  "get-sealed-products-into-google-shopping": "/docs/what-synq-creates",
  "what-synq-writes-to-shopify": "/docs/what-synq-creates",
  "prices-or-products-not-updating": "/docs/sync",
  "a-product-isnt-syncing-or-is-missing": "/docs/sync",
  "why-didnt-my-price-update": "/docs/sync",
  "write-product-titles-that-rank": "/blog/write-product-titles-that-rank",
  "avoid-thin-or-duplicate-descriptions": "/blog/avoid-thin-or-duplicate-descriptions",
};

/* Vercel sets VERCEL_ENV on its builds; anything but production is a preview
   and must never be indexed. Local dev/start (no VERCEL_ENV) is left alone. */
const isPreview = !!process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* next-mdx-remote is on Next's server-external list; bundling it makes it
     use the app's React, so the blog's MDX renders in dev and prod */
  transpilePackages: ["next-mdx-remote"],
  /* Next 15 streams metadata into <body> for clients it thinks run JS. Pages
     here are static, so blocking costs nothing: always put <title>, canonical
     and hreflang in <head>, for every crawler (incl. AI ones that don't run JS). */
  htmlLimitedBots: /.*/,
  // Config redirects run before the proxy, so next-intl never sees these paths.
  async redirects() {
    return [
      /* the old domain, as the old vercel.json did */
      ...["trysynq.com", "www.trysynq.com"].map((host) => ({
        source: "/:path*",
        has: [{ type: "host", value: host }],
        destination: "https://synq.cards/:path*",
        permanent: true,
      })),

      /* English has no prefix: /en and /en/... are the same pages */
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },

      /* English-only pages under another language's prefix */
      { source: `/:locale(${LOCALES_BUT_EN})/:page(${ENGLISH_ONLY})`, destination: "/:page", permanent: true },
      { source: `/:locale(${LOCALES_BUT_EN})/:page(${ENGLISH_ONLY})/:rest+`, destination: "/:page/:rest+", permanent: true },

      /* old synq.cards URLs (English, no locale prefix) */
      { source: "/pricing", destination: "/#pricing", permanent: true },
      { source: "/how-it-works", destination: "/#new-stock", permanent: true },
      { source: "/faq", destination: "/#faq", permanent: true },
      /* the old contact page: the home opens the write-to-us modal */
      { source: "/contact", destination: "/?contact", permanent: true },
      { source: "/manifest.json", destination: "/manifest.webmanifest", permanent: true },
      ...Object.entries(OLD_DOCS).flatMap(([slug, destination]) => [
        { source: `/docs/${slug}`, destination, permanent: true },
        { source: `/help/${slug}`, destination, permanent: true },
      ]),
      { source: "/help", destination: "/docs", permanent: true },
      { source: "/help/:slug*", destination: "/docs", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          ...(isPreview ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
        ],
      },
      /* only synq.cards is indexed: the same site on any other host (e.g. the
         *.vercel.app URL used to share it before the domain moves) is noindex */
      {
        source: "/:path*",
        missing: [{ type: "host", value: "synq.cards" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/sitemap.xml",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600" }],
      },
      {
        source: "/:file(llms.txt|llms-full.txt)",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600" }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
