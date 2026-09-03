"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Image from "next/image";

const leadSources = [
  { label: "Instagram", color: "from-pink-500 to-purple-600", icon: "/images/social/instagram-icon.png", type: "image" },
  { label: "Facebook", color: "from-blue-600 to-blue-700", icon: "/images/social/facebook-icon.png", type: "image" },
  { label: "Meta Ads", color: "from-blue-500 to-cyan-500", icon: "🎯", type: "emoji" },
  { label: "The Realty Bazaar", color: "from-[#397BCF] to-[#245FA8]", icon: "/images/branding/logo-icon.png", type: "brand" },
  { label: "Manual Entry", color: "from-[#1e2d47] to-[#172033]", icon: "✍️", type: "emoji" },
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
      className="section-padding bg-[#F8FAFC]"
      aria-labelledby="lead-sources-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[#397BCF] text-sm font-semibold uppercase tracking-wider mb-3">
            Lead Management
          </p>
          <h2
            id="lead-sources-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#172033] tracking-tight mb-4"
          >
            All Lead Sources Converge in One CRM
          </h2>
          <p className="text-base sm:text-lg text-[#667085] max-w-2xl mx-auto">
            Never miss an enquiry. Leads from Instagram, Facebook ads, your property listings
            and manual entries flow directly into your mobile pipeline.
          </p>
        </ScrollReveal>

        {/* Diagram */}
        <div ref={ref} className="flex flex-col items-center max-w-xl mx-auto">
          {/* Top: 5 Lead sources */}
          <div className="grid grid-cols-5 gap-3 sm:gap-6 w-full mb-4">
            {leadSources.map((source, i) => (
              <motion.div
                key={source.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-md overflow-hidden ${
                    source.type === "image"
                      ? "bg-transparent p-0"
                      : source.type === "brand"
                      ? "bg-gradient-to-br from-[#397BCF] to-[#245FA8] p-2.5"
                      : `bg-gradient-to-br ${source.color} p-2`
                  }`}
                >
                  {source.type === "image" ? (
                    <Image
                      src={source.icon}
                      alt={source.label}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  ) : source.type === "brand" ? (
                    <Image
                      src={source.icon}
                      alt={source.label}
                      width={28}
                      height={28}
                      className="w-full h-full object-contain filter brightness-0 invert"
                    />
                  ) : (
                    source.icon
                  )}
                </div>
                <span className="text-xs font-semibold text-[#172033] text-center leading-tight">
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
            <div className="w-0.5 h-8 bg-gradient-to-b from-[#E4EAF2] to-[#397BCF]" />
            <ArrowDown className="w-5 h-5 text-[#397BCF]" />
          </motion.div>

          {/* CRM hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-gradient-to-br from-[#172033] to-[#1e2d47] rounded-2xl px-8 py-5 text-white text-center shadow-xl mb-6 w-full sm:w-auto sm:min-w-[280px]"
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 p-2.5 flex items-center justify-center mx-auto mb-3">
              <Image
                src="/images/branding/logo-icon.png"
                alt="Broker CRM"
                width={36}
                height={36}
                className="w-full h-full object-contain"
              />
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
                  <div className="text-[#6FA5E5] font-bold text-lg">{s.value}</div>
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
            <div className="w-0.5 h-6 bg-[#397BCF]" />
            <ArrowDown className="w-5 h-5 text-[#397BCF]" />
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
                  <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#E4EAF2] flex items-center justify-center text-lg shadow-sm">
                    {stage.icon}
                  </div>
                  <span className="text-xs font-semibold text-[#172033]">{stage.label}</span>
                </div>
                {i < dealStages.length - 1 && (
                  <div className="text-[#D0D5DD] font-bold text-lg mb-5">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
