import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DOCS_DIR = path.join(process.cwd(), "content/docs");
const FIDER_URL = "https://synq.fider.io";

function stripMdx(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, "") // code blocks
    .replace(/`[^`]+`/g, "") // inline code
    .replace(/<[^>]+>/g, "") // JSX/HTML tags
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links → keep text
    .replace(/[#*_~>|-]+/g, "") // markdown symbols
    .replace(/\s+/g, " ")
    .trim();
}

function getSnippet(text: string, query: string, radius = 120): string {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) return text.slice(0, radius * 2).trim();
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + query.length + radius);
  const snippet = text.slice(start, end).trim();
  return (start > 0 ? "…" : "") + snippet + (end < text.length ? "…" : "");
}

function scoreArticle(
  query: string,
  title: string,
  description: string,
  body: string
): number {
  const q = query.toLowerCase();
  let score = 0;
  if (title.toLowerCase().includes(q)) score += 10;
  if (description.toLowerCase().includes(q)) score += 5;
  if (body.toLowerCase().includes(q)) score += 1;
  return score;
}

interface ArticleResult {
  type: "article";
  slug: string;
  title: string;
  category: string;
  snippet: string;
}

interface DiscussionResult {
  type: "discussion";
  number: number;
  title: string;
  description: string;
  votesCount: number;
  status: string;
  url: string;
  tags: string[];
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return NextResponse.json({ articles: [], discussions: [] });
  }

  // --- Article search ---
  const articleResults: ArticleResult[] = [];

  if (fs.existsSync(DOCS_DIR)) {
    const files = fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith(".mdx") && !f.endsWith(".example.mdx"));

    for (const file of files) {
      const raw = fs.readFileSync(path.join(DOCS_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const body = stripMdx(content);
      const score = scoreArticle(q, data.title ?? "", data.description ?? "", body);

      if (score > 0) {
        articleResults.push({
          type: "article",
          slug: file.replace(/\.mdx$/, ""),
          title: data.title ?? file,
          category: data.category ?? "General",
          snippet: getSnippet(
            data.description ? `${data.description} ${body}` : body,
            q
          ),
        });
      }
    }

    articleResults.sort((a, b) => {
      const sa = scoreArticle(q, a.title, a.snippet, "");
      const sb = scoreArticle(q, b.title, b.snippet, "");
      return sb - sa;
    });
  }

  // --- Fider discussion search ---
  let discussions: DiscussionResult[] = [];

  try {
    const res = await fetch(
      `${FIDER_URL}/api/v1/posts?query=${encodeURIComponent(q)}&limit=5`,
      {
        headers: { Authorization: `Bearer ${process.env.FIDER_API_KEY}` },
        next: { revalidate: 0 },
      }
    );

    if (res.ok) {
      const posts = await res.json();
      if (Array.isArray(posts)) {
        discussions = posts.map((p: any) => ({
          type: "discussion",
          number: p.number,
          title: p.title,
          description: p.description,
          votesCount: p.votesCount,
          status: p.status,
          url: `${FIDER_URL}/posts/${p.number}/${p.slug}`,
          tags: p.tags ?? [],
        }));
      }
    }
  } catch {
    // Fider unavailable — return articles only
  }

  return NextResponse.json({
    articles: articleResults.slice(0, 5),
    discussions,
  });
}
