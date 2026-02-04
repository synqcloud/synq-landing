import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { getAllPosts, getPostBySlug, CATEGORY_LABELS } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/mdx-components";
import { BlogPostSchema } from "@/components/blog/blog-schema";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { AuthorBio } from "@/components/blog/author-bio";
import { FaqSection } from "@/components/blog/faq-section";
import { CtaBox } from "@/components/blog/cta-box";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { frontmatter } = post;
  const baseUrl = "https://www.trysynq.com";

  return {
    title: `${frontmatter.title} | Synq Blog`,
    description: frontmatter.description,
    keywords: frontmatter.keywords,
    authors: [{ name: frontmatter.author }],
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `${baseUrl}/blog/${slug}`,
      type: "article",
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
      siteName: "Synq",
      images: frontmatter.image
        ? [
            {
              url: `${baseUrl}${frontmatter.image}`,
              alt: frontmatter.imageAlt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.image ? [`${baseUrl}${frontmatter.image}`] : undefined,
    },
    alternates: {
      canonical: frontmatter.canonical || `${baseUrl}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content, readingTime } = post;
  const categoryLabel =
    CATEGORY_LABELS[frontmatter.category] || frontmatter.category;

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <BlogPostSchema
        frontmatter={frontmatter}
        slug={slug}
        readingTime={readingTime}
      />

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground truncate max-w-[200px]">
              {frontmatter.title}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_220px] gap-12">
          <div>
            {/* Post header */}
            <header className="mb-10">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
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
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                {frontmatter.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {frontmatter.description}
              </p>
            </header>

            {/* MDX content */}
            <article className="prose-custom">
              <MDXRemote
                source={content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
                  },
                }}
              />
            </article>

            {/* FAQ section */}
            {frontmatter.faq && frontmatter.faq.length > 0 && (
              <FaqSection items={frontmatter.faq} />
            )}

            {/* Bottom CTA */}
            <CtaBox />

            {/* Author bio */}
            <div className="mt-12">
              <AuthorBio
                name={frontmatter.author}
                title={frontmatter.authorTitle}
              />
            </div>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-16">
                <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground">
                  More from the blog
                </h2>
                <div className="grid gap-4">
                  {relatedPosts.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/blog/${rp.slug}`}
                      className="block rounded-lg border border-border p-4 transition-colors hover:border-primary/30 hover:bg-accent/30"
                    >
                      <p className="font-medium text-foreground">
                        {rp.frontmatter.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {rp.frontmatter.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Table of contents sidebar */}
          <TableOfContents />
        </div>
      </main>
    </>
  );
}
