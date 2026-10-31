"use client";

import { useEffect } from "react";
import {
  CONSENT_CHANGE_EVENT,
  GA_MEASUREMENT_ID,
  analyticsEnabled,
  readConsent,
  type Consent,
} from "@/lib/consent";
import { track } from "@/lib/ga";
import { SHOPIFY_APP_URL } from "@/lib/site";

/* Google Analytics 4 for synq.cards, loaded only after the visitor accepts
   analytics in the cookie banner. Before that no request goes to Google.

   The landing is one web stream of the same GA4 property as the Shopify App
   Store listing, so both roads show up together (split by stream or by
   hostname). Page views on client-side navigation come from GA4's enhanced
   measurement ("page changes based on browser history events"), which must
   stay on in the stream settings.

   Events sent from here:
   - app_store_click: a click on any link to the App Store listing. Mark it as
     a key event in GA4. The link itself carries the visit's UTMs
     (AttributionTracker), so the listing's stream sees where it came from.
   - generate_lead: sent by the contact form on success (ContactModal). */

let loaded = false;

function load() {
  if (loaded) {
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    return;
  }
  loaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the arguments object itself, not an array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(script);
}

/** Withdrawn consent: stop sending and remove GA's cookies. */
function unload() {
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  window.gtag?.("consent", "update", { analytics_storage: "denied" });

  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = [host, `.${host}`];
  if (parts.length > 2) domains.push(`.${parts.slice(-2).join(".")}`);
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${d}`;
    }
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
}

function apply(consent: Consent | null) {
  if (consent === "granted") {
    delete (window as unknown as Record<string, boolean>)[`ga-disable-${GA_MEASUREMENT_ID}`];
    load();
  } else if (consent === "denied") {
    unload();
  }
}

export default function GoogleAnalytics() {
  useEffect(() => {
    if (!analyticsEnabled) return;

    apply(readConsent());
    const onChange = (e: Event) => apply((e as CustomEvent<Consent>).detail);
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || !link.href.startsWith(SHOPIFY_APP_URL)) return;
      track("app_store_click", {
        page_path: window.location.pathname,
        link_text: (link.textContent ?? "").trim().slice(0, 80),
      });
    };
    /* auxclick: middle-click, which opens the listing in a new tab */
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);

    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  return null;
}
