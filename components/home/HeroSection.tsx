"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  ShieldCheck,
  Sparkles,
  Home,
  KeyRound,
} from "lucide-react";
import CustomSelect from "@/components/ui/CustomSelect";
import { trackPropertySearch } from "@/lib/analytics/clarity";

const propertyTypes = [
  { value: "Any", label: "All Property Types" },
  { value: "apartment", label: "Apartment / Flat" },
  { value: "villa", label: "Independent Villa" },
  { value: "house", label: "Independent House" },
  { value: "plot", label: "Plot / Land" },
  { value: "commercial", label: "Commercial Office / Shop" },
  { value: "studio", label: "Studio Apartment" },
];

const budgetRanges = [
  { value: "Any", label: "Any Budget" },
  { value: "0-5000000", label: "Under ₹50 Lakh" },
  { value: "5000000-10000000", label: "₹50 Lakh – ₹1 Crore" },
  { value: "10000000-20000000", label: "₹1 Crore – ₹2 Crore" },
  { value: "20000000-50000000", label: "₹2 Crore – ₹5 Crore" },
  { value: "50000000-1000000000", label: "₹5 Crore+" },
];

const bhkOptions = [
  { value: "Any", label: "Any BHK" },
  { value: "1", label: "1 BHK" },
  { value: "2", label: "2 BHK" },
  { value: "3", label: "3 BHK" },
  { value: "4", label: "4+ BHK" },
];

