import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";

const URL = "https://synq.cards/contact";

export const metadata: Metadata = {
  title: { absolute: "Contact Synq: support for trading card pricing on Shopify" },
  description:
    "Questions about Synq or need help with the app? Send us a message and we'll reply by email, usually within one business day.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Contact Synq",
    description: "Get help with Synq, the Shopify app for trading card pricing.",
    url: URL,
    siteName: "Synq",
    type: "website",
    images: ["/brand/synq-eyecatcher-art.png"],
  },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="pt-20">
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-6">
            <span className="inline-block text-xs font-semibold text-subtle uppercase tracking-widest mb-3">Contact</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-[-0.02em] mb-3">
              How can we help?
            </h1>
            <p className="text-sm text-muted-foreground leading-7 mb-8">
              Questions before installing, help with the app, a bug or an idea: send it here and
              you&apos;ll get a reply by email, usually within one business day.
            </p>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
