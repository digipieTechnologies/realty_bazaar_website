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
  Sparkles,
  Phone,
} from "lucide-react";
import {
  getPropertyBySlug,
  getAllPropertySlugs,
  getSimilarProperties,
} from "@/lib/supabase/queries";
import { generatePropertyMetaTitle, formatPrice, formatLocation } from "@/lib/utils";
import PropertyGallery from "@/components/property/PropertyGallery";
import EnquiryForm from "@/components/property/EnquiryForm";
import PropertyCard from "@/components/property/PropertyCard";
import SharePropertyButton from "@/components/property/SharePropertyButton";
import PropertyViewTracker from "@/components/property/PropertyViewTracker";
import PropertyMobileStickyBar from "@/components/property/PropertyMobileStickyBar";

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
  const defaultOgImage = `${SITE_URL}/og-image.jpg`;

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

export const revalidate = 60;

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const similarProperties = await getSimilarProperties(property, 3);
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
      `${property.bedrooms ? `${property.bedrooms} BHK ` : ""}${property.property_type} ${
        property.transaction_type === "sale" ? "for sale" : "for rent"
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

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <PropertyViewTracker property={property} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

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
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Cols (Gallery + Key Specs + Details) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Gallery */}
            <PropertyGallery images={property.images || []} title={property.title} />

            {/* Header: Title, Price, Location */}
            <div className="bg-white rounded-3xl p-6 border border-[#E4EAF2] shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-[#397BCF] text-white text-xs font-bold px-3 py-1 rounded-lg">
                        {property.transaction_type === "sale" ? "For Sale" : "For Rent"}
                      </span>
                      <span className="bg-[#F3F8FE] text-[#245FA8] border border-[#6FA5E5]/30 text-xs font-bold px-3 py-1 rounded-lg">
                        {property.property_type.toUpperCase()}
                      </span>
                      {property.promoted && (
                        <span className="bg-[#172033] text-[#6FA5E5] text-xs font-bold px-3 py-1 rounded-lg">
                          Promoted
                        </span>
                      )}
                    </div>
                    <SharePropertyButton
                      property={property}
                      variant="secondary"
                      label="Share"
                      id="property-header-share-btn"
                    />
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#172033] tracking-tight leading-tight">
                    {property.title}
                  </h1>

                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#667085] mt-2">
                    <MapPin className="w-4 h-4 text-[#397BCF] shrink-0" />
                    <span>{property.address || `${property.locality}, ${property.city}`}</span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="sm:text-right shrink-0">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-[#172033]">
                    {price}
                  </div>
                  {property.price_per_sqft && property.transaction_type === "sale" && (
                    <div className="text-xs text-[#667085] font-medium mt-0.5">
                      ₹{property.price_per_sqft.toLocaleString("en-IN")} / sq ft
                    </div>
                  )}
                </div>
              </div>

              {/* Key Specs Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E4EAF2]">
                {property.bedrooms && (
                  <div className="p-3 bg-[#F8FAFC] rounded-2xl border border-[#E4EAF2]">
                    <div className="flex items-center gap-1.5 text-[#667085] text-xs mb-1">
                      <Bed className="w-4 h-4 text-[#397BCF]" />
                      <span>Bedrooms</span>
                    </div>
                    <div className="font-bold text-sm text-[#172033]">{property.bedrooms} BHK</div>
                  </div>
                )}

                {property.bathrooms && (
                  <div className="p-3 bg-[#F8FAFC] rounded-2xl border border-[#E4EAF2]">
                    <div className="flex items-center gap-1.5 text-[#667085] text-xs mb-1">
                      <Bath className="w-4 h-4 text-[#397BCF]" />
                      <span>Bathrooms</span>
                    </div>
                    <div className="font-bold text-sm text-[#172033]">{property.bathrooms} Baths</div>
                  </div>
                )}

                {property.area_sqft && (
                  <div className="p-3 bg-[#F8FAFC] rounded-2xl border border-[#E4EAF2]">
                    <div className="flex items-center gap-1.5 text-[#667085] text-xs mb-1">
                      <Square className="w-4 h-4 text-[#397BCF]" />
                      <span>Super Built-up</span>
                    </div>
                    <div className="font-bold text-sm text-[#172033]">
                      {property.area_sqft.toLocaleString("en-IN")} sq ft
                    </div>
                  </div>
                )}

                {property.carpet_sqft && (
                  <div className="p-3 bg-[#F8FAFC] rounded-2xl border border-[#E4EAF2]">
                    <div className="flex items-center gap-1.5 text-[#667085] text-xs mb-1">
                      <Layers className="w-4 h-4 text-[#397BCF]" />
                      <span>Carpet Area</span>
                    </div>
                    <div className="font-bold text-sm text-[#172033]">
                      {property.carpet_sqft.toLocaleString("en-IN")} sq ft
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
                  Amenities & Facilities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 p-3 bg-[#F8FAFC] rounded-2xl border border-[#E4EAF2] text-xs font-semibold text-[#172033]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
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
                      <div className="text-[10px] font-bold text-[#98A2B3] uppercase tracking-wider mb-0.5">
                        {item!.label}
                      </div>
                      <div className="font-bold text-[#172033]">{item!.value}</div>
                    </div>
                  ))}
              </div>
              <div className="pt-2 text-[11px] text-[#98A2B3] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  Listed on {new Date(property.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
            </div>
          </div>

          {/* Right 4 Cols (Sticky Enquiry Form & Broker Card) */}
          <div className="lg:col-span-4">
            <EnquiryForm property={property} />
          </div>
        </div>

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
    </div>
  );
}
