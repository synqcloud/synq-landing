const FIDER_URL = "https://synq.fider.io";

export type FiderStatus =
  | "open"
  | "planned"
  | "started"
  | "completed"
  | "declined"
  | "duplicate";

export interface FiderPost {
  id: number;
  number: number;
  title: string;
  slug: string;
  description: string;
  createdAt: string;
  votesCount: number;
  commentsCount: number;
  status: FiderStatus;
  user: { id: number; name: string; role: string };
  tags: string[];
}

export interface FiderTag {
  id: number;
  name: string;
  slug: string;
  color: string;
  isPublic: boolean;
}

export async function getFiderTags(): Promise<FiderTag[]> {
  try {
    const res = await fetch(`${FIDER_URL}/api/v1/tags`, {
      headers: { Authorization: `Bearer ${process.env.FIDER_API_KEY}` },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data.filter((t: FiderTag) => t.isPublic) : [];
  } catch {
    return [];
  }
}

export type FiderView =
  | "trending"
  | "recent"
  | "most-wanted"
  | "planned"
  | "started"
  | "completed";

export async function getFiderPosts(
  view: FiderView = "trending",
  limit = 10
): Promise<FiderPost[]> {
  try {
    const res = await fetch(
      `${FIDER_URL}/api/v1/posts?view=${view}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FIDER_API_KEY}`,
        },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function fiderPostUrl(post: FiderPost) {
  return `${FIDER_URL}/posts/${post.number}/${post.slug}`;
}

export const STATUS_LABEL: Record<FiderStatus, string> = {
  open: "Open",
  planned: "Planned",
  started: "In Progress",
  completed: "Completed",
  declined: "Declined",
  duplicate: "Duplicate",
};

export const STATUS_CLASS: Record<FiderStatus, string> = {
  open: "bg-muted text-muted-foreground",
  planned: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  started: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  declined: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  duplicate: "bg-muted text-muted-foreground",
};
