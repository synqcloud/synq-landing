import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, BookOpen } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import {
  getAllDocs,
  getDocBySlug,
  groupDocsByCategory,
} from "@/lib/docs";
import { docsMdxComponents } from "@/components/help/mdx-components";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) return {};

  const seoTitle = doc.frontmatter.seoTitle;

  return {
    title: {
      absolute: seoTitle ? `${seoTitle} | Synq Help Center` : "Synq Help Center",
    },
    description: doc.frontmatter.description,
    keywords: doc.frontmatter.keywords,
    alternates: { canonical: `https://synq.cards/help/${slug}` },
    openGraph: {
      title: seoTitle ?? "Synq Help Center",
      description: doc.frontmatter.description,
      url: `https://synq.cards/help/${slug}`,
      siteName: "Synq",
      type: "article",
    },
    twitter: {
      card: "summary",
      title: seoTitle ?? "Synq Help Center",
      description: doc.frontmatter.description,
    },
  };
}

export default async function SupportArticlePage({ params }: Props) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) notFound();

  const allDocs = getAllDocs();
  const grouped = groupDocsByCategory(allDocs);
  const categoryDocs = grouped[doc.frontmatter.category] ?? [];
  const relatedDocs = categoryDocs.filter((d) => d.slug !== slug);

  const seoTitle = doc.frontmatter.seoTitle;
  const articleUrl = `https://synq.cards/help/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://synq.cards" },
          { "@type": "ListItem", position: 2, name: "Help Center", item: "https://synq.cards/help" },
          { "@type": "ListItem", position: 3, name: doc.frontmatter.category, item: `https://synq.cards/help#${doc.frontmatter.category.toLowerCase().replace(/\s+/g, "-")}` },
          { "@type": "ListItem", position: 4, name: doc.frontmatter.title, item: articleUrl },
        ],
      },
      {
        "@type": "Article",
        "@id": articleUrl,
        headline: seoTitle ?? doc.frontmatter.title,
        description: doc.frontmatter.description,
        url: articleUrl,
        publisher: {
          "@type": "Organization",
          name: "Synq",
          url: "https://synq.cards",
        },
        isPartOf: {
          "@type": "WebPage",
          "@id": "https://synq.cards/help",
          name: "Synq Help Center",
          url: "https://synq.cards/help",
        },
        keywords: doc.frontmatter.keywords?.join(", "),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-muted">
        <div className="max-w-5xl mx-auto px-6 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-5">
            <Link href="/help" className="hover:text-primary transition-colors">
              Help Center
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-muted-foreground">
              {doc.frontmatter.category}
            </span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-foreground">{doc.frontmatter.title}</span>
          </nav>

          <div className="flex gap-8 items-start">
            {/* Main article */}
            <div className="flex-1 min-w-0 bg-card rounded border border-border p-8">
              <h1 className="text-2xl font-bold text-primary mb-6">
                {doc.frontmatter.title}
              </h1>

              <hr className="border-border mb-6" />

              <article className="docs-prose">
                <MDXRemote
                  source={doc.content}
                  components={docsMdxComponents}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
                    },
                  }}
                />
              </article>
            </div>

            {/* Sidebar */}
            {relatedDocs.length > 0 && (
              <aside className="w-56 shrink-0 hidden lg:block">
                <div className="bg-card rounded border border-border p-5">
                  <h2 className="font-semibold text-foreground text-sm mb-4">
                    {doc.frontmatter.category}
                  </h2>
                  <ul className="space-y-3">
                    {relatedDocs.map((d) => (
                      <li key={d.slug} className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                        <Link
                          href={`/help/${d.slug}`}
                          className="text-sm text-foreground hover:text-primary transition-colors leading-snug"
                        >
                          {d.frontmatter.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
