import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import ComparePageView, { compareMetadata } from "@/components/compare/ComparePageView";
import { BEST_APPS } from "@/content/compare";

/* English only: the 2026 roundup */
export const dynamicParams = false;

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return {};
  return compareMetadata(BEST_APPS);
}

export default async function BestAppsPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  setRequestLocale(locale);
  return <ComparePageView page={BEST_APPS} />;
}
