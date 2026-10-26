"use client";

import { useEffect } from "react";
import { captureAttribution, buildInstallUrl, SHOPIFY_APP_URL } from "@/lib/attribution";

/**
 * Captures first-touch attribution on load and tags every "Install on Shopify"
 * link at click time (one place instead of editing each button).
 */
export function AttributionTracker() {
  useEffect(() => {
    const attribution = captureAttribution();

    const tag = (event: Event) => {
      const target = event.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || !link.href.startsWith(SHOPIFY_APP_URL)) return;
      link.href = buildInstallUrl(window.location.pathname, attribution);
    };

    // mousedown/touchstart/keydown run before navigation, also for middle-click and "open in new tab".
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
