import Link from "next/link";
import { Building, Home, Castle, Trees, Briefcase, Store, Compass, Warehouse, ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const categories = [
  {
    title: "Apartments & Flats",
    description: "1, 2, 3 & 4 BHK high-rises and luxury penthouses",
    count: "650+ Listings",
    icon: Building,
    href: "/properties?type=apartment",
    accent: "bg-blue-50 text-[#397BCF] border-blue-100",
  },
  {
    title: "Luxury Villas",
    description: "Gated community villas with private lawns",
    count: "120+ Listings",
    icon: Castle,
    href: "/properties?type=villa",
    accent: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    title: "Independent Houses",
    description: "Stand-alone residential homes & bungalows",
    count: "95+ Listings",
    icon: Home,
    href: "/properties?type=house",
    accent: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    title: "Plots & Land",
    description: "Clear-title NA residential & commercial plots",
    count: "140+ Listings",
    icon: Trees,
    href: "/properties?type=plot",
    accent: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    title: "Commercial Offices",
    description: "Grade-A corporate office spaces & co-working",
    count: "180+ Listings",
    icon: Briefcase,
    href: "/properties?type=commercial",
    accent: "bg-sky-50 text-sky-600 border-sky-100",
  },
  {
    title: "Retail Shops & Showrooms",
    description: "High-footfall street & complex retail spaces",
    count: "110+ Listings",
    icon: Store,
    href: "/properties?type=shop",
    accent: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    title: "Studio Apartments",
    description: "Compact 1 BHK & modern bachelor studios",
    count: "80+ Listings",
    icon: Compass,
    href: "/properties?type=studio",
    accent: "bg-rose-50 text-rose-600 border-rose-100",
  },
  {
    title: "Warehouses & Logistics",
    description: "Industrial godowns & logistics hubs",
    count: "45+ Listings",
    icon: Warehouse,
    href: "/properties?type=warehouse",
    accent: "bg-slate-50 text-slate-700 border-slate-200",
  },
];

export default function CategoryDiscoverySection() {
  return (
    <section className="section-padding bg-[#F8FAFC] border-t border-[#E4EAF2]" aria-labelledby="category-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF3FF] text-[#245FA8] border border-[#6FA5E5]/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Building className="w-3.5 h-3.5 text-[#397BCF]" />
            Property Types
          </div>
          <h2
            id="category-heading"
            className="text-2xl sm:text-4xl font-display font-bold text-[#172033] tracking-tight mb-3"
          >
            Explore by Property Category
          </h2>
          <p className="text-sm sm:text-base text-[#667085]">
            Whether you are buying your first home or expanding commercial operations, find every asset class curated by brokers.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <ScrollReveal key={category.title} delay={idx * 0.04}>
                <Link
                  href={category.href}
                  className="group relative block p-5 sm:p-6 bg-white border border-[#E4EAF2] rounded-2xl hover:border-[#397BCF] hover:shadow-[0_12px_24px_-8px_rgb(57_123_207/0.12)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${category.accent}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-[#397BCF] bg-[#EAF3FF] px-2.5 py-1 rounded-lg">
                        {category.count}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base sm:text-lg text-[#172033] group-hover:text-[#397BCF] transition-colors mb-1.5">
                      {category.title}
                    </h3>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F3F8FE] flex items-center justify-between text-xs font-bold text-[#397BCF]">
                    <span>Browse Listings</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
