import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/landing/Navbar";
import Landing from "@/components/landing/Landing";
import Footer from "@/components/landing/Footer";
import SiteSchema from "@/components/seo/SiteSchema";
import { HOME_LOCALES, pageMetadata } from "@/lib/seo";

/* English keeps the old home's ranking terms ("TCG inventory", "automated
   card pricing ... for Shopify") through the domain cutover; the other
   languages use their translated meta. */
const HOME_EN = {
  title: "Synq: TCG inventory and automated card pricing for Shopify",
  description:
    "Shopify app for trading card shops: add singles and sealed in a tap, keep prices in step with TCGplayer with automated price rules, and manage stock. 19 games.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  const en = locale === "en";

  return pageMetadata({
    locale,
    path: "/",
    title: en ? HOME_EN.title : t("title"),
    description: en ? HOME_EN.description : t("description"),
    translated: HOME_LOCALES,
    absoluteTitle: true,
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative bg-[var(--color-ink)] text-white">
      <SiteSchema locale={locale} />
      <Navbar />
      <Landing />
      <Footer />
    </main>
  );
}
