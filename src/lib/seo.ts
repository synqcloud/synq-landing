import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import {
  DEFAULT_LOCALE,
  OG_IMAGE,
  SITE_NAME,
  TWITTER_HANDLE,
  absoluteUrl,
  localePath,
} from "@/lib/site";

/* Metadata rules, in one place:
   - every page states its own canonical (absolute, self-referencing);
   - hreflang only lists locales where that page really is translated, plus
     x-default = English;
   - openGraph/twitter always carry an image (Next merges them shallowly, so a
     page that sets openGraph without images would lose the default one). */

export type Locale = (typeof routing.locales)[number];
export const LOCALES = routing.locales as readonly Locale[];

export const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  es: "es_ES",
  ca: "ca_ES",
  fr: "fr_FR",
  de: "de_DE",
  pt: "pt_PT",
  ja: "ja_JP",
  ko: "ko_KR",
  it: "it_IT",
  eu: "eu_ES",
};

/** Messages titles carry a " · Synq" style suffix; the layout's title
    template adds " | Synq", so strip it. A leading "Synq · " is kept. */
export function bareTitle(title: string): string {
  /* the last " · …" part, when it names Synq: " · Synq", " · Synq help
     center", " · Centro de ayuda de Synq", " · Synq 도움말 센터",
     " · Synqen laguntza-zentroa" (Basque inflects the name)… */
  return title.replace(/\s+[·|]\s+[^·|]*\bSynq[^·|]*$/u, "").trim();
}

/* ---------- which locales are really translated ---------- */

type Json = Record<string, unknown>;
const cache = new Map<string, Json>();
function messages(locale: string): Json {
  let m = cache.get(locale);
  if (!m) {
    const file = path.join(process.cwd(), "messages", `${locale}.json`);
    try {
      m = JSON.parse(fs.readFileSync(file, "utf-8")) as Json;
    } catch {
      m = {};
    }
    cache.set(locale, m);
  }
  return m;
}

function leaves(v: unknown, out: string[] = []): string[] {
  if (typeof v === "string") {
    /* ids, slugs and tiny labels are the same in every language */
    if (v.length > 12 && /\s/.test(v)) out.push(v);
  } else if (Array.isArray(v)) v.forEach((x) => leaves(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => leaves(x, out));
  return out;
}

function pick(obj: Json, keyPath: string): unknown {
  return keyPath.split(".").reduce<unknown>((o, k) => (o && typeof o === "object" ? (o as Json)[k] : undefined), obj);
}

/** True when most of the strings under `keyPath` differ from English. */
function isTranslated(locale: string, keyPaths: string[]): boolean {
  if (locale === DEFAULT_LOCALE) return true;
  const en = messages(DEFAULT_LOCALE);
  const loc = messages(locale);
  let total = 0;
  let same = 0;
  for (const k of keyPaths) {
    const a = leaves(pick(en, k));
    const b = leaves(pick(loc, k));
    const set = new Set(b);
    total += a.length;
    same += a.filter((s) => set.has(s) || b.length === 0).length;
  }
  return total > 0 && same / total < 0.5;
}

/** Locales whose docs index is translated. */
export function docsIndexLocales(): Locale[] {
  return LOCALES.filter((l) => isTranslated(l, ["docs.meta", "docs.hero", "docs.categories", "docs.support"]));
}

/** Locales where one docs article is translated (translators work article by
    article, so each article flips on its own as its strings land). */
export function docsArticleLocales(slug: string): Locale[] {
  return LOCALES.filter((l) => isTranslated(l, [`docs.articles.${slug}`]));
}

/** The home is translated everywhere. */
export const HOME_LOCALES = LOCALES;

/* ---------- metadata builder ---------- */

type Image = { url: string; width?: number; height?: number; alt?: string };

export function pageMetadata({
  locale,
  path: href,
  title,
  description,
  translated = [DEFAULT_LOCALE],
  absoluteTitle = false,
  type = "website",
  images,
  noindex = false,
  article,
}: {
  locale: string;
  /** unprefixed path, e.g. "/docs/price-rules" */
  path: string;
  title: string;
  description: string;
  /** locales this page exists in, translated */
  translated?: readonly string[];
  /** use the title as is, without the " | Synq" template */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  images?: Image[];
  noindex?: boolean;
  article?: { publishedTime?: string; modifiedTime?: string; authors?: string[]; section?: string; tags?: string[] };
}): Metadata {
  const own = translated.includes(locale) ? locale : DEFAULT_LOCALE;
  const canonical = absoluteUrl(localePath(own, href));
  const languages =
    translated.length > 1
      ? {
          ...Object.fromEntries(translated.map((l) => [l, absoluteUrl(localePath(l, href))])),
          "x-default": absoluteUrl(localePath(DEFAULT_LOCALE, href)),
        }
      : undefined;
  const imgs = images ?? [OG_IMAGE];
  /* a title that already names Synq ("Install Synq") keeps the brand once:
     no " | Synq" template on top */
  if (/\bSynq/u.test(title)) absoluteTitle = true;
  const ogTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical, languages },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: OG_LOCALE[own] ?? "en_US",
      ...(languages
        ? { alternateLocale: translated.filter((l) => l !== own).map((l) => OG_LOCALE[l]) }
        : {}),
      url: canonical,
      title: ogTitle,
      description,
      images: imgs,
      ...(type === "article" && article ? article : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: ogTitle,
      description,
      images: imgs.map((i) => i.url),
    },
  };
}
