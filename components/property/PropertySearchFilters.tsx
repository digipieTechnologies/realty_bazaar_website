"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X, RotateCcw } from "lucide-react";
import CustomSelect from "@/components/ui/CustomSelect";
import type { PropertyFilterState as FilterState } from "@/types";

export type { FilterState };

interface PropertySearchFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalCount: number;
}

const cities = ["All Cities", "Surat", "Ahmedabad", "Mumbai", "Vadodara", "Pune", "Rajkot"];
const propertyTypes = [
  { value: "All Types", label: "All Types" },
  { value: "apartment", label: "Apartment / Flat" },
  { value: "villa", label: "Luxury Villa" },
  { value: "house", label: "Independent House" },
  { value: "plot", label: "Plot / Land" },
  { value: "commercial", label: "Commercial Office" },
  { value: "shop", label: "Retail Shop" },
  { value: "studio", label: "Studio Apartment" },
];

const bhkOptions = ["Any", "1", "2", "3", "4+"];
const furnishingOptions = [
  { value: "all", label: "Any Furnishing" },
  { value: "unfurnished", label: "Unfurnished" },
  { value: "semi-furnished", label: "Semi-Furnished" },
  { value: "fully-furnished", label: "Fully Furnished" },
];

const budgetPresets = [
  { label: "Any Budget", min: "", max: "" },
  { label: "Under ₹25L", min: "", max: "2500000" },
  { label: "₹25L – ₹50L", min: "2500000", max: "5000000" },
  { label: "₹50L – ₹1Cr", min: "5000000", max: "10000000" },
  { label: "₹1Cr – ₹2Cr", min: "10000000", max: "20000000" },
  { label: "₹2Cr – ₹5Cr", min: "20000000", max: "50000000" },
  { label: "₹5Cr+", min: "50000000", max: "" },
];

