import { Bed, Bath, Square, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";

const sampleProperties = [
  {
    title: "3 BHK Apartment in Vesu",
    locality: "Vesu, Surat",
    price: "₹1.25 Cr",
    beds: 3,
    baths: 3,
    area: "1,650 sq ft",
    type: "For Sale",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600",
    slug: "3-bhk-apartment-vesu-surat",
    featured: true,
  },
  {
    title: "4 BHK Villa in Adajan",
    locality: "Adajan, Surat",
    price: "₹2.5 Cr",
    beds: 4,
    baths: 4,
    area: "3,200 sq ft",
    type: "For Sale",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600",
    slug: "4-bhk-villa-adajan-surat",
    featured: false,
  },
  {
    title: "2 BHK Apartment in Pal",
    locality: "Pal, Surat",
    price: "₹65 Lakh",
    beds: 2,
    baths: 2,
    area: "1,050 sq ft",
    type: "For Sale",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
    slug: "2-bhk-apartment-pal-surat",
    featured: false,
  },
];

export default function PropertyMarketplaceSection() {
  return (
    <section
      className="section-padding bg-white border-t border-[#e2e8f0]"
      aria-labelledby="marketplace-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <p className="text-[#f97316] text-sm font-semibold uppercase tracking-wider mb-3">
            Property Discovery
          </p>
          <h2
            id="marketplace-heading"
            className="text-3xl sm:text-4xl font-display font-bold text-[#0f1c2e] mb-4"
          >
            Your Properties Can Reach Buyers{" "}
            <br className="hidden sm:block" />
            Beyond Social Media.
          </h2>
          <p className="text-lg text-[#64748b] max-w-2xl mx-auto">
            Every published property automatically appears on The Realty Bazaar — a
            growing property discovery platform for buyers and renters.
          </p>
        </ScrollReveal>

        {/* Flow explanation */}
        <ScrollReveal className="mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            {[
              "Broker uploads in app",
              "→",
              "Property published",
              "→",
              "Appears on website",
              "→",
              "Customer enquires",
              "→",
              "Lead in broker CRM",
            ].map((item, i) => (
              <span
                key={i}
                className={
                  item === "→"
                    ? "text-[#cbd5e1] font-bold"
                    : "bg-[#eef3f8] text-[#0f1c2e] font-medium px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs"
                }
              >
                {item}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Property cards */}
        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {sampleProperties.map((property) => (
            <StaggerItem key={property.slug}>
              <Link
                href={`/properties/${property.slug}`}
                className="group block bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#eef3f8]">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {property.featured && (
                    <span className="absolute top-3 left-3 bg-[#f97316] text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                      Featured
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#0f1c2e] text-[10px] font-bold px-2 py-1 rounded-lg border border-[#e2e8f0]">
                    {property.type}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-sm text-[#0f1c2e] group-hover:text-[#f97316] transition-colors">
                      {property.title}
                    </h3>
                    <span className="text-base font-display font-bold text-[#0f1c2e] shrink-0">
                      {property.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#64748b] mb-3">
                    <MapPin className="w-3 h-3 text-[#f97316]" />
                    {property.locality}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#64748b] border-t border-[#f4f6f9] pt-3">
                    <span className="flex items-center gap-1">
                      <Bed className="w-3 h-3" />
                      {property.beds} Beds
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-3 h-3" />
                      {property.baths} Baths
                    </span>
                    <span className="flex items-center gap-1">
                      <Square className="w-3 h-3" />
                      {property.area}
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <ScrollReveal className="text-center">
          <Link
            href="/properties"
            id="marketplace-browse-properties"
            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-[#0f1c2e] text-[#0f1c2e] hover:bg-[#0f1c2e] hover:text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.98]"
          >
            Browse All Properties
            <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
