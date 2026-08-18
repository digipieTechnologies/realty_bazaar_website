import { createPublicServerSupabaseClient } from "./server";
import type { Property } from "@/types";

// Fallback mock data used when Supabase is not yet configured
const MOCK_PROPERTIES: Property[] = [
  {
    id: "1",
    slug: "3-bhk-apartment-vesu-surat",
    title: "3 BHK Apartment in Vesu",
    description:
      "A spacious and well-designed 3 BHK apartment in the heart of Vesu, Surat. This property features modern amenities, excellent connectivity and a premium lifestyle experience.",
    property_type: "apartment",
    transaction_type: "sale",
    price: 12500000,
    price_display: "₹1.25 Cr",
    city: "Surat",
    locality: "Vesu",
    area_sqft: 1650,
    bedrooms: 3,
    bathrooms: 3,
    amenities: [
      "Parking",
      "Gym",
      "Swimming Pool",
      "Security",
      "Lift",
      "Club House",
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    video_url: null,
    broker_name: "Rajesh Properties",
    broker_phone: "+91-9876543210",
    broker_whatsapp: "+91-9876543210",
    featured: true,
    created_at: "2026-01-15T10:00:00Z",
    updated_at: "2026-01-15T10:00:00Z",
  },
  {
    id: "2",
    slug: "4-bhk-villa-adajan-surat",
    title: "4 BHK Villa in Adajan",
    description:
      "A magnificent 4 BHK independent villa in Adajan with private garden, premium finishes and excellent connectivity to the city centre.",
    property_type: "villa",
    transaction_type: "sale",
    price: 25000000,
    price_display: "₹2.5 Cr",
    city: "Surat",
    locality: "Adajan",
    area_sqft: 3200,
    bedrooms: 4,
    bathrooms: 4,
    amenities: ["Private Garden", "Parking", "Security", "Modular Kitchen"],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    ],
    video_url: null,
    broker_name: "Mehta Realty",
    broker_phone: "+91-9876543211",
    broker_whatsapp: "+91-9876543211",
    featured: true,
    created_at: "2026-01-20T10:00:00Z",
    updated_at: "2026-01-20T10:00:00Z",
  },
  {
    id: "3",
    slug: "2-bhk-apartment-pal-surat",
    title: "2 BHK Apartment in Pal",
    description:
      "Affordable and well-located 2 BHK in the fast-developing Pal locality of Surat. Ideal for families and investors.",
    property_type: "apartment",
    transaction_type: "sale",
    price: 6500000,
    price_display: "₹65 Lakh",
    city: "Surat",
    locality: "Pal",
    area_sqft: 1050,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["Parking", "Security", "Lift"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ],
    video_url: null,
    broker_name: "City Homes",
    broker_phone: "+91-9876543212",
    broker_whatsapp: "+91-9876543212",
    featured: false,
    created_at: "2026-02-01T10:00:00Z",
    updated_at: "2026-02-01T10:00:00Z",
  },
  {
    id: "4",
    slug: "commercial-office-ring-road-surat",
    title: "Commercial Office Space on Ring Road",
    description:
      "Prime commercial office space on Surat Ring Road — excellent visibility, high footfall and modern infrastructure.",
    property_type: "commercial",
    transaction_type: "rent",
    price: 85000,
    price_display: "₹85,000/month",
    city: "Surat",
    locality: "Ring Road",
    area_sqft: 2200,
    bedrooms: null,
    bathrooms: 2,
    amenities: [
      "Parking",
      "Security",
      "Power Backup",
      "Air Conditioning",
      "Lift",
    ],
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
    ],
    video_url: null,
    broker_name: "Commercial Spaces Surat",
    broker_phone: "+91-9876543213",
    broker_whatsapp: "+91-9876543213",
    featured: false,
    created_at: "2026-02-10T10:00:00Z",
    updated_at: "2026-02-10T10:00:00Z",
  },
  {
    id: "5",
    slug: "3-bhk-apartment-althan-surat",
    title: "3 BHK Apartment in Althan",
    description:
      "Premium 3 BHK apartment with modern interiors in Althan, Surat — a well-connected and fast-growing residential hub.",
    property_type: "apartment",
    transaction_type: "sale",
    price: 9800000,
    price_display: "₹98 Lakh",
    city: "Surat",
    locality: "Althan",
    area_sqft: 1450,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["Parking", "Gym", "Security", "Lift", "Kids Play Area"],
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
    ],
    video_url: null,
    broker_name: "Prime Properties",
    broker_phone: "+91-9876543214",
    broker_whatsapp: "+91-9876543214",
    featured: true,
    created_at: "2026-02-15T10:00:00Z",
    updated_at: "2026-02-15T10:00:00Z",
  },
  {
    id: "6",
    slug: "1-bhk-studio-citylight-surat",
    title: "1 BHK Studio in City Light",
    description:
      "Compact and elegantly designed 1 BHK studio in the prestigious City Light area of Surat. Perfect for professionals.",
    property_type: "studio",
    transaction_type: "rent",
    price: 18000,
    price_display: "₹18,000/month",
    city: "Surat",
    locality: "City Light",
    area_sqft: 620,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["Security", "Lift", "Power Backup"],
    images: [
      "https://images.unsplash.com/photo-1505873242700-f289a29e1724?w=800",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800",
    ],
    video_url: null,
    broker_name: "Urban Living",
    broker_phone: "+91-9876543215",
    broker_whatsapp: "+91-9876543215",
    featured: false,
    created_at: "2026-03-01T10:00:00Z",
    updated_at: "2026-03-01T10:00:00Z",
  },
];

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return (
    !!url &&
    url !== "https://your-project.supabase.co" &&
    !url.includes("your-project")
  );
}

