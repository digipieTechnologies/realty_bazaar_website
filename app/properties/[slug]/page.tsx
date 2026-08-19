import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Bed, Bath, Square, ChevronRight, Calendar, CheckCircle } from "lucide-react";
import { getPropertyBySlug, getAllPropertySlugs } from "@/lib/supabase/queries";
import { generatePropertyMetaTitle, formatPrice } from "@/lib/utils";
import PropertyGallery from "@/components/property/PropertyGallery";
import EnquiryForm from "@/components/property/EnquiryForm";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return { title: "Property Not Found" };
  }

  const title = generatePropertyMetaTitle(property);
  const description = property.description
    ? `${property.description.slice(0, 155)}...`
    : `View details, photos and pricing for ${property.title} in ${property.locality}, ${property.city}.`;

  const image = property.images?.[0];

  return {
    title,
    description,
    alternates: {
      canonical: `https://therealtybazaar.com/properties/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://therealtybazaar.com/properties/${slug}`,
      images: image ? [{ url: image, width: 1200, height: 630, alt: property.title }] : [],
    },
  };
}

export const revalidate = 60;

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const price = formatPrice(property.price, property.price_display);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `https://therealtybazaar.com/properties/${slug}`,
    image: property.images || [],
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.locality,
      addressRegion: property.city,
      addressCountry: "IN",
    },
    numberOfRooms: property.bedrooms,
    floorSize: property.area_sqft
      ? { "@type": "QuantitativeValue", value: property.area_sqft, unitCode: "FTK" }
      : undefined,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://therealtybazaar.com" },
      { "@type": "ListItem", position: 2, name: "Properties", item: "https://therealtybazaar.com/properties" },
      { "@type": "ListItem", position: 3, name: property.title, item: `https://therealtybazaar.com/properties/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Breadcrumb */}
      <nav className="bg-[#F8FAFC] border-b border-[#E4EAF2] py-3" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-1.5 text-xs text-[#667085]">
            <li><Link href="/" className="hover:text-[#397BCF] transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3 h-3" aria-hidden="true" /></li>
            <li><Link href="/properties" className="hover:text-[#397BCF] transition-colors">Properties</Link></li>
            <li><ChevronRight className="w-3 h-3" aria-hidden="true" /></li>
            <li className="text-[#172033] font-medium truncate max-w-[200px]">{property.title}</li>
          </ol>
        </div>
      </nav>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left — Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <PropertyGallery images={property.images || []} title={property.title} />

            {/* Title and price */}
            <div>
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#172033] mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-1.5 text-[#667085]">
                    <MapPin className="w-4 h-4 text-[#397BCF]" />
                    <span className="text-sm">{property.locality}, {property.city}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-display font-bold text-[#172033]">{price}</div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                    property.transaction_type === "sale"
                      ? "bg-[#EAF3FF] text-[#245FA8]"
                      : "bg-[#F3F8FE] text-[#397BCF]"
                  }`}>
                    {property.transaction_type === "sale" ? "For Sale" : "For Rent"}
                  </span>
                </div>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-3">
                {property.bedrooms && (
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E4EAF2] rounded-xl text-sm font-medium text-[#172033]">
                    <Bed className="w-4 h-4 text-[#397BCF]" />
                    {property.bedrooms} Bedrooms
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E4EAF2] rounded-xl text-sm font-medium text-[#172033]">
                    <Bath className="w-4 h-4 text-[#397BCF]" />
                    {property.bathrooms} Bathrooms
                  </div>
                )}
                {property.area_sqft && (
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E4EAF2] rounded-xl text-sm font-medium text-[#172033]">
                    <Square className="w-4 h-4 text-[#397BCF]" />
                    {property.area_sqft.toLocaleString("en-IN")} sq ft
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div className="bg-[#F8FAFC] border border-[#E4EAF2] rounded-2xl p-5">
                <h2 className="text-base font-bold text-[#172033] mb-3">About This Property</h2>
                <p className="text-sm text-[#667085] leading-relaxed">{property.description}</p>
              </div>
            )}

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-[#F8FAFC] border border-[#E4EAF2] rounded-2xl p-5">
                <h2 className="text-base font-bold text-[#172033] mb-3">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                      <span className="text-sm text-[#667085]">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Property details */}
            <div className="bg-[#F8FAFC] border border-[#E4EAF2] rounded-2xl p-5">
              <h2 className="text-base font-bold text-[#172033] mb-3">Property Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { label: "Property Type", value: property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1) },
                  { label: "Transaction", value: property.transaction_type === "sale" ? "For Sale" : "For Rent" },
                  { label: "City", value: property.city },
                  { label: "Locality", value: property.locality },
                  property.bedrooms ? { label: "Bedrooms", value: `${property.bedrooms} BHK` } : null,
                  property.area_sqft ? { label: "Area", value: `${property.area_sqft.toLocaleString("en-IN")} sq ft` } : null,
                ]
                  .filter(Boolean)
                  .map((item) => (
                    <div key={item!.label}>
                      <div className="text-[10px] font-semibold text-[#98A2B3] uppercase tracking-wider mb-0.5">{item!.label}</div>
                      <div className="font-semibold text-[#172033]">{item!.value}</div>
                    </div>
                  ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[#E4EAF2] text-xs text-[#98A2B3] flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                Listed on {new Date(property.created_at).toLocaleDateString("en-IN", {
                  day: "numeric", month: "long", year: "numeric"
                })}
              </div>
            </div>
          </div>

          {/* Right — Enquiry sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <EnquiryForm property={property} />

              {/* Lead source note */}
              <div className="bg-[#EAF3FF] border border-[#6FA5E5]/30 rounded-xl p-4 text-xs text-[#245FA8]">
                <div className="font-semibold mb-1">🔒 Your enquiry is safe</div>
                <div className="leading-relaxed">
                  Your contact details are shared only with the listing broker.
                  No account required.
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E4EAF2] p-4 flex gap-3 z-30 shadow-[0_-4px_20px_-4px_rgb(0_0_0/0.1)]">
        {property.broker_phone && (
          <a
            href={`tel:${property.broker_phone}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl text-sm transition-all"
            id="mobile-call-broker"
          >
            Call Broker
          </a>
        )}
        {property.broker_whatsapp && (
          <a
            href={`https://wa.me/${property.broker_whatsapp.replace(/\D/g, "")}?text=Hi, I'm interested in ${property.title}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#397BCF] hover:bg-[#245FA8] text-white font-semibold rounded-xl text-sm transition-all"
            id="mobile-whatsapp-broker"
          >
            WhatsApp
          </a>
        )}
      </div>

      {/* Spacer for mobile sticky bar */}
      <div className="lg:hidden h-20" aria-hidden="true" />
    </>
  );
}
