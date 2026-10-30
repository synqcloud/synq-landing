import Link from "next/link";
import PostCover from "./PostCover";
import { categoryLabel, formatDate, type BlogPost } from "@/lib/blog";

export function PostMeta({ post, className = "" }: { post: BlogPost; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] tabular-nums ${className}`}>
      <time dateTime={post.frontmatter.date}>{formatDate(post.frontmatter.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readingTime}</span>
    </p>
  );
}

function Category({ post }: { post: BlogPost }) {
  return (
    <p className="text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[var(--color-ink-3)]">
      {categoryLabel(post.frontmatter.category)}
    </p>
  );
}

/* the newest post, wide: cover on one side, the story on the other */
export function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="blog-card synq-card synq-card-hover group grid overflow-hidden lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
    >
      <div className="p-2 lg:p-2.5">
        <PostCover slug={post.slug} size="featured" priority />
      </div>
      <div className="flex flex-col p-6 pt-4 lg:p-10 lg:pl-6">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[var(--color-ink)] px-2 py-[3px] text-[10.5px] font-bold uppercase tracking-[0.06em] text-white">
            Latest
          </span>
          <Category post={post} />
        </div>
        <h2 className="mt-4 text-[26px] font-[650] leading-[1.12] tracking-[-0.02em] text-[var(--color-ink)] [text-wrap:balance] lg:text-[34px]">
          {post.frontmatter.title}
        </h2>
        <p className="mt-4 text-[15.5px] leading-[1.6] text-[var(--color-ink-2)] lg:text-[16.5px]">
          {post.frontmatter.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-8">
          <PostMeta post={post} className="text-[var(--color-ink-2)]" />
          <Arrow />
        </div>
      </div>
    </Link>
  );
}

export function PostCard({ post, headingLevel = 2 }: { post: BlogPost; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="blog-card synq-card synq-card-hover group flex h-full flex-col overflow-hidden"
    >
      <div className="p-2">
        <PostCover slug={post.slug} />
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-3 lg:px-6 lg:pb-6">
        <Category post={post} />
        <H className="mt-2 text-[19px] font-[650] leading-[1.25] tracking-[-0.015em] text-[var(--color-ink)] [text-wrap:balance] lg:text-[21px]">
          {post.frontmatter.title}
        </H>
        <p className="mt-2.5 line-clamp-2 text-[14.5px] leading-[1.55] text-[var(--color-ink-2)]">
          {post.frontmatter.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <PostMeta post={post} className="text-[var(--color-ink-3)]" />
          <Arrow />
        </div>
      </div>
    </Link>
  );
}

function Arrow() {
  return (
    <span className="arrow-disc" aria-hidden="true">
      <span className="arrow-track">
        <span>→</span>
        <span>→</span>
      </span>
    </span>
  );
}
