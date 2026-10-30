import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import ComparePageView, { compareMetadata } from "@/components/compare/ComparePageView";
import { HUB } from "@/content/compare";

/* English only: /compare, the hub of the comparison cluster */
export const dynamicParams = false;

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return {};
  return compareMetadata(HUB);
}

export default async function CompareHubPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  setRequestLocale(locale);
  return <ComparePageView page={HUB} />;
}
