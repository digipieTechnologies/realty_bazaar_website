import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface LocationDiscoverySectionProps {
  counts?: Record<string, number>;
}

const cities = [
  {
    name: "Surat",
    state: "Gujarat",
    localities: "Vesu, Adajan, Pal, Althan, City Light, Piplod, Dumas Road",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
    featured: true,
    href: "/properties?city=Surat",
  },
  {
    name: "Ahmedabad",
    state: "Gujarat",
    localities: "SG Highway, Prahlad Nagar, Bodakdev, Bopal, Science City",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    featured: false,
    href: "/properties?city=Ahmedabad",
  },
  {
    name: "Vadodara",
    state: "Gujarat",
    localities: "Vasna-Bhayli, Alkapuri, Gotri, Sevasi, Old Padra Road",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    featured: false,
    href: "/properties?city=Vadodara",
  },
  {
    name: "Mumbai",
    state: "Maharashtra",
    localities: "Bandra, Andheri, Powai, Juhu, Worli, Thane",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800",
    featured: false,
    href: "/properties?city=Mumbai",
  },
  {
    name: "Pune",
    state: "Maharashtra",
    localities: "Koregaon Park, Baner, Wakad, Viman Nagar, Kharadi",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    featured: false,
    href: "/properties?city=Pune",
  },
  {
    name: "Rajkot",
    state: "Gujarat",
    localities: "Kalawad Road, University Road, 150 Feet Ring Road",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
    featured: false,
    href: "/properties?city=Rajkot",
  },
];

export default function LocationDiscoverySection({ counts = {} }: LocationDiscoverySectionProps) {
  return (
    <section className="section-padding bg-white border-t border-[#E4EAF2]" aria-labelledby="location-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF3FF] text-[#245FA8] border border-[#6FA5E5]/30 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#397BCF]" />
            Prime Real Estate Hubs
          </div>
          <h2
            id="location-heading"
            className="text-2xl sm:text-4xl font-display font-bold text-[#172033] tracking-tight mb-3"
          >
            Explore Properties by Location
          </h2>
          <p className="text-sm sm:text-base text-[#667085]">
            Browse premium residential flats, luxury villas, commercial offices, and freehold plots in top high-growth Indian cities.
          </p>
        </ScrollReveal>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, idx) => {
            const count = counts[city.name.toLowerCase()] ?? 0;
            const countBadge = count > 0 ? `${count} ${count === 1 ? "Property" : "Properties"}` : "Explore City";

            return (
              <ScrollReveal key={city.name} delay={idx * 0.06}>
                <Link
                  href={city.href}
                  rel="nofollow"
                  className="group relative block rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[4/3] bg-[#172033] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Background Image */}
                  <Image
                    src={city.image}
                    alt={`Real estate in ${city.name}`}
                    fill
                    sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(50vw - 32px), 380px"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172033]/95 via-[#172033]/40 to-black/20" />

                  {/* Top Badge */}
                  {city.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#397BCF] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                        Primary Market
                      </span>
                    </div>
                  )}

                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                    {countBadge}
                  </div>

                  {/* Bottom City Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight group-hover:text-[#6FA5E5] transition-colors">
                          {city.name}
                        </h3>
                        <p className="text-xs text-white/70 mt-1 line-clamp-1">
                          {city.localities}
                        </p>
                      </div>

                      <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#397BCF] flex items-center justify-center shrink-0 transition-colors">
                        <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
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
