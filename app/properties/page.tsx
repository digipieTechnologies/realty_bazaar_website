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
    <>
      <section className="py-12 bg-gradient-to-br from-[#eef3f8] to-white border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#0f1c2e] mb-2">
              Browse Properties
            </h1>
            <p className="text-[#64748b]">
              Properties listed by verified real-estate brokers across India.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PropertyGridClient initialProperties={properties} />
        </div>
      </section>
    </>
  );
}