export default function PropertySearchFilters({
  filters,
  onFilterChange,
  onReset,
  totalCount,
}: PropertySearchFiltersProps) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const update = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const hasActiveFilters =
    filters.q !== "" ||
    filters.transactionType !== "all" ||
    filters.propertyType !== "All Types" ||
    filters.city !== "All Cities" ||
    filters.bhk !== "Any" ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "" ||
    filters.furnishing !== "all" ||
    filters.verifiedOnly ||
    filters.featuredOnly;

  return (
    <>
      {/* ── Mobile Top Sticky Bar ───────────────────────────────── */}
      <div className="lg:hidden sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-[#E4EAF2] p-3 shadow-xs">
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3]" />
            <input
              type="text"
              value={filters.q}
              onChange={(e) => update("q", e.target.value)}
              placeholder="Search locality, project, or city..."
              className="w-full pl-9 pr-3 py-2 text-xs font-medium text-[#172033] bg-[#F8FAFC] border border-[#E4EAF2] rounded-xl outline-none focus:border-[#397BCF]"
            />
          </div>

          {/* Filter Button with Count Badge */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#172033] text-white text-xs font-bold rounded-xl shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#6FA5E5] animate-pulse" />
            )}
          </button>
        </div>

        {/* Quick horizontal transaction tabs on mobile */}
        <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar pt-1">
          {([
            { value: "all", label: "All Listings" },
            { value: "sale", label: "Buy" },
            { value: "rent", label: "Rent" },
          ] as const).map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => update("transactionType", tab.value)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                filters.transactionType === tab.value
                  ? "bg-[#397BCF] text-white"
                  : "bg-[#F8FAFC] text-[#667085] border border-[#E4EAF2]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Mobile Bottom Sheet Drawer ────────────────────────── */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-5 z-10 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E4EAF2] mb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#397BCF]" />
                  <h3 className="font-bold text-base text-[#172033]">Filter Properties</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 rounded-full bg-[#F3F8FE] text-[#172033]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Filter controls rendered in mobile drawer */}
              <div className="space-y-4 text-left">
                {/* Transaction Type */}
                <div>
                  <label className="block text-xs font-bold text-[#667085] uppercase tracking-wider mb-1.5">
                    Transaction Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {([
                      { value: "all", label: "All" },
                      { value: "sale", label: "For Sale" },
                      { value: "rent", label: "For Rent" },
                    ] as const).map((tab) => (
                      <button
                        key={tab.value}
                        type="button"
                        onClick={() => update("transactionType", tab.value)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                          filters.transactionType === tab.value
                            ? "bg-[#397BCF] text-white"
                            : "bg-[#F8FAFC] border border-[#E4EAF2] text-[#475467]"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold text-[#667085] uppercase tracking-wider mb-1.5">
                    City
                  </label>
                  <CustomSelect
                    value={filters.city}
                    onChange={(val) => update("city", val)}
                    options={cities}
                    size="sm"
                  />
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-xs font-bold text-[#667085] uppercase tracking-wider mb-1.5">
                    Property Type
                  </label>
                  <CustomSelect
                    value={filters.propertyType}
                    onChange={(val) => update("propertyType", val)}
                    options={propertyTypes}
                    size="sm"
                  />
                </div>

                {/* BHK */}
                <div>
                  <label className="block text-xs font-bold text-[#667085] uppercase tracking-wider mb-1.5">
                    Bedrooms / BHK
                  </label>
                  <div className="flex gap-2">
                    {bhkOptions.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => update("bhk", b)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                          filters.bhk === b
                            ? "bg-[#397BCF] text-white"
                            : "bg-[#F8FAFC] border border-[#E4EAF2] text-[#475467]"
                        }`}
                      >
                        {b === "Any" ? "Any" : `${b} BHK`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Presets */}
                <div>
                  <label className="block text-xs font-bold text-[#667085] uppercase tracking-wider mb-1.5">
                    Budget
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {budgetPresets.map((preset) => {
                      const isSelected =
                        filters.minPrice === preset.min && filters.maxPrice === preset.max;
                      return (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => {
                            onFilterChange({
                              ...filters,
                              minPrice: preset.min,
                              maxPrice: preset.max,
                            });
                          }}
                          className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all text-center ${
                            isSelected
                              ? "bg-[#EAF3FF] border-2 border-[#397BCF] text-[#397BCF]"
                              : "bg-[#F8FAFC] border border-[#E4EAF2] text-[#475467]"
                          }`}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Verified Brokers Only Toggle */}
                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.verifiedOnly}
                      onChange={(e) => update("verifiedOnly", e.target.checked)}
                      className="w-4 h-4 rounded text-[#397BCF] accent-[#397BCF]"
                    />
                    <span className="text-xs font-semibold text-[#172033]">
                      Verified Local Brokers Only
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="pt-4 border-t border-[#E4EAF2] flex items-center gap-3 mt-4">
              <button
                type="button"
                onClick={onReset}
                className="flex-1 py-3 border border-[#E4EAF2] text-[#667085] font-bold text-xs rounded-xl"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[#397BCF] text-white font-bold text-xs rounded-xl"
              >
                Show {totalCount} Properties
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Desktop Left Sidebar Filter Panel ─────────────────── */}
      <div className="hidden lg:block bg-white border border-[#E4EAF2] rounded-3xl p-6 shadow-sm sticky top-24 space-y-6">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E4EAF2]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#397BCF]" />
            <h3 className="font-display font-bold text-base text-[#172033]">Filters</h3>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#397BCF] hover:text-[#245FA8] transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* 1. Keyword / Locality Search */}
        <div>
          <label className="block text-[11px] font-bold text-[#667085] uppercase tracking-wider mb-2">
            Location or Keyword
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3]" />
            <input
              type="text"
              value={filters.q}
              onChange={(e) => update("q", e.target.value)}
              placeholder="e.g. Vesu, Adajan, Villa..."
              className="w-full pl-9 pr-3 py-2.5 text-xs font-medium text-[#172033] bg-[#F8FAFC] border border-[#E4EAF2] rounded-xl outline-none focus:bg-white focus:border-[#397BCF] transition-all"
            />
          </div>
        </div>

        {/* 2. Transaction Type (Buy / Rent) */}
        <div>
          <label className="block text-[11px] font-bold text-[#667085] uppercase tracking-wider mb-2">
            Purpose
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F8FAFC] rounded-2xl border border-[#E4EAF2]">
            {([
              { value: "all", label: "All" },
              { value: "sale", label: "Buy" },
              { value: "rent", label: "Rent" },
            ] as const).map((tab) => (
              <button

                key={tab.value}
                type="button"
                onClick={() => update("transactionType", tab.value)}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  filters.transactionType === tab.value
                    ? "bg-[#397BCF] text-white shadow-xs"
                    : "text-[#667085] hover:text-[#172033]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. City Selection */}
        <div>
          <label className="block text-[11px] font-bold text-[#667085] uppercase tracking-wider mb-2">
            City
          </label>
          <CustomSelect
            value={filters.city}
            onChange={(val) => update("city", val)}
            options={cities}
            size="sm"
          />
        </div>

        {/* 4. Property Type */}
        <div>
          <label className="block text-[11px] font-bold text-[#667085] uppercase tracking-wider mb-2">
            Property Type
          </label>
          <CustomSelect
            value={filters.propertyType}
            onChange={(val) => update("propertyType", val)}
            options={propertyTypes}
            size="sm"
          />
        </div>

        {/* 5. Bedrooms / BHK */}
        <div>
          <label className="block text-[11px] font-bold text-[#667085] uppercase tracking-wider mb-2">
            Bedrooms (BHK)
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {bhkOptions.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => update("bhk", b)}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  filters.bhk === b
                    ? "bg-[#397BCF] text-white shadow-xs"
                    : "bg-[#F8FAFC] border border-[#E4EAF2] text-[#475467] hover:border-[#397BCF]"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* 6. Budget Presets */}
        <div>
          <label className="block text-[11px] font-bold text-[#667085] uppercase tracking-wider mb-2">
            Budget Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            {budgetPresets.map((preset) => {
              const isSelected =
                filters.minPrice === preset.min && filters.maxPrice === preset.max;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    onFilterChange({
                      ...filters,
                      minPrice: preset.min,
                      maxPrice: preset.max,
                    });
                  }}
                  className={`py-2 px-2.5 rounded-xl text-[11px] font-bold transition-all text-center ${
                    isSelected
                      ? "bg-[#EAF3FF] border-2 border-[#397BCF] text-[#397BCF]"
                      : "bg-[#F8FAFC] border border-[#E4EAF2] text-[#475467] hover:border-[#397BCF]/40"
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 7. Furnishing */}
        <div>
          <label className="block text-[11px] font-bold text-[#667085] uppercase tracking-wider mb-2">
            Furnishing
          </label>
          <CustomSelect
            value={filters.furnishing}
            onChange={(val) => update("furnishing", val)}
            options={furnishingOptions}
            size="sm"
          />
        </div>

        {/* 8. Verified & Featured Toggles */}
        <div className="pt-2 border-t border-[#E4EAF2] space-y-2.5">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#172033]">
            <input
              type="checkbox"
              checked={filters.verifiedOnly}
              onChange={(e) => update("verifiedOnly", e.target.checked)}
              className="w-4 h-4 rounded text-[#397BCF] accent-[#397BCF]"
            />
            <span>Verified Local Brokers Only</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#172033]">
            <input
              type="checkbox"
              checked={filters.featuredOnly}
              onChange={(e) => update("featuredOnly", e.target.checked)}
              className="w-4 h-4 rounded text-[#397BCF] accent-[#397BCF]"
            />
            <span>Featured / Promoted Listings</span>
          </label>
        </div>
      </div>
    </>
  );
}
