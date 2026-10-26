// First-touch attribution for synq.cards.
//
// On the first visit we store where the visitor came from (UTM params or the
// referrer, classified into a channel). Every "Install on Shopify" link and
// every contact-form submission then carries that origin, so installs can be
// split by channel in the Shopify Partner Dashboard (App listing traffic, UTM
// breakdown) and support requests show where the person found us.

export type Attribution = {
  source: string; // google, chatgpt, reddit, direct...
  medium: string; // organic, ai, social, referral, direct, or the utm_medium
  campaign?: string;
  referrer?: string; // referrer hostname
  landingPath: string;
  firstSeen: string; // ISO date
};

const STORAGE_KEY = "synq_attribution";
export const SHOPIFY_APP_URL = "https://apps.shopify.com/synq-tcg-card-manager";

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

function safeGet(): Attribution | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

function safeSet(value: Attribution) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage blocked (private mode, etc.): attribution just falls back to "direct".
  }
}

/** Records the first touch. Later visits never overwrite it. */
export function captureAttribution(): Attribution {
  const existing = safeGet();
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
    // ChatGPT appends utm_source=chatgpt.com to links it cites.
    const fromUtm = classifyReferrer(utmSource);
    source = fromUtm.medium === "referral" ? utmSource.toLowerCase() : fromUtm.source;
    medium = utmMedium ?? (fromUtm.medium === "referral" ? "referral" : fromUtm.medium);
  } else if (referrerHost) {
    ({ source, medium } = classifyReferrer(referrerHost));
  }

  const attribution: Attribution = {
    source,
    medium,
    campaign: utmCampaign,
    referrer: referrerHost,
    landingPath: window.location.pathname,
    firstSeen: new Date().toISOString(),
  };
  safeSet(attribution);
  return attribution;
}

export function getAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  return safeGet();
}

/** Install URL tagged with the visitor's first-touch channel and the page the click came from. */
export function buildInstallUrl(clickPath: string, attribution: Attribution | null): string {
  const url = new URL(SHOPIFY_APP_URL);
  const a = attribution;
  url.searchParams.set("utm_source", a ? `synq.cards-${a.source}` : "synq.cards");
  url.searchParams.set("utm_medium", a?.medium ?? "direct");
  url.searchParams.set("utm_campaign", a?.campaign ?? "landing");
  url.searchParams.set("utm_content", clickPath || "/");
  return url.toString();
}
