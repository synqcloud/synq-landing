/* The comparison cluster, in one list. The sitemap and llms.txt can read
   COMPARE_ROUTES; the pages read getComparePage(). English only. */

import type { ComparePage } from "./types";
import { HUB } from "./hub";
import { TCG_IMPORTER } from "./tcg-importer";
import { TCG_AUTOMATE } from "./tcg-automate";
import { LGS_FORGE } from "./lgs-forge";
import { BINDERPOS } from "./binderpos";
import { CRYSTAL_COMMERCE } from "./crystal-commerce";
import { BEST_APPS } from "./best-apps";
import { CHECKED_ISO } from "./sources";

export const COMPARE_PAGES: ComparePage[] = [
  HUB,
  TCG_IMPORTER,
  TCG_AUTOMATE,
  LGS_FORGE,
  BINDERPOS,
  CRYSTAL_COMMERCE,
  BEST_APPS,
];

/** For sitemap.ts / llms.txt: unprefixed English paths. */
export const COMPARE_ROUTES: { path: string; title: string; description: string; lastModified: string }[] =
  COMPARE_PAGES.map((p) => ({
    path: p.path,
    title: p.seoTitle,
    description: p.description,
    lastModified: CHECKED_ISO,
  }));

export function getComparePage(path: string): ComparePage | undefined {
  return COMPARE_PAGES.find((p) => p.path === path);
}

/** Slugs under a prefix, for generateStaticParams. */
export function slugsUnder(prefix: "/compare/" | "/alternatives/"): string[] {
  return COMPARE_PAGES.filter((p) => p.path.startsWith(prefix)).map((p) => p.path.slice(prefix.length));
}

export { HUB, TCG_IMPORTER, TCG_AUTOMATE, LGS_FORGE, BINDERPOS, CRYSTAL_COMMERCE, BEST_APPS };
export { CLUSTER_LINKS, GAME_LINKS, DOC_LINKS } from "./hub";
export { ALL_APPS, COMPETITORS, SYNQ, COLUMNS } from "./apps";
export { SOURCES, CHECKED, CHECKED_ISO } from "./sources";
export type { ComparePage } from "./types";
