"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import type { Property } from "@/types";
import SharePropertyModal from "./SharePropertyModal";

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
        return "w-8 h-8 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-[#172033] flex items-center justify-center shadow-xs hover:scale-110 active:scale-95";
      case "pill":
        return "bg-white/90 hover:bg-white backdrop-blur-md text-[#172033] font-bold px-3 py-1.5 rounded-full text-xs shadow-xs border border-[#E4EAF2]";
      case "secondary":
      default:
        return "bg-[#F3F8FE] hover:bg-[#EAF3FF] text-[#245FA8] border border-[#6FA5E5]/30 font-bold px-3.5 py-2 rounded-xl text-xs";
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
        <Share2 className={variant === "icon" ? "w-4 h-4 text-[#475467]" : "w-3.5 h-3.5"} />
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
