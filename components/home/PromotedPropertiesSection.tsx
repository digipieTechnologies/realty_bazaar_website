import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import PropertyCard from "@/components/property/PropertyCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Property } from "@/types";

interface PromotedPropertiesSectionProps {
  properties: Property[];
}

export default function PromotedPropertiesSection({ properties }: PromotedPropertiesSectionProps) {
  const promotedListings = properties.filter((p) => p.promoted || p.featured).slice(0, 3);

  if (!promotedListings.length) return null;

  return (
    <section className="section-padding bg-gradient-to-b from-white via-[#F3F8FE]/60 to-white border-t border-[#E4EAF2]" aria-labelledby="promoted-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#172033] text-[#6FA5E5] text-xs font-bold uppercase tracking-wider shadow-xs">
                <Star className="w-3.5 h-3.5 fill-[#6FA5E5] text-[#6FA5E5]" />
                Featured Collection
              </span>
              <span className="text-xs text-[#98A2B3] font-medium bg-[#E4EAF2]/60 px-2.5 py-0.5 rounded-md">
                Promoted listings
              </span>
            </div>

            <h2
              id="promoted-heading"
              className="text-2xl sm:text-4xl font-display font-bold text-[#172033] tracking-tight"
            >
              Handpicked Premium Properties
            </h2>
            <p className="text-sm sm:text-base text-[#667085] mt-1.5 max-w-xl">
              High-visibility spotlight listings with verified broker accreditation, superior build quality and prime connectivity.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Link
              href="/properties?featured=true"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#397BCF] hover:text-[#245FA8] group"
            >
              <span>View all promoted homes</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>

        {/* 3-Col Promoted Grid with Subtle Glow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promotedListings.map((property, idx) => (
            <ScrollReveal key={property.id} delay={idx * 0.08}>
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#397BCF]/20 via-[#6FA5E5]/10 to-transparent">
                <PropertyCard property={property} priorityImage={idx === 0} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
