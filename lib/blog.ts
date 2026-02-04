import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  authorTitle: string;
  category: string;
  tags: string[];
  keywords: string;
  image: string;
  imageAlt: string;
  canonical: string;
  faq?: { question: string; answer: string }[];
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  readingTime: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    return getPostBySlug(slug);
  });

  return posts
    .filter((p): p is BlogPost => p !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    content,
    readingTime: stats.text,
  };
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) => p.frontmatter.category === category);
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((p) => p.frontmatter.category));
  return Array.from(categories);
}

export const CATEGORY_LABELS: Record<string, string> = {
  "card-shop-automation": "Card Shop Automation",
  "magic-the-gathering": "Magic: The Gathering",
  "pokemon-tcg": "Pokemon TCG",
  "pricing-strategies": "Pricing Strategies",
  "case-studies": "Case Studies",
};
