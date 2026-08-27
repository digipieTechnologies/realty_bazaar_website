"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import CustomSelect from "@/components/ui/CustomSelect";

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

    if (budget !== "Any") {
      const [min, max] = budget.split("-");
      if (min) params.set("minPrice", min);
      if (max) params.set("maxPrice", max);
    }

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-20 overflow-hidden bg-gradient-to-b from-[#F3F8FE] via-white to-white">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-gradient-to-r from-[#EAF3FF]/80 via-[#F3F8FE]/50 to-[#EAF3FF]/80 rounded-full blur-3xl pointer-events-none opacity-70 -z-10" />
      <div className="absolute top-16 right-[-5%] w-[450px] h-[450px] bg-[#397BCF]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header Copy */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/90 backdrop-blur-xs border border-[#E4EAF2] rounded-full text-xs font-semibold text-[#172033] shadow-2xs mb-4"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#397BCF] animate-pulse" />
            <span>India&apos;s Verified Real Estate Discovery Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-[54px] font-display font-bold text-[#172033] tracking-tight leading-[1.15] mb-3 text-balance"
          >
            Find Properties for <span className="gradient-text">Sale &amp; Rent</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-[#667085] leading-relaxed max-w-2xl mx-auto text-balance"
          >
            Discover verified residential and commercial properties directly from local real estate brokers across Surat, Gujarat and India.
          </motion.p>
        </div>

        {/* Centerpiece Property Search Engine Card (Original Compact max-w-4xl) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto bg-white rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_-15px_rgb(57_123_207/0.12)] border border-[#E4EAF2]"
        >
          {/* Buy / Rent Switch Tabs */}
          <div className="flex items-center gap-2 mb-4 border-b border-[#E4EAF2] pb-3">
            <button
              type="button"
              onClick={() => setTransactionType("sale")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${transactionType === "sale"
                  ? "bg-[#397BCF] text-white shadow-xs"
                  : "text-[#667085] hover:text-[#172033] hover:bg-[#F3F8FE]"
                }`}
            >
              Buy Property
            </button>
            <button
              type="button"
              onClick={() => setTransactionType("rent")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${transactionType === "rent"
                  ? "bg-[#397BCF] text-white shadow-xs"
                  : "text-[#667085] hover:text-[#172033] hover:bg-[#F3F8FE]"
                }`}
            >
              Rent Property
            </button>
            <span className="hidden md:inline-block ml-auto text-xs text-[#98A2B3] font-medium">
              Direct Broker Listings · Zero Middleman Markup
            </span>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-3">
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
                className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base font-medium text-[#172033] placeholder:text-[#98A2B3] bg-[#F8FAFC] border-2 border-[#E4EAF2] rounded-2xl focus:bg-white focus:border-[#397BCF] transition-all outline-none"
              />
            </div>

            {/* Filter Dropdowns + Compact Search Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 pt-1">
              {/* Property Type */}
              <div className="flex-[1.2] min-w-0">
                <label className="block text-[11px] font-bold text-[#667085] uppercase tracking-wider mb-1">
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
                <label className="block text-[11px] font-bold text-[#667085] uppercase tracking-wider mb-1">
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
                <label className="block text-[11px] font-bold text-[#667085] uppercase tracking-wider mb-1">
                  BHK
                </label>
                <CustomSelect
                  value={bhk}
                  onChange={setBhk}
                  options={bhkOptions}
                  size="default"
                />
              </div>

              {/* Compact Search Button */}
              <div className="shrink-0">
                <button
                  type="submit"
                  id="hero-search-submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 bg-[#397BCF] hover:bg-[#245FA8] text-white font-bold rounded-xl text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] whitespace-nowrap cursor-pointer h-[48px]"
                >
                  <Search className="w-4 h-4 shrink-0" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </form>

          {/* Quick Popular Localities in Surat / Gujarat */}
          <div className="mt-4 pt-3 border-t border-[#E4EAF2] flex items-center gap-2 flex-wrap text-xs text-[#667085]">
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

        {/* Value Highlights under Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-8 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto"
        >
          {[
            { label: "Verified Broker Listings", sub: "Direct Ground Inventory" },
            { label: "Direct WhatsApp & Call", sub: "Instant Connection" },
            { label: "Site Visit Coordination", sub: "Schedule on your time" },
            { label: "High-Res Photography", sub: "Authentic Property Views" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-4 rounded-2xl bg-white border border-[#E4EAF2] text-center shadow-2xs"
            >
              <div className="text-xs sm:text-sm font-bold text-[#172033]">{item.label}</div>
              <div className="text-[11px] text-[#667085] mt-0.5">{item.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
