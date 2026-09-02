import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import PropertyCard from "@/components/property/PropertyCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Property } from "@/types";

interface TrendingPropertiesSectionProps {
  properties: Property[];
}

export default function TrendingPropertiesSection({ properties }: TrendingPropertiesSectionProps) {
  const displayProperties = properties.slice(0, 6);

  return (
    <section className="section-padding bg-[#F8FAFC]" aria-labelledby="trending-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF3FF] text-[#245FA8] border border-[#6FA5E5]/30 text-xs font-bold uppercase tracking-wider mb-2.5">
              <Flame className="w-3.5 h-3.5 text-[#397BCF]" />
              Trending in Surat & Gujarat
            </div>
            <h2
              id="trending-heading"
              className="text-2xl sm:text-4xl font-display font-bold text-[#172033] tracking-tight"
            >
              Properties Worth Exploring
            </h2>
            <p className="text-sm sm:text-base text-[#667085] mt-1.5 max-w-xl">
              Explore properties currently available from verified local brokers on The Realty Bazaar.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Link
              href="/properties"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#397BCF] hover:text-[#245FA8] group"
            >
              <span>Explore all {properties.length}+ listings</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Responsive Grid / Horizontal Carousel on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProperties.map((property, idx) => (
            <ScrollReveal key={property.id} delay={idx * 0.05}>
              <PropertyCard property={property} />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 sm:mt-14">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#245FA8] hover:bg-[#1E4E8C] text-white font-bold rounded-2xl text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            <span>View All Properties for Sale & Rent</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
