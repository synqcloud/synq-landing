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