export async function getPublishedProperties(options?: {
  limit?: number;
  city?: string;
  transactionType?: string;
  propertyType?: string;
  featured?: boolean;
}): Promise<Property[]> {
  if (!isSupabaseConfigured()) {
    let results = [...MOCK_PROPERTIES];
    if (options?.featured) results = results.filter((p) => p.featured);
    if (options?.city)
      results = results.filter(
        (p) => p.city.toLowerCase() === options.city!.toLowerCase()
      );
    if (options?.limit) results = results.slice(0, options.limit);
    return results;
  }

  try {
    const supabase = createPublicServerSupabaseClient();
    let query = supabase
      .from("properties")
      .select(
        "id, slug, title, description, property_type, transaction_type, price, price_display, city, locality, area_sqft, bedrooms, bathrooms, amenities, images, video_url, broker_name, broker_phone, broker_whatsapp, featured, created_at, updated_at"
      )
      .eq("published", true);

    if (options?.featured) query = query.eq("featured", true);
    if (options?.city) query = query.ilike("city", options.city);
    if (options?.transactionType)
      query = query.eq("transaction_type", options.transactionType);
    if (options?.propertyType)
      query = query.eq("property_type", options.propertyType);
    if (options?.limit) query = query.limit(options.limit);

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) throw error;
    return (data as Property[]) ?? [];
  } catch {
    return MOCK_PROPERTIES;
  }
}

export async function getPropertyBySlug(
  slug: string
): Promise<Property | null> {
  if (!isSupabaseConfigured()) {
    return MOCK_PROPERTIES.find((p) => p.slug === slug) ?? null;
  }

  try {
    const supabase = createPublicServerSupabaseClient();
    const { data, error } = await supabase
      .from("properties")
      .select(
        "id, slug, title, description, property_type, transaction_type, price, price_display, city, locality, area_sqft, bedrooms, bathrooms, amenities, images, video_url, broker_name, broker_phone, broker_whatsapp, featured, created_at, updated_at"
      )
      .eq("published", true)
      .eq("slug", slug)
      .single();

    if (error) return null;
    return data as Property;
  } catch {
    return MOCK_PROPERTIES.find((p) => p.slug === slug) ?? null;
  }
}

export async function getAllPropertySlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_PROPERTIES.map((p) => p.slug);
  }

  try {
    const supabase = createPublicServerSupabaseClient();
    const { data, error } = await supabase
      .from("properties")
      .select("slug")
      .eq("published", true);

    if (error) return [];
    return data.map((p: { slug: string }) => p.slug);
  } catch {
    return [];
  }
}
