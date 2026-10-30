import en from "../../messages/en.json";

// Category order on the docs index. Article order comes from messages
// (docs.categories.<key>.articles), which every locale shares.
export const DOCS_CATEGORIES = [
  "start",
  "stock",
  "prices",
  "inventory",
  "shopify",
  "billing",
] as const;

export type DocsCategory = (typeof DOCS_CATEGORIES)[number];

const categories = en.docs.categories as Record<
  DocsCategory,
  { articles: string[] }
>;

// Every article slug, in reading order.
export const DOCS_SLUGS: string[] = DOCS_CATEGORIES.flatMap(
  (c) => categories[c].articles,
);

export function isDocsSlug(slug: string): boolean {
  return DOCS_SLUGS.includes(slug);
}

export function docsNeighbours(slug: string): {
  prev: string | null;
  next: string | null;
} {
  const i = DOCS_SLUGS.indexOf(slug);
  return {
    prev: i > 0 ? DOCS_SLUGS[i - 1] : null,
    next: i >= 0 && i < DOCS_SLUGS.length - 1 ? DOCS_SLUGS[i + 1] : null,
  };
}
