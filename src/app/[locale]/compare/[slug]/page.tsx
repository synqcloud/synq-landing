import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import ComparePageView, { compareMetadata } from "@/components/compare/ComparePageView";
import { getComparePage, slugsUnder } from "@/content/compare";

/* English only: /compare/<slug> pages of the comparison cluster */
export const dynamicParams = false;

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return slugsUnder("/compare/").map((slug) => ({ locale: "en", slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getComparePage(`/compare/${slug}`);
  if (locale !== "en" || !page) return {};
  return compareMetadata(page);
}

export default async function ComparePage({ params }: Props) {
  const { locale, slug } = await params;
  const page = getComparePage(`/compare/${slug}`);
  if (locale !== "en" || !page) notFound();
  setRequestLocale(locale);
  return <ComparePageView page={page} />;
}
