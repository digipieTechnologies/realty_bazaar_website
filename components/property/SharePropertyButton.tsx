"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import type { Property } from "@/types";
import SharePropertyModal from "./SharePropertyModal";
import { trackPropertyShare } from "@/lib/analytics/clarity";

interface SharePropertyButtonProps {
  property: Property;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "icon" | "pill";
  label?: string;
  id?: string;
}

export default function SharePropertyButton({
  property,
  className = "",
  variant = "secondary",
  label = "Share",
  id,
}: SharePropertyButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-[#397BCF] hover:bg-[#245FA8] text-white font-bold px-4 py-2.5 rounded-xl shadow-xs";
      case "outline":
        return "border border-[#397BCF] text-[#397BCF] hover:bg-[#EAF3FF] font-bold px-4 py-2.5 rounded-xl";
      case "icon":
        return "w-11 h-11 rounded-2xl bg-[#F8FAFC] hover:bg-[#EAF3FF] text-[#172033] hover:text-[#397BCF] border border-[#E4EAF2] hover:border-[#397BCF]/40 flex items-center justify-center shadow-2xs hover:shadow-xs";
      case "pill":
        return "bg-white/90 hover:bg-white backdrop-blur-md text-[#172033] font-bold px-3 py-1.5 rounded-full text-xs shadow-xs border border-[#E4EAF2]";
      case "secondary":
      default:
        return "bg-white hover:bg-[#F3F8FE] text-[#172033] hover:text-[#397BCF] border border-[#E4EAF2] hover:border-[#397BCF]/50 font-semibold px-3.5 py-1.5 rounded-xl text-xs shadow-2xs hover:shadow-xs";
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    trackPropertyShare(property, variant);
    setIsOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        id={id}
        aria-label={`Share ${property.title}`}
        className={`inline-flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer ${getVariantStyles()} ${className}`}
      >
        <Share2 className={variant === "icon" ? "w-4 h-4 text-current" : "w-3.5 h-3.5"} />
        {variant !== "icon" && <span>{label}</span>}
      </button>

      <SharePropertyModal
        property={property}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
