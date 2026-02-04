import { Nav } from "../components/nav";
import { HeroSection } from "../components/hero-section";
import { Footer } from "../components/footer";
import { AddCardsSection } from "@/components/features/add-cards-section";
import { PriceSyncSection } from "@/components/features/price-sync-section";
import { ConditionPricingSection } from "@/components/features/condition-pricing-section";
import { DashboardSection } from "@/components/features/dashboard-section";
import { GamesSection } from "@/components/features/games-section";
import { TimelineSection } from "@/components/timeline-section";
import { FAQSection } from "@/components/faq-section";
import { InstallRequestSection } from "@/components/install-request-section";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Synq - Automated Card Pricing for Shopify | TCGPlayer & Cardmarket Sync",
  description:
    "Keep your Shopify card shop competitive with automated pricing. Synq syncs your card prices with market data daily. TCGPlayer, Cardmarket, and more. For Magic, Pokemon, Yu-Gi-Oh.",
  alternates: {
    canonical: "https://www.trysynq.com",
  },
  openGraph: {
    title: "Synq - Automated Card Pricing for Shopify",
    description:
      "Sync your card prices with market data automatically. TCGPlayer, Cardmarket, and more. Add cards in one click.",
    url: "https://www.trysynq.com",
  },
};

export default function HomePage() {
  return (
    <div>
      <Nav />

      <main>
        {/* Hero Section - Contains primary H1 */}
        <HeroSection />

        {/* Feature Deep-Dives */}
        <section id="features" aria-label="Features">
          <AddCardsSection />
          <PriceSyncSection />
          <ConditionPricingSection />
          <DashboardSection />
        </section>

        {/* Supported Games */}
        <GamesSection />

        {/* Timeline / Value Proposition */}
        <TimelineSection />

        {/* Install Request Form */}
        <InstallRequestSection />

        {/* FAQ - Important for AI/LLM SEO */}
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
