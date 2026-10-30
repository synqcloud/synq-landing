import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import GuidePageView, { guideMetadata } from "@/components/guides/GuidePageView";
import { getGuidePage } from "@/content/guides";

/* English only: TCGplayer prices in Shopify */
export const dynamicParams = false;

type Props = { params: Promise<{ locale: string }> };

const PATH = "/integrations/tcgplayer";

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = getGuidePage(PATH);
  if (locale !== "en" || !page) return {};
  return guideMetadata(page);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const page = getGuidePage(PATH);
  if (locale !== "en" || !page) notFound();
  setRequestLocale(locale);
  return <GuidePageView page={page} />;
}
