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
      // The help center was removed (Oct 2026): docs went stale as the app changed.
      // /docs/* (linked from the Shopify app) and /help/* now go to the contact page.
      { source: '/docs', destination: '/contact', permanent: true },
      { source: '/docs/:slug*', destination: '/contact', permanent: true },
      { source: '/help', destination: '/contact', permanent: true },
      { source: '/help/:slug*', destination: '/contact', permanent: true },
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
