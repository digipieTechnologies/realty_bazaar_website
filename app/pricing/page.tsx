import type { Metadata } from "next";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Broker Pricing & Subscription Plans | The Realty Bazaar",
  description:
    "Explore transparent pricing plans for real estate brokers on The Realty Bazaar. Get automated property marketing, Meta Ads management, and mobile CRM.",
  alternates: { canonical: "https://therealtybazaar.com/pricing" },
};

export default function PricingPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Top Breadcrumb & Page Banner */}
      <section className="pt-10 pb-6 bg-white border-b border-[#E4EAF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-[#172033] tracking-tight mb-3">
            Broker Plans & Pricing
          </h1>
          <p className="text-sm sm:text-base text-[#667085] leading-relaxed">
            Transparent subscription plans tailored for independent agents, top producers, and real estate brokerage agencies across India.
          </p>
        </div>
      </section>

      {/* Pricing Grid with Broker Portal Redirects */}
      <PricingSection />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Final Action CTA */}
      <FinalCTA />
    </div>
  );
}
