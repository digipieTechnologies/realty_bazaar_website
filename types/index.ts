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

export type FurnishingStatus = "unfurnished" | "semi-furnished" | "fully-furnished";
export type PossessionStatus = "ready-to-move" | "under-construction";

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  property_type: PropertyType;
  transaction_type: TransactionType;
  price: number | null;
  price_display: string | null;
  price_per_sqft?: number | null;
  city: string;
  locality: string;
  address?: string | null;
  area_sqft: number | null;
  carpet_sqft?: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  balconies?: number | null;
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

