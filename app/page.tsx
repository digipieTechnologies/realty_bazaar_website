import type { Metadata } from "next";
import { getPublishedProperties } from "@/lib/supabase/queries";
import HeroSection from "@/components/home/HeroSection";
import QuickDiscoveryChips from "@/components/home/QuickDiscoveryChips";
import TrendingPropertiesSection from "@/components/home/TrendingPropertiesSection";
import LocationDiscoverySection from "@/components/home/LocationDiscoverySection";
import CategoryDiscoverySection from "@/components/home/CategoryDiscoverySection";
import PromotedPropertiesSection from "@/components/home/PromotedPropertiesSection";
import HowMarketplaceWorks from "@/components/home/HowMarketplaceWorks";
import BrokerSecondaryCTA from "@/components/home/BrokerSecondaryCTA";
import WhyRealtyBazaar from "@/components/home/WhyRealtyBazaar";
import SEOContentSection from "@/components/home/SEOContentSection";
import ConsumerFAQSection from "@/components/home/ConsumerFAQSection";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "The Realty Bazaar — Find Properties, Apartments & Villas from Verified Brokers in India",
  description:
    "Search verified residential apartments, independent villas, commercial spaces, and plots in Surat, Ahmedabad, Mumbai and across India. Connect directly with licensed real-estate brokers.",
  alternates: {
    canonical: "https://therealtybazaar.com",
  },
};

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function HomePage() {
  const properties = await getPublishedProperties({ limit: 20 });

  return (
    <>
      {/* 1. Hero Section with Search Engine Centerpiece */}
      <HeroSection />

      {/* 2. Quick Discovery Chips */}
      <QuickDiscoveryChips />

      {/* 3. Featured / Trending Properties */}
      <TrendingPropertiesSection properties={properties} />

      {/* 4. Search by Location (Surat, Ahmedabad, Mumbai, etc.) */}
      <LocationDiscoverySection />

      {/* 5. Property Categories */}
      <CategoryDiscoverySection />

      {/* 6. Promoted / Featured Spotlight Properties */}
      <PromotedPropertiesSection properties={properties} />

      {/* 7. How The Marketplace Works */}
      <HowMarketplaceWorks />

      {/* 8. For Brokers — Secondary Business Section */}
      <BrokerSecondaryCTA />

      {/* 9. Why The Realty Bazaar (Trust & Verified Listings) */}
      <WhyRealtyBazaar />

      {/* 10. SEO Content Section with Natural Internal Linking */}
      <SEOContentSection />

      {/* 11. Consumer FAQ Section */}
      <ConsumerFAQSection />

      {/* 12. Final Discovery CTA */}
      <FinalCTA />
    </>
  );
}
