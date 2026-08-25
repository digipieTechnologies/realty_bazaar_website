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

const pricingFaqsLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is The Realty Bazaar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Realty Bazaar is a PropTech platform for Indian real-estate brokers. It combines property marketing, social media publishing, paid advertising, lead capture and CRM management into one mobile app.",
      },
    },
    {
      "@type": "Question",
      name: "Is The Realty Bazaar a CRM?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — but it's much more than a CRM. It includes property marketing, AI content generation, social media publishing, paid campaign management and a public property marketplace.",
      },
    },
    {
      "@type": "Question",
      name: "How do I upload properties?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Properties are uploaded through the mobile app — not through this website. Download the app, create your account and start adding properties from your phone.",
      },
    },
    {
      "@type": "Question",
      name: "How does paid marketing work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On Standard and Premium plans, The Realty Bazaar manages paid campaigns on your behalf using a dynamically optimized advertising allocation across Instagram and Facebook.",
      },
    },
    {
      "@type": "Question",
      name: "How are leads captured?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Leads from Instagram, Facebook, Meta Ads, website enquiries and manual entries all land in your mobile CRM automatically with instant notifications.",
      },
    },
  ],
};

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
      name: "Broker Pricing",
      item: "https://therealtybazaar.com/pricing",
    },
  ],
};

export default function PricingPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqsLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />

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
