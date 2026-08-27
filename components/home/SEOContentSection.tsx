import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function SEOContentSection() {
  return (
    <section className="section-padding bg-[#F8FAFC] border-t border-[#E4EAF2]" aria-labelledby="seo-overview-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E4EAF2] shadow-2xs space-y-8">
            <div>
              <h2
                id="seo-overview-heading"
                className="text-xl sm:text-2xl font-display font-bold text-[#172033] mb-3"
              >
                Find Residential & Commercial Properties Across India
              </h2>
              <p className="text-sm text-[#667085] leading-relaxed">
                The Realty Bazaar is an Indian real-estate discovery marketplace connecting home buyers, tenants, and commercial investors directly with verified local brokers. Whether you are searching for high-rise apartments in Surat&apos;s VIP Road and Vesu, gated luxury villas in Adajan, premium office spaces on Ring Road, or modern condominiums along Ahmedabad&apos;s SG Highway corridor, our platform brings verified real estate inventory directly to your screen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#E4EAF2]">
              <div>
                <h3 className="text-sm font-bold text-[#172033] mb-2.5">
                  Popular Residential Searches
                </h3>
                <ul className="space-y-1.5 text-xs text-[#475467]">
                  <li>
                    <Link href="/properties?city=Surat&bhk=2" rel="nofollow" className="hover:text-[#397BCF] transition-colors">
                      2 BHK Flats in Surat
                    </Link>
                  </li>
                  <li>
                    <Link href="/properties?city=Surat&bhk=3" rel="nofollow" className="hover:text-[#397BCF] transition-colors">
                      3 BHK Luxury Apartments in Vesu
                    </Link>
                  </li>
                  <li>
                    <Link href="/properties?type=villa&city=Surat" rel="nofollow" className="hover:text-[#397BCF] transition-colors">
                      Villas in Adajan & Pal
                    </Link>
                  </li>
                  <li>
                    <Link href="/properties?city=Ahmedabad&type=apartment" rel="nofollow" className="hover:text-[#397BCF] transition-colors">
                      Apartments on SG Highway Ahmedabad
                    </Link>
                  </li>
                  <li>
                    <Link href="/properties?city=Mumbai&bhk=2" rel="nofollow" className="hover:text-[#397BCF] transition-colors">
                      Sea View Apartments in Bandra Mumbai
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#172033] mb-2.5">
                  Commercial Real Estate
                </h3>
                <ul className="space-y-1.5 text-xs text-[#475467]">
                  <li>
                    <Link href="/properties?type=commercial&city=Surat" rel="nofollow" className="hover:text-[#397BCF] transition-colors">
                      Office Space on Ring Road Surat
                    </Link>
                  </li>
                  <li>
                    <Link href="/properties?type=shop&city=Surat" rel="nofollow" className="hover:text-[#397BCF] transition-colors">
                      Retail Shops on Ghod Dod Road
                    </Link>
                  </li>
                  <li>
                    <Link href="/properties?type=plot" rel="nofollow" className="hover:text-[#397BCF] transition-colors">
                      Residential Plots on Dumas Road
                    </Link>
                  </li>
                  <li>
                    <Link href="/properties?type=commercial&transaction=rent" rel="nofollow" className="hover:text-[#397BCF] transition-colors">
                      Commercial Space for Rent in Gujarat
                    </Link>
                  </li>
                  <li>
                    <Link href="/properties?type=warehouse" rel="nofollow" className="hover:text-[#397BCF] transition-colors">
                      Warehouses & Godowns in Industrial Hubs
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#172033] mb-2.5">
                  Explore by Budget Range
                </h3>
                <ul className="space-y-1.5 text-xs text-[#475467]">
                  <li>
                    <Link href="/properties?maxPrice=5000000" rel="nofollow" className="hover:text-[#397BCF] transition-colors">
                      Affordable Homes Under ₹50 Lakh
                    </Link>
                  </li>
                  <li>
                    <Link href="/properties?minPrice=5000000&maxPrice=10000000" rel="nofollow" className="hover:text-[#397BCF] transition-colors">
                      Mid-Segment Flats ₹50L – ₹1 Crore
                    </Link>
                  </li>
                  <li>
                    <Link href="/properties?minPrice=10000000&maxPrice=25000000" rel="nofollow" className="hover:text-[#397BCF] transition-colors">
                      Premium Homes ₹1 Crore – ₹2.5 Crore
                    </Link>
                  </li>
                  <li>
                    <Link href="/properties?minPrice=25000000" rel="nofollow" className="hover:text-[#397BCF] transition-colors">
                      Ultra-Luxury Properties Above ₹2.5 Crore
                    </Link>
                  </li>
                  <li>
                    <Link href="/properties?transaction=rent" rel="nofollow" className="hover:text-[#397BCF] transition-colors">
                      Rental Properties in Top Locations
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
