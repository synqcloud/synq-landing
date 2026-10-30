/* Shapes for the comparison cluster (/compare, /compare/*, /alternatives/*,
   /best-shopify-apps-for-card-shops). English only, outside messages/*.json
   like the game pages. Every competitor fact carries the ids of the public
   pages it came from (see sources.ts). */

import type { Faq } from "@/content/games";
import type { SourceId } from "./sources";

export type { Faq };

/** One fact in a table cell. `s` are the sources that back it. */
export type Cell = {
  v: string;
  s?: SourceId[];
  /** "no" and "unknown" read quieter than a real yes */
  tone?: "yes" | "no" | "unknown";
};

export type PageLink = { href: string; label: string };

/** A side-by-side row on a head-to-head page. */
export type VsRow = {
  topic: string;
  them: Cell;
  synq: Cell;
  /** the other app does this one as well or better: said plainly */
  themWins?: boolean;
};

export type Block =
  | {
      kind: "prose";
      id?: string;
      label?: string;
      title: string;
      paragraphs: string[];
      bullets?: string[];
      /** sources for the facts in this block */
      sources?: SourceId[];
    }
  | {
      kind: "split";
      label?: string;
      title?: string;
      left: { title: string; body?: string; points: string[] };
      right: { title: string; body?: string; points: string[] };
    }
  | { kind: "vs"; label?: string; title: string; them: string; rows: VsRow[]; note?: string }
  | { kind: "matrix"; label?: string; title: string; intro?: string; columns?: string[] }
  | { kind: "steps"; label?: string; title: string; intro?: string; steps: { title: string; body: string }[] }
  | { kind: "apps"; label?: string; title: string; intro?: string }
  | { kind: "links"; label?: string; title: string; intro?: string; links: PageLink[] };

export type ComparePage = {
  /** unprefixed path, e.g. "/compare/tcg-importer" */
  path: string;
  seoTitle: string;
  description: string;
  keywords: string[];
  /** breadcrumb name and short title for lists */
  name: string;
  eyebrow: string;
  h1: string;
  intro: string;
  /** shown under the hero: who wrote this and when it was checked */
  byline: string;
  blocks: Block[];
  faq: Faq[];
  faqTitle: string;
  faqBody: string;
  closing: { title: string; body: string };
  /** sources listed at the bottom, in order */
  sources: SourceId[];
  /** breadcrumb parent, if any */
  parent?: { name: string; path: string };
  /** the page is a list of apps (ItemList in JSON-LD) */
  itemList?: boolean;
};
