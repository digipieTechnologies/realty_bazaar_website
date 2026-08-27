"use client";

import { useState } from "react";
import Link from "next/link";
import { Bed, Bath, Square, MapPin, Heart, ShieldCheck, ArrowUpRight } from "lucide-react";
import type { Property } from "@/types";
import { formatPrice } from "@/lib/utils";
import SharePropertyButton from "./SharePropertyButton";
import { trackPropertyCardClick, trackPropertyFavourite } from "@/lib/analytics/clarity";

interface PropertyCardProps {
  property: Property;
  priorityImage?: boolean;
}

export default function PropertyCard({ property, priorityImage = false }: PropertyCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const imageUrl =
    property.images?.[0] ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800";
  const price = formatPrice(property.price, property.price_display);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved((prev) => {
      const next = !prev;
      if (next) {
        trackPropertyFavourite(property);
      }
      return next;
    });
  };

  const handleCardClick = () => {
    trackPropertyCardClick(property);
  };

  const imageAlt = `${property.bedrooms ? `${property.bedrooms} BHK ` : ""}${
    property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)
  } in ${property.locality ? `${property.locality}, ` : ""}${property.city} — ${property.title}`;

  return (
    <div className="group relative bg-white border border-[#E4EAF2] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_2px_8px_-2px_rgb(0_0_0/0.04)] hover:shadow-[0_16px_32px_-8px_rgb(57_123_207/0.12)] hover:border-[#397BCF]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3F8FE]">
        <Link
          href={`/properties/${property.slug}`}
          onClick={handleCardClick}
          className="block w-full h-full"
        >
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading={priorityImage ? "eager" : "lazy"}
          />

          {/* Property Type Badge (bottom left of image) */}
          <div className="absolute bottom-3 left-3 pointer-events-none">
            <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
              {property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)}
            </span>
          </div>
        </Link>

        {/* Top Badges & Actions Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-1.5 pointer-events-none">
            {property.promoted && (
              <span className="bg-[#172033]/90 backdrop-blur-md text-[#6FA5E5] text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/10 shadow-sm">
                Promoted
              </span>
            )}
            {property.featured && !property.promoted && (
              <span className="bg-[#397BCF] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                Featured
              </span>
            )}
            <span className="bg-white/95 backdrop-blur-md text-[#172033] text-[10px] font-bold px-2.5 py-1 rounded-lg border border-[#E4EAF2] shadow-xs">
              {property.transaction_type === "sale" ? "For Sale" : "For Rent"}
            </span>
          </div>

          {/* Action Buttons: Share & Favorite */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <SharePropertyButton property={property} variant="icon" />

            {/* Favorite Heart Button */}
            <button
              type="button"
              onClick={toggleFavorite}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-[#172033] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 active:scale-95 cursor-pointer"
              aria-label={isSaved ? "Remove from saved" : "Save property"}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isSaved ? "fill-red-500 text-red-500" : "text-[#667085] hover:text-red-500"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price & Price/sqft */}
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <span className="text-xl sm:text-2xl font-display font-bold text-[#172033] tracking-tight">
              {price}
            </span>
            {property.price_per_sqft && property.transaction_type === "sale" && (
              <span className="text-[11px] font-medium text-[#667085]">
                ₹{property.price_per_sqft.toLocaleString("en-IN")}/sq ft
              </span>
            )}
          </div>

          {/* Title */}
          <Link
            href={`/properties/${property.slug}`}
            onClick={handleCardClick}
            className="block group-hover:text-[#397BCF] transition-colors"
          >
            <h3 className="font-bold text-sm sm:text-base text-[#172033] line-clamp-1 mb-1">
              {property.title}
            </h3>
          </Link>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-[#667085] mb-3.5">
            <MapPin className="w-3.5 h-3.5 text-[#397BCF] shrink-0" />
            <span className="truncate">
              {property.locality}, {property.city}
            </span>
          </div>

          {/* Key Specs Row */}
          <div className="flex items-center gap-3 text-xs text-[#475467] bg-[#F8FAFC] p-2.5 rounded-xl mb-4 border border-[#E4EAF2]/60">
            {property.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-[#397BCF]" />
                <span className="font-semibold">{property.bedrooms}</span> BHK
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-[#397BCF]" />
                <span className="font-semibold">{property.bathrooms}</span> Bath
              </div>
            )}
            {property.area_sqft && (
              <div className="flex items-center gap-1">
                <Square className="w-3.5 h-3.5 text-[#397BCF]" />
                <span className="font-semibold">{property.area_sqft.toLocaleString("en-IN")}</span> sq ft
              </div>
            )}
          </div>
        </div>

        {/* Broker & CTA Footer */}
        <div className="pt-3 border-t border-[#E4EAF2] flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-[#667085] truncate">
            <ShieldCheck className="w-4 h-4 text-[#397BCF] shrink-0" />
            <span className="truncate font-medium text-[#172033]">
              {property.broker_name || "Verified Broker"}
            </span>
          </div>

          <Link
            href={`/properties/${property.slug}`}
            onClick={handleCardClick}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#397BCF] hover:text-[#245FA8] shrink-0 bg-[#EAF3FF] hover:bg-[#397BCF] hover:text-white px-2.5 py-1.5 rounded-lg transition-all"
          >
            View Details
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

