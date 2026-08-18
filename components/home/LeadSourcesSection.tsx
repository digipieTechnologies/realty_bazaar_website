"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const leadSources = [
  { label: "Instagram", color: "from-pink-500 to-purple-600", icon: "📱" },
  { label: "Facebook", color: "from-blue-600 to-blue-700", icon: "📘" },
  { label: "Meta Ads", color: "from-blue-500 to-cyan-500", icon: "🎯" },
  { label: "The Realty Bazaar", color: "from-[#f97316] to-[#ea6c00]", icon: "🏠" },
  { label: "Manual Entry", color: "from-[#1a2e48] to-[#0f1c2e]", icon: "✍️" },
];

const dealStages = [
  { label: "Follow-up", icon: "💬" },
  { label: "Site Visit", icon: "📅" },
  { label: "Deal", icon: "🏆" },
];

export default function LeadSourcesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="section-padding bg-[#fafafa]"
      aria-labelledby="lead-sources-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[#f97316] text-sm font-semibold uppercase tracking-wider mb-3">
            Lead Management
          </p>
          <h2
            id="lead-sources-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0f1c2e] mb-4"
          >
            One CRM. Every Lead.
          </h2>
          <p className="text-lg text-[#64748b] max-w-xl mx-auto">
            No matter where your lead comes from, it lands in your mobile CRM — automatically.
          </p>
        </ScrollReveal>

        <div ref={ref} className="flex flex-col items-center">
          {/* Lead sources */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full mb-6">
            {leadSources.map((source, i) => (
              <motion.div
                key={source.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${source.color} flex items-center justify-center text-xl shadow-md`}
                >
                  {source.icon}
                </div>
                <span className="text-xs font-semibold text-[#0f1c2e] text-center leading-tight">
                  {source.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Converging arrows */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col items-center gap-2 my-2"
          >
            <div className="w-0.5 h-8 bg-gradient-to-b from-[#e2e8f0] to-[#f97316]" />
            <ArrowDown className="w-5 h-5 text-[#f97316]" />
          </motion.div>

          {/* CRM hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-gradient-to-br from-[#0f1c2e] to-[#1a2e48] rounded-2xl px-8 py-5 text-white text-center shadow-xl mb-6 w-full sm:w-auto sm:min-w-[280px]"
          >
            <div className="w-12 h-12 rounded-xl bg-[#f97316] flex items-center justify-center mx-auto mb-3">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" aria-hidden="true">
                <path d="M3 12L12 3l9 9v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9z" opacity="0.4"/>
                <rect x="9" y="12" width="6" height="9" fill="white"/>
              </svg>
            </div>
            <div className="font-display font-bold text-lg">Broker CRM</div>
            <div className="text-white/60 text-sm">Mobile App</div>
            <div className="mt-3 flex justify-center gap-4">
              {[
                { value: "25", label: "Active" },
                { value: "6", label: "New" },
                { value: "3", label: "Visits" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-[#f97316] font-bold text-lg">{s.value}</div>
                  <div className="text-white/50 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Arrow down */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.0 }}
            className="flex flex-col items-center gap-2 my-2"
          >
            <div className="w-0.5 h-6 bg-[#f97316]" />
            <ArrowDown className="w-5 h-5 text-[#f97316]" />
          </motion.div>

          {/* Deal stages */}
          <div className="flex items-center gap-4">
            {dealStages.map((stage, i) => (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 1.1 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#e2e8f0] flex items-center justify-center text-lg shadow-sm">
                    {stage.icon}
                  </div>
                  <span className="text-xs font-semibold text-[#0f1c2e]">{stage.label}</span>
                </div>
                {i < dealStages.length - 1 && (
                  <div className="text-[#cbd5e1] font-bold text-lg mb-5">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
