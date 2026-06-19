/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      // The Shopify app links to /docs/*; the knowledge base lives at /help/*.
      // Redirect so those links resolve (URL fragments like #macros are kept by
      // the browser across the redirect).
      { source: '/docs', destination: '/help', permanent: true },
      { source: '/docs/:slug*', destination: '/help/:slug*', permanent: true },

      // The help center was consolidated (28 articles -> 14). 301 the retired
      // slugs to the article that now holds their content, so indexed URLs,
      // inbound links and AI citations keep resolving instead of 404ing.
      { source: '/help/install-synq-and-run-your-first-sync', destination: '/help/get-started-with-synq', permanent: true },
      { source: '/help/synq-in-5-minutes', destination: '/help/get-started-with-synq', permanent: true },
      { source: '/help/do-i-need-a-tcgplayer-account', destination: '/help/get-started-with-synq', permanent: true },
      { source: '/help/singles-vs-sealed', destination: '/help/adding-products-to-your-store', permanent: true },
      { source: '/help/conditions-and-stock', destination: '/help/adding-products-to-your-store', permanent: true },
      { source: '/help/search-the-catalog-efficiently', destination: '/help/find-and-organize-products', permanent: true },
      { source: '/help/filter-and-save-product-views', destination: '/help/find-and-organize-products', permanent: true },
      { source: '/help/choosing-a-pricing-strategy', destination: '/help/how-synq-prices-your-cards', permanent: true },
      { source: '/help/the-daily-price-sync', destination: '/help/keep-prices-current', permanent: true },
      { source: '/help/bulk-update-prices', destination: '/help/keep-prices-current', permanent: true },
      { source: '/help/what-synq-writes-to-shopify', destination: '/help/keep-prices-current', permanent: true },
      { source: '/help/vendors', destination: '/help/product-templates', permanent: true },
      { source: '/help/sales-channels-and-auto-publish', destination: '/help/publishing-and-sales-channels', permanent: true },
      { source: '/help/get-sealed-products-into-google-shopping', destination: '/help/publishing-and-sales-channels', permanent: true },
      { source: '/help/a-product-isnt-syncing-or-is-missing', destination: '/help/prices-or-products-not-updating', permanent: true },
      { source: '/help/why-didnt-my-price-update', destination: '/help/prices-or-products-not-updating', permanent: true },
      { source: '/help/formatting-looks-off-on-my-storefront', destination: '/help/storefront-formatting-and-theme-issues', permanent: true },
      { source: '/help/theme-template-selector-is-empty', destination: '/help/storefront-formatting-and-theme-issues', permanent: true },

      // Two SEO/best-practice articles moved from the help center to the blog.
      { source: '/help/write-product-titles-that-rank', destination: '/blog/write-product-titles-that-rank', permanent: true },
      { source: '/help/avoid-thin-or-duplicate-descriptions', destination: '/blog/avoid-thin-or-duplicate-descriptions', permanent: true },
    ]
  },
  images: {
    // Enable optimization with modern formats
    formats: ['image/avif', 'image/webp'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Image sizes for smaller images
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Remote patterns if needed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
