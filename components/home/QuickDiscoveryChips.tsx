"use client";

import Link from "next/link";
import { Sparkles, Home, Building, Layers, Trees, Briefcase, IndianRupee } from "lucide-react";

const chips = [
  { label: "1 BHK", href: "/properties?bhk=1", icon: null },
  { label: "2 BHK", href: "/properties?bhk=2", icon: null },
  { label: "3 BHK", href: "/properties?bhk=3", icon: null },
  { label: "4+ BHK", href: "/properties?bhk=4", icon: null },
  { label: "Apartments", href: "/properties?type=apartment", icon: Building },
  { label: "Villas", href: "/properties?type=villa", icon: Home },
  { label: "Plots & Land", href: "/properties?type=plot", icon: Trees },
  { label: "Commercial", href: "/properties?type=commercial", icon: Briefcase },
  { label: "Under ₹50 Lakh", href: "/properties?maxPrice=5000000", icon: IndianRupee },
  { label: "₹50L – ₹1Cr", href: "/properties?minPrice=5000000&maxPrice=10000000", icon: IndianRupee },
  { label: "₹1Cr – ₹3Cr", href: "/properties?minPrice=10000000&maxPrice=30000000", icon: IndianRupee },
  { label: "₹3Cr+", href: "/properties?minPrice=30000000", icon: IndianRupee },
];

export default function QuickDiscoveryChips() {
  return (
    <section className="py-4 bg-white border-y border-[#E4EAF2]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#172033] uppercase tracking-wider shrink-0 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-[#397BCF]" />
            <span>Quick Filters:</span>
          </div>

          {chips.map((chip, idx) => {
            const Icon = chip.icon;
            return (
              <Link
                key={idx}
                href={chip.href}
                rel="nofollow"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#475467] bg-[#F8FAFC] hover:bg-[#EAF3FF] hover:text-[#397BCF] hover:border-[#397BCF]/40 border border-[#E4EAF2] whitespace-nowrap transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95"
              >
                {Icon && <Icon className="w-3 h-3 text-[#397BCF]" />}
                <span>{chip.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
