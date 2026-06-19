import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Synq" },
  description:
    "How Synq collects, uses, and protects data for its Shopify trading card pricing app.",
  alternates: { canonical: "https://synq.cards/privacy" },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
