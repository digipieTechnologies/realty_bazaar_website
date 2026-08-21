"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Smartphone, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ListPropertyModal from "@/components/ui/ListPropertyModal";

export default function FinalCTA() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[#397BCF] text-white" aria-labelledby="final-cta-heading">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#245FA8] opacity-50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold uppercase tracking-wider mb-4">
            Start Your Property Discovery
          </span>

          <h2
            id="final-cta-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold !text-white leading-[1.15] mb-6"
          >
            Your next property could be <br className="hidden sm:inline" />
            closer than you think.
          </h2>

          <p className="text-base sm:text-lg text-[#EAF3FF]/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            Search verified apartments, independent villas, commercial spaces, and residential plots from top local brokers across India.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/properties"
              id="final-cta-browse-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-[#F3F8FE] text-[#245FA8] font-bold rounded-2xl text-sm sm:text-base transition-all duration-200 shadow-xl hover:shadow-2xl active:scale-[0.98]"
            >
              <Search className="w-4 h-4" />
              Browse Properties
            </Link>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              id="final-cta-broker-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/40 hover:border-white text-white font-bold rounded-2xl text-sm sm:text-base transition-all duration-200 hover:bg-white/10 active:scale-[0.98] cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              Are you a broker? Join The Realty Bazaar
            </button>
          </div>
        </ScrollReveal>
      </div>

      <ListPropertyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
