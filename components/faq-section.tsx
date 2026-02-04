"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ContactModal } from "./contact-modal";

const faqs = [
  {
    question: "What trading card games are supported?",
    answer:
      "Currently, Synq fully supports Magic: The Gathering with price data from TCGPlayer (US) and Cardmarket (EU). Pokemon, Yu-Gi-Oh, and other games are coming soon based on user demand.",
  },
  {
    question: "How does price syncing work?",
    answer:
      "Synq pulls the latest market prices every 24 hours from TCGPlayer (US region) or Cardmarket (EU region). You choose your region during setup. When prices change, you'll see which products need updates on your dashboard and can apply new prices with one click.",
  },
  {
    question: "Can I set my own prices instead of using market prices?",
    answer:
      "Yes. You can set custom prices for any card at any time. You can also configure a markup percentage (e.g., market price + 10%) or set minimum and maximum price limits to protect your margins.",
  },
  {
    question: "How do condition-based prices work?",
    answer:
      "When you add a card, Synq creates a Shopify variant for each condition you select (NM, LP, MP, HP, DMG). Each condition has a price adjustment based on market standards (e.g., LP is typically 10% below NM). You can customize these percentages in settings.",
  },
  {
    question: "What happens to my existing Shopify products?",
    answer:
      "Synq only manages products you create through the app. Your existing products are not affected. If you want Synq to manage an existing product, you would need to recreate it through the app.",
  },
  {
    question: "Can I use Synq with multiple Shopify stores?",
    answer:
      "Each Shopify store needs its own Synq installation. You can install Synq on multiple stores, and each store can have its own settings (different regions, templates, pricing strategies).",
  },
  {
    question: "Is there a limit to how many cards I can add?",
    answer:
      "It depends on your plan. Starter supports up to 100 cards, Pro up to 500, and Business gives you unlimited cards. All plans include a free trial so you can try before you commit.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel anytime from your Shopify admin under Apps > Synq. Your products remain in Shopify, but price syncing will stop. There are no cancellation fees.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-start justify-between text-left"
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-5">
          <p className="text-muted-foreground text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export function FAQSection() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section id="faq" className="py-24">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-medium text-foreground mb-4">
            Frequently asked questions
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl">
            Everything you need to know about using Synq for your Shopify card store.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl"
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 p-6 bg-muted/30 rounded-lg border border-border max-w-3xl"
        >
          <p className="text-foreground mb-2">Still have questions?</p>
          <p className="text-sm text-muted-foreground">
            <button
              onClick={() => setContactOpen(true)}
              className="text-primary hover:underline"
            >
              Get in touch
            </button>{" "}
            and we'll help you figure out if Synq is right for your store.
          </p>
        </motion.div>
      </div>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </section>
  );
}
