import type { Metadata } from "next";
import { Download, Check, Smartphone, BarChart3, TrendingUp, Users, Bell, Camera, Share2, Target } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

const APP_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
  "https://play.google.com/store/apps/details?id=com.therealtybazaar";

export const metadata: Metadata = {
  title: "For Real Estate Brokers — Property Marketing & CRM App",
  description:
    "The Realty Bazaar mobile app helps Indian real-estate brokers upload properties, run marketing campaigns, capture leads and manage their entire business from one platform.",
  alternates: { canonical: "https://therealtybazaar.com/for-brokers" },
};

const featureSections = [
  {
    category: "Property Management",
    icon: Camera,
    features: [
      "Upload properties with photos and videos",
      "Edit property media in-app",
      "Manage property details and descriptions",
      "Set property visibility (published / draft)",
      "Automatic website sync when published",
    ],
  },
  {
    category: "Marketing & Content",
    icon: Share2,
    features: [
      "AI-generated property captions",
      "AI hashtag suggestions",
      "Instagram direct publishing",
      "Facebook direct publishing",
      "Video content creation tools",
    ],
  },
  {
    category: "Paid Advertising",
    icon: Target,
    features: [
      "Meta Ads campaign management",
      "Budget optimization (Standard & Premium)",
      "Campaign performance analytics",
      "Cost per lead tracking",
      "Multi-property campaigns",
    ],
  },
  {
    category: "Lead Management",
    icon: Users,
    features: [
      "Automatic lead capture from all sources",
      "Unified CRM inbox",
      "Lead status tracking",
      "Follow-up reminders",
      "Lead source attribution",
    ],
  },
  {
    category: "CRM & Sales",
    icon: BarChart3,
    features: [
      "6-stage sales pipeline",
      "Site visit scheduling",
      "Activity logging",
      "Deal tracking",
      "Performance reports",
    ],
  },
  {
    category: "Notifications",
    icon: Bell,
    features: [
      "New lead alerts",
      "Follow-up reminders",
      "Site visit notifications",
      "Campaign performance alerts",
      "Enquiry notifications",
    ],
  },
];

const breadcrumbsLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://therealtybazaar.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "For Brokers",
      item: "https://therealtybazaar.com/for-brokers",
    },
  ],
};

export default function ForBrokersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-[#172033] via-[#1e2d47] to-[#253553] relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.06]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#397BCF]/20 text-[#6FA5E5] border border-[#397BCF]/30 rounded-full text-xs font-semibold tracking-wide mb-6">
              <Smartphone className="w-3.5 h-3.5" />
              Mobile App for Brokers
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white mb-6">
              Your Real Estate Business,{" "}
              <span className="text-[#6FA5E5]">Marketed & Managed</span>{" "}
              in One Place.
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              The Realty Bazaar mobile app is where brokers upload properties,
              run marketing campaigns, capture leads and close deals — all from
              their phone.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="for-brokers-page-get-app"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#397BCF] hover:bg-[#245FA8] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg active:scale-[0.98]"
              >
                <Download className="w-5 h-5" />
                Get the App
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 hover:border-white text-white font-semibold rounded-xl transition-all hover:bg-white/10 active:scale-[0.98]"
              >
                View Pricing
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Important note */}
      <section className="py-6 bg-[#EAF3FF] border-b border-[#6FA5E5]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 text-[#397BCF] mt-0.5 shrink-0" />
            <p className="text-sm text-[#172033]">
              <strong>All broker operations happen in the mobile app.</strong>{" "}
              There is no broker dashboard on this website. The website is the
              public-facing property discovery and lead-generation platform.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#172033] mb-4">
              Everything in the Mobile App
            </h2>
            <p className="text-lg text-[#667085] max-w-2xl mx-auto">
              A complete suite of tools designed for Indian real-estate brokers.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featureSections.map((section) => (
              <StaggerItem key={section.category}>
                <div className="bg-[#F8FAFC] border border-[#E4EAF2] rounded-2xl p-6 h-full hover:shadow-md hover:border-[#397BCF] hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#172033] flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-[#6FA5E5]" />
                    </div>
                    <h3 className="font-bold text-[#172033]">{section.category}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {section.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                        <span className="text-sm text-[#667085]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Pricing preview */}
      <PricingSection />

      {/* Final CTA */}
      <FinalCTA />
    </>
  );
}
