"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircleQuestion } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Property, PropertyFAQ } from "@/types";

interface PropertyFAQSectionProps {
  faqs: PropertyFAQ[];
  property: Property;
}

function PropertyFAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#E4EAF2] last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left flex items-center justify-between gap-4 py-4 hover:text-[#397BCF] transition-colors cursor-pointer select-none group"
        aria-expanded={isOpen}
      >
        <span
          className={`text-xs sm:text-sm font-semibold transition-colors leading-snug ${isOpen ? "text-[#397BCF]" : "text-[#172033] group-hover:text-[#397BCF]"
            }`}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown
            className={`w-4 h-4 transition-colors ${isOpen ? "text-[#397BCF]" : "text-[#667085] group-hover:text-[#397BCF]"
              }`}
          />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-xs sm:text-sm text-[#667085] leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PropertyFAQSection({
  faqs,
  property,
}: PropertyFAQSectionProps) {
  // Only the first item open by default
  const [openIds, setOpenIds] = useState<string[]>(() =>
    faqs && faqs.length > 0 ? [faqs[0].id] : []
  );

  if (!faqs || faqs.length === 0) return null;

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    if (openIds.length === faqs.length) {
      setOpenIds([]);
    } else {
      setOpenIds(faqs.map((f) => f.id));
    }
  };

  // Split into 2 balanced columns for large screens
  const mid = Math.ceil(faqs.length / 2);
  const leftCol = faqs.slice(0, mid);
  const rightCol = faqs.slice(mid);

  return (
    <section
      className="mt-10 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E4EAF2] shadow-2xs space-y-6"
      aria-labelledby="property-faq-heading"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4EAF2] pb-5">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#EAF3FF] text-[#245FA8] border border-[#6FA5E5]/30 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3 h-3 text-[#397BCF]" />
            Frequently Asked Questions
          </div>
          <h2
            id="property-faq-heading"
            className="text-lg sm:text-xl font-display font-bold text-[#172033] tracking-tight"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[#667085] mt-1 leading-relaxed">
            Verified details regarding pricing, floor plan, possession, furnishing, and amenities for this {property.property_type} in {property.locality}, {property.city}.
          </p>
        </div>

        {faqs.length > 2 && (
          <button
            type="button"
            onClick={handleExpandAll}
            className="self-start sm:self-center px-3.5 py-1.5 bg-[#F8FAFC] hover:bg-[#F3F8FE] border border-[#E4EAF2] hover:border-[#397BCF]/30 rounded-lg text-xs font-bold text-[#397BCF] transition-all cursor-pointer shrink-0 shadow-2xs"
          >
            {openIds.length === faqs.length ? "Collapse All" : "Expand All"}
          </button>
        )}
      </div>

      {/* 2-Column Clean Divider Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-0 items-start">
        <div>
          {leftCol.map((faq) => (
            <PropertyFAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIds.includes(faq.id)}
              onToggle={() => toggleFAQ(faq.id)}
            />
          ))}
        </div>
        <div>
          {rightCol.map((faq) => (
            <PropertyFAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIds.includes(faq.id)}
              onToggle={() => toggleFAQ(faq.id)}
            />
          ))}
        </div>
      </div>

      {/* Helpful Broker Support Footer */}
      <div className="pt-3 border-t border-[#E4EAF2] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-[#667085]">
        <div className="flex items-center gap-2">
          <MessageCircleQuestion className="w-4 h-4 text-[#397BCF] shrink-0" />
          <span>Have a specific question not listed here?</span>
        </div>
        <a
          href="#enquiry-name"
          className="inline-flex items-center gap-1 font-bold text-[#397BCF] hover:text-[#245FA8] hover:underline"
        >
          Ask the listing broker directly →
        </a>
      </div>
    </section>
  );
}
