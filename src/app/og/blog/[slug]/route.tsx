import { notFound } from "next/navigation";
import { renderOg } from "@/lib/og";
import { categoryLabel, getAllPosts, getPostBySlug } from "@/lib/blog";

/* /og/blog/<slug>: a post's share image, its title on the brand ground */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return renderOg({
    eyebrow: `Blog · ${categoryLabel(post.frontmatter.category)}`,
    title: post.frontmatter.title,
  });
}
