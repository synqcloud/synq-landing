import { SITE, categoryLabel, postImageUrl, type BlogPost } from "@/lib/blog";

/* JSON-LD, ported from the old site: BlogPosting + BreadcrumbList (+ FAQPage
   when the post has questions) on a post, CollectionPage on the index. */

const LOGO = `${SITE}/brand/synq-icon.png`;

function Ld({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function BlogPostSchema({ post }: { post: BlogPost }) {
  const { frontmatter: fm, slug } = post;
  const url = `${SITE}/blog/${slug}`;

  const posting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: fm.title,
    description: fm.description,
    image: postImageUrl(post),
    datePublished: fm.date,
    dateModified: fm.updated ?? fm.date,
    author: {
      "@type": fm.author === "Synq Team" ? "Organization" : "Person",
      name: fm.author,
      ...(fm.authorTitle ? { jobTitle: fm.authorTitle } : {}),
      url: SITE,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Synq",
      logo: { "@type": "ImageObject", url: LOGO },
      url: SITE,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    keywords: fm.keywords,
    wordCount: post.words,
    articleSection: categoryLabel(fm.category),
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: fm.title, item: url },
    ],
  };

  const faq =
    fm.faq && fm.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: fm.faq.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: { "@type": "Answer", text: q.answer },
          })),
        }
      : null;

  return (
    <>
      <Ld data={posting} />
      <Ld data={breadcrumb} />
      {faq && <Ld data={faq} />}
    </>
  );
}

export function BlogListSchema({ posts }: { posts: BlogPost[] }) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Synq Blog - Card Shop Automation & Pricing Guides",
        description:
          "Guides, tips, and strategies for running a successful card shop on Shopify. Learn about pricing automation, inventory management, and growing your TCG business.",
        url: `${SITE}/blog`,
        isPartOf: { "@type": "WebSite", name: "Synq", url: SITE },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
          ],
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: posts.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE}/blog/${p.slug}`,
            name: p.frontmatter.title,
          })),
        },
      }}
    />
  );
}
