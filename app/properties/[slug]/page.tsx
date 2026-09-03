import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  ChevronRight,
  Calendar,
  CheckCircle2,
  Compass,
  Layers,
  Key,
  Car,
  Building2,
  IndianRupee,
  ExternalLink,
} from "lucide-react";
import {
  getPropertyBySlug,
  getAllPropertySlugs,
  getSimilarProperties,
  getPropertyFaqs,
} from "@/lib/supabase/queries";
import {
  generatePropertyMetaTitle,
  formatPrice,
  formatLocation,
  getMapUrl,
} from "@/lib/utils";
import type { Property } from "@/types";

import PropertyGallery from "@/components/property/PropertyGallery";
import EnquiryForm from "@/components/property/EnquiryForm";
import PropertyCard from "@/components/property/PropertyCard";
import SharePropertyButton from "@/components/property/SharePropertyButton";
import SavePropertyButton from "@/components/property/SavePropertyButton";
import PropertyViewTracker from "@/components/property/PropertyViewTracker";
import PropertyMobileStickyBar from "@/components/property/PropertyMobileStickyBar";
import PropertyInterestedPopup from "@/components/property/PropertyInterestedPopup";
import PropertyFAQSection from "@/components/property/PropertyFAQSection";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://therealtybazaar.com";

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
    return {
      title: "Property Not Found",
      description: "The requested property listing could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = generatePropertyMetaTitle(property);
  const locText = formatLocation(property.locality, property.city);

  const description = property.description
    ? `${property.description.slice(0, 155).trim()}...`
    : `Explore photos, verified pricing, floor plans, amenities, and direct broker contact for ${property.title} in ${locText}.`;

  const canonicalUrl = `${SITE_URL}/properties/${slug}`;
  const defaultOgImage = `${SITE_URL}/images/og/og-image.jpg`;

  // Filter valid absolute image URLs
  const validImages: string[] = (property.images ?? []).filter(
    (img): img is string =>
      typeof img === "string" &&
      img.trim().length > 0 &&
      (img.startsWith("https://") || img.startsWith("http://"))
  );

  const primaryImageUrl = validImages.length > 0 ? validImages[0] : defaultOgImage;

  const ogImages = validImages.length > 0
    ? validImages.slice(0, 4).map((url, idx) => ({
      url,
      width: 1200,
      height: 630,
      alt: `${property.title}${idx > 0 ? ` – Photo ${idx + 1}` : ""}`,
    }))
    : [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${property.title} | The Realty Bazaar`,
      },
    ];

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      siteName: "The Realty Bazaar",
      locale: "en_IN",
      title,
      description,
      url: canonicalUrl,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      site: "@therealtybazaar",
      creator: "@therealtybazaar",
      title,
      description,
      images: [primaryImageUrl],
    },
  };
}

function PropertySummaryCard({
  property,
  price,
  areaSqm,
  isPlot,
  className = "",
}: {
  property: Property;
  price: string;
  areaSqm: string | null;
  isPlot: boolean;
  className?: string;
}) {

  return (
    <section
      className={`bg-white rounded-3xl p-4 sm:p-6 border border-[#E4EAF2] shadow-2xs ${className}`}
      aria-label="Property Summary"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Left: Badges, Title, Location */}
        <div className="space-y-2 min-w-0 flex-1">
          {/* Badges Row */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="bg-[#245FA8] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-2xs">
              {property.transaction_type === "sale" ? "For Sale" : "For Rent"}
            </span>
            <span className="bg-[#F3F8FE] text-[#245FA8] border border-[#6FA5E5]/30 text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase">
              {property.property_type}
            </span>
            {property.property_code && (
              <span className="bg-[#F8FAFC] text-[#245FA8] border border-[#E4EAF2] text-[11px] font-bold px-2 py-0.5 rounded-md font-mono">
                #{property.property_code}
              </span>
            )}
            {property.promoted && (
              <span className="bg-[#172033] text-[#6FA5E5] text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                Promoted
              </span>
            )}
            {property.featured && !property.promoted && (
              <span className="bg-[#EAF3FF] text-[#245FA8] border border-[#6FA5E5]/40 text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                Featured
              </span>
            )}
            {property.broker_verified && (
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2 py-0.5 rounded-md">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>Verified Listing</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-[#172033] tracking-tight leading-snug">
            {property.title}
          </h1>

          {/* Location / Interactive Map Navigation */}
          <div>
            <a
              href={getMapUrl(property)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#475467] hover:text-[#397BCF] group transition-colors cursor-pointer"
              title="Open location in Google / Apple Maps"
            >
              <MapPin className="w-3.5 h-3.5 text-[#397BCF] group-hover:scale-110 transition-transform shrink-0" />
              <span className="group-hover:underline underline-offset-2 font-medium text-xs sm:text-sm">
                {property.address || `${property.locality}, ${property.city}`}
              </span>
              <ExternalLink className="w-3 h-3 text-[#98A2B3] group-hover:text-[#397BCF] opacity-70 group-hover:opacity-100 transition-opacity shrink-0" />
            </a>
          </div>
        </div>

        {/* Right: Key Commercial Metrics & Actions */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 lg:gap-7 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E4EAF2] shrink-0">
          {/* Metric 1: Price */}
          <div className="min-w-[110px]">
            <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-0.5 flex items-center gap-1">
              <IndianRupee className="w-3 h-3 text-[#397BCF]" />
              <span>Price</span>
            </div>
            <div className="text-xl sm:text-2xl font-display font-bold text-[#172033] tracking-tight">
              {price}
            </div>
            {property.price_per_sqft && property.transaction_type === "sale" && (
              <div className="text-[11px] text-[#667085] font-medium mt-0.5">
                ₹{property.price_per_sqft.toLocaleString("en-IN")} / sq ft
              </div>
            )}
          </div>

          {/* Divider */}
          {property.area_sqft && (
            <div className="hidden sm:block w-px h-10 bg-[#E4EAF2]" aria-hidden="true" />
          )}

          {/* Metric 2: Area */}
          {property.area_sqft && (
            <div className="min-w-[105px]">
              <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-0.5 flex items-center gap-1">
                <Square className="w-3 h-3 text-[#397BCF]" />
                <span>{isPlot ? "Plot Area" : "Super Built-up"}</span>
              </div>
              <div className="text-xl sm:text-2xl font-display font-bold text-[#172033] tracking-tight">
                {property.area_sqft.toLocaleString("en-IN")}{" "}
                <span className="text-sm sm:text-base font-normal text-[#667085]">sq ft</span>
              </div>
              {areaSqm && (
                <div className="text-[11px] text-[#667085] font-medium mt-0.5">
                  {areaSqm} sq m
                </div>
              )}
            </div>
          )}

          {/* Divider */}
          {(property.bedrooms || property.bathrooms || isPlot) && (
            <div className="hidden sm:block w-px h-10 bg-[#E4EAF2]" aria-hidden="true" />
          )}

          {/* Metric 3: Configuration */}
          <div className="min-w-[100px]">
            <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-0.5 flex items-center gap-1">
              <Bed className="w-3 h-3 text-[#397BCF]" />
              <span>Configuration</span>
            </div>
            <div className="text-xl sm:text-2xl font-display font-bold text-[#172033] tracking-tight">
              {property.bedrooms
                ? `${property.bedrooms} BHK`
                : property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)}
            </div>
            <div className="text-[11px] text-[#667085] font-medium mt-0.5">
              {property.bedrooms
                ? `${property.bedrooms} Bed${property.bedrooms > 1 ? "s" : ""}`
                : ""}
              {property.bedrooms && property.bathrooms ? " · " : ""}
              {property.bathrooms
                ? `${property.bathrooms} Bath${property.bathrooms > 1 ? "s" : ""}`
                : ""}
              {!property.bedrooms && !property.bathrooms ? "Direct Property" : ""}
            </div>
          </div>


          {/* Action Buttons: Share & Save */}
          <div className="flex sm:flex-col items-center gap-2 ml-auto sm:ml-0 w-full sm:w-auto pt-2 sm:pt-0">
            <SharePropertyButton
              property={property}
              variant="secondary"
              label="Share"
              className="flex-1 sm:flex-none w-full sm:w-24 justify-center"
              id="property-header-share-btn"
            />
            <SavePropertyButton
              property={property}
              className="flex-1 sm:flex-none w-full sm:w-24 justify-center"
              id="property-header-save-btn"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export const revalidate = 60;

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const [similarProperties, faqs] = await Promise.all([
    getSimilarProperties(property, 3),
    getPropertyFaqs(property.id),
  ]);
  const price = formatPrice(property.price, property.price_display);
  const cleanPhone = property.broker_phone?.replace(/\D/g, "") || "9876543210";
  const cleanWhatsApp = property.broker_whatsapp?.replace(/\D/g, "") || cleanPhone;

  // Real Estate structured data mapping according to Schema.org standards
  const propertySchemaType = (() => {
    switch (property.property_type) {
      case "apartment":
      case "studio":
        return "Apartment";
      case "villa":
        return "SingleFamilyResidence";
      case "house":
        return "House";
      case "commercial":
      case "office":
      case "shop":
      case "warehouse":
        return "CommercialProperty";
      case "plot":
        return "Landform";
      default:
        return "Accommodation";
    }
  })();

  const locDisplay = formatLocation(property.locality, property.city);

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `https://therealtybazaar.com/properties/${slug}#listing`,
    name: property.title,
    description:
      property.description ||
      `${property.bedrooms ? `${property.bedrooms} BHK ` : ""}${property.property_type} ${property.transaction_type === "sale" ? "for sale" : "for rent"
      } in ${locDisplay}.`,
    url: `https://therealtybazaar.com/properties/${slug}`,
    datePosted: property.created_at,
    dateModified: property.updated_at || property.created_at,
    ...(property.images && property.images.length > 0 && { image: property.images }),
    mainEntity: {
      "@type": propertySchemaType,
      name: property.title,
      description: property.description || property.title,
      url: `https://therealtybazaar.com/properties/${slug}`,
      ...(property.bedrooms && { numberOfRooms: property.bedrooms, numberOfBedrooms: property.bedrooms }),
      ...(property.bathrooms && { numberOfBathroomsTotal: property.bathrooms }),
      ...(property.area_sqft && {
        floorSize: {
          "@type": "QuantitativeValue",
          value: property.area_sqft,
          unitCode: "FTK",
        },
      }),
      address: {
        "@type": "PostalAddress",
        addressLocality: property.locality || property.city,
        addressRegion: "Gujarat",
        addressCountry: "IN",
        ...(property.address ? { streetAddress: property.address } : {}),
      },
      ...(property.amenities && property.amenities.length > 0 && {
        amenityFeature: property.amenities.map((a) => ({
          "@type": "LocationFeatureSpecification",
          name: a,
          value: true,
        })),
      }),
    },
    ...(property.price && {
      offers: {
        "@type": "Offer",
        price: property.price,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: `https://therealtybazaar.com/properties/${slug}`,
        businessFunction:
          property.transaction_type === "sale"
            ? "https://schema.org/Sell"
            : "https://schema.org/LeaseOut",
        seller: {
          "@type": "Organization",
          name: property.broker_agency || property.broker_name || "Verified Broker",
        },
      },
    }),
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

  // Google Rich Snippet FAQPage Schema for Search Engines
  const faqPageLd =
    faqs && faqs.length > 0
      ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      }
      : null;

  const areaSqm = property.area_sqft ? (property.area_sqft * 0.092903).toFixed(1) : null;
  const isPlot = property.property_type === "plot";

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <PropertyViewTracker property={property} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqPageLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd) }} />
      )}


      {/* Breadcrumbs Navigation */}
      <nav className="bg-white border-b border-[#E4EAF2] py-3.5" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-1.5 text-xs text-[#667085] flex-wrap">
            <li>
              <Link href="/" className="hover:text-[#397BCF] transition-colors">
                Home
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-[#98A2B3]" /></li>
            <li>
              <Link href="/properties" className="hover:text-[#397BCF] transition-colors">
                Properties
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-[#98A2B3]" /></li>
            <li>
              <Link
                href={`/properties?city=${encodeURIComponent(property.city)}`}
                className="hover:text-[#397BCF] transition-colors"
              >
                {property.city}
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-[#98A2B3]" /></li>
            <li className="text-[#172033] font-bold truncate max-w-[240px]">
              {property.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Content Layout */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* 1. DESKTOP VIEW: ABOVE-THE-FOLD PROPERTY SUMMARY BANNER */}
        <PropertySummaryCard
          property={property}
          price={price}
          areaSqm={areaSqm}
          isPlot={isPlot}
          className="hidden lg:block mb-6 sm:mb-8"
        />

        {/* 2. MAIN 2-COLUMN VIEW: GALLERY & DETAILS (8 cols) + BROKER ENQUIRY (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left 8 Cols (Gallery + Mobile Summary + Key Specs Badges + Description + Amenities + Overview Table) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Gallery Component (Appears first on Mobile & Top of 8-col on Desktop) */}
            <PropertyGallery images={property.images || []} title={property.title} />

            {/* MOBILE VIEW: Property Summary Appears Immediately Below Images on Mobile */}
            <PropertySummaryCard
              property={property}
              price={price}
              areaSqm={areaSqm}
              isPlot={isPlot}
              className="block lg:hidden"
            />

            {/* Quick Specs 8-Box Features Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E4EAF2] shadow-2xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {property.bedrooms && (
                  <div className="p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E4EAF2] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF3FF] text-[#245FA8] flex items-center justify-center shrink-0">
                      <Bed className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                        Bedrooms
                      </div>
                      <div className="font-bold text-sm text-[#172033] truncate">
                        {property.bedrooms}
                      </div>
                    </div>
                  </div>
                )}

                {property.bathrooms && (
                  <div className="p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E4EAF2] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF3FF] text-[#245FA8] flex items-center justify-center shrink-0">
                      <Bath className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                        Bathrooms
                      </div>
                      <div className="font-bold text-sm text-[#172033] truncate">
                        {property.bathrooms}
                      </div>
                    </div>
                  </div>
                )}

                {property.balconies && (
                  <div className="p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E4EAF2] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF3FF] text-[#245FA8] flex items-center justify-center shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                        Balcony
                      </div>
                      <div className="font-bold text-sm text-[#172033] truncate">
                        {property.balconies}
                      </div>
                    </div>
                  </div>
                )}

                {property.floor && (
                  <div className="p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E4EAF2] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF3FF] text-[#245FA8] flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                        Floor
                      </div>
                      <div className="font-bold text-sm text-[#172033] truncate">
                        {property.floor}
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E4EAF2] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF3FF] text-[#245FA8] flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                      Property Type
                    </div>
                    <div className="font-bold text-sm text-[#172033] truncate capitalize">
                      {property.property_type}
                    </div>
                  </div>
                </div>

                {property.possession && (
                  <div className="p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E4EAF2] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF3FF] text-[#245FA8] flex items-center justify-center shrink-0">
                      <Key className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                        Possession
                      </div>
                      <div className="font-bold text-sm text-[#172033] truncate capitalize">
                        {property.possession.replace(/-/g, " ")}
                      </div>
                    </div>
                  </div>
                )}

                {property.facing && (
                  <div className="p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E4EAF2] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF3FF] text-[#245FA8] flex items-center justify-center shrink-0">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                        Facing
                      </div>
                      <div className="font-bold text-sm text-[#172033] truncate">
                        {property.facing}
                      </div>
                    </div>
                  </div>
                )}

                {property.parking && (
                  <div className="p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E4EAF2] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF3FF] text-[#245FA8] flex items-center justify-center shrink-0">
                      <Car className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                        Parking
                      </div>
                      <div className="font-bold text-sm text-[#172033] truncate">
                        {property.parking} Reserved
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div className="bg-white rounded-3xl p-6 border border-[#E4EAF2] shadow-2xs space-y-3">
                <h2 className="text-lg font-display font-bold text-[#172033]">
                  About This Property
                </h2>
                <p className="text-sm text-[#475467] leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>
            )}

            {/* Amenities Grid */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-[#E4EAF2] shadow-2xs space-y-4">
                <h2 className="text-lg font-display font-bold text-[#172033]">
                  Amenities &amp; Facilities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 p-3 bg-[#F8FAFC] rounded-2xl border border-[#E4EAF2] text-xs font-semibold text-[#172033]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overview / Property Specifications Table */}
            <div className="bg-white rounded-3xl p-6 border border-[#E4EAF2] shadow-2xs space-y-4">
              <h2 className="text-lg font-display font-bold text-[#172033]">
                Property Overview
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                {[
                  property.property_code ? { label: "Property Code", value: `#${property.property_code}` } : null,
                  { label: "Property Type", value: property.property_type.toUpperCase() },
                  { label: "Transaction", value: property.transaction_type === "sale" ? "For Sale" : "For Rent" },
                  { label: "City", value: property.city },
                  { label: "Locality", value: property.locality },
                  property.floor ? { label: "Floor", value: property.floor } : null,
                  property.facing ? { label: "Facing", value: property.facing } : null,
                  property.furnishing ? { label: "Furnishing", value: property.furnishing.toUpperCase() } : null,
                  property.possession ? { label: "Possession Status", value: property.possession.toUpperCase() } : null,
                  property.balconies ? { label: "Balconies", value: `${property.balconies} Balconies` } : null,
                ]
                  .filter(Boolean)
                  .map((item) => (
                    <div key={item!.label} className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E4EAF2]">
                      <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-0.5">
                        {item!.label}
                      </div>
                      <div className="font-bold text-[#172033]">{item!.value}</div>
                    </div>
                  ))}
              </div>
              <div className="pt-2 text-[11px] text-[#667085] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  Listed on {new Date(property.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
            </div>
          </div>

          {/* Right 4 Cols (Sticky Enquiry Form & Broker Card) */}
          <div className="lg:col-span-4 sticky top-24">
            <EnquiryForm property={property} />
          </div>
        </div>

        {/* Property FAQs Section (Full-Width 2-Column Responsive Layout) */}
        <PropertyFAQSection faqs={faqs} property={property} />


        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="mt-14 pt-12 border-t border-[#E4EAF2] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-[#172033]">
                  Similar Properties in {property.city}
                </h2>
                <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
                  Explore other verified properties matching your requirements
                </p>
              </div>
              <Link
                href={`/properties?city=${encodeURIComponent(property.city)}`}
                className="text-xs sm:text-sm font-bold text-[#397BCF] hover:underline"
              >
                View More in {property.city}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Mobile Sticky Contact Bar (Bottom) */}
      <PropertyMobileStickyBar property={property} cleanWhatsApp={cleanWhatsApp} />

      {/* 25-Second Timed Interest Popup for this Property */}
      <PropertyInterestedPopup property={property} />
    </div>
  );
}
