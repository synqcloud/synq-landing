import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { LandingProviders } from "./providers";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Synq - Keep Your Shopify Card Prices Synced with the Market",
  description:
    "Shopify app for trading card sellers. Add cards with one click, sync market prices daily, and update your store prices instantly. For Pokemon, Magic, and more.",
  keywords:
    "Shopify card app, card price sync, Pokemon card Shopify, Magic the Gathering Shopify, card price updates, card shop Shopify app, trading card Shopify",
  metadataBase: new URL("https://www.trysynq.com"),
  openGraph: {
    title: "Synq - Keep Your Shopify Card Prices Synced with the Market",
    description:
      "Shopify app for trading card sellers. Add cards with one click, sync market prices daily, and update your store prices instantly.",
    url: "https://www.trysynq.com",
    type: "website",
    siteName: "Synq",
    images: [
      {
        url: "/brand/synq-eyecatcher-art.png",
        width: 1200,
        height: 630,
        alt: "Synq - Card Price Sync for Shopify",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Synq - Keep Your Shopify Card Prices Synced with the Market",
    description:
      "Shopify app for trading card sellers. Add cards with one click, sync market prices daily, update your store instantly.",
    images: ["/brand/synq-eyecatcher-art.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
