import { ThemeWrapper } from "@/components/theme-wrapper";
import { Nav } from "../components/nav";
import { HeroSection } from "../components/hero-section";
import { Footer } from "../components/footer";
import { AddCardsSection } from "@/components/features/add-cards-section";
import { ConditionPricingSection } from "@/components/features/condition-pricing-section";
import { DashboardSection } from "@/components/features/dashboard-section";
import { GamesSection } from "@/components/features/games-section";
import { TimelineSection } from "@/components/timeline-section";
import { FAQSection } from "@/components/faq-section";
import { InstallRequestSection } from "@/components/install-request-section";
import { PricingSection } from "@/components/pricing-section";

import { Metadata } from "next";
import { FeedbackSection } from "@/components/feedback-section";

export const metadata: Metadata = {
  title: "Synq — Automated Card Pricing for Shopify",
  description:
    "Keep your Shopify card shop competitive with automated pricing. Synq syncs your card prices with TCGPlayer market data daily for Magic, Pokemon, Lorcana, Yu-Gi-Oh, One Piece and more.",
  alternates: {
    canonical: "https://synq.cards",
  },
  openGraph: {
    title: "Synq — Automated Card Pricing for Shopify",
    description:
      "Sync your card prices with TCGPlayer market data automatically. Supports Magic, Pokemon, Lorcana, Yu-Gi-Oh, One Piece, Flesh and Blood, Riftbound and more.",
    url: "https://synq.cards",
  },
};

export default function HomePage() {
  return (
    <ThemeWrapper>
      <div className="bg-background">
        <Nav />

        <main>
          {/* Hero — primary H1 */}
          <HeroSection />

          {/* Feature deep-dives */}
          <section id="features" aria-label="Features">
            <AddCardsSection />
            <ConditionPricingSection />
            <DashboardSection />
          </section>

          {/* Supported games */}
          <GamesSection />

          {/* How it works */}
          <TimelineSection />

          {/* Pricing */}
          <PricingSection />

          {/* CTA */}
          <InstallRequestSection />

          {/* <FeedbackSection /> */}

          {/* FAQ */}
          <FAQSection />
        </main>

        <Footer />
      </div>
    </ThemeWrapper>
  );
}
