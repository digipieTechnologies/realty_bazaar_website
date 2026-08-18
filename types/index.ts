// Type definitions for The Realty Bazaar

export type TransactionType = "sale" | "rent";
export type PropertyType =
  | "apartment"
  | "villa"
  | "plot"
  | "commercial"
  | "house"
  | "studio";

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  property_type: PropertyType;
  transaction_type: TransactionType;
  price: number | null;
  price_display: string | null;
  city: string;
  locality: string;
  area_sqft: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  amenities: string[] | null;
  images: string[] | null;
  video_url: string | null;
  broker_name: string | null;
  broker_phone: string | null;
  broker_whatsapp: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Enquiry {
  property_id: string;
  broker_id: string | null;
  name: string;
  phone: string;
  message?: string;
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
