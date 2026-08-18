"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, ArrowRight, Play, TrendingUp, Bell, Users, MapPin } from "lucide-react";
import AppStoreButtons from "@/components/ui/AppStoreButtons";

const APP_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
  "https://play.google.com/store/apps/details?id=com.therealtybazaar";

// Floating dashboard card component
function DashboardCard({
  delay,
  className,
  children,
}: {
  delay: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-card rounded-2xl shadow-[0_8px_32px_-4px_rgb(15_28_46/0.15)] ${className || ""}`}
    >
      {children}
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#eef3f8] via-white to-[#fff7ed]"
      aria-label="Hero"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Gradient blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#fff7ed] to-transparent rounded-full opacity-60 pointer-events-none blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#eef3f8] to-transparent rounded-full opacity-50 pointer-events-none blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#fff7ed] text-[#ea6c00] border border-[#fdba74] rounded-full text-xs font-semibold tracking-wide mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse" />
                PropTech Platform for Indian Brokers
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-display font-bold text-[#0f1c2e] leading-[1.1] tracking-tight mb-6"
            >
              Turn Your Property{" "}
              <span className="gradient-text">Listings</span>{" "}
              Into a Lead Engine.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg text-[#3a4a5c] leading-relaxed mb-8 max-w-xl"
            >
              The Realty Bazaar helps real-estate brokers market properties,
              generate leads and manage every enquiry from{" "}
              <strong className="text-[#0f1c2e] font-semibold">
                one powerful mobile platform.
              </strong>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Link
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-get-app"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#f97316] hover:bg-[#ea6c00] text-white text-base font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                <Download className="w-5 h-5" />
                Get the App
              </Link>
              <Link
                href="/properties"
                id="hero-browse-properties"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#0f1c2e] text-[#0f1c2e] hover:bg-[#0f1c2e] hover:text-white text-base font-semibold rounded-xl transition-all duration-200 active:scale-[0.98]"
              >
                Browse Properties
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm text-[#64748b]"
            >
              No website dashboard. No broker registration form.{" "}
              <span className="font-medium text-[#0f1c2e]">
                Everything runs from your mobile app.
              </span>
            </motion.p>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 pt-8 border-t border-[#e2e8f0] grid grid-cols-3 gap-6"
            >
              {[
                { value: "500+", label: "Active Brokers" },
                { value: "12K+", label: "Leads Generated" },
                { value: "₹183", label: "Avg. Cost/Lead" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-display font-bold text-[#0f1c2e]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#64748b] mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Visual mockup */}
          <div className="relative flex items-center justify-center min-h-[480px] lg:min-h-0">
            {/* Phone frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              <div className="w-64 h-[520px] bg-[#0f1c2e] rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgb(15_28_46/0.5)] p-1.5 relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-7 bg-[#0f1c2e] rounded-b-2xl z-20" />
                {/* Screen */}
                <div className="w-full h-full bg-[#f4f6f9] rounded-[2.2rem] overflow-hidden pt-8">
                  {/* App header */}
                  <div className="px-4 py-3 bg-white border-b border-[#e2e8f0]">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-[#64748b]">Good morning</div>
                        <div className="text-xs font-bold text-[#0f1c2e]">Rajesh Properties</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f97316] to-[#ea6c00] flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">R</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="px-3 py-2 grid grid-cols-3 gap-1.5 bg-white mb-1">
                    {[
                      { label: "Properties", value: "14" },
                      { label: "New Leads", value: "6", highlight: true },
                      { label: "Follow-ups", value: "3" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className={`rounded-xl p-2 text-center ${s.highlight ? "bg-[#fff7ed]" : "bg-[#f4f6f9]"}`}
                      >
                        <div className={`text-base font-bold ${s.highlight ? "text-[#f97316]" : "text-[#0f1c2e]"}`}>
                          {s.value}
                        </div>
                        <div className="text-[9px] text-[#64748b]">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Property card */}
                  <div className="mx-3 my-1.5 rounded-xl overflow-hidden bg-white shadow-sm">
                    <div className="h-20 bg-gradient-to-br from-[#1a2e48] to-[#3a6496] relative">
                      <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400')] bg-cover bg-center" />
                      <div className="absolute bottom-1.5 left-2">
                        <span className="text-[9px] text-white/80 bg-black/40 px-1.5 py-0.5 rounded-md">
                          3 BHK · Vesu, Surat
                        </span>
                      </div>
                    </div>
                    <div className="px-2.5 py-2 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-bold text-[#0f1c2e]">₹1.25 Cr</div>
                        <div className="text-[9px] text-[#64748b]">1,650 sq ft</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-md font-medium">
                          Published
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Campaign card */}
                  <div className="mx-3 my-1.5 rounded-xl bg-gradient-to-r from-[#0f1c2e] to-[#1a2e48] px-3 py-2.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-semibold text-white/70 uppercase tracking-wider">Active Campaign</span>
                      <span className="text-[9px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-md">Running</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white text-xs font-bold">24 Leads</div>
                        <div className="text-white/50 text-[9px]">₹183 / lead</div>
                      </div>
                      <TrendingUp className="w-4 h-4 text-[#f97316]" />
                    </div>
                  </div>

                  {/* Lead notification */}
                  <div className="mx-3 my-1.5 rounded-xl bg-white border border-[#e2e8f0] px-2.5 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#fff7ed] flex items-center justify-center shrink-0">
                        <Bell className="w-3 h-3 text-[#f97316]" />
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold text-[#0f1c2e]">New Lead — Priya S.</div>
                        <div className="text-[9px] text-[#64748b]">3 BHK · ₹1.2-1.4 Cr · Just now</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom nav */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#e2e8f0] px-4 py-2 flex justify-around">
                    {["Properties", "Leads", "CRM", "More"].map((item, i) => (
                      <div key={item} className="flex flex-col items-center gap-0.5">
                        <div className={`w-4 h-4 rounded ${i === 1 ? "bg-[#f97316]" : "bg-[#cbd5e1]"}`} />
                        <span className={`text-[8px] ${i === 1 ? "text-[#f97316] font-semibold" : "text-[#94a3b8]"}`}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating cards */}
            <DashboardCard delay={0.6} className="absolute -left-4 top-12 p-3 w-44">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
                  <Users className="w-3 h-3 text-green-600" />
                </div>
                <span className="text-[10px] font-semibold text-[#0f1c2e]">New Leads Today</span>
              </div>
              <div className="text-2xl font-display font-bold text-[#0f1c2e]">+6</div>
              <div className="text-[10px] text-green-600 font-medium">↑ 40% vs yesterday</div>
            </DashboardCard>

            <DashboardCard delay={0.7} className="absolute -right-2 top-8 p-3 w-40">
              <div className="text-[10px] text-[#64748b] mb-1">Campaign Status</div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-[#0f1c2e]">Active</span>
              </div>
              <div className="mt-2 text-[10px] text-[#64748b]">Instagram · Facebook</div>
              <div className="mt-1 text-xs font-semibold text-[#f97316]">₹183 / lead</div>
            </DashboardCard>

            <DashboardCard delay={0.8} className="absolute -left-6 bottom-20 p-3 w-48">
              <div className="text-[10px] text-[#64748b] mb-1.5">Lead Pipeline</div>
              <div className="space-y-1">
                {[
                  { label: "New", count: 6, color: "bg-blue-500" },
                  { label: "Contacted", count: 8, color: "bg-[#f97316]" },
                  { label: "Site Visit", count: 3, color: "bg-green-500" },
                ].map((stage) => (
                  <div key={stage.label} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: stage.color.replace("bg-", "") }} />
                    <span className="text-[10px] text-[#0f1c2e] flex-1">{stage.label}</span>
                    <span className="text-[10px] font-bold text-[#0f1c2e]">{stage.count}</span>
                  </div>
                ))}
              </div>
            </DashboardCard>

            <DashboardCard delay={0.9} className="absolute -right-4 bottom-16 p-3 w-40">
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin className="w-3 h-3 text-[#f97316]" />
                <span className="text-[10px] font-semibold text-[#0f1c2e]">Site Visit</span>
              </div>
              <div className="text-[10px] text-[#64748b]">Priya S. — 3 BHK</div>
              <div className="text-[10px] font-semibold text-[#0f1c2e] mt-1">Tomorrow, 11 AM</div>
              <div className="mt-1.5 text-[9px] bg-[#fff7ed] text-[#ea6c00] px-1.5 py-0.5 rounded-md inline-block font-medium">
                Scheduled
              </div>
            </DashboardCard>
          </div>
        </div>

        {/* Flow indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16 pt-10 border-t border-[#e2e8f0] hidden md:flex items-center justify-center gap-3 flex-wrap"
        >
          {["Property", "→", "Marketing", "→", "Lead", "→", "CRM", "→", "Follow-up", "→", "Deal"].map(
            (item, i) => (
              <span
                key={i}
                className={
                  item === "→"
                    ? "text-[#cbd5e1] font-bold text-lg"
                    : "text-sm font-semibold text-[#0f1c2e] bg-white border border-[#e2e8f0] rounded-lg px-3 py-1.5 shadow-sm"
                }
              >
                {item}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
