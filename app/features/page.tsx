import type { Metadata } from "next";
import { Download } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";
import FinalCTA from "@/components/home/FinalCTA";
import MarketingSection from "@/components/home/MarketingSection";
import CRMSection from "@/components/home/CRMSection";
import AISection from "@/components/home/AISection";
import SocialMediaSection from "@/components/home/SocialMediaSection";

const APP_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
  "https://play.google.com/store/apps/details?id=com.therealtybazaar";

export const metadata: Metadata = {
  title: "Features — Property Marketing, CRM & Lead Management App",
  description:
    "Explore all features of The Realty Bazaar: AI content generation, Instagram & Facebook publishing, paid campaign management, mobile CRM and property marketplace.",
  alternates: { canonical: "https://therealtybazaar.com/features" },
};

const featureHighlights = [
  {
    emoji: "📱",
    title: "Mobile-First Platform",
    description: "Every feature is built for your phone. Manage properties, campaigns and leads on the go.",
  },
  {
    emoji: "🤖",
    title: "AI Content Generation",
    description: "AI writes property captions, hashtags and marketing copy — instantly, every time.",
  },
  {
    emoji: "📢",
    title: "Social Publishing",
    description: "Publish directly to Instagram and Facebook from the app. One tap, done.",
  },
  {
    emoji: "🎯",
    title: "Paid Campaign Management",
    description: "Run Meta Ads campaigns without becoming a marketing expert. We manage it for you.",
  },
  {
    emoji: "⚡",
    title: "Automatic Lead Capture",
    description: "Every lead from every source — ads, social, website — lands in your CRM automatically.",
  },
  {
    emoji: "📊",
    title: "Campaign Analytics",
    description: "Track leads, cost-per-lead and campaign performance in real time.",
  },
  {
    emoji: "🏠",
    title: "Property Marketplace",
    description: "Published properties automatically appear on the website for additional organic leads.",
  },
  {
    emoji: "🔔",
    title: "Smart Reminders",
    description: "Never miss a follow-up. The app sends reminders for overdue leads and upcoming visits.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#F3F8FE] to-white border-b border-[#E4EAF2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-[#172033] mb-6">
              Every Feature a Real Estate Broker Needs.
            </h1>
            <p className="text-lg text-[#667085] max-w-2xl mx-auto mb-10">
              The Realty Bazaar mobile app is a complete property marketing,
              lead management and CRM platform — built specifically for Indian brokers.
            </p>
            <Link
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#397BCF] hover:bg-[#245FA8] text-white font-semibold rounded-xl transition-all shadow-md active:scale-[0.98]"
            >
              <Download className="w-5 h-5" />
              Get the App — Start Free
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featureHighlights.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="p-5 bg-[#F8FAFC] border border-[#E4EAF2] rounded-2xl hover:shadow-md hover:border-[#397BCF] hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="text-3xl mb-4">{feature.emoji}</div>
                  <h2 className="text-sm font-bold text-[#172033] mb-2">{feature.title}</h2>
                  <p className="text-xs text-[#667085] leading-relaxed">{feature.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Detailed feature sections */}
      <MarketingSection />
      <CRMSection />
      <AISection />
      <SocialMediaSection />
      <FinalCTA />
    </>
  );
}
