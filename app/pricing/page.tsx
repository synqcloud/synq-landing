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
  },
};

export default function PricingPage() {
  return (
    <div>
      <Nav />
      <main className="pt-20">
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
