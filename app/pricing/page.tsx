import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PricingSection } from "@/components/pricing-section";

export const metadata: Metadata = {
  title: "Pricing - Synq | Card Shop Pricing Plans",
  description:
    "Simple, transparent pricing for Synq. Start with a 7-day free trial on any plan.",
  alternates: {
    canonical: "https://synq.cards/pricing",
  },
  openGraph: {
    title: "Pricing - Synq",
    description:
      "Simple, transparent pricing for Synq. Start with a 7-day free trial on any plan.",
    url: "https://synq.cards/pricing",
    images: ["/brand/synq-eyecatcher-art.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing - Synq",
    description:
      "Simple, transparent pricing for Synq. Start with a 7-day free trial on any plan.",
    images: ["/brand/synq-eyecatcher-art.png"],
  },
};

export default function PricingPage() {
  return (
    <div>
      <Nav />
      <main className="pt-20">
        <h1 className="sr-only">Synq pricing plans</h1>
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
