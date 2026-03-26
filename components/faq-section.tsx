"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ContactModal } from "./contact-modal";

const faqs = [
  {
    question: "Which trading card games are supported?",
    answer: "Magic: The Gathering, Disney Lorcana, and Riftbound are fully supported with live TCGPlayer pricing. Pokémon TCG is available in beta. Yu-Gi-Oh, Flesh and Blood, One Piece, Star Wars: Unlimited, and Digimon are coming soon — we prioritise by demand, so let us know what you need.",
  },
  {
    question: "How does automatic price syncing work?",
    answer: "Synq pulls the latest market prices from TCGPlayer every 24 hours. Your dashboard shows which listings have drifted from market — you can apply all updates with one click, or set them to update automatically.",
  },
  {
    question: "Can I use my own prices instead of market prices?",
    answer: "Yes — you're always in control. Set custom prices for any card, add a markup percentage (e.g. market + 15%), or define min/max price floors and ceilings to protect your margins.",
  },
  {
    question: "How does condition-based pricing work?",
    answer: "When you add a card, Synq creates a Shopify variant for each condition you stock (NM, LP, MP, HP, DMG), with price adjustments already applied based on market standards. All percentages are fully configurable.",
  },
  {
    question: "Will it affect my existing Shopify products?",
    answer: "Not at all. Synq only manages products you create through the app. Your current listings are completely untouched.",
  },
  {
    question: "How many cards can I manage?",
    answer: "Starter handles up to 2,000 cards, Pro up to 15,000, and Scale up to 50,000. All plans start with a 7-day free trial so you can see the value before you commit.",
  },
  {
    question: "Can I use it across multiple stores?",
    answer: "Yes — each Shopify store gets its own Synq installation with independent settings. Great if you run separate stores for different games or regions.",
  },
  {
    question: "What if I want to cancel?",
    answer: "Cancel any time from Shopify admin → Apps → Synq. Your products stay in Shopify; automatic syncing just stops. No cancellation fees, no awkward conversations.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-4 flex items-start justify-between text-left gap-6 group"
      >
        <span className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
          {question}
        </span>
        <ChevronDown className={`w-4 h-4 text-subtle flex-shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export function FAQSection() {
  const [contactOpen, setContactOpen] = useState(false);
  return (
    <section id="faq" className="py-20">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="inline-block text-xs font-semibold text-subtle uppercase tracking-widest mb-3">FAQ</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-[-0.02em]">Questions? We've got answers.</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="max-w-2xl border-t border-border"
        >
          {faqs.map((faq, i) => <FAQItem key={i} question={faq.question} answer={faq.answer} />)}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 p-5 bg-card rounded-xl border border-border max-w-2xl"
        >
          <p className="text-sm font-medium text-foreground mb-1">Still have questions?</p>
          <p className="text-sm text-muted-foreground">
            <button
              onClick={() => setContactOpen(true)}
              className="text-foreground underline underline-offset-2 hover:opacity-60 transition-opacity font-medium"
            >
              Get in touch
            </button>
            {" "}— we're happy to help you figure out if Synq is the right fit.
          </p>
        </motion.div>
      </div>
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </section>
  );
}
