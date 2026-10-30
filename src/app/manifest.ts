import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Synq: TCG inventory and automated card pricing for Shopify",
    short_name: "Synq",
    description:
      "The Shopify app for trading card shops: add singles and sealed in a tap and keep prices in step with the TCGplayer market.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#161413",
    theme_color: "#161413",
    icons: [
      { src: "/brand/synq-icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/brand/synq-icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
