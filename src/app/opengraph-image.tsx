import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

/* The default share image for every page that has no image of its own,
   served at /opengraph-image (pages reference it from src/lib/site.ts). */
export const alt = "Synq: TCG inventory and automated card pricing for Shopify";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = "force-static";

export default function Image() {
  return renderOg({
    eyebrow: "For card shops on Shopify",
    title: "TCG inventory and automated card pricing for Shopify",
    subtitle: "Add singles and sealed in a tap. Prices follow the TCGplayer market every day.",
    art: ["pk-charizard-ex.jpg", "mtg-elesh-norn.jpg", "lor-stitch.jpg"],
  });
}
