import { ThemeWrapper } from "@/components/theme-wrapper";
import { Nav } from "../components/nav";
import { HeroSection } from "../components/hero-section";
import { Footer } from "../components/footer";
import { AddCardsSection } from "@/components/features/add-cards-section";
import { PriceRulesSection } from "@/components/features/price-rules-section";
import { ImportSection } from "@/components/features/import-section";
import { PosSection } from "@/components/features/pos-section";
import { DashboardSection } from "@/components/features/dashboard-section";
import { GamesSection } from "@/components/features/games-section";
import { TimelineSection } from "@/components/timeline-section";
import { FAQSection } from "@/components/faq-section";
import { InstallRequestSection } from "@/components/install-request-section";
import { PricingSection } from "@/components/pricing-section";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Synq: TCG inventory and automated card pricing for Shopify",
  description:
    "Add or import your trading cards into Shopify and keep every price in step with TCGplayer market data using scheduled price rules. Magic, Pokémon, Lorcana, Yu-Gi-Oh!, One Piece and 14 more games.",
  alternates: {
    canonical: "https://synq.cards",
  },
  openGraph: {
    title: "Synq: TCG inventory and automated card pricing for Shopify",
    description:
      "Add or import your trading cards into Shopify and keep every price in step with TCGplayer market data using scheduled price rules.",
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
            <PriceRulesSection />
            <ImportSection />
            <DashboardSection />
            <PosSection />
          </section>

          {/* Supported games */}
          <GamesSection />

          {/* How it works */}
          <TimelineSection />

          {/* Pricing */}
          <PricingSection />

          {/* CTA */}
          <InstallRequestSection />


          {/* FAQ */}
          <FAQSection />
        </main>

        <Footer />
      </div>
    </ThemeWrapper>
  );
}
