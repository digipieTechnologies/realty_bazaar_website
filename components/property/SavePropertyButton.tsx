"use client";

import { Heart } from "lucide-react";
import type { Property } from "@/types";
import { useSavedProperty } from "@/lib/saved";

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
  const { isSaved, toggleSave } = useSavedProperty(property);

  return (
    <button
      type="button"
      onClick={toggleSave}
      id={id}
      aria-label={isSaved ? `Remove ${property.title} from saved properties` : `Save ${property.title}`}
      className={`group inline-flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 cursor-pointer font-semibold px-3.5 py-1.5 rounded-xl text-xs shadow-2xs hover:shadow-xs border select-none ${
        isSaved
          ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300"
          : "bg-white hover:bg-[#FFF1F2] text-[#172033] hover:text-red-600 border-[#E4EAF2] hover:border-red-200"
      } ${className}`}
    >
      <Heart
        className={`w-3.5 h-3.5 transition-all duration-200 ${
          isSaved
            ? "fill-red-500 text-red-500 scale-110"
            : "text-[#667085] group-hover:text-red-500 group-hover:scale-110"
        }`}
      />
      <span className="transition-colors duration-200">
        {isSaved ? "Saved" : "Save"}
      </span>
    </button>
  );
}

