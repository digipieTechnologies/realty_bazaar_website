"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";

const APP_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
  "https://play.google.com/store/apps/details?id=com.therealtybazaar";

const steps = [
  {
    number: "01",
    title: "Upload Property",
    description: "Add property details, photos and videos directly from the mobile app.",
    icon: "🏠",
    color: "bg-blue-50 border-blue-200",
    accent: "text-blue-600",
  },
  {
    number: "02",
    title: "Create Content",
    description: "AI generates captions, hashtags and marketing copy for your property.",
    icon: "✨",
    color: "bg-[#fff7ed] border-[#fdba74]",
    accent: "text-[#f97316]",
  },
  {
    number: "03",
    title: "Publish",
    description: "Post directly to Instagram and Facebook from the app. One tap.",
    icon: "📲",
    color: "bg-pink-50 border-pink-200",
    accent: "text-pink-600",
  },
  {
    number: "04",
    title: "Run Campaigns",
    description: "Launch paid ads on Meta. Your property reaches targeted buyers.",
    icon: "🎯",
    color: "bg-purple-50 border-purple-200",
    accent: "text-purple-600",
  },
  {
    number: "05",
    title: "Capture Leads",
    description: "All leads — from ads, social, website — land in your mobile CRM.",
    icon: "⚡",
    color: "bg-yellow-50 border-yellow-200",
    accent: "text-yellow-700",
  },
  {
    number: "06",
    title: "Follow Up",
    description: "Get reminders, log calls and keep every conversation tracked.",
    icon: "💬",
    color: "bg-green-50 border-green-200",
    accent: "text-green-600",
  },
  {
    number: "07",
    title: "Schedule Visit",
    description: "Convert interested leads into site visits. Manage your calendar.",
    icon: "📅",
    color: "bg-cyan-50 border-cyan-200",
    accent: "text-cyan-600",
  },
  {
    number: "08",
    title: "Close the Deal",
    description: "Move leads through the pipeline and mark deals as won.",
    icon: "🏆",
    color: "bg-[#eef3f8] border-[#d0dde8]",
    accent: "text-[#0f1c2e]",
  },
];

export default function BrokerWorkflow() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="section-padding bg-white relative overflow-hidden"
      aria-labelledby="workflow-heading"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e2e8f0] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[#f97316] text-sm font-semibold uppercase tracking-wider mb-3">
            How It Works for Brokers
          </p>
          <h2
            id="workflow-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0f1c2e] mb-4"
          >
            From Property Upload{" "}
            <br className="hidden sm:block" />
            to Closed Deal.
          </h2>
          <p className="text-lg text-[#64748b] max-w-2xl mx-auto">
            Every step happens inside the mobile app. No website dashboard.
            No complicated setup.
          </p>
        </ScrollReveal>

        {/* Steps grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`relative border-2 rounded-2xl p-5 ${step.color} group hover:-translate-y-1 hover:shadow-md transition-all duration-300`}
            >
              {/* Step number */}
              <div className="flex items-start justify-between mb-4">
                <span className={`text-3xl font-display font-bold opacity-20 ${step.accent}`}>
                  {step.number}
                </span>
                <span className="text-2xl">{step.icon}</span>
              </div>
              <h3 className="text-base font-bold text-[#0f1c2e] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[#64748b] leading-relaxed">
                {step.description}
              </p>

              {/* Connector arrow (not on last in row) */}
              {i % 4 !== 3 && (
                <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-[#e2e8f0] flex items-center justify-center z-10 hidden lg:flex">
                  <span className="text-[#cbd5e1] text-xs">→</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom note + CTA */}
        <ScrollReveal className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#eef3f8] rounded-xl mb-8">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-[#0f1c2e] font-medium">
              All 8 steps happen inside the mobile app. No web dashboard needed.
            </span>
          </div>
          <br />
          <Link
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="workflow-get-app"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#f97316] hover:bg-[#ea6c00] text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            Get the App
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
