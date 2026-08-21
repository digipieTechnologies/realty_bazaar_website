"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const consumerFaqs = [
  {
    question: "Do I need an account to search or browse properties?",
    answer:
      "No. You can freely browse, filter, and view all published properties across India on The Realty Bazaar without registering, creating an account, or logging in.",
  },
  {
    question: "Can I contact the listing broker directly?",
    answer:
      "Yes, absolutely. Every property listing page provides direct 'Call Broker' and 'WhatsApp Broker' buttons, allowing you to connect directly with the licensed real estate broker managing that property.",
  },
  {
    question: "Are properties listed by verified brokers?",
    answer:
      "Yes. Properties on The Realty Bazaar are listed directly by local real estate professionals who manage active inventory. Listings display the broker's agency name and verified status.",
  },
  {
    question: "Can I schedule a physical site visit before making a decision?",
    answer:
      "Yes. You can use the 'Schedule a Site Visit' button on any property page to request your preferred date and time. The broker will confirm the appointment directly with you.",
  },
  {
    question: "Do buyers pay any fees to browse The Realty Bazaar?",
    answer:
      "No. The Realty Bazaar is completely free for buyers and tenants discovering properties. Normal broker services and terms apply when completing a transaction through your broker.",
  },
  {
    question: "How can I report an incorrect or outdated property listing?",
    answer:
      "If a property is already sold or contains inaccurate details, please reach out through our Contact page or click 'Report Listing' on the property page. Our moderation team promptly reviews and updates listings.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E4EAF2] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-center justify-between gap-4 py-5 hover:text-[#397BCF] transition-colors cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-sm sm:text-base font-bold text-[#172033]">{question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-[#667085]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-[#667085] leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ConsumerFAQSection() {
  return (
    <section className="section-padding bg-white border-t border-[#E4EAF2]" aria-labelledby="consumer-faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF3FF] text-[#245FA8] border border-[#6FA5E5]/30 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#397BCF]" />
            Frequently Asked Questions
          </div>
          <h2
            id="consumer-faq-heading"
            className="text-2xl sm:text-4xl font-display font-bold text-[#172033] tracking-tight mb-3"
          >
            Got Questions About Finding a Property?
          </h2>
          <p className="text-sm sm:text-base text-[#667085]">
            Everything you need to know about searching, connecting with brokers, and scheduling site visits.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-[#F8FAFC] border border-[#E4EAF2] rounded-3xl p-6 sm:p-8 shadow-2xs">
            {consumerFaqs.map((faq) => (
              <FAQItem key={faq.question} {...faq} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
