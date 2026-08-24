"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Sparkles, SlidersHorizontal, ArrowUpDown, X, Home, RotateCcw, Loader2 } from "lucide-react";
import PropertyCard from "@/components/property/PropertyCard";
import PropertySearchFilters, { type FilterState } from "@/components/property/PropertySearchFilters";
import CustomSelect from "@/components/ui/CustomSelect";
import type { Property } from "@/types";
import { fetchPropertiesPage } from "@/app/properties/actions";

const PAGE_SIZE = 12;

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

  // ── Filter state (synced with URL) ─────────────────────────────────────────
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

  // ── Infinite scroll state ──────────────────────────────────────────────────
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [offset, setOffset] = useState(initialProperties.length);
  const [hasMore, setHasMore] = useState(initialProperties.length >= PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);

  // Sentinel ref — the invisible div at the bottom of the list
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  // Ref to track the current filters for use inside the observer callback
  const filtersRef = useRef(filters);

  // Keep filtersRef in sync with state
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  // ── Reset list when filters change ─────────────────────────────────────────
  useEffect(() => {
    setProperties(initialProperties);
    setOffset(initialProperties.length);
    setHasMore(initialProperties.length >= PAGE_SIZE);
  }, [initialProperties]);

  // ── Sync state when URL params change ──────────────────────────────────────
  useEffect(() => {
    const nextFilters: FilterState = {
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
    };
    setFilters(nextFilters);
  }, [searchParams]);

  // ── Fetch next page ─────────────────────────────────────────────────────────
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);

    const f = filtersRef.current;
    try {
      const next = await fetchPropertiesPage({
        offset,
        limit: PAGE_SIZE,
        transactionType: f.transactionType !== "all" ? f.transactionType : undefined,
        propertyType: f.propertyType !== "All Types" ? f.propertyType : undefined,
        city: f.city !== "All Cities" ? f.city : undefined,
        locality: f.locality.trim() || undefined,
        bedrooms: f.bhk !== "Any" ? f.bhk : undefined,
        minPrice: f.minPrice ? parseFloat(f.minPrice) : undefined,
        maxPrice: f.maxPrice ? parseFloat(f.maxPrice) : undefined,
        sortBy: f.sortBy !== "relevance" ? (f.sortBy as any) : "newest",
        searchQuery: f.q.trim() || undefined,
      });

      if (next.length < PAGE_SIZE) setHasMore(false);
      setProperties((prev) => {
        // Deduplicate by ID
        const seen = new Set(prev.map((p) => p.id));
        return [...prev, ...next.filter((p) => !seen.has(p.id))];
      });
      setOffset((prev) => prev + next.length);
    } catch (err) {
      console.error("[loadMore] Failed to fetch next page:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, offset]);

  // ── Intersection Observer watcher ──────────────────────────────────────────
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "300px" }  // start loading 300px before sentinel is visible
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  // ── Filter handling ────────────────────────────────────────────────────────
  const handleFilterChange = async (newFilters: FilterState) => {
    setFilters(newFilters);
    filtersRef.current = newFilters;

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

    // Fetch fresh page 0 for new filters
    setLoadingMore(true);
    try {
      const fresh = await fetchPropertiesPage({
        offset: 0,
        limit: PAGE_SIZE,
        transactionType: newFilters.transactionType !== "all" ? newFilters.transactionType : undefined,
        propertyType: newFilters.propertyType !== "All Types" ? newFilters.propertyType : undefined,
        city: newFilters.city !== "All Cities" ? newFilters.city : undefined,
        locality: newFilters.locality.trim() || undefined,
        bedrooms: newFilters.bhk !== "Any" ? newFilters.bhk : undefined,
        minPrice: newFilters.minPrice ? parseFloat(newFilters.minPrice) : undefined,
        maxPrice: newFilters.maxPrice ? parseFloat(newFilters.maxPrice) : undefined,
        sortBy: newFilters.sortBy !== "relevance" ? (newFilters.sortBy as any) : "newest",
        searchQuery: newFilters.q.trim() || undefined,
      });

      setProperties(fresh);
      setOffset(fresh.length);
      setHasMore(fresh.length >= PAGE_SIZE);
    } catch (err) {
      console.error("[handleFilterChange] Error fetching filtered properties:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleReset = async () => {
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
    handleFilterChange(defaultFilters);
  };

  // ── Client-side secondary filter ──────────────────────────────────────────
  const displayProperties = useMemo(() => {
    let list = [...properties];

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

    if (filters.transactionType !== "all") {
      list = list.filter((p) => p.transaction_type === filters.transactionType);
    }

    if (filters.city !== "All Cities") {
      list = list.filter((p) => p.city.toLowerCase() === filters.city.toLowerCase());
    }

    if (filters.locality.trim()) {
      const loc = filters.locality.toLowerCase().trim();
      list = list.filter((p) => p.locality.toLowerCase().includes(loc));
    }

    if (filters.propertyType !== "All Types") {
      list = list.filter(
        (p) => p.property_type.toLowerCase() === filters.propertyType.toLowerCase()
      );
    }

    if (filters.bhk !== "Any") {
      const bhkNum = parseInt(filters.bhk, 10);
      if (!isNaN(bhkNum)) {
        list = list.filter((p) => (p.bedrooms || 0) >= bhkNum);
      }
    }

    if (filters.minPrice) {
      const min = parseFloat(filters.minPrice);
      if (!isNaN(min)) {
        list = list.filter((p) => (p.price || 0) >= min);
      }
    }

    if (filters.maxPrice) {
      const max = parseFloat(filters.maxPrice);
      if (!isNaN(max)) {
        list = list.filter((p) => (p.price || 0) <= max);
      }
    }

    if (filters.furnishing !== "all") {
      list = list.filter((p) => p.furnishing === filters.furnishing);
    }

    if (filters.verifiedOnly) {
      list = list.filter((p) => p.broker_verified);
    }

    if (filters.featuredOnly) {
      list = list.filter((p) => p.featured || p.promoted);
    }

    return list;
  }, [
    properties,
    filters.q,
    filters.transactionType,
    filters.city,
    filters.locality,
    filters.propertyType,
    filters.bhk,
    filters.minPrice,
    filters.maxPrice,
    filters.furnishing,
    filters.verifiedOnly,
    filters.featuredOnly,
  ]);

  // ── Active filter chips ────────────────────────────────────────────────────
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
          totalCount={displayProperties.length}
        />
      </div>

      {/* Right Properties Grid Column (8/9 cols on desktop) */}
      <div className="lg:col-span-8 xl:col-span-9 space-y-5">
        {/* Top Control Bar (Results count + Active Chips + Sort Dropdown) */}
        <div className="bg-white border border-[#E4EAF2] rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-base sm:text-lg font-display font-bold text-[#172033]">
              {displayProperties.length}{" "}
              {displayProperties.length === 1 ? "Property" : "Properties"} Loaded
              {filters.city !== "All Cities" && (
                <span className="text-[#397BCF]"> in {filters.city}</span>
              )}
              {hasMore && (
                <span className="text-xs font-normal text-[#667085] ml-2">
                  (scroll to load more)
                </span>
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
        {displayProperties.length === 0 && !loadingMore ? (
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
              {displayProperties.map((property, idx) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  priorityImage={idx < 3}
                />
              ))}
            </div>

            {/* Infinite scroll sentinel + loading indicator */}
            <div ref={sentinelRef} className="w-full flex justify-center py-8">
              {loadingMore && (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-[#397BCF]/20 border-t-[#397BCF] animate-spin" />
                  <p className="text-xs text-[#667085] font-medium">Loading more properties...</p>
                </div>
              )}
              {!hasMore && displayProperties.length > 0 && (
                <div className="flex flex-col items-center gap-2 py-4">
                  <div className="w-8 h-px bg-[#E4EAF2] flex-1" />
                  <p className="text-xs text-[#98A2B3] font-medium px-4">
                    You&apos;ve seen all {displayProperties.length} properties
                  </p>
                  <div className="w-8 h-px bg-[#E4EAF2] flex-1" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
