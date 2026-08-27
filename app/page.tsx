import type { Metadata } from "next";
import {
  getPublishedProperties,
  getPropertyTypeCounts,
  getCityCounts,
} from "@/lib/supabase/queries";
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
  title: "Properties for Sale & Rent in Surat & India | The Realty Bazaar",
  description:
    "Discover verified apartments, villas, and commercial properties in Surat and across India. Connect directly with licensed local real estate brokers.",
  alternates: {
    canonical: "https://therealtybazaar.com",
  },
};

export const revalidate = 60; // ISR: revalidate every 60 seconds

const consumerFaqsLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need an account to search or browse properties?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. You can freely browse, filter, and view all published properties across India on The Realty Bazaar without registering, creating an account, or logging in.",
      },
    },
    {
      "@type": "Question",
      name: "Can I contact the listing broker directly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, absolutely. Every property listing page provides direct 'Call Broker' and 'WhatsApp Broker' buttons, allowing you to connect directly with the licensed real estate broker managing that property.",
      },
    },
    {
      "@type": "Question",
      name: "Are properties listed by verified brokers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Properties on The Realty Bazaar are listed directly by local real estate professionals who manage active inventory. Listings display the broker's agency name and verified status.",
      },
    },
    {
      "@type": "Question",
      name: "Can I schedule a physical site visit before making a decision?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can use the 'Schedule a Site Visit' button on any property page to request your preferred date and time. The broker will confirm the appointment directly with you.",
      },
    },
    {
      "@type": "Question",
      name: "Do buyers pay any fees to browse The Realty Bazaar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The Realty Bazaar is completely free for buyers and tenants discovering properties. Normal broker services and terms apply when completing a transaction through your broker.",
      },
    },
    {
      "@type": "Question",
      name: "How can I report an incorrect or outdated property listing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If a property is already sold or contains inaccurate details, please reach out through our Contact page or click 'Report Listing' on the property page. Our moderation team promptly reviews and updates listings.",
      },
    },
  ],
};

export default async function HomePage() {
  const [properties, typeCounts, cityCounts] = await Promise.all([
    getPublishedProperties({ limit: 20 }),
    getPropertyTypeCounts(),
    getCityCounts(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(consumerFaqsLd) }}
      />

      {/* 1. Hero Section with Search Engine Centerpiece */}
      <HeroSection />

      {/* 2. Quick Discovery Chips */}
      <QuickDiscoveryChips />

      {/* 3. Featured / Trending Properties */}
      <TrendingPropertiesSection properties={properties} />

      {/* 4. Search by Location (Surat, Ahmedabad, Mumbai, etc.) */}
      <LocationDiscoverySection counts={cityCounts} />

      {/* 5. Property Categories */}
      <CategoryDiscoverySection counts={typeCounts} />

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
