import type { Metadata } from "next";
import { getPublishedProperties } from "@/lib/supabase/queries";
import PropertyGridClient from "@/components/property/PropertyGridClient";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Browse Properties — Find Homes, Apartments & Commercial Spaces",
  description:
    "Discover properties for sale and rent across India. Browse apartments, villas, plots and commercial spaces listed by verified real estate brokers.",
  alternates: { canonical: "https://therealtybazaar.com/properties" },
};

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function PropertiesPage() {
  const properties = await getPublishedProperties({ limit: 50 });

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <section className="pt-8 sm:pt-10 pb-5 bg-white border-b border-[#E4EAF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#172033] mb-1">
              Browse Properties
            </h1>
            <p className="text-sm sm:text-base text-[#667085]">
              Properties listed by verified real-estate brokers across India.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PropertyGridClient initialProperties={properties} />
        </div>
      </section>
    </div>
  );
}
