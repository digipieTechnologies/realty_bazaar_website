// Type definitions for The Realty Bazaar

export type TransactionType = "sale" | "rent";

export type PropertyType =
  | "apartment"
  | "villa"
  | "plot"
  | "commercial"
  | "house"
  | "studio"
  | "office"
  | "shop"
  | "warehouse";

export type FurnishingStatus = "unfurnished" | "semi-furnished" | "fully-furnished" | "semi_furnished" | "fully_furnished";
export type PossessionStatus = "ready-to-move" | "under-construction" | "ready_to_move" | "under_construction";

// ── Raw DB row shapes returned from Supabase joins ──────────────────────
export interface DbPropertyRow {
  id: string;
  broker_id: string;
  address_id: string | null;
  property_title: string;
  property_description: string | null;
  property_type: string;         // DB enum value e.g. 'apartment'
  listing_type: string;          // 'sale' | 'rent'
  price: number;
  area: number;
  area_unit: string;             // 'sqft', 'sqm', 'sqyards'
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  parking: number;
  floor_number: number | null;
  total_floors: number | null;
  furnishing_status: string;     // 'unfurnished' | 'semi_furnished' | 'fully_furnished'
  property_status: string;       // 'available' | 'sold' | 'rented'
  construction_status: string;   // 'ready_to_move' | 'under_construction'
  facing: string | null;
  amenities: string[] | null;    // JSONB array of strings
  medias: Array<{ url: string; type: string; thumbnail?: string }> | null; // JSONB
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  // Joined address fields (prefixed via PostgREST)
  addresses?: {
    full_address: string;
    city: string | null;
    state: string | null;
    landmark: string | null;
    latitude: number | null;
    longitude: number | null;
    pincode: string | null;
  } | null;
  // Joined broker fields
  brokers?: {
    id: string;
    business_name: string;
    is_active: boolean;
  } | null;
  // Joined broker user (owner/primary user of the broker account)
  broker_user?: {
    name: string;
    phone: string | null;
    phone_country_code: string | null;
  } | null;
}

// ── UI-facing Property shape ─────────────────────────────────────────────
// Used by all marketplace components. Mapper converts DbPropertyRow → Property.
export interface Property {
  id: string;
  slug: string;                    // generated: slugify(title)+hexId
  title: string;
  description: string | null;
  property_type: PropertyType;
  transaction_type: TransactionType;
  price: number | null;
  price_display: string | null;    // formatted string e.g. "₹1.35 Cr"
  price_per_sqft?: number | null;
  city: string;
  locality: string;
  address?: string | null;
  area_sqft: number | null;
  carpet_sqft?: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  balconies?: number | null;
  parking?: number | null;
  floor?: string | null;
  facing?: string | null;
  furnishing?: FurnishingStatus;
  possession?: PossessionStatus;
  possession_date?: string | null;
  amenities: string[] | null;
  images: string[] | null;
  video_url: string | null;
  broker_name: string | null;
  broker_agency?: string | null;
  broker_phone: string | null;
  broker_whatsapp: string | null;
  broker_verified?: boolean;
  featured: boolean;
  promoted?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Enquiry {
  property_id: string;
  broker_id: string | null;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  visit_date?: string;
  visit_time?: string;
  type?: "enquiry" | "site_visit";
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  ctaLabel: string;
  ctaVariant: "primary" | "secondary" | "outline";
}
