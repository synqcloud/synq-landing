/* Thin wrapper over gtag. Every call is a no-op until the visitor has
   accepted analytics and gtag.js has loaded (see GoogleAnalytics.tsx). */

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends a GA4 event if Google Analytics is running. Never pass personal
    data (names, emails, message text) in params. */
export function track(name: string, params: GtagParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
