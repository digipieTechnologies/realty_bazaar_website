"use client";

import { useState } from "react";
import Link from "next/link";
import { Smartphone, Sparkles, Share2, Target, Users, CheckCircle2, ArrowRight, Download } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AppStoreButtons from "@/components/ui/AppStoreButtons";
import ListPropertyModal from "@/components/ui/ListPropertyModal";

const brokerHighlights = [
  {
    icon: Smartphone,
    title: "Mobile Property Management",
    desc: "Upload photos & videos directly from your smartphone.",
  },
  {
    icon: Sparkles,
    title: "AI Marketing Assistant",
    desc: "Generate professional Hindi & English listing copy instantly.",
  },
  {
    icon: Share2,
    title: "Social Media Publishing",
    desc: "Auto-publish branded posts & reels to Instagram & Facebook.",
  },
  {
    icon: Target,
    title: "Meta Ads Lead Generation",
    desc: "Run targeted buyer campaigns with automated budget optimization.",
  },
  {
    icon: Users,
    title: "Integrated Mobile CRM",
    desc: "Every website & social enquiry lands in your phone's CRM pipeline.",
  },
  {
    icon: CheckCircle2,
    title: "Zero Web Hassle",
    desc: "No complicated web dashboard. Everything is run from the mobile app.",
  },
];

export default function BrokerSecondaryCTA() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="section-padding bg-[#172033] text-white relative overflow-hidden" aria-labelledby="broker-cta-heading">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#397BCF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#245FA8]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column Copy */}
          <div className="lg:col-span-6">
            <ScrollReveal>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#397BCF]/20 text-[#6FA5E5] border border-[#397BCF]/40 text-xs font-bold uppercase tracking-wider mb-4">
                <Smartphone className="w-3.5 h-3.5" />
                For Real Estate Professionals
              </div>

              <h2
                id="broker-cta-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-[1.15] mb-4"
              >
                Are You a Real Estate Broker?
              </h2>

              <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-6">
                Market your properties, generate qualified buyer leads, and manage your entire client pipeline from one powerful mobile app.
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-8 backdrop-blur-xs">
                <p className="text-xs text-white/80 leading-relaxed">
                  <strong className="text-[#6FA5E5]">How listing works:</strong> Brokers list properties inside The Realty Bazaar mobile app. Once published, your listing instantly goes live on <span className="text-white font-semibold">therealtybazaar.com</span> and buyer enquiries flow directly to your mobile phone.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  id="broker-cta-join-btn"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#397BCF] hover:bg-[#245FA8] text-white font-bold rounded-2xl text-sm transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Join Broker App
                </button>

                <Link
                  href="/pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold border border-white/10 transition-all"
                >
                  <span>View Plans & Pricing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/for-brokers"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-white/70 hover:text-white text-sm font-semibold transition-all"
                >
                  <span>Learn More</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column Highlights Grid */}
          <div className="lg:col-span-6">
            <ScrollReveal delay={0.15}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {brokerHighlights.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#6FA5E5]/40 transition-all duration-300 backdrop-blur-xs"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#397BCF]/20 text-[#6FA5E5] flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-sm text-white mb-1">{item.title}</h3>
                      <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <ListPropertyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
