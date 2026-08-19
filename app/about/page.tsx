import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FinalCTA from "@/components/home/FinalCTA";
import { Target, Eye, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Indian PropTech Platform for Real Estate Brokers",
  description:
    "The Realty Bazaar is a PropTech platform designed to help Indian real-estate professionals digitize property marketing, lead management and sales operations.",
  alternates: { canonical: "https://therealtybazaar.com/about" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About The Realty Bazaar",
  description:
    "PropTech platform for Indian real-estate brokers — property marketing, lead management and CRM in one mobile app.",
  url: "https://therealtybazaar.com/about",
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#F3F8FE] to-white border-b border-[#E4EAF2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-[#397BCF] text-sm font-semibold uppercase tracking-wider mb-3">
              About Us
            </p>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-[#172033] mb-6">
              Building the Future of Real Estate in India.
            </h1>
            <p className="text-lg text-[#667085] max-w-2xl mx-auto">
              The Realty Bazaar is a PropTech platform designed to help Indian
              real-estate professionals digitize property marketing, lead
              management and sales operations.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission, Vision, Why */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Target,
                title: "Our Mission",
                color: "bg-[#EAF3FF] text-[#397BCF]",
                description:
                  "Make property marketing and lead management simpler, faster and more effective for real-estate professionals across India.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                color: "bg-[#F3F8FE] text-[#245FA8]",
                description:
                  "Build a connected ecosystem between brokers, properties and property seekers — where every broker has access to professional marketing tools.",
              },
              {
                icon: Users,
                title: "Who We Serve",
                color: "bg-green-50 text-green-600",
                description:
                  "Individual brokers, small broker teams, property consultants and real estate agencies across India.",
              },
            ].map((item) => (
              <ScrollReveal key={item.title}>
                <div className="bg-[#F8FAFC] border border-[#E4EAF2] rounded-2xl p-6 h-full hover:border-[#397BCF] transition-colors">
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-lg font-bold text-[#172033] mb-3">{item.title}</h2>
                  <p className="text-sm text-[#667085] leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Why we built it */}
          <ScrollReveal>
            <div className="bg-gradient-to-br from-[#172033] to-[#1e2d47] rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-display font-bold mb-4">Why We Built This</h2>
              <div className="space-y-4 text-white/70 text-sm leading-relaxed">
                <p>
                  Real estate brokers in India are some of the hardest-working
                  professionals in the country. They hustle on WhatsApp, post on
                  Instagram, manage leads in Excel and follow up via phone —
                  all simultaneously, often without proper tools.
                </p>
                <p>
                  The result? Leads get lost. Follow-ups get missed. Great
                  properties don&apos;t reach the right buyers. And brokers spend
                  more time managing chaos than closing deals.
                </p>
                <p>
                  We built The Realty Bazaar to change that. To give brokers
                  a single, professional platform that handles property
                  marketing, lead capture and CRM — without requiring them
                  to become marketing experts or tech-savvy professionals.
                </p>
                <p className="text-white font-medium">
                  One mobile app. Every tool a modern real estate broker needs.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* The platform */}
          <ScrollReveal className="mt-8">
            <div className="bg-[#F8FAFC] border border-[#E4EAF2] rounded-2xl p-8">
              <h2 className="text-2xl font-display font-bold text-[#172033] mb-4">
                The Platform
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 text-sm text-[#667085] leading-relaxed">
                <div>
                  <h3 className="font-bold text-[#172033] mb-2">For Brokers — Mobile App</h3>
                  <p>
                    The Realty Bazaar mobile app is where brokers manage their
                    entire business — property uploads, marketing campaigns,
                    lead management and CRM. Everything runs from the phone.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#172033] mb-2">For Property Seekers — Website</h3>
                  <p>
                    This website is a public property discovery platform.
                    Buyers and renters can browse properties listed by brokers
                    and contact them directly — no account required.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
