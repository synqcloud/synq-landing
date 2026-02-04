import Link from "next/link";
import { BlogPost, CATEGORY_LABELS } from "@/lib/blog";

export function PostCard({ post }: { post: BlogPost }) {
  const { slug, frontmatter, readingTime } = post;
  const categoryLabel =
    CATEGORY_LABELS[frontmatter.category] || frontmatter.category;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group block rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-accent/30"
    >
      <div className="mb-3 flex items-center gap-3 text-sm text-muted-foreground">
        <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
          {categoryLabel}
        </span>
        <time dateTime={frontmatter.date}>
          {new Date(frontmatter.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span>{readingTime}</span>
      </div>
      <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
        {frontmatter.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {frontmatter.description}
      </p>
    </Link>
  );
}
