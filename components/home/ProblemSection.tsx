"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";
import Image from "next/image";

const APP_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
  "https://play.google.com/store/apps/details?id=com.therealtybazaar";

// Fixed rotations — deterministic values prevent SSR/client hydration mismatch
// (Math.random() differs between server render and client hydration)
const CHAOS_ROTATIONS = [-2.1, 1.8, -1.4, 2.6, -2.9, 1.2, -1.7, 2.3];

const chaosItems = [
  { label: "Instagram DMs", icon: "📱", color: "bg-pink-50 border-pink-200 text-pink-700" },
  { label: "Facebook Posts", icon: "📘", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { label: "WhatsApp Chats", icon: "💬", color: "bg-green-50 border-green-200 text-green-700" },
  { label: "Phone Calls", icon: "📞", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
  { label: "Excel Sheets", icon: "📊", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  { label: "Property Photos", icon: "🏠", color: "bg-slate-50 border-slate-200 text-slate-700" },
  { label: "Sticky Notes", icon: "📝", color: "bg-amber-50 border-amber-200 text-amber-700" },
  { label: "Email Threads", icon: "📧", color: "bg-red-50 border-red-200 text-red-700" },
];

export default function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="section-padding bg-[#F8FAFC] relative overflow-hidden"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[#397BCF] text-sm font-semibold uppercase tracking-wider mb-3">
            The Problem
          </p>
          <h2
            id="problem-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#172033] mb-4"
          >
            Your Properties Are Everywhere.{" "}
            <br className="hidden sm:block" />
            Your Leads Shouldn&apos;t Be.
          </h2>
          <p className="text-lg text-[#667085] max-w-2xl mx-auto">
            Most brokers manage their business across 6+ disconnected tools.
            Leads fall through the cracks. Follow-ups get missed. Deals are lost.
          </p>
        </ScrollReveal>

        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Chaos visual */}
          <div className="relative">
            <div className="text-center mb-6">
              <span className="text-sm font-semibold text-[#667085] uppercase tracking-wider">
                Your current workflow
              </span>
            </div>
            <div className="relative grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
              {chaosItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8, rotate: CHAOS_ROTATIONS[i] }}
                  animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-center ${item.color}`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-[11px] font-semibold leading-tight">{item.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Disconnection lines visual */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-6 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-xl">
                <span className="text-red-500 font-bold text-sm">×</span>
                <span className="text-sm text-red-700 font-medium">All disconnected. No single view.</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Solution preview */}
          <div className="relative">
            <div className="text-center mb-6">
              <span className="text-sm font-semibold text-[#667085] uppercase tracking-wider">
                With The Realty Bazaar
              </span>
            </div>

            {/* Center hub */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Flowing arrows */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  "Instagram", "Facebook", "Meta Ads", "Website",
                  "Property Marketplace", "Manual Entry",
                ].map((source, i) => (
                  <motion.div
                    key={source}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 1.0 + i * 0.08 }}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-[#E4EAF2] rounded-xl text-sm text-[#172033] font-medium shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#397BCF]" />
                    {source}
                  </motion.div>
                ))}
              </div>

              {/* Arrow down */}
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.6 }}
                style={{ transformOrigin: "top" }}
                className="flex flex-col items-center gap-1 my-4"
              >
                <div className="w-0.5 h-6 bg-[#397BCF]" />
                <ArrowRight className="w-5 h-5 text-[#397BCF] rotate-90" />
              </motion.div>

              {/* CRM hub */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.8 }}
                className="bg-gradient-to-br from-[#172033] to-[#1e2d47] rounded-2xl p-5 text-white text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 p-2.5 flex items-center justify-center mx-auto mb-3">
                  <Image
                    src="/images/branding/logo-icon.png"
                    alt="The Realty Bazaar"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-base font-bold">The Realty Bazaar</div>
                <div className="text-white/60 text-xs mt-1">Mobile App + CRM</div>
                <div className="mt-3 flex justify-center gap-4 text-xs">
                  <div className="text-center">
                    <div className="text-[#6FA5E5] font-bold text-lg">All</div>
                    <div className="text-white/50">Leads</div>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div className="text-center">
                    <div className="text-[#6FA5E5] font-bold text-lg">One</div>
                    <div className="text-white/50">Platform</div>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div className="text-center">
                    <div className="text-[#6FA5E5] font-bold text-lg">Zero</div>
                    <div className="text-white/50">Lost leads</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal className="mt-14 text-center">
          <p className="text-[#667085] mb-6 max-w-xl mx-auto">
            Stop managing your business across WhatsApp chats, spreadsheets and
            scattered notes. Bring everything into one place.
          </p>
          <Link
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="problem-get-app"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#397BCF] hover:bg-[#245FA8] text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            Get the App — It&apos;s Free to Start
            <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
