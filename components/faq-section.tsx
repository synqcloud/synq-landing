"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ContactModal } from "./contact-modal";
import { faqs } from "@/lib/faqs";

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
