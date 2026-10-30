import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import GuidePageView, { guideMetadata } from "@/components/guides/GuidePageView";
import { getGuidePage, slugsUnder } from "@/content/guides";

/* English only: one guide */
export const dynamicParams = false;

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return slugsUnder("/guides/").map((slug) => ({ locale: "en", slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getGuidePage(`/guides/${slug}`);
  if (locale !== "en" || !page) return {};
  return guideMetadata(page);
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const page = getGuidePage(`/guides/${slug}`);
  if (locale !== "en" || !page) notFound();
  setRequestLocale(locale);
  return <GuidePageView page={page} />;
}
