"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Sparkles, SlidersHorizontal, ArrowUpDown, X, Home, RotateCcw } from "lucide-react";
import PropertyCard from "@/components/property/PropertyCard";
import PropertySearchFilters, { type FilterState } from "@/components/property/PropertySearchFilters";
import CustomSelect from "@/components/ui/CustomSelect";
import type { Property } from "@/types";

interface PropertyGridClientProps {
  initialProperties: Property[];
}

const sortOptions = [
  { value: "relevance", label: "Sort: Most Relevant" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest Listed" },
  { value: "area_desc", label: "Area: Large to Small" },
];

export default function PropertyGridClient({ initialProperties }: PropertyGridClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize state from URL params
  const [filters, setFilters] = useState<FilterState>(() => ({
    q: searchParams.get("q") || "",
    transactionType: (searchParams.get("transaction") as "all" | "sale" | "rent") || "all",
    propertyType: searchParams.get("type") || "All Types",
    city: searchParams.get("city") || "All Cities",
    locality: searchParams.get("locality") || "",
    bhk: searchParams.get("bhk") || "Any",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    furnishing: searchParams.get("furnishing") || "all",
    verifiedOnly: searchParams.get("verified") === "true",
    featuredOnly: searchParams.get("featured") === "true",
    sortBy: (searchParams.get("sort") as any) || "relevance",
  }));

  // Sync state when URL params change
  useEffect(() => {
    setFilters({
      q: searchParams.get("q") || "",
      transactionType: (searchParams.get("transaction") as "all" | "sale" | "rent") || "all",
      propertyType: searchParams.get("type") || "All Types",
      city: searchParams.get("city") || "All Cities",
      locality: searchParams.get("locality") || "",
      bhk: searchParams.get("bhk") || "Any",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      furnishing: searchParams.get("furnishing") || "all",
      verifiedOnly: searchParams.get("verified") === "true",
      featuredOnly: searchParams.get("featured") === "true",
      sortBy: (searchParams.get("sort") as any) || "relevance",
    });
  }, [searchParams]);

  // Update URL search parameters when filters change
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    const params = new URLSearchParams();

    if (newFilters.q.trim()) params.set("q", newFilters.q.trim());
    if (newFilters.transactionType !== "all") params.set("transaction", newFilters.transactionType);
    if (newFilters.propertyType !== "All Types") params.set("type", newFilters.propertyType);
    if (newFilters.city !== "All Cities") params.set("city", newFilters.city);
    if (newFilters.locality.trim()) params.set("locality", newFilters.locality.trim());
    if (newFilters.bhk !== "Any") params.set("bhk", newFilters.bhk);
    if (newFilters.minPrice) params.set("minPrice", newFilters.minPrice);
    if (newFilters.maxPrice) params.set("maxPrice", newFilters.maxPrice);
    if (newFilters.furnishing !== "all") params.set("furnishing", newFilters.furnishing);
    if (newFilters.verifiedOnly) params.set("verified", "true");
    if (newFilters.featuredOnly) params.set("featured", "true");
    if (newFilters.sortBy !== "relevance") params.set("sort", newFilters.sortBy);

    const str = params.toString();
    router.replace(`/properties${str ? `?${str}` : ""}`, { scroll: false });
  };

  const handleReset = () => {
    const defaultFilters: FilterState = {
      q: "",
      transactionType: "all",
      propertyType: "All Types",
      city: "All Cities",
      locality: "",
      bhk: "Any",
      minPrice: "",
      maxPrice: "",
      furnishing: "all",
      verifiedOnly: false,
      featuredOnly: false,
      sortBy: "relevance",
    };
    setFilters(defaultFilters);
    router.replace("/properties", { scroll: false });
  };

  // Compute filtered & sorted properties
  const filteredProperties = useMemo(() => {
    let list = [...initialProperties];

    // Keyword / Query filter
    if (filters.q.trim()) {
      const q = filters.q.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.property_type.toLowerCase().includes(q)
      );
    }

    // Transaction Type
    if (filters.transactionType !== "all") {
      list = list.filter((p) => p.transaction_type === filters.transactionType);
    }

    // City
    if (filters.city !== "All Cities") {
      list = list.filter((p) => p.city.toLowerCase() === filters.city.toLowerCase());
    }

    // Locality
    if (filters.locality.trim()) {
      const loc = filters.locality.toLowerCase().trim();
      list = list.filter((p) => p.locality.toLowerCase().includes(loc));
    }

    // Property Type
    if (filters.propertyType !== "All Types") {
      list = list.filter(
        (p) => p.property_type.toLowerCase() === filters.propertyType.toLowerCase()
      );
    }

    // BHK
    if (filters.bhk !== "Any") {
      const bhkNum = parseInt(filters.bhk, 10);
      if (!isNaN(bhkNum)) {
        list = list.filter((p) => (p.bedrooms || 0) >= bhkNum);
      }
    }

    // Min Price
    if (filters.minPrice) {
      const min = parseFloat(filters.minPrice);
      if (!isNaN(min)) {
        list = list.filter((p) => (p.price || 0) >= min);
      }
    }

    // Max Price
    if (filters.maxPrice) {
      const max = parseFloat(filters.maxPrice);
      if (!isNaN(max)) {
        list = list.filter((p) => (p.price || 0) <= max);
      }
    }

    // Furnishing
    if (filters.furnishing !== "all") {
      list = list.filter((p) => p.furnishing === filters.furnishing);
    }

    // Verified Brokers Only
    if (filters.verifiedOnly) {
      list = list.filter((p) => p.broker_verified);
    }

    // Featured / Promoted Only
    if (filters.featuredOnly) {
      list = list.filter((p) => p.featured || p.promoted);
    }

    // Sorting
    switch (filters.sortBy) {
      case "price_asc":
        list.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price_desc":
        list.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "newest":
        list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "area_desc":
        list.sort((a, b) => (b.area_sqft || 0) - (a.area_sqft || 0));
        break;
      default:
        // Promoted / featured listings first by default
        list.sort((a, b) => {
          if (a.promoted && !b.promoted) return -1;
          if (!a.promoted && b.promoted) return 1;
          return 0;
        });
        break;
    }

    return list;
  }, [initialProperties, filters]);

  // Active filter tags for quick removal
  const activeTags = useMemo(() => {
    const tags: { label: string; onRemove: () => void }[] = [];

    if (filters.q) {
      tags.push({ label: `"${filters.q}"`, onRemove: () => handleFilterChange({ ...filters, q: "" }) });
    }
    if (filters.transactionType !== "all") {
      tags.push({
        label: filters.transactionType === "sale" ? "For Sale" : "For Rent",
        onRemove: () => handleFilterChange({ ...filters, transactionType: "all" }),
      });
    }
    if (filters.city !== "All Cities") {
      tags.push({ label: `City: ${filters.city}`, onRemove: () => handleFilterChange({ ...filters, city: "All Cities" }) });
    }
    if (filters.propertyType !== "All Types") {
      tags.push({
        label: `Type: ${filters.propertyType}`,
        onRemove: () => handleFilterChange({ ...filters, propertyType: "All Types" }),
      });
    }
    if (filters.bhk !== "Any") {
      tags.push({ label: `${filters.bhk} BHK`, onRemove: () => handleFilterChange({ ...filters, bhk: "Any" }) });
    }
    if (filters.minPrice || filters.maxPrice) {
      tags.push({
        label: "Custom Budget",
        onRemove: () => handleFilterChange({ ...filters, minPrice: "", maxPrice: "" }),
      });
    }
    if (filters.verifiedOnly) {
      tags.push({ label: "Verified Brokers", onRemove: () => handleFilterChange({ ...filters, verifiedOnly: false }) });
    }
    if (filters.featuredOnly) {
      tags.push({ label: "Featured", onRemove: () => handleFilterChange({ ...filters, featuredOnly: false }) });
    }

    return tags;
  }, [filters]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Sidebar Filter Column (3 cols on desktop) */}
      <div className="lg:col-span-4 xl:col-span-3">
        <PropertySearchFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          totalCount={filteredProperties.length}
        />
      </div>

      {/* Right Properties Grid Column (8/9 cols on desktop) */}
      <div className="lg:col-span-8 xl:col-span-9 space-y-5">
        {/* Top Control Bar (Results count + Active Chips + Sort Dropdown) */}
        <div className="bg-white border border-[#E4EAF2] rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-base sm:text-lg font-display font-bold text-[#172033]">
              {filteredProperties.length}{" "}
              {filteredProperties.length === 1 ? "Property Available" : "Properties Available"}
              {filters.city !== "All Cities" && (
                <span className="text-[#397BCF]"> in {filters.city}</span>
              )}
            </div>
            <p className="text-xs text-[#667085]">
              Verified inventory listed directly by local brokers
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="w-full sm:w-56 shrink-0">
            <CustomSelect
              value={filters.sortBy}
              onChange={(val) => handleFilterChange({ ...filters, sortBy: val as any })}
              options={sortOptions}
              size="sm"
            />
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeTags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-[#667085] font-semibold">Active Filters:</span>
            {activeTags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3 py-1 bg-[#EAF3FF] text-[#245FA8] border border-[#6FA5E5]/30 rounded-full font-semibold"
              >
                {tag.label}
                <button
                  type="button"
                  onClick={tag.onRemove}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                  aria-label={`Remove ${tag.label}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-[#667085] hover:text-[#397BCF] font-bold underline underline-offset-2 ml-1"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Property Grid Results */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white border border-[#E4EAF2] rounded-3xl p-10 sm:p-16 text-center shadow-xs">
            <div className="w-16 h-16 rounded-3xl bg-[#F3F8FE] text-[#397BCF] flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-[#172033] mb-2">
              No matching properties found
            </h3>
            <p className="text-sm text-[#667085] max-w-md mx-auto mb-6">
              We couldn&apos;t find any listings matching your exact search filters. Try widening your price range or clearing some filters.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#397BCF] hover:bg-[#245FA8] text-white font-bold rounded-xl text-sm transition-all shadow-sm active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {filteredProperties.map((property, idx) => (
              <PropertyCard
                key={property.id}
                property={property}
                priorityImage={idx < 3}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
