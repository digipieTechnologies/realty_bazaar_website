"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import type { Property } from "@/types";
import { trackPropertyFavourite } from "@/lib/analytics/clarity";

interface SavePropertyButtonProps {
  property: Property;
  className?: string;
  id?: string;
}

export default function SavePropertyButton({
  property,
  className = "",
  id,
}: SavePropertyButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

  const toggleSave = (e: React.MouseEvent) => {
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

  return (
    <button
      type="button"
      onClick={toggleSave}
      id={id}
      aria-label={isSaved ? `Remove ${property.title} from saved properties` : `Save ${property.title}`}
      className={`inline-flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer bg-white hover:bg-[#F3F8FE] text-[#172033] hover:text-red-500 border border-[#E4EAF2] hover:border-red-200 font-semibold px-3.5 py-1.5 rounded-xl text-xs shadow-2xs hover:shadow-xs ${className}`}
    >
      <Heart
        className={`w-3.5 h-3.5 transition-colors ${
          isSaved ? "fill-red-500 text-red-500" : "text-[#667085] hover:text-red-500"
        }`}
      />
      <span>{isSaved ? "Saved" : "Save"}</span>
    </button>
  );
}
