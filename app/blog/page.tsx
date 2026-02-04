import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";
import { BlogListSchema } from "@/components/blog/blog-schema";

export const metadata: Metadata = {
  title: "Blog - Synq | Card Shop Automation & Pricing Guides",
  description:
    "Guides, tips, and strategies for running a successful card shop on Shopify. Learn about pricing automation, inventory management, and growing your TCG business.",
  keywords:
    "card shop blog, Shopify card selling, TCG pricing guides, trading card automation, card shop tips",
  openGraph: {
    title: "Synq Blog - Card Shop Automation & Pricing Guides",
    description:
      "Guides, tips, and strategies for running a successful card shop on Shopify.",
    url: "https://www.trysynq.com/blog",
    type: "website",
    siteName: "Synq",
  },
  alternates: {
    canonical: "https://www.trysynq.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <BlogListSchema />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground">
            Guides, tips, and strategies for running a successful card shop on
            Shopify.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Check back soon.</p>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
