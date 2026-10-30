import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { FeaturedPost, PostCard } from "@/components/blog/PostCard";
import CtaCard from "@/components/blog/CtaCard";
import { BlogListSchema } from "@/components/blog/BlogSchema";
import { OG_IMAGE, getAllPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import "@/components/blog/blog.css";

/* The blog is English only, as it was on the old site. */
export function generateStaticParams() {
  return [{ locale: "en" }];
}

const TITLE = "Blog - Synq | Card Shop Automation & Pricing Guides";
const DESCRIPTION =
  "Guides, tips, and strategies for running a successful card shop on Shopify. Learn about pricing automation, inventory management, and growing your TCG business.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return {};
  return {
    ...pageMetadata({
      locale,
      path: "/blog",
      title: TITLE,
      absoluteTitle: true,
      description: DESCRIPTION,
      /* the old site's share art, kept for the blog index */
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Synq Blog - Card Shop Automation & Pricing Guides" }],
    }),
    keywords:
      "card shop blog, Shopify card selling, TCG pricing guides, trading card automation, card shop tips",
  };
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  setRequestLocale(locale);

  const [featured, ...rest] = getAllPosts();

  return (
    <main className="relative bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <BlogListSchema posts={featured ? [featured, ...rest] : []} />
      <Navbar />

      <header className="w-full bg-[var(--color-ink)] text-white">
        <div className="mx-auto w-full max-w-[1240px] px-4 pb-36 pt-32 sm:px-6 lg:pb-44 lg:pt-40">
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.08em] text-white/50">Blog</p>
          <h1 className="mt-4 max-w-[18ch] text-[36px] font-[650] leading-[1.04] tracking-[-0.025em] [text-wrap:balance] sm:text-[48px] lg:text-[60px]">
            Running a card shop on Shopify
          </h1>
          <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.6] text-white/65 lg:text-[18px]">
            Pricing, listings and the daily work of a trading card store, from the team that builds Synq.
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1240px] px-4 pb-24 sm:px-6 lg:pb-32">
        {!featured ? (
          <p className="synq-card -mt-24 p-8 text-[15px] text-[var(--color-ink-2)]">No posts yet.</p>
        ) : (
          <>
            <div className="-mt-24 lg:-mt-32">
              <FeaturedPost post={featured} />
            </div>

            {rest.length > 0 && (
              <section aria-labelledby="all-posts" className="mt-16 lg:mt-24">
                <div className="flex items-baseline justify-between">
                  <h2 id="all-posts" className="text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[var(--color-ink-3)]">
                    More posts
                  </h2>
                  <p className="text-[13px] tabular-nums text-[var(--color-ink-3)]">
                    {rest.length + 1} posts
                  </p>
                </div>
                <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                  {rest.map((post) => (
                    <li key={post.slug}>
                      <PostCard post={post} headingLevel={3} />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="mt-16 lg:mt-24">
              <CtaCard />
            </div>
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
