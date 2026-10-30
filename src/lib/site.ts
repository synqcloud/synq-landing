/* One place for the site's origin and its URL rules. Safe to import from
   client components (no fs, no messages). */

/** Canonical origin, no trailing slash. Production is synq.cards; set
    NEXT_PUBLIC_SITE_URL only to point canonicals somewhere else on purpose. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://synq.cards"
).replace(/\/+$/, "");

export const SITE_NAME = "Synq";
export const TWITTER_HANDLE = "@trysynq";
export const SHOPIFY_APP_URL = "https://apps.shopify.com/synq-tcg-card-manager";
export const SUPPORT_EMAIL = "help@synq.cards";

/** Date the marketing copy last changed (YYYY-MM-DD). Bump it with any copy
    change: sitemap lastModified and JSON-LD dateModified read it, so search
    engines see a real change date instead of the build date. */
export const CONTENT_UPDATED = "2026-10-30";

/** Default share image (1200x630), generated in the site's look by
    src/app/opengraph-image.tsx. The old site's static art
    (/brand/synq-eyecatcher-art.png) stays on the blog index and as the app
    screenshot in JSON-LD. */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Synq: TCG inventory and automated card pricing for Shopify",
} as const;

export const DEFAULT_LOCALE = "en";

/* Pages that exist in English only, at their unprefixed URL. A link to one
   from a translated page goes straight to the English URL (no redirect hop). */
const ENGLISH_ONLY = [
  /^\/blog(\/|$)/,
  /^\/for\//,
  /^\/synq-vs-spreadsheets$/,
  /^\/(terms|privacy|cookies|legal)$/,
  /^\/(compare|alternatives|best-shopify-apps-for-card-shops)(\/|$)/,
  /^\/(shopify-tcg-app|integrations|guides|glossary)(\/|$)/,
];

export function isEnglishOnly(path: string): boolean {
  const p = path.split(/[?#]/)[0];
  return ENGLISH_ONLY.some((re) => re.test(p));
}

/** The URL path of `path` in `locale`: English has no prefix
    ("as-needed"), the others get "/es", "/fr"... English-only pages always
    resolve to their English URL. `path` may also be just a "#hash" or a
    "?query" on the home page. */
export function localePath(locale: string, path = "/"): string {
  if (path.startsWith("#") || path.startsWith("?")) {
    return `${localePath(locale, "/")}${path}`.replace(/^\/\//, "/");
  }
  if (!path.startsWith("/")) return path;
  if (locale === DEFAULT_LOCALE || isEnglishOnly(path)) return path;
  if (path === "/") return `/${locale}`;
  if (path.startsWith("/#") || path.startsWith("/?")) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
}

/** Absolute URL for a path on the site; the home is the bare origin
    (https://synq.cards, no trailing slash, as on the old site). */
export function absoluteUrl(path = "/"): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}
