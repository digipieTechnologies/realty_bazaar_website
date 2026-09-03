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
  amenities: string[] | string | null;    // JSONB array or JSON string
  medias: Array<{ url: string; type: string; thumbnail?: string }> | string | null; // JSONB array or JSON string
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  search_text?: string | null;
  property_code?: string | null;
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
  broker_id?: string | null;
  property_code?: string | null;   // unique property code e.g. "TRB-1001"

  slug: string;                    // generated: slugify(title) + property_code
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
  latitude?: number | null;
  longitude?: number | null;
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

export type VisitStatus =
  | "pending"
  | "confirmed"
  | "rescheduled"
  | "completed"
  | "cancelled"
  | "noShow"
  | "unknown";

export interface PropertyVisit {
  id: string;
  broker_id: string;
  property_id: string;
  client_name: string;
  client_phone: string;
  phone_country_code?: string | null;
  phone_country_iso?: string | null;
  visit_date: string; // YYYY-MM-DD
  time_slot: string;  // e.g. "03:00 PM – 04:00 PM"
  status: VisitStatus;
  notes?: string | null;
  reschedule_count: number;
  reschedule_reason?: string | null;
  cancelled_reason?: string | null;
  created_at: string;
  updated_at: string;
  property?: Property | null;
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

export interface PropertyFAQ {
  id: string;
  property_id: string;
  question: string;
  answer: string;
  created_at?: string;
  updated_at?: string;
}

export type SortOption = "relevance" | "price_asc" | "price_desc" | "newest" | "area_desc";

export interface PropertyFilterState {
  q: string;
  transactionType: "all" | "sale" | "rent";
  propertyType: string;
  city: string;
  locality: string;
  bhk: string;
  minPrice: string;
  maxPrice: string;
  furnishing: string;
  verifiedOnly: boolean;
  featuredOnly: boolean;
  sortBy: SortOption;
}