export default function HeroSection() {
  const router = useRouter();
  const [transactionType, setTransactionType] = useState<"sale" | "rent">("sale");
  const [query, setQuery] = useState("");
  const [propertyType, setPropertyType] = useState("Any");
  const [budget, setBudget] = useState("Any");
  const [bhk, setBhk] = useState("Any");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    params.set("transaction", transactionType);
    if (query.trim()) params.set("q", query.trim());
    if (propertyType !== "Any") params.set("type", propertyType);
    if (bhk !== "Any") params.set("bhk", bhk);

    let minPrice: string | undefined;
    let maxPrice: string | undefined;
    if (budget !== "Any") {
      const [min, max] = budget.split("-");
      minPrice = min;
      maxPrice = max;
      if (min) params.set("minPrice", min);
      if (max) params.set("maxPrice", max);
    }

    trackPropertySearch({
      search_query: query.trim() || undefined,
      property_type: propertyType !== "Any" ? propertyType : undefined,
      purpose: transactionType,
      bhk: bhk !== "Any" ? bhk : undefined,
      min_price: minPrice,
      max_price: maxPrice,
    });

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-[#F8FAFC] min-h-[720px]">
      {/* Full Hero Architectural Blueprint Line-Art Sketch Background (Edge-to-Edge Full Bleed) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
        <Image
          src="/images/hero-architectural-sketch.jpg"
          alt="Architectural Blueprint Sketch"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center w-full h-full opacity-45 xl:opacity-50 transition-opacity duration-300"
        />
        {/* Soft Radial & Linear Masks for center focus and seamless blending */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(248,250,252,0.92)_0%,rgba(248,250,252,0.45)_55%,transparent_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/30 via-transparent to-[#F8FAFC]" />
      </div>

      {/* Floating Left Annotation Badge: Verified Listings */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden xl:flex items-center gap-2.5 absolute left-4 xl:left-8 2xl:left-12 top-32 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E4EAF2] shadow-sm z-10 select-none"
      >
        <div className="w-8 h-8 rounded-xl bg-[#245FA8] flex items-center justify-center text-white shadow-2xs">
          <MapPin className="w-4 h-4" />
        </div>
        <div className="text-left">
          <div className="text-xs font-bold text-[#172033] leading-none mb-0.5">Verified</div>
          <div className="text-[10px] text-[#667085] leading-none">Listings</div>
        </div>
      </motion.div>

      {/* Floating Right Annotation Badge: Trusted Brokers */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden xl:flex items-center gap-2.5 absolute right-4 xl:right-8 2xl:right-12 top-32 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E4EAF2] shadow-sm z-10 select-none"
      >
        <div className="w-8 h-8 rounded-xl bg-[#245FA8] flex items-center justify-center text-white shadow-2xs">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="text-left">
          <div className="text-xs font-bold text-[#172033] leading-none mb-0.5">Trusted</div>
          <div className="text-[10px] text-[#667085] leading-none">Brokers</div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Header Copy */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/95 backdrop-blur-xs border border-[#E4EAF2] rounded-full text-xs font-semibold text-[#172033] shadow-2xs mb-5"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#397BCF] animate-pulse" />
            <span>India&apos;s Verified Real Estate Discovery Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-[54px] font-display font-bold text-[#172033] tracking-tight leading-[1.15] mb-4 text-balance"
          >
            Find Properties for <span className="gradient-text">Sale &amp; Rent</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-[#475467] font-medium leading-relaxed max-w-2xl mx-auto text-balance"
          >
            Discover verified residential and commercial properties directly from local real estate brokers across Surat, Gujarat and India.
          </motion.p>
        </div>

        {/* Centerpiece Property Search Engine Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto bg-white/98 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_-15px_rgb(57_123_207/0.15)] border border-[#E4EAF2]"
        >
          {/* Buy / Rent Switch Tabs */}
          <div className="flex items-center gap-2 mb-6 border-b border-[#E4EAF2] pb-4">
            <button
              type="button"
              onClick={() => setTransactionType("sale")}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${transactionType === "sale"
                  ? "bg-[#245FA8] text-white shadow-xs"
                  : "text-[#475467] hover:text-[#172033] hover:bg-[#F3F8FE]"
                }`}
            >
              <Home className="w-4 h-4" />
              <span>Buy Property</span>
            </button>
            <button
              type="button"
              onClick={() => setTransactionType("rent")}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${transactionType === "rent"
                  ? "bg-[#245FA8] text-white shadow-xs"
                  : "text-[#475467] hover:text-[#172033] hover:bg-[#F3F8FE]"
                }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>Rent Property</span>
            </button>
            <span className="hidden md:inline-flex items-center gap-1.5 ml-auto text-xs text-[#245FA8] bg-[#F3F8FE] border border-[#E4EAF2] px-3.5 py-1.5 rounded-full font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#397BCF]" />
              <span>Direct Broker Listings · Zero Middleman Markup</span>
            </span>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Primary Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#397BCF]">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search city, locality, or project (e.g. Vesu, Adajan, Pal, City Light, SG Highway)..."
                className="w-full pl-12 pr-4 py-4 text-sm sm:text-base font-medium text-[#172033] placeholder:text-[#98A2B3] bg-[#F8FAFC] border-2 border-[#E4EAF2] rounded-2xl focus:bg-white focus:border-[#397BCF] transition-all outline-none"
              />
            </div>

            {/* Filter Dropdowns + Search Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3.5 pt-2">
              {/* Property Type */}
              <div className="flex-[1.2] min-w-0">
                <label className="block text-[11px] font-bold text-[#667085] uppercase tracking-wider mb-1.5">
                  Property Type
                </label>
                <CustomSelect
                  value={propertyType}
                  onChange={setPropertyType}
                  options={propertyTypes}
                  size="default"
                />
              </div>

              {/* Budget Selector */}
              <div className="flex-1 min-w-0">
                <label className="block text-[11px] font-bold text-[#667085] uppercase tracking-wider mb-1.5">
                  Budget
                </label>
                <CustomSelect
                  value={budget}
                  onChange={setBudget}
                  options={budgetRanges}
                  size="default"
                />
              </div>

              {/* BHK Selector */}
              <div className="w-full sm:w-28 shrink-0">
                <label className="block text-[11px] font-bold text-[#667085] uppercase tracking-wider mb-1.5">
                  BHK
                </label>
                <CustomSelect
                  value={bhk}
                  onChange={setBhk}
                  options={bhkOptions}
                  size="default"
                />
              </div>

              {/* Search Button */}
              <div className="shrink-0">
                <button
                  type="submit"
                  id="hero-search-submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-6 bg-[#245FA8] hover:bg-[#1E4E8C] text-white font-bold rounded-xl text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] whitespace-nowrap cursor-pointer h-[48px]"
                >
                  <Search className="w-4 h-4 shrink-0" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </form>

          {/* Quick Popular Localities in Surat / Gujarat */}
          <div className="mt-6 pt-4 border-t border-[#E4EAF2] flex items-center gap-2 flex-wrap text-xs text-[#667085]">
            <span className="font-bold text-[#172033] shrink-0">Popular in Surat:</span>
            {["Vesu", "Adajan", "Pal", "City Light", "Althan", "Piplod", "Dumas Road"].map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setQuery(loc);
                  router.push(`/properties?q=${encodeURIComponent(loc)}&transaction=${transactionType}`);
                }}
                className="px-2.5 py-1 rounded-lg bg-[#F3F8FE] hover:bg-[#EAF3FF] hover:text-[#397BCF] text-[#475467] font-medium transition-colors cursor-pointer"
              >
                {loc}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
