import { createClient } from "@supabase/supabase-js";

// Read-only public client. The publishable/anon key is safe to embed
// client-side: the underlying Postgres role only holds SELECT grants (no
// insert/update/delete) on these tables, enforced at the grant level, not
// just by RLS policy — see synq-feedback's
// 20260710235105_grant_base_table_privileges.sql.
const supabase = createClient(
  process.env.NEXT_PUBLIC_FEEDBACK_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_FEEDBACK_SUPABASE_ANON_KEY!,
);

export const FEEDBACK_URL = "https://feedback.synq.cards";

export type FeedbackStatus =
  | "unassigned"
  | "planned"
  | "in_progress"
  | "testing"
  | "completed"
  | "archived";

export interface FeedbackType {
  id: string;
  name: string;
  color: string;
}

export interface FeedbackSuggestion {
  id: string;
  title: string;
  body: unknown;
  status: FeedbackStatus;
  vote_count: number;
  comment_count: number;
  type: FeedbackType | null;
}

export async function getFeedbackTypes(): Promise<FeedbackType[]> {
  const { data, error } = await supabase
    .from("suggestion_types")
    .select("id, name, color")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getFeedbackTypes failed:", error);
    return [];
  }
  return data ?? [];
}

export type FeedbackView = "trending" | "planned";

export async function getFeedbackSuggestions(
  view: FeedbackView = "trending",
  limit = 10,
): Promise<FeedbackSuggestion[]> {
  let query = supabase
    .from("suggestions")
    .select("id, title, body, status, vote_count, type:suggestion_types(id, name, color), comments(count)")
    .limit(limit);

  query =
    view === "planned"
      ? query.in("status", ["planned", "in_progress", "testing"]).order("vote_count", { ascending: false })
      : query.not("status", "in", "(completed,archived)").order("vote_count", { ascending: false });

  const { data, error } = await query;
  if (error) {
    console.error("getFeedbackSuggestions failed:", error);
    return [];
  }

  return ((data ?? []) as unknown as Array<{
    id: string;
    title: string;
    body: unknown;
    status: FeedbackStatus;
    vote_count: number;
    type: FeedbackType | null;
    comments: { count: number }[];
  }>).map((row) => ({
    id: row.id,
    title: row.title,
    body: row.body,
    status: row.status,
    vote_count: row.vote_count,
    comment_count: row.comments?.[0]?.count ?? 0,
    type: row.type,
  }));
}

export async function searchFeedbackSuggestions(query: string, limit = 5): Promise<FeedbackSuggestion[]> {
  const { data, error } = await supabase
    .from("suggestions")
    .select("id, title, body, status, vote_count, type:suggestion_types(id, name, color), comments(count)")
    .ilike("title", `%${query}%`)
    .order("vote_count", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("searchFeedbackSuggestions failed:", error);
    return [];
  }

  return ((data ?? []) as unknown as Array<{
    id: string;
    title: string;
    body: unknown;
    status: FeedbackStatus;
    vote_count: number;
    type: FeedbackType | null;
    comments: { count: number }[];
  }>).map((row) => ({
    id: row.id,
    title: row.title,
    body: row.body,
    status: row.status,
    vote_count: row.vote_count,
    comment_count: row.comments?.[0]?.count ?? 0,
    type: row.type,
  }));
}

export function feedbackPostUrl(post: { id: string }) {
  return `${FEEDBACK_URL}/suggestions/${post.id}`;
}

// Mirrors synq-feedback's src/lib/text-preview.ts — body is Tiptap/ProseMirror
// JSON, this walks it to a plain-text snippet for cards/search results.
type NodeLike = { type?: string; text?: string; content?: NodeLike[] };

function collectText(node: NodeLike, parts: string[]) {
  if (node.type === "text" && node.text) parts.push(node.text);
  node.content?.forEach((child) => collectText(child, parts));
  if (node.type === "paragraph" || node.type === "heading" || node.type === "listItem") parts.push(" ");
}

export function getTextPreview(body: unknown, maxLength = 160): string {
  const parts: string[] = [];
  if (body && typeof body === "object") collectText(body as NodeLike, parts);

  const text = parts.join("").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

export const STATUS_LABEL: Record<FeedbackStatus, string> = {
  unassigned: "Open",
  planned: "Planned",
  in_progress: "In Progress",
  testing: "Testing",
  completed: "Completed",
  archived: "Archived",
};

export const STATUS_CLASS: Record<FeedbackStatus, string> = {
  unassigned: "bg-muted text-muted-foreground",
  planned: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  in_progress: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  testing: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  archived: "bg-muted text-muted-foreground",
};
