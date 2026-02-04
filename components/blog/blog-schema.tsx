import { BlogFrontmatter } from "@/lib/blog";

interface BlogSchemaProps {
  frontmatter: BlogFrontmatter;
  slug: string;
  readingTime: string;
}

export function BlogPostSchema({
  frontmatter,
  slug,
  readingTime,
}: BlogSchemaProps) {
  const baseUrl = "https://www.trysynq.com";
  const postUrl = `${baseUrl}/blog/${slug}`;

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.image
      ? `${baseUrl}${frontmatter.image}`
      : `${baseUrl}/brand/synq-eyecatcher-art.png`,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    author: {
      "@type": "Person",
      name: frontmatter.author,
      ...(frontmatter.authorTitle && { jobTitle: frontmatter.authorTitle }),
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Synq",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/brand/synq-icon.png`,
      },
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    url: postUrl,
    keywords: frontmatter.keywords,
    wordCount: parseInt(readingTime) * 250 || 2000,
    articleSection: frontmatter.category,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article h1", "article h2", "article p:first-of-type"],
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: frontmatter.title,
        item: postUrl,
      },
    ],
  };

  const schemas = [blogPosting, breadcrumb];

  if (frontmatter.faq && frontmatter.faq.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: frontmatter.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    } as any);
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export function BlogListSchema() {
  const baseUrl = "https://www.trysynq.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Synq Blog - Card Shop Automation & Pricing Guides",
    description:
      "Guides, tips, and strategies for running a successful card shop on Shopify. Learn about pricing automation, inventory management, and growing your TCG business.",
    url: `${baseUrl}/blog`,
    isPartOf: {
      "@type": "WebSite",
      name: "Synq",
      url: baseUrl,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${baseUrl}/blog`,
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
