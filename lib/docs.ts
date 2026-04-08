import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DOCS_DIR = path.join(process.cwd(), "content/docs");

export interface DocFrontmatter {
  title: string;
  seoTitle?: string;
  description: string;
  category: string;
  order?: number;
  keywords?: string[];
}

export interface DocMeta {
  slug: string;
  frontmatter: DocFrontmatter;
}

export interface Doc extends DocMeta {
  content: string;
}

export function getAllDocs(): DocMeta[] {
  if (!fs.existsSync(DOCS_DIR)) return [];

  const files = fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith(".mdx") && !f.endsWith(".example.mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(DOCS_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        frontmatter: data as DocFrontmatter,
      };
    })
    .sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99));
}

export function getDocBySlug(slug: string): Doc | null {
  const filePath = path.join(DOCS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as DocFrontmatter,
    content,
  };
}

export function groupDocsByCategory(docs: DocMeta[]): Record<string, DocMeta[]> {
  return docs.reduce<Record<string, DocMeta[]>>((acc, doc) => {
    const cat = doc.frontmatter.category ?? "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(doc);
    return acc;
  }, {});
}

export { CATEGORY_ICONS, CATEGORY_ORDER } from "./docs-config";
