import { Suspense } from "react";
import type { Metadata } from "next";
import { getPublishedPropertiesWithCount } from "@/lib/supabase/queries";
import type { SortOption } from "@/types";
import PropertyGridClient from "@/components/property/PropertyGridClient";
import QuickDiscoveryChips from "@/components/home/QuickDiscoveryChips";

export const metadata: Metadata = {
  title: "Properties for Sale & Rent Across India",
  description:
    "Explore verified residential apartments, independent villas, commercial spaces, and plots for sale and rent from licensed local brokers across India.",
  alternates: { canonical: "https://therealtybazaar.com/properties" },
};

interface PropertiesPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const params = (await searchParams) || {};
  const propertyType = typeof params.type === "string" ? params.type : undefined;
  const transactionType = typeof params.transaction === "string" ? params.transaction : undefined;
  const city = typeof params.city === "string" ? params.city : undefined;
  const locality = typeof params.locality === "string" ? params.locality : undefined;
  const bhk = typeof params.bhk === "string" ? params.bhk : undefined;
  const minPrice = typeof params.minPrice === "string" ? parseFloat(params.minPrice) : undefined;
  const maxPrice = typeof params.maxPrice === "string" ? parseFloat(params.maxPrice) : undefined;
  const q = typeof params.q === "string" ? params.q : undefined;
  const sort = typeof params.sort === "string" ? (params.sort as SortOption) : undefined;

  // Load the first page matching any server search parameters with exact total count
  const { properties, totalCount } = await getPublishedPropertiesWithCount({
    limit: 12,
    offset: 0,
    propertyType: propertyType && propertyType !== "All Types" ? propertyType : undefined,
    transactionType: transactionType && transactionType !== "all" ? transactionType : undefined,
    city: city && city !== "All Cities" ? city : undefined,
    locality,
    bedrooms: bhk && bhk !== "Any" ? bhk : undefined,
    minPrice,
    maxPrice,
    searchQuery: q,
    sortBy: sort,
  });

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Properties for Sale & Rent Across India",
    description: "Explore verified residential apartments, independent villas, commercial spaces, and plots from licensed local brokers across India.",
    itemListElement: properties.map((property, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: property.title,
      url: `https://therealtybazaar.com/properties/${property.slug}`,
    })),
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
        name: "Properties",
        item: "https://therealtybazaar.com/properties",
      },
    ],
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />

      {/* Top Header Banner */}
      <section className="pt-8 pb-6 bg-white border-b border-[#E4EAF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-4xl font-display font-bold text-[#172033] tracking-tight mb-2">
            Properties for Sale &amp; Rent Across India
          </h1>
          <p className="text-sm sm:text-base text-[#667085] max-w-2xl">
            Explore verified residential apartments, independent villas, commercial spaces, and plots from licensed local brokers across India.
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
            <PropertyGridClient
              initialProperties={properties}
              initialTotalCount={totalCount}
            />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
