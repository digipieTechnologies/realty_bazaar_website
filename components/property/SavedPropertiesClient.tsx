"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Trash2, ArrowRight, Building2, Sparkles } from "lucide-react";
import { useSavedProperties } from "@/lib/saved";
import PropertyCard from "@/components/property/PropertyCard";

export default function SavedPropertiesClient() {
  const { savedProperties, savedCount, isLoaded, clearAll } = useSavedProperties();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#397BCF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4EAF2]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200/60 text-xs font-bold mb-2">
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
            <span>{savedCount} {savedCount === 1 ? "Property Shortlisted" : "Properties Shortlisted"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#172033] tracking-tight">
            Saved Properties
          </h1>
          <p className="text-sm text-[#667085] mt-1">
            Properties you bookmark will stay saved on this device for easy access and comparison.
          </p>
        </div>

        {savedCount > 0 && (
          <div className="flex items-center gap-3">
            <Link
              href="/properties"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F3F8FE] hover:bg-[#EAF3FF] text-[#397BCF] border border-[#6FA5E5]/30 rounded-xl text-xs sm:text-sm font-bold transition-colors"
            >
              <Building2 className="w-4 h-4" />
              <span>Explore More</span>
            </Link>

            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-red-50 text-[#667085] hover:text-red-600 border border-[#E4EAF2] hover:border-red-200 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E4EAF2] text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#172033]">Clear all saved properties?</h3>
              <p className="text-xs text-[#667085] mt-1.5">
                This will remove all {savedCount} shortlisted properties from your device.
              </p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2.5 px-4 bg-[#F8FAFC] hover:bg-[#F3F8FE] text-[#172033] border border-[#E4EAF2] rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  clearAll();
                  setShowClearConfirm(false);
                }}
                className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm cursor-pointer"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Saved Properties */}
      {savedCount > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 sm:py-24 bg-white rounded-3xl border border-[#E4EAF2] shadow-2xs p-8 max-w-2xl mx-auto space-y-6">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-3xl bg-red-50 text-red-500 flex items-center justify-center mx-auto shadow-inner">
              <Heart className="w-10 h-10 fill-red-500/20 text-red-500 stroke-[1.75]" />
            </div>
            <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#397BCF] text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#172033]">
              No Saved Properties Yet
            </h2>
            <p className="text-sm text-[#667085] max-w-md mx-auto leading-relaxed">
              Click the heart icon on any property card or detail page to shortlist your favorite homes and compare them easily anytime.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#245FA8] hover:bg-[#1E4E8C] text-white font-bold rounded-2xl text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-98"
            >
              <span>Explore Verified Listings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
