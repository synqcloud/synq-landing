import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/landing/Navbar";
import LegalPage from "@/components/landing/LegalPage";
import Footer from "@/components/landing/Footer";
import { bareTitle, pageMetadata } from "@/lib/seo";

/* Legal texts are English only, at their English URL; the other languages'
   URLs 308 here (next.config.mjs). */
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "legal.notice.meta" });
  /* kept out of the index, as on the old site */
  return pageMetadata({
    locale,
    path: "/legal",
    title: bareTitle(t("title")),
    description: t("description"),
    noindex: true,
  });
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="relative bg-[var(--color-ink)] text-white">
      <Navbar />
      <LegalPage docKey="notice" />
      <Footer />
    </main>
  );
}
