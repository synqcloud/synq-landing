import type { MetadataRoute } from "next";
import { GAMES } from "@/content/games";
import { COMPARE } from "@/content/synq-vs-spreadsheets";
import { COMPARE_ROUTES } from "@/content/compare";
import { GUIDE_ROUTES } from "@/content/guides";
import { getAllPosts } from "@/lib/blog";
import { DOCS_SLUGS } from "@/lib/docs";
import { HOME_LOCALES, docsArticleLocales, docsIndexLocales } from "@/lib/seo";
import { CONTENT_UPDATED, DEFAULT_LOCALE, absoluteUrl, localePath } from "@/lib/site";

/* Every indexable URL, once per language it really exists in. Each translated
   URL gets its own <url> with the full hreflang set (Google wants the set
   repeated on every member). Not listed: /legal (noindex), docs in a language
   they aren't translated into yet (noindex, canonical on English), redirects
   (/pricing, /faq, /contact...). */

type Entry = MetadataRoute.Sitemap[number];

function entries(
  path: string,
  translated: readonly string[],
  lastModified: string,
  extra: Partial<Entry> = {},
): Entry[] {
  const languages =
    translated.length > 1
      ? {
          ...Object.fromEntries(translated.map((l) => [l, absoluteUrl(localePath(l, path))])),
          "x-default": absoluteUrl(localePath(DEFAULT_LOCALE, path)),
        }
      : undefined;
  return translated.map((l) => ({
    url: absoluteUrl(localePath(l, path)),
    lastModified: new Date(lastModified),
    ...(languages ? { alternates: { languages } } : {}),
    ...extra,
  }));
}

const EN = [DEFAULT_LOCALE];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const newestPost = posts
    .map((p) => p.frontmatter.updated ?? p.frontmatter.date)
    .sort()
    .at(-1) ?? CONTENT_UPDATED;

  return [
    ...entries("/", HOME_LOCALES, CONTENT_UPDATED, { changeFrequency: "weekly", priority: 1 }),

    ...entries("/docs", docsIndexLocales(), CONTENT_UPDATED, { changeFrequency: "weekly", priority: 0.8 }),
    ...DOCS_SLUGS.flatMap((slug) =>
      entries(`/docs/${slug}`, docsArticleLocales(slug), CONTENT_UPDATED, { changeFrequency: "monthly", priority: 0.6 }),
    ),

    ...entries("/blog", EN, newestPost, { changeFrequency: "weekly", priority: 0.7 }),
    ...posts.flatMap((p) =>
      entries(`/blog/${p.slug}`, EN, p.frontmatter.updated ?? p.frontmatter.date, {
        changeFrequency: "monthly",
        priority: 0.7,
      }),
    ),

    ...GAMES.flatMap((g) => entries(`/for/${g.slug}`, EN, CONTENT_UPDATED, { changeFrequency: "monthly", priority: 0.8 })),
    ...entries(`/${COMPARE.slug}`, EN, CONTENT_UPDATED, { changeFrequency: "monthly", priority: 0.7 }),
    ...COMPARE_ROUTES.flatMap((r) =>
      entries(r.path, EN, r.lastModified, { changeFrequency: "monthly", priority: r.path === "/compare" ? 0.7 : 0.6 }),
    ),

    ...GUIDE_ROUTES.flatMap((r) =>
      entries(r.path, EN, r.lastModified, {
        changeFrequency: "monthly",
        priority: r.path === "/shopify-tcg-app" || r.path === "/integrations/tcgplayer" ? 0.8 : 0.6,
      }),
    ),

    ...["/terms", "/privacy", "/cookies"].flatMap((p) =>
      entries(p, EN, CONTENT_UPDATED, { changeFrequency: "yearly", priority: 0.3 }),
    ),
  ];
}
