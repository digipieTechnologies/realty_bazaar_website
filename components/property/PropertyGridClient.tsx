"use client";

import { useState } from "react";
import PropertyCard from "@/components/property/PropertyCard";
import PropertySearchFilters, { type SearchParams } from "@/components/property/PropertySearchFilters";
import type { Property } from "@/types";

interface PropertyGridClientProps {
  initialProperties: Property[];
}

export default function PropertyGridClient({ initialProperties }: PropertyGridClientProps) {
  const [filtered, setFiltered] = useState(initialProperties);

  const handleSearch = (params: SearchParams) => {
    let results = [...initialProperties];

    if (params.q) {
      const q = params.q.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    if (params.transactionType !== "any") {
      results = results.filter((p) => p.transaction_type === params.transactionType);
    }

    if (params.propertyType !== "Any") {
      results = results.filter(
        (p) => p.property_type.toLowerCase() === params.propertyType.toLowerCase()
      );
    }

    if (params.city !== "Any") {
      results = results.filter(
        (p) => p.city.toLowerCase() === params.city.toLowerCase()
      );
    }

    if (params.minBeds !== "Any") {
      const minBeds = parseInt(params.minBeds);
      results = results.filter((p) => (p.bedrooms || 0) >= minBeds);
    }

    setFiltered(results);
  };

  return (
    <>
      <div className="mb-6">
        <PropertySearchFilters onSearch={handleSearch} />
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[#64748b]">
          <strong className="text-[#0f1c2e]">{filtered.length}</strong>{" "}
          {filtered.length === 1 ? "property" : "properties"} found
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-bold text-[#0f1c2e] mb-2">No properties found</h3>
          <p className="text-[#64748b]">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </>
  );
}
