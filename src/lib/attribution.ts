/* First-touch attribution, ported from the old site (prod lib/attribution.ts).

   On the first page of a visit we note where the visitor came from (UTM
   params, or the referrer's host classified into a channel). Every "Add to
   Shopify" link then carries it as UTM params, so installs can be split by
   channel in the Shopify Partner Dashboard (incl. AI assistants).

   Privacy: nothing leaves the browser until the visitor clicks an install
   link; no cookie, no identifier, no personal data. It is kept in
   sessionStorage (gone when the tab closes), and nothing is stored when the
   browser sends Global Privacy Control or Do Not Track. */

import { SHOPIFY_APP_URL } from "@/lib/site";

export type Attribution = {
  source: string; // google, chatgpt, reddit, direct...
  medium: string; // organic, ai, social, referral, direct, or the utm_medium
  campaign?: string;
  landingPath: string;
};

const STORAGE_KEY = "synq_attribution";
export { SHOPIFY_APP_URL };

const RULES: Array<{ test: RegExp; source: string; medium: string }> = [
  // AI assistants
  { test: /(^|\.)chatgpt\.com$|(^|\.)openai\.com$/, source: "chatgpt", medium: "ai" },
  { test: /(^|\.)perplexity\.ai$/, source: "perplexity", medium: "ai" },
  { test: /(^|\.)claude\.ai$/, source: "claude", medium: "ai" },
  { test: /^gemini\.google\.com$|^bard\.google\.com$/, source: "gemini", medium: "ai" },
  { test: /(^|\.)copilot\.microsoft\.com$/, source: "copilot", medium: "ai" },
  { test: /(^|\.)you\.com$|(^|\.)phind\.com$|(^|\.)deepseek\.com$|(^|\.)meta\.ai$/, source: "other-ai", medium: "ai" },
  // Search engines
  { test: /(^|\.)google\.[a-z.]+$/, source: "google", medium: "organic" },
  { test: /(^|\.)bing\.com$/, source: "bing", medium: "organic" },
  { test: /(^|\.)duckduckgo\.com$/, source: "duckduckgo", medium: "organic" },
  { test: /(^|\.)yahoo\.com$|(^|\.)ecosia\.org$|(^|\.)brave\.com$/, source: "other-search", medium: "organic" },
  // Communities
  { test: /(^|\.)reddit\.com$|^redd\.it$/, source: "reddit", medium: "social" },
  { test: /(^|\.)youtube\.com$|^youtu\.be$/, source: "youtube", medium: "social" },
  { test: /(^|\.)facebook\.com$|(^|\.)instagram\.com$|^t\.co$|(^|\.)x\.com$|(^|\.)twitter\.com$|(^|\.)discord\.com$/, source: "social", medium: "social" },
  // Shopify
  { test: /(^|\.)shopify\.com$|(^|\.)myshopify\.com$/, source: "shopify", medium: "referral" },
];

export function classifyReferrer(hostname: string): { source: string; medium: string } {
  const host = hostname.toLowerCase().replace(/^www\./, "");
  for (const rule of RULES) {
    if (rule.test.test(host)) return { source: rule.source, medium: rule.medium };
  }
  return { source: host, medium: "referral" };
}

function optedOut(): boolean {
  const n = navigator as Navigator & { globalPrivacyControl?: boolean };
  return n.globalPrivacyControl === true || n.doNotTrack === "1";
}

function read(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

function write(value: Attribution) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* storage blocked: the install link just says "direct" */
  }
}

/** Records the first touch of the visit; later pages never overwrite it. */
export function captureAttribution(): Attribution | null {
  if (optedOut()) return null;
  const existing = read();
  if (existing) return existing;

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign") ?? undefined;

  let referrerHost: string | undefined;
  try {
    if (document.referrer) {
      const host = new URL(document.referrer).hostname;
      if (host && host !== window.location.hostname) referrerHost = host;
    }
  } catch {
    referrerHost = undefined;
  }

  let source = "direct";
  let medium = "direct";
  if (utmSource) {
    /* ChatGPT appends utm_source=chatgpt.com to links it cites */
    const fromUtm = classifyReferrer(utmSource);
    source = fromUtm.medium === "referral" ? utmSource.toLowerCase() : fromUtm.source;
    medium = utmMedium ?? (fromUtm.medium === "referral" ? "referral" : fromUtm.medium);
  } else if (referrerHost) {
    ({ source, medium } = classifyReferrer(referrerHost));
  }

  const attribution: Attribution = {
    source: source.slice(0, 60),
    medium: medium.slice(0, 40),
    campaign: utmCampaign?.slice(0, 60),
    landingPath: window.location.pathname,
  };
  write(attribution);
  return attribution;
}

/** The visit's first touch, if one was noted (for the contact form). */
export function getAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  return read();
}

/** Install URL tagged with the visit's first-touch channel and the page the
    click came from. Keeps any path/query already on the link (e.g. /reviews). */
export function buildInstallUrl(href: string, clickPath: string, a: Attribution | null): string {
  const url = new URL(href);
  url.searchParams.set("utm_source", a ? `synq.cards-${a.source}` : "synq.cards");
  url.searchParams.set("utm_medium", a?.medium ?? "direct");
  url.searchParams.set("utm_campaign", a?.campaign ?? "landing");
  url.searchParams.set("utm_content", clickPath || "/");
  return url.toString();
}
