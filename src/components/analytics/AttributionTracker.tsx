"use client";

import { useEffect } from "react";
import { SHOPIFY_APP_URL, buildInstallUrl, captureAttribution } from "@/lib/attribution";

/* Notes the visit's first touch on load and tags every Shopify App Store link
   at click time (one listener instead of editing every button). See
   src/lib/attribution.ts for what is kept and for how long. */
export default function AttributionTracker() {
  useEffect(() => {
    const attribution = captureAttribution();

    const tag = (event: Event) => {
      const target = event.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || !link.href.startsWith(SHOPIFY_APP_URL)) return;
      link.href = buildInstallUrl(link.href, window.location.pathname, attribution);
    };

    /* these run before navigation, also for middle-click and "open in new tab" */
    document.addEventListener("mousedown", tag, true);
    document.addEventListener("touchstart", tag, true);
    document.addEventListener("keydown", tag, true);
    return () => {
      document.removeEventListener("mousedown", tag, true);
      document.removeEventListener("touchstart", tag, true);
      document.removeEventListener("keydown", tag, true);
    };
  }, []);

  return null;
}
