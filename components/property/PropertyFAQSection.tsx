"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircleQuestion } from "lucide-react";
import type { Property, PropertyFAQ } from "@/types";

interface PropertyFAQSectionProps {
  faqs: PropertyFAQ[];
  property: Property;
}

function PropertyFAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: PropertyFAQ;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div
      className={`border rounded-xl transition-all duration-200 overflow-hidden ${isOpen
        ? "border-[#397BCF]/40 bg-[#F8FAFC] shadow-2xs"
        : "border-[#E4EAF2] bg-white hover:border-[#CBD5E1]"
        }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
        className="w-full px-4 py-3 sm:px-5 sm:py-3.5 text-left flex items-center justify-between gap-3.5 cursor-pointer select-none"
      >
        <span className="font-display font-semibold text-xs sm:text-sm text-[#172033] leading-snug">
          {faq.question}
        </span>
        <div
          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen
            ? "bg-[#397BCF] text-white rotate-180"
            : "bg-[#F3F8FE] text-[#245FA8]"
            }`}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </button>

      {isOpen && (
        <div
          id={`faq-answer-${index}`}
          role="region"
          aria-labelledby={`faq-question-${index}`}
          className="px-4 pb-3.5 sm:px-5 pt-1 text-xs text-[#475467] leading-relaxed border-t border-[#E4EAF2]/60"
        >
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function PropertyFAQSection({
  faqs,
  property,
}: PropertyFAQSectionProps) {
  // If no FAQs for this property, do not render empty section
  if (!faqs || faqs.length === 0) return null;

  // First 2 FAQs open by default for immediate reading & indexability
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]);

  const toggleFAQ = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleExpandAll = () => {
    if (openIndices.length === faqs.length) {
      setOpenIndices([]);
    } else {
      setOpenIndices(faqs.map((_, i) => i));
    }
  };

  return (
    <section
      className="mt-10 bg-white rounded-3xl p-5 sm:p-7 lg:p-8 border border-[#E4EAF2] shadow-2xs space-y-6"
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
            {openIndices.length === faqs.length ? "Collapse All" : "Expand All"}
          </button>
        )}
      </div>

      {/* 2-Column Balanced FAQ Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-3.5 items-start">
        {faqs.map((faq, index) => (
          <PropertyFAQItem
            key={faq.id || index}
            faq={faq}
            index={index}
            isOpen={openIndices.includes(index)}
            onToggle={() => toggleFAQ(index)}
          />
        ))}
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
