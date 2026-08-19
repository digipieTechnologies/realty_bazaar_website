import Link from "next/link";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import type { Property } from "@/types";
import { formatPrice } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const imageUrl = property.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600";
  const price = formatPrice(property.price, property.price_display);

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block bg-white border border-[#E4EAF2] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-[#397BCF] hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F3F8FE]">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {property.featured && (
          <span className="absolute top-3 left-3 bg-[#EAF3FF] text-[#245FA8] text-[10px] font-bold px-2 py-1 rounded-lg border border-[#6FA5E5]/40 shadow-sm">
            Featured
          </span>
        )}
        <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#172033] text-[10px] font-bold px-2 py-1 rounded-lg border border-[#E4EAF2]">
          {property.transaction_type === "sale" ? "For Sale" : "For Rent"}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h2 className="font-bold text-sm text-[#172033] group-hover:text-[#397BCF] transition-colors line-clamp-1">
            {property.title}
          </h2>
          <span className="text-base font-display font-bold text-[#172033] shrink-0 whitespace-nowrap">
            {price}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-[#667085] mb-3">
          <MapPin className="w-3 h-3 text-[#397BCF] shrink-0" />
          <span className="truncate">{property.locality}, {property.city}</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#98A2B3] border-t border-[#F3F8FE] pt-3">
          {property.bedrooms && (
            <span className="flex items-center gap-1">
              <Bed className="w-3 h-3" />
              {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
            </span>
          )}
          {property.bathrooms && (
            <span className="flex items-center gap-1">
              <Bath className="w-3 h-3" />
              {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
            </span>
          )}
          {property.area_sqft && (
            <span className="flex items-center gap-1">
              <Square className="w-3 h-3" />
              {property.area_sqft.toLocaleString("en-IN")} sq ft
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
