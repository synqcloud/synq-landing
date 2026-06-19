import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service | Synq" },
  description:
    "The terms that govern your use of Synq, the Shopify trading card pricing and inventory app.",
  alternates: { canonical: "https://synq.cards/terms" },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
