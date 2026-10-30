/* Shapes for the English-only knowledge pages: /shopify-tcg-app,
   /integrations/tcgplayer, /guides/* and /glossary/*. They live outside
   messages/*.json like the game pages and the comparison cluster.

   Strings may carry **bold** and [label](/path) links (the docs markup).
   Facts about Synq come from the app; facts about TCGplayer or Shopify carry
   a source in `sources`. */

import type { Faq } from "@/content/games";

export type { Faq };

export type PageLink = { href: string; label: string };
export type Source = { label: string; url: string };

export type GuideBlock =
  | {
      kind: "prose";
      id?: string;
      label?: string;
      title: string;
      paragraphs: string[];
      bullets?: string[];
      /** a closing line under the bullets */
      after?: string;
    }
  | {
      kind: "steps";
      id?: string;
      label?: string;
      title: string;
      intro?: string;
      steps: { title: string; body: string }[];
    }
  | {
      kind: "table";
      id?: string;
      label?: string;
      title: string;
      intro?: string;
      caption: string;
      head: string[];
      rows: string[][];
      note?: string;
    }
  | {
      kind: "split";
      id?: string;
      label?: string;
      title?: string;
      left: { title: string; body?: string; points: string[] };
      right: { title: string; body?: string; points: string[] };
    }
  | {
      kind: "cards";
      id?: string;
      label?: string;
      title: string;
      intro?: string;
      cards: { href: string; title: string; body: string }[];
    }
  | { kind: "links"; id?: string; label?: string; title: string; intro?: string; links: PageLink[] };

export type GuidePage = {
  /** unprefixed path, e.g. "/guides/card-shop-pricing-strategy" */
  path: string;
  /** which cluster the page belongs to (breadcrumbs, schema, lists) */
  section: "app" | "integration" | "guides" | "guide" | "glossary" | "term";
  seoTitle: string;
  description: string;
  keywords: string[];
  /** breadcrumb name and short title for lists */
  name: string;
  /** one line for hub cards and llms.txt */
  summary: string;
  eyebrow: string;
  h1: string;
  intro: string;
  blocks: GuideBlock[];
  faq: Faq[];
  faqTitle: string;
  faqBody: string;
  closing: { title: string; body: string };
  /** outside pages the facts on this page come from */
  sources: Source[];
  /** links at the bottom: docs, games, other guides */
  related: PageLink[];
  /** breadcrumb parent */
  parent?: { name: string; path: string };
  /** a glossary entry: the term it defines (DefinedTerm in JSON-LD) */
  term?: { name: string; alternateNames?: string[]; definition: string };
  /** the hero's second link */
  secondary?: { href: string; label: string };
};
