import { Suspense } from "react";
import type { Metadata } from "next";
import { getPublishedProperties } from "@/lib/supabase/queries";
import PropertyGridClient from "@/components/property/PropertyGridClient";
import QuickDiscoveryChips from "@/components/home/QuickDiscoveryChips";

export const metadata: Metadata = {
  title: "Browse Properties for Sale & Rent in India | The Realty Bazaar",
  description:
    "Explore verified residential apartments, independent villas, commercial office spaces, and plots for sale and rent in Surat, Ahmedabad, Mumbai and across India. Connect directly with local real estate brokers.",
  alternates: { canonical: "https://therealtybazaar.com/properties" },
};

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function PropertiesPage() {
  const properties = await getPublishedProperties();

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Top Header Banner */}
      <section className="pt-8 pb-6 bg-white border-b border-[#E4EAF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-4xl font-display font-bold text-[#172033] tracking-tight mb-2">
            Property Marketplace
          </h1>
          <p className="text-sm sm:text-base text-[#667085] max-w-2xl">
            Explore verified residential and commercial properties from licensed local brokers across Surat, Gujarat and India.
          </p>
        </div>
      </section>

      {/* Quick Filter Chips Bar */}
      <QuickDiscoveryChips />

      {/* Main Marketplace Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="py-20 text-center">
                <div className="w-8 h-8 border-3 border-[#397BCF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-[#667085]">Loading properties...</p>
              </div>
            }
          >
            <PropertyGridClient initialProperties={properties} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
