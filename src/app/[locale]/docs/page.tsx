import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/landing/Navbar";
import DocsPortal from "@/components/landing/DocsPortal";
import Footer from "@/components/landing/Footer";
import { JsonLd } from "@/components/seo/ui";
import { DOCS_SLUGS } from "@/lib/docs";
import { bareTitle, docsArticleLocales, docsIndexLocales, pageMetadata, type Locale } from "@/lib/seo";
import { absoluteUrl, localePath } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "docs.meta" });
  const translated = docsIndexLocales();
  return pageMetadata({
    locale,
    path: "/docs",
    title: bareTitle(t("title")),
    description: t("description"),
    translated,
    /* a locale whose help center isn't translated yet shows the English
       guides: keep it out of the index, point it at the English page */
    noindex: !translated.includes(locale as never),
  });
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "docs" });
  const url = absoluteUrl(localePath(locale, "/docs"));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    url,
    name: bareTitle(t("meta.title")),
    description: t("meta.description"),
    inLanguage: locale,
    isPartOf: { "@id": `${absoluteUrl("/")}/#website` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Synq", item: absoluteUrl(localePath(locale, "/")) },
        { "@type": "ListItem", position: 2, name: bareTitle(t("meta.title")), item: url },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: DOCS_SLUGS.map((slug, i) => ({
        "@type": "ListItem",
        position: i + 1,
        /* an article not translated yet lives at its English URL (the
           localized one is noindex, canonical to English) */
        url: absoluteUrl(
          localePath(docsArticleLocales(slug).includes(locale as Locale) ? locale : "en", `/docs/${slug}`),
        ),
        name: t.raw(`articles.${slug}.title`) as string,
      })),
    },
  };

  return (
    <main className="relative bg-[var(--color-ink)] text-white">
      <JsonLd data={jsonLd} />
      <Navbar />
      <DocsPortal />
      <Footer />
    </main>
  );
}
