import Link from "next/link";
import { Search, Compass, MessageSquare, CalendarCheck, CheckCircle2, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Search",
    description: "Filter properties across top Indian cities by location, BHK, budget & property type.",
    color: "bg-blue-50 text-[#397BCF] border-blue-100",
  },
  {
    step: "02",
    icon: Compass,
    title: "Explore",
    description: "Browse high-res photos, floor plans, verified specs, amenities, and exact locality details.",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    step: "03",
    icon: MessageSquare,
    title: "Connect",
    description: "Contact the broker directly via Phone or WhatsApp with zero middleman friction.",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    step: "04",
    icon: CalendarCheck,
    title: "Visit",
    description: "Schedule a physical or virtual site visit directly with the broker on your schedule.",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    step: "05",
    icon: CheckCircle2,
    title: "Decide",
    description: "Finalize terms, review documentation, and move into your dream home or commercial space.",
    color: "bg-cyan-50 text-cyan-600 border-cyan-100",
  },
];

export default function HowMarketplaceWorks() {
  return (
    <section className="section-padding bg-white border-t border-[#E4EAF2]" aria-labelledby="how-it-works-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF3FF] text-[#245FA8] border border-[#6FA5E5]/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-[#397BCF]" />
            Simple Discovery Journey
          </div>
          <h2
            id="how-it-works-heading"
            className="text-2xl sm:text-4xl font-display font-bold text-[#172033] tracking-tight mb-3"
          >
            How The Realty Bazaar Works
          </h2>
          <p className="text-sm sm:text-base text-[#667085]">
            From initial search to getting keys in hand, we make connecting with verified local real-estate brokers seamless and direct.
          </p>
        </ScrollReveal>

        {/* 5-Step Pipeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.step} delay={idx * 0.08}>
                <div className="relative p-6 rounded-2xl bg-[#F8FAFC] border border-[#E4EAF2] hover:border-[#397BCF] hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${item.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-[#98A2B3] bg-white px-2 py-1 rounded-md border border-[#E4EAF2]">
                        Step {item.step}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[#172033] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Action Link */}
        <div className="text-center mt-10">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#397BCF] hover:text-[#245FA8] group"
          >
            <span>Start browsing properties now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
