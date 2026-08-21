import { ShieldCheck, PhoneCall, Image as ImageIcon, MapPin, Eye, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const trustPillars = [
  {
    icon: ShieldCheck,
    title: "Verified Broker Listings",
    description:
      "All properties are listed by vetted local real estate consultants actively operating on the ground in your neighborhood.",
  },
  {
    icon: PhoneCall,
    title: "Direct Broker Connection",
    description:
      "No endless middleman call centers or lead brokers. Call or WhatsApp the listing broker directly for authentic pricing.",
  },
  {
    icon: ImageIcon,
    title: "Real Media & Accurate Specs",
    description:
      "Transparent property photography, carpet vs built-up dimensions, Vastu facing, and actual amenities breakdown.",
  },
  {
    icon: MapPin,
    title: "Neighborhood & Locality Context",
    description:
      "Find properties located near top arterial roads, schools, metro corridors, and commercial employment centers.",
  },
  {
    icon: Eye,
    title: "Zero Account Sign-Up to Browse",
    description:
      "Freely browse, search, and compare all listings across India without mandatory account creation or forced popups.",
  },
  {
    icon: CheckCircle,
    title: "Seamless Site Visit Coordination",
    description:
      "Request convenient physical visits directly from the property page and connect on your timeline.",
  },
];

export default function WhyRealtyBazaar() {
  return (
    <section className="section-padding bg-white border-t border-[#E4EAF2]" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF3FF] text-[#245FA8] border border-[#6FA5E5]/30 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#397BCF]" />
            Trust & Transparency
          </div>
          <h2
            id="why-heading"
            className="text-2xl sm:text-4xl font-display font-bold text-[#172033] tracking-tight mb-3"
          >
            Why Search on The Realty Bazaar?
          </h2>
          <p className="text-sm sm:text-base text-[#667085]">
            Built to provide a clean, modern real-estate discovery experience backed by genuine local broker relationships.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={idx * 0.05}>
                <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E4EAF2] hover:border-[#397BCF] hover:shadow-sm transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#E4EAF2] flex items-center justify-center text-[#397BCF] mb-4 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#172033] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
