import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

/* Blog posts are MDX files in src/content/blog. The slug is the file name and
   matches the old synq.cards/blog URLs one to one (they are indexed). */

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

import { SITE_URL as SITE } from "@/lib/site";
export { SITE };
export const OG_IMAGE = `${SITE}/brand/synq-eyecatcher-art.png`;
export const imageUrl = (fm: { image?: string }) => (fm.image ? `${SITE}${fm.image}` : OG_IMAGE);
/* a post's share image: its own when it names one, else its generated card
   (src/app/og/blog/[slug]) */
export const postImageUrl = (post: { slug: string; frontmatter: { image?: string } }) =>
  post.frontmatter.image ? `${SITE}${post.frontmatter.image}` : `${SITE}/og/blog/${post.slug}`;
export const INSTALL_URL = "https://apps.shopify.com/synq-tcg-card-manager";

export type FaqItem = { question: string; answer: string };

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  /** last substantive edit (YYYY-MM-DD); falls back to `date` */
  updated?: string;
  author: string;
  authorTitle?: string;
  category: string;
  tags?: string[];
  keywords?: string;
  image?: string;
  imageAlt?: string;
  canonical?: string;
  faq?: FaqItem[];
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  readingTime: string;
  words: number;
}

export const CATEGORY_LABELS: Record<string, string> = {
  "card-shop-automation": "Card Shop Automation",
  "magic-the-gathering": "Magic: The Gathering",
  "pokemon-tcg": "Pokemon TCG",
  "pricing-strategies": "Pricing Strategies",
  "case-studies": "Case Studies",
  "listing-seo": "Listings & SEO",
};

export const categoryLabel = (c: string) => CATEGORY_LABELS[c] ?? c;

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf-8"));
  const stats = readingTime(content);
  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    content,
    readingTime: stats.text,
    words: stats.words,
  };
}

/* newest first; same-day posts keep file order, as on the old site */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .sort()
    .map((f) => getPostBySlug(f.replace(/\.mdx$/, "")))
    .filter((p): p is BlogPost => p !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
}

/* same category first, then the newest of the rest */
export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  const all = getAllPosts().filter((p) => p.slug !== slug);
  const current = getPostBySlug(slug);
  if (!current) return all.slice(0, count);
  const same = all.filter((p) => p.frontmatter.category === current.frontmatter.category);
  const rest = all.filter((p) => p.frontmatter.category !== current.frontmatter.category);
  return [...same, ...rest].slice(0, count);
}
