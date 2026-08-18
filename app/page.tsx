import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ValueProposition from "@/components/home/ValueProposition";
import ProblemSection from "@/components/home/ProblemSection";
import BrokerWorkflow from "@/components/home/BrokerWorkflow";
import MarketingSection from "@/components/home/MarketingSection";
import CRMSection from "@/components/home/CRMSection";
import AISection from "@/components/home/AISection";
import SocialMediaSection from "@/components/home/SocialMediaSection";
import PropertyMarketplaceSection from "@/components/home/PropertyMarketplaceSection";
import LeadSourcesSection from "@/components/home/LeadSourcesSection";
import PricingSection from "@/components/home/PricingSection";
import ForBrokersSection from "@/components/home/ForBrokersSection";
import HowItWorksSeeker from "@/components/home/HowItWorksSeeker";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "The Realty Bazaar — Property Marketing & Lead Management for Real Estate Brokers",
  description:
    "Market properties, generate leads and manage your entire real estate business from one powerful mobile platform. The Realty Bazaar is India's PropTech platform for brokers.",
  alternates: {
    canonical: "https://therealtybazaar.com",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValueProposition />
      <ProblemSection />
      <BrokerWorkflow />
      <MarketingSection />
      <CRMSection />
      <AISection />
      <SocialMediaSection />
      <PropertyMarketplaceSection />
      <LeadSourcesSection />
      <PricingSection />
      <ForBrokersSection />
      <HowItWorksSeeker />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
