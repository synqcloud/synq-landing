import { Nav } from "../components/nav";
import { StoryContent } from "../components/story-content";
import { Showcase } from "../components/showcase";
import { ContactSection } from "../components/contact-section";
import { HeroSection } from "../components/hero-section";
import { Footer } from "../components/footer";
import { EarlyAccessSection } from "@/components/early-access-section";

import { Metadata } from "next";
import { SchemaMarkup } from "@/components/schema-markup";

export const metadata: Metadata = {
  title:
    "Synq - Keep Your Shopify TCG Prices Synced with TCGPlayer",
  description:
    "Shopify app for TCG sellers. Add Pokemon, Magic, and other trading cards to your store with one click. Daily price sync from TCGPlayer. Update prices instantly.",
  alternates: {
    canonical: "https://www.trysynq.com",
  },
};

export default function HomePage() {
  return (
    <>
      {/*<SchemaMarkup />*/}
      <div>
        <Nav />

        {/* Hero Section */}
        <main>
          <HeroSection />

          {/* Showcase Section */}
          <section id="features" className="py-24">
            <Showcase />
          </section>

          {/* Learn More Section */}
          <section id="about-us" className="py-24 bg-muted/30">
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-2xl sm:text-3xl font-medium text-foreground mb-8">
                Why we're building this
              </h2>
              <StoryContent />
            </div>
          </section>

          {/* Pricing / Install Section */}
          <section id="install" className="py-24 bg-muted/30">
            <EarlyAccessSection />
          </section>

          {/* Contact Form Section - Last */}
          <section id="contact" className="py-24 bg-muted/30">
            <ContactSection />
          </section>
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
