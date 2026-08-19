"use client";

import { TrendingUp, Zap, MessageSquare, Target } from "lucide-react";
import { StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";
import ScrollReveal from "@/components/ui/ScrollReveal";

const benefits = [
  {
    icon: TrendingUp,
    title: "Generate More Leads",
    description:
      "Capture leads from Instagram, Facebook, Meta Ads and the property marketplace — all into one unified CRM.",
    color: "bg-[#EAF3FF] text-[#397BCF]",
    stat: "12K+",
    statLabel: "leads generated",
  },
  {
    icon: Zap,
    title: "Market Properties Faster",
    description:
      "AI-generated captions, hashtags and content. Publish to Instagram and Facebook directly from the app.",
    color: "bg-[#EAF3FF] text-[#397BCF]",
    stat: "10×",
    statLabel: "faster publishing",
  },
  {
    icon: MessageSquare,
    title: "Manage Every Enquiry",
    description:
      "Every lead from every source lands in your mobile CRM. Never miss a follow-up or site visit.",
    color: "bg-green-50 text-green-600",
    stat: "100%",
    statLabel: "lead capture rate",
  },
  {
    icon: Target,
    title: "Close More Deals",
    description:
      "Track your pipeline from first enquiry to deal close. Know exactly where every lead stands.",
    color: "bg-[#EAF3FF] text-[#397BCF]",
    stat: "3×",
    statLabel: "more deals closed",
  },
];

export default function ValueProposition() {
  return (
    <section className="section-padding bg-white" aria-labelledby="value-prop-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[#397BCF] text-sm font-semibold uppercase tracking-wider mb-3">
            Why The Realty Bazaar
          </p>
          <h2
            id="value-prop-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#172033] mb-4"
          >
            Everything You Need to Grow{" "}
            <br className="hidden sm:block" />
            Your Real Estate Business
          </h2>
          <p className="text-lg text-[#667085] max-w-2xl mx-auto">
            One mobile platform. Every tool a real estate broker needs — from
            property upload to deal close.
          </p>
        </ScrollReveal>

        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <StaggerItem key={benefit.title}>
              <div className="group relative bg-white border border-[#E4EAF2] rounded-2xl p-6 hover:shadow-[0_10px_40px_-10px_rgb(57_123_207/0.12)] hover:border-[#397BCF] hover:-translate-y-1 transition-all duration-300 h-full">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${benefit.color}`}
                >
                  <benefit.icon className="w-6 h-6" />
                </div>

                {/* Stat */}
                <div className="mb-2">
                  <span className="text-3xl font-display font-bold text-[#397BCF]">
                    {benefit.stat}
                  </span>
                  <span className="text-sm text-[#667085] ml-2">
                    {benefit.statLabel}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#172033] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#667085] leading-relaxed">
                  {benefit.description}
                </p>

                {/* Hover border accent */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#397BCF] to-[#6FA5E5] rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
