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
import { PricingSection } from "@/components/pricing-section";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Synq - Keep Your Shopify Card Prices Synced with the Market",
  description:
    "Shopify app for trading card stores. Add Magic, Pokemon, and other cards to your store with images and market prices. Daily price sync from TCGPlayer and Cardmarket.",
  alternates: {
    canonical: "https://www.trysynq.com",
  },
};

export default function HomePage() {
  return (
    <div>
      <Nav />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Feature Deep-Dives */}
        <section id="features">
          <AddCardsSection />
          <PriceSyncSection />
          <ConditionPricingSection />
          <DashboardSection />
        </section>

        {/* Supported Games */}
        <GamesSection />

        {/* Timeline / Value Proposition */}
        <TimelineSection />

        {/* Pricing */}
        <section id="pricing">
          <PricingSection />
        </section>

        {/* FAQ */}
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
