"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import CustomSelect from "@/components/ui/CustomSelect";

interface PropertySearchFiltersProps {
  onSearch: (params: SearchParams) => void;
}

export interface SearchParams {
  q: string;
  transactionType: string;
  propertyType: string;
  city: string;
  minBeds: string;
}

const propertyTypes = ["Any", "Apartment", "Villa", "House", "Plot", "Commercial", "Studio"];
const bedrooms = ["Any", "1", "2", "3", "4", "4+"];
const cities = ["Any", "Surat", "Ahmedabad", "Mumbai", "Pune", "Bangalore"];

export default function PropertySearchFilters({ onSearch }: PropertySearchFiltersProps) {
  const [q, setQ] = useState("");
  const [transactionType, setTransactionType] = useState("any");
  const [propertyType, setPropertyType] = useState("Any");
  const [city, setCity] = useState("Any");
  const [minBeds, setMinBeds] = useState("Any");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch({ q, transactionType, propertyType, city, minBeds });
  };

  const clearFilters = () => {
    setQ("");
    setTransactionType("any");
    setPropertyType("Any");
    setCity("Any");
    setMinBeds("Any");
    onSearch({ q: "", transactionType: "any", propertyType: "Any", city: "Any", minBeds: "Any" });
  };

  const hasFilters =
    q !== "" ||
    transactionType !== "any" ||
    propertyType !== "Any" ||
    city !== "Any" ||
    minBeds !== "Any";

  return (
    <div className="bg-white border border-[#E4EAF2] rounded-2xl p-4 shadow-sm">
      {/* Search bar */}
      <div className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3]" aria-hidden="true" />
          <input
            type="search"
            id="property-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search city, locality or property..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#E4EAF2] focus:border-[#397BCF] outline-none text-sm text-[#172033] placeholder:text-[#98A2B3] transition-colors"
          />
        </div>
        <button
          onClick={handleSearch}
          id="property-search-btn"
          className="px-5 py-3 bg-[#397BCF] hover:bg-[#245FA8] text-white font-semibold rounded-xl text-sm transition-all active:scale-[0.98] shrink-0 shadow-sm"
        >
          Search
        </button>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-3 border-2 border-[#E4EAF2] hover:border-[#397BCF] rounded-xl flex items-center gap-2 text-sm font-medium text-[#172033] transition-all shrink-0"
          aria-expanded={showFilters}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>

      {/* Transaction type tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { value: "any", label: "All" },
          { value: "sale", label: "For Sale" },
          { value: "rent", label: "For Rent" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setTransactionType(tab.value)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              transactionType === tab.value
                ? "bg-[#397BCF] text-white"
                : "bg-[#F3F8FE] text-[#172033] hover:bg-[#EAF3FF]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Extended filters */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-[#E4EAF2] grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#667085] mb-1.5">City</label>
            <CustomSelect
              value={city}
              onChange={(val) => setCity(val)}
              options={cities}
              size="sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#667085] mb-1.5">Property Type</label>
            <CustomSelect
              value={propertyType}
              onChange={(val) => setPropertyType(val)}
              options={propertyTypes}
              size="sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#667085] mb-1.5">Bedrooms</label>
            <CustomSelect
              value={minBeds}
              onChange={(val) => setMinBeds(val)}
              options={bedrooms.map((b) => ({
                value: b,
                label: b === "Any" ? "Any Bedrooms" : `${b}+ BHK`,
              }))}
              size="sm"
            />
          </div>
        </div>
      )}

      {/* Clear filters */}
      {hasFilters && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-xs text-[#98A2B3] hover:text-[#397BCF] transition-colors"
          >
            <X className="w-3 h-3" />
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
