import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PostCover from "@/components/blog/PostCover";
import { PostCard } from "@/components/blog/PostCard";
import PostFaq from "@/components/blog/PostFaq";
import CtaCard from "@/components/blog/CtaCard";
import Toc from "@/components/blog/Toc";
import { renderPost } from "@/components/blog/PostBody";
import { BlogPostSchema } from "@/components/blog/BlogSchema";
import { pageMetadata } from "@/lib/seo";
import {
  categoryLabel,
  formatDate,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  postImageUrl,
} from "@/lib/blog";
import "@/components/blog/blog.css";

/* only the posts that exist; any other slug is a plain 404 */
export const dynamicParams = false;

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ locale: "en", slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== "en") return {};
  const post = getPostBySlug(slug);
  if (!post) return {};
  const fm = post.frontmatter;
  const meta = pageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: `${fm.title} | Synq Blog`,
    absoluteTitle: true,
    description: fm.description,
    type: "article",
    images: [{ url: postImageUrl(post), width: 1200, height: 630, alt: fm.imageAlt || fm.title }],
    article: {
      publishedTime: fm.date,
      modifiedTime: fm.updated ?? fm.date,
      authors: [fm.author],
      section: categoryLabel(fm.category),
      tags: fm.tags,
    },
  });

  return {
    ...meta,
    keywords: fm.keywords,
    authors: [{ name: fm.author }],
    /* a post may name another canonical (syndicated copies) */
    ...(fm.canonical ? { alternates: { canonical: fm.canonical } } : {}),
  };
}

/* the article column and its two margins: TOC on the right from lg,
   the column centred between equal margins from xl */
const GRID =
  "lg:grid lg:grid-cols-[minmax(0,700px)_200px] lg:justify-center lg:gap-16 xl:grid-cols-[200px_minmax(0,700px)_200px]";
const COL = "lg:col-start-1 xl:col-start-2";

export default async function BlogPostPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (locale !== "en") notFound();
  setRequestLocale(locale);

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const fm = post.frontmatter;
  const { content, toc } = await renderPost(post.content);
  const tocItems = [
    ...toc.filter((t) => t.level === 2),
    ...(fm.faq?.length ? [{ id: "faq", text: "Frequently asked questions", level: 2 as const }] : []),
  ];
  const related = getRelatedPosts(slug, 3);

  return (
    <main className="relative bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <BlogPostSchema post={post} />
      <Navbar />

      <header className="w-full bg-[var(--color-ink)] text-white">
        <div className={`mx-auto w-full max-w-[1240px] px-4 pb-28 pt-28 sm:px-6 sm:pb-36 lg:pt-36 ${GRID}`}>
          <div className={COL}>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-[13px] text-white/55">
                <li>
                  <a href="/blog" className="rounded transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                    Blog
                  </a>
                </li>
                <li aria-hidden="true" className="text-white/30">/</li>
                <li className="text-white/80">{categoryLabel(fm.category)}</li>
              </ol>
            </nav>
            <h1 className="mt-5 text-[34px] font-[650] leading-[1.08] tracking-[-0.025em] [text-wrap:balance] sm:text-[44px] lg:text-[52px]">
              {fm.title}
            </h1>
            <p className="mt-5 text-[17px] leading-[1.6] text-white/65 lg:text-[19px]">{fm.description}</p>
            <p className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13.5px] tabular-nums text-white/55">
              <span className="font-semibold text-white/85">{fm.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={fm.date}>{formatDate(fm.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime}</span>
              {fm.updated && fm.updated !== fm.date && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Updated <time dateTime={fm.updated}>{formatDate(fm.updated)}</time>
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </header>

      <div className={`mx-auto w-full max-w-[1240px] px-4 sm:px-6 ${GRID}`}>
        <div className={`${COL} lg:row-start-1`}>
          <div className="-mt-16 sm:-mt-24">
            <div className="synq-card p-2">
              <PostCover slug={slug} size="hero" priority />
            </div>
          </div>

          <article className="blog-prose mt-12 lg:mt-16">{content}</article>

          <div className="mt-16 flex flex-col gap-16">
            <PostFaq items={fm.faq} />

            <div className="flex items-center gap-4 border-t border-black/[0.08] pt-8">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[var(--color-ink)]">
                <img src="/synq-icon.png" alt="" width={20} height={20} className="h-5 w-5 object-contain" style={{ filter: "brightness(0) invert(1)" }} />
              </span>
              <p className="flex flex-col leading-[1.4]">
                <span className="text-[15px] font-[650]">{fm.author}</span>
                <span className="text-[14px] text-[var(--color-ink-2)]">
                  {fm.authorTitle || "The people who build Synq for card shops on Shopify"}
                </span>
              </p>
            </div>

            <CtaCard />
          </div>
        </div>

        {tocItems.length > 1 && (
          <aside className="hidden lg:col-start-2 lg:row-start-1 lg:block xl:col-start-3">
            <div className="sticky top-28 pt-16">
              <Toc items={tocItems} />
            </div>
          </aside>
        )}
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="mx-auto w-full max-w-[1240px] px-4 pb-24 pt-24 sm:px-6 lg:pb-32 lg:pt-32">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="related" className="text-[26px] font-[650] tracking-[-0.02em] lg:text-[32px]">
              More from the blog
            </h2>
            <a href="/blog" className="text-[14px] font-semibold text-[var(--color-ink)] underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-[var(--color-ink)]">
              All posts
            </a>
          </div>
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
            {related.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} headingLevel={3} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <Footer />
    </main>
  );
}
