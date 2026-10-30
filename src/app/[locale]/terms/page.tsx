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
  const t = await getTranslations({ locale, namespace: "legal.terms.meta" });
  return pageMetadata({
    locale,
    path: "/terms",
    title: bareTitle(t("title")),
    description: t("description"),
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="relative bg-[var(--color-ink)] text-white">
      <Navbar />
      <LegalPage docKey="terms" />
      <Footer />
    </main>
  );
}
