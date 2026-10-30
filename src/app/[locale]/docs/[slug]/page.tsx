import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { DOCS_SLUGS, docsNeighbours, isDocsSlug } from "@/lib/docs";
import Navbar from "@/components/landing/Navbar";
import DocsArticle from "@/components/landing/DocsArticle";
import Footer from "@/components/landing/Footer";
import { JsonLd } from "@/components/seo/ui";
import { bareTitle, docsArticleLocales, pageMetadata } from "@/lib/seo";
import { CONTENT_UPDATED, SITE_URL, absoluteUrl, localePath } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    DOCS_SLUGS.map((slug) => ({ locale, slug })),
  );
}

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale) || !isDocsSlug(slug)) return {};
  const t = await getTranslations({
    locale,
    namespace: `docs.articles.${slug}.meta`,
  });

  const translated = docsArticleLocales(slug);
  return pageMetadata({
    locale,
    path: `/docs/${slug}`,
    title: bareTitle(t.raw("title") as string),
    description: t.raw("description") as string,
    translated,
    type: "article",
    article: { modifiedTime: CONTENT_UPDATED, section: "Help center" },
    /* not translated into this language yet (it shows the English text):
       out of the index, canonical on the English article */
    noindex: !translated.includes(locale as never),
  });
}

export default async function DocsArticlePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale) || !isDocsSlug(slug)) notFound();
  setRequestLocale(locale);
  const { prev, next } = docsNeighbours(slug);

  const t = await getTranslations({ locale, namespace: "docs" });
  const own = docsArticleLocales(slug).includes(locale as never) ? locale : "en";
  const url = absoluteUrl(localePath(own, `/docs/${slug}`));
  const title = t.raw(`articles.${slug}.title`) as string;
  const category = t.raw(`categories.${t.raw(`articles.${slug}.category`) as string}.title`) as string;
  const helpCenter = bareTitle(t("meta.title"));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        headline: title,
        description: t.raw(`articles.${slug}.meta.description`) as string,
        url,
        mainEntityOfPage: url,
        inLanguage: own,
        dateModified: CONTENT_UPDATED,
        articleSection: category,
        image: `${SITE_URL}/opengraph-image`,
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: { "@id": `${SITE_URL}/#software` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Synq", item: absoluteUrl(localePath(own, "/")) },
          { "@type": "ListItem", position: 2, name: helpCenter, item: absoluteUrl(localePath(own, "/docs")) },
          { "@type": "ListItem", position: 3, name: title, item: url },
        ],
      },
    ],
  };

  return (
    <main className="relative bg-[var(--color-ink)] text-white">
      <JsonLd data={jsonLd} />
      <Navbar />
      <DocsArticle articleKey={slug} prev={prev} next={next} />
      <Footer />
    </main>
  );
}
