/**
 * Microsoft Clarity Custom Event & Tagging Utility
 * Safe client-side wrapper that never throws or blocks execution.
 */

declare global {
  interface Window {
    clarity?: (action: string, ...args: unknown[]) => void;
  }
}

export interface PropertyTrackingContext {
  id?: string;
  title?: string;
  city?: string;
  locality?: string | null;
  property_type?: string;
  transaction_type?: string;
  bedrooms?: number | null;
}

export interface SearchTrackingParams {
  search_query?: string;
  city?: string;
  locality?: string;
  property_type?: string;
  purpose?: string;
  bhk?: string;
  min_price?: string | number;
  max_price?: string | number;
}

/**
 * Low-level safe Clarity event dispatcher
 */
export function trackClarityEvent(eventName: string): void {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.clarity === "function") {
      window.clarity("event", eventName);
    }
  } catch {
    // Non-blocking fail-safe
  }
}

/**
 * Low-level safe Clarity tag setter
 */
export function setClarityTag(key: string, value: string | number | boolean | null | undefined): void {
  if (typeof window === "undefined" || value === undefined || value === null || value === "") return;
  try {
    if (typeof window.clarity === "function") {
      window.clarity("set", key, String(value));
    }
  } catch {
    // Non-blocking fail-safe
  }
}

/**
 * Set property custom tags
 */
export function setPropertyTags(property: PropertyTrackingContext): void {
  if (property.id) setClarityTag("property_id", property.id);
  if (property.title) setClarityTag("property_name", property.title);
  if (property.city) setClarityTag("property_city", property.city);
  if (property.locality) setClarityTag("property_locality", property.locality);
  if (property.property_type) setClarityTag("property_type", property.property_type);
  if (property.transaction_type) setClarityTag("property_purpose", property.transaction_type);
  if (property.bedrooms !== undefined && property.bedrooms !== null) {
    setClarityTag("property_bhk", property.bedrooms);
  }
}

/**
 * 1. Track Property View (Detail Page)
 */
export function trackPropertyView(property: PropertyTrackingContext): void {
  setPropertyTags(property);
  trackClarityEvent("property_view");
}

/**
 * 2. Track Property Card Click (Listing / Discovery Grid)
 */
export function trackPropertyCardClick(property: PropertyTrackingContext): void {
  if (property.id) setClarityTag("property_id", property.id);
  if (property.title) setClarityTag("property_name", property.title);
  if (property.city) setClarityTag("property_city", property.city);
  if (property.locality) setClarityTag("property_locality", property.locality);
  trackClarityEvent("property_card_click");
}

/**
 * 3. Track Property Search Submission
 */
export function trackPropertySearch(params: SearchTrackingParams): void {
  if (params.search_query) setClarityTag("search_query", params.search_query);
  if (params.city && params.city !== "All Cities") setClarityTag("search_city", params.city);
  if (params.locality) setClarityTag("search_locality", params.locality);
  if (params.property_type && params.property_type !== "All Types" && params.property_type !== "Any") {
    setClarityTag("search_property_type", params.property_type);
  }
  if (params.purpose && params.purpose !== "all") setClarityTag("search_purpose", params.purpose);
  if (params.bhk && params.bhk !== "Any") setClarityTag("search_bhk", params.bhk);
  trackClarityEvent("property_search");
}

/**
 * 4. Track Property Filter Application
 */
export function trackPropertyFilter(params: SearchTrackingParams): void {
  if (params.bhk && params.bhk !== "Any") setClarityTag("filter_bhk", params.bhk);
  if (params.property_type && params.property_type !== "All Types") setClarityTag("filter_property_type", params.property_type);
  if (params.purpose && params.purpose !== "all") setClarityTag("filter_purpose", params.purpose);
  if (params.city && params.city !== "All Cities") setClarityTag("filter_city", params.city);
  if (params.locality) setClarityTag("filter_locality", params.locality);
  if (params.min_price) setClarityTag("filter_min_price", params.min_price);
  if (params.max_price) setClarityTag("filter_max_price", params.max_price);
  trackClarityEvent("property_filter");
}

/**
 * 5. Track Property WhatsApp CTA Click
 */
export function trackPropertyWhatsAppClick(property: PropertyTrackingContext): void {
  if (property.id) setClarityTag("property_id", property.id);
  if (property.title) setClarityTag("property_name", property.title);
  if (property.city) setClarityTag("property_city", property.city);
  if (property.locality) setClarityTag("property_locality", property.locality);
  trackClarityEvent("property_whatsapp_click");
}

/**
 * 6. Track Property Call CTA Click
 */
export function trackPropertyCallClick(property: PropertyTrackingContext): void {
  if (property.id) setClarityTag("property_id", property.id);
  if (property.title) setClarityTag("property_name", property.title);
  if (property.city) setClarityTag("property_city", property.city);
  if (property.locality) setClarityTag("property_locality", property.locality);
  trackClarityEvent("property_call_click");
}

/**
 * 7. Track Property Share Action
 */
export function trackPropertyShare(property: PropertyTrackingContext, method?: string): void {
  if (property.id) setClarityTag("property_id", property.id);
  if (property.title) setClarityTag("property_name", property.title);
  if (property.city) setClarityTag("property_city", property.city);
  if (property.locality) setClarityTag("property_locality", property.locality);
  if (method) setClarityTag("share_method", method);
  trackClarityEvent("property_share");
}

/**
 * 8. Track Property Favourite / Save Action
 */
export function trackPropertyFavourite(property: PropertyTrackingContext): void {
  if (property.id) setClarityTag("property_id", property.id);
  if (property.title) setClarityTag("property_name", property.title);
  if (property.city) setClarityTag("property_city", property.city);
  if (property.locality) setClarityTag("property_locality", property.locality);
  trackClarityEvent("property_favourite");
}

/**
 * 9. Track Property Lead / Enquiry Submit (Form submission on property page)
 */
export function trackPropertyLeadSubmit(property: PropertyTrackingContext): void {
  if (property.id) setClarityTag("property_id", property.id);
  if (property.title) setClarityTag("property_name", property.title);
  if (property.city) setClarityTag("property_city", property.city);
  if (property.locality) setClarityTag("property_locality", property.locality);
  trackClarityEvent("property_lead_submit");
}

/**
 * 10. Track General Website Contact Form Submit
 */
export function trackContactFormSubmit(): void {
  trackClarityEvent("contact_form_submit");
}
