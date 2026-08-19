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
      <PricingSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
