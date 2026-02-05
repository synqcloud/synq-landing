import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { LandingProviders } from "./providers";
import { Analytics } from "@vercel/analytics/next";
import { SchemaMarkup } from "@/components/schema-markup";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://www.trysynq.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#3d4654" },
  ],
};

export const metadata: Metadata = {
  // Primary SEO
  title: {
    default: "Synq - Automated Card Pricing for Shopify | TCGPlayer & Cardmarket Sync",
    template: "%s | Synq",
  },
  description:
    "Sync your Shopify card prices with market data automatically. TCGPlayer, Cardmarket, and more. Add cards in one click, daily price updates, condition-based pricing.",
  keywords: [
    // Primary keywords
    "automated card pricing",
    "Shopify card shop app",
    "trading card price automation",
    "card price sync Shopify",
    // Price sources
    "TCGPlayer Shopify sync",
    "Cardmarket integration",
    "market price sync",
    "card market data",
    // Product-specific
    "card inventory management",
    "bulk card pricing",
    "condition-based pricing",
    // Game-specific
    "MTG Shopify app",
    "Magic The Gathering price sync",
    "Pokemon card Shopify",
    "Yu-Gi-Oh inventory app",
    // Long-tail
    "auto update card prices Shopify",
    "card shop automation software",
    "trading card store management",
    // Competitor alternatives
    "TCGSync alternative",
    "card shop POS integration",
  ],
  authors: [{ name: "Synq", url: BASE_URL }],
  creator: "Synq",
  publisher: "Synq",
  metadataBase: new URL(BASE_URL),

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Synq",
    title: "Synq - Automated Card Pricing for Shopify",
    description:
      "Keep your Shopify card shop competitive with automated pricing. Sync with TCGPlayer, Cardmarket, and more. Add cards in seconds.",
    images: [
      {
        url: "/brand/synq-eyecatcher-art.png",
        width: 1200,
        height: 630,
        alt: "Synq - Automated card pricing for Shopify stores",
        type: "image/png",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Synq - Automated Card Pricing for Shopify",
    description:
      "Sync your card prices with market data automatically. TCGPlayer, Cardmarket, and more. Add cards in one click.",
    images: ["/brand/synq-eyecatcher-art.png"],
    creator: "@trysynq",
    site: "@trysynq",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Alternates
  alternates: {
    canonical: BASE_URL,
  },

  // App-specific
  applicationName: "Synq",
  category: "Business",
  classification: "Business Software",

  // Verification (add your verification codes)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },

  // Other
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand/synq-icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/brand/synq-icon.png", sizes: "180x180" }],
  },

  // Manifest
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SchemaMarkup />
        <Analytics />
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="/sitemap.xml"
        />
      </head>
      <body className={`${inter.className} bg-background text-foreground`}>
        <LandingProviders>{children}</LandingProviders>
      </body>
    </html>
  );
}
