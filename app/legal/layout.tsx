import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Legal Notice | Synq" },
  description: "Who operates Synq, the Shopify trading card pricing and inventory app.",
  alternates: { canonical: "https://synq.cards/legal" },
  robots: { index: false },
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
