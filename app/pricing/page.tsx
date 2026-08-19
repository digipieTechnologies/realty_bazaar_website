import type { Metadata } from "next";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Pricing — Real Estate Broker App Plans",
  description:
    "Simple, transparent pricing for The Realty Bazaar. Start with a trial or choose a monthly plan. All plans include the mobile app, CRM and property management.",
  alternates: { canonical: "https://therealtybazaar.com/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <section className="py-16 bg-[#F8FAFC] text-center border-b border-[#E4EAF2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-[#172033] mb-4">
              Pricing
            </h1>
            <p className="text-lg text-[#667085]">
              All plans include the mobile app. Choose the level of marketing
              support that fits your business.
            </p>
          </ScrollReveal>
        </div>
      </section>
      <PricingSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
