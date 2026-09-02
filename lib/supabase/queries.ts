import { createPublicServerSupabaseClient } from "./server";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Property, DbPropertyRow, PropertyFAQ } from "@/types";
import { formatPrice, slugify } from "@/lib/utils";

// ── Slug helpers ──────────────────────────────────────────────────────────────
// URL slug = cleanTitleSlug(property_title) + "-" + slugify(property_code)
// Produces concise, clean SEO URLs e.g. "modern-4-bhk-penthouse-dp1-011"

export function cleanTitleSlug(title: string): string {
  // Split at natural dividers: commas, ' at ', ' with ', ' on ', ' near ', ' featuring ', etc.
  const parts = title.split(/\s*,\s*|\s+(?:at|with|on|near|featuring|overlooking)\s+/i);
  let main = parts[0].trim();

  // If main title part is long, limit to first 5 words or max 40 chars
  const words = main.split(/\s+/);
  if (words.length > 6 || main.length > 45) {
    main = words.slice(0, 5).join(" ");
  }

  let slug = slugify(main);
  if (slug.length > 40) {
    slug = slug.slice(0, 40).replace(/-[^-]*$/, "");
  }
  return slug;
}

export function buildPropertySlug(
  title: string,
  propertyCode?: string | null
): string {
  const shortTitle = cleanTitleSlug(title);
  const code = propertyCode ? slugify(propertyCode.trim()) : "";
  if (!shortTitle) return code;
  if (!code) return shortTitle;
  return `${shortTitle}-${code}`;
}

/** Reconstruct a standard UUID (8-4-4-4-12) from the 32-char raw hex suffix */
function rawHexToUuid(raw: string): string | null {
  if (raw.length !== 32 || !/^[0-9a-f]+$/i.test(raw)) return null;
  return [
    raw.slice(0, 8),
    raw.slice(8, 12),
    raw.slice(12, 16),
    raw.slice(16, 20),
    raw.slice(20),
  ].join("-");
}

// ── DB → UI mapper ────────────────────────────────────────────────────────────
function mapDbRowToProperty(row: DbPropertyRow): Property {
  const addr = row.addresses;
  const broker = row.brokers;
  const brokerUser = row.broker_user;

  const city = addr?.city ?? "";
  const locality = addr?.landmark ?? addr?.city ?? "";
  const fullAddress = addr?.full_address ?? null;

  // Extract image URLs from the medias JSONB array (images, photos, or video thumbnails)
  const images: string[] = (row.medias ?? [])
    .map((m) => {
      if (m.type === "image" || m.type === "photo" || !m.type) return m.url;
      if (m.thumbnail) return m.thumbnail;
      return null;
    })
    .filter((url): url is string => typeof url === "string" && url.trim().length > 0);

  // Build human-readable floor string
  let floor: string | null = null;
  if (row.floor_number != null && row.total_floors != null) {
    floor = `${toOrdinal(row.floor_number)} of ${row.total_floors} Floors`;
  } else if (row.floor_number != null) {
    floor = `${toOrdinal(row.floor_number)} Floor`;
  }

  // Normalize furnishing status (DB uses underscores, UI uses hyphens)
  const furnishing = row.furnishing_status?.replace(/_/g, "-") as Property["furnishing"];

  // Normalize possession / construction status
  const possession = row.construction_status?.replace(/_/g, "-") as Property["possession"];

  // Normalize facing direction (DB: 'east', 'north_east', etc.)
  const facing = row.facing
    ? row.facing
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ") + " Facing"
    : null;

  const price = typeof row.price === "number" ? row.price : null;
  const areaInSqft = normalizeArea(row.area, row.area_unit);
  const pricePerSqft =
    price && areaInSqft && areaInSqft > 0
      ? Math.round(price / areaInSqft)
      : null;

  const brokerPhone = formatPhone(
    brokerUser?.phone,
    brokerUser?.phone_country_code
  );

  return {
    id: row.id,
    broker_id: row.broker_id ?? null,
    property_code: row.property_code ?? null,

    slug: buildPropertySlug(row.property_title, row.property_code),
    title: row.property_title,
    description: row.property_description ?? null,
    property_type: (row.property_type ?? "apartment") as Property["property_type"],
    transaction_type: (row.listing_type as Property["transaction_type"]) ?? "sale",
    price,
    price_display: formatPrice(price, null),
    price_per_sqft: pricePerSqft,
    city,
    locality,
    address: fullAddress,
    latitude: addr?.latitude ?? null,
    longitude: addr?.longitude ?? null,
    area_sqft: areaInSqft,

    carpet_sqft: null,
    bedrooms: row.bedrooms ?? null,
    bathrooms: row.bathrooms ?? null,
    balconies: row.balconies ?? null,
    parking: row.parking ?? null,
    floor,
    facing,
    furnishing,
    possession,
    amenities: Array.isArray(row.amenities) ? row.amenities : [],
    images: images.length > 0 ? images : null,
    video_url: null,
    broker_name: brokerUser?.name ?? null,
    broker_agency: broker?.business_name ?? null,
    broker_phone: brokerPhone,
    broker_whatsapp: brokerPhone,
    broker_verified: broker?.is_active ?? false,
    featured: false,
    promoted: false,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

// ── Utility helpers ───────────────────────────────────────────────────────────
function toOrdinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function normalizeArea(area: number | null, unit: string | null): number | null {
  if (area == null) return null;
  if (!unit || unit === "sqft") return area;
  if (unit === "sqm") return Math.round(area * 10.764);
  if (unit === "sqyards") return Math.round(area * 9);
  return area;
}

function formatPhone(
  phone: string | null | undefined,
  countryCode: string | null | undefined
): string | null {
  if (!phone) return null;
  const code = countryCode ?? "91";
  const digits = phone.replace(/\D/g, "");
  return `+${code}${digits}`;
}

// ── Supabase join select ──────────────────────────────────────────────────────
const PROPERTY_SELECT = `
  id,
  property_code,
  broker_id,
  address_id,
  property_title,
  property_description,
  property_type,
  listing_type,
  price,
  area,
  area_unit,
  bedrooms,
  bathrooms,
  balconies,
  parking,
  floor_number,
  total_floors,
  furnishing_status,
  property_status,
  construction_status,
  facing,
  amenities,
  medias,
  is_active,
  is_deleted,
  created_at,
  updated_at,
  addresses (
    full_address,
    city,
    state,
    landmark,
    latitude,
    longitude,
    pincode
  ),
  brokers (
    id,
    business_name,
    is_active
  )
`.trim();

// ── Query options ─────────────────────────────────────────────────────────────
export interface GetPropertiesOptions {
  limit?: number;
  offset?: number;         // for pagination / infinite scroll
  city?: string;
  locality?: string;
  transactionType?: string;
  propertyType?: string;
  bedrooms?: string | number;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  promoted?: boolean;
  searchQuery?: string;
  sortBy?: "relevance" | "price_asc" | "price_desc" | "newest" | "area_desc";
}

// ── Main query ────────────────────────────────────────────────────────────────
export async function getPublishedProperties(
  options?: GetPropertiesOptions
): Promise<Property[]> {
  try {
    const supabase = createPublicServerSupabaseClient();

    let query = supabase
      .from("properties")
      .select(PROPERTY_SELECT)
      .eq("is_active", true)
      .eq("is_deleted", false)
      .eq("property_status", "available");

    // Transaction type filter (listing_type in DB)
    if (options?.transactionType && options.transactionType !== "any") {
      query = query.eq("listing_type", options.transactionType);
    }

    // Property type filter
    if (
      options?.propertyType &&
      options.propertyType !== "Any" &&
      options.propertyType !== "All Types"
    ) {
      query = query.eq("property_type", options.propertyType);
    }

    // Bedrooms filter
    if (options?.bedrooms && options.bedrooms !== "Any") {
      const beds =
        typeof options.bedrooms === "string"
          ? parseInt(options.bedrooms, 10)
          : options.bedrooms;
      if (!isNaN(beds)) query = query.gte("bedrooms", beds);
    }

    // Price range filters
    if (options?.minPrice) query = query.gte("price", options.minPrice);
    if (options?.maxPrice) query = query.lte("price", options.maxPrice);

    // Sorting
    switch (options?.sortBy) {
      case "price_asc":
        query = query.order("price", { ascending: true });
        break;
      case "price_desc":
        query = query.order("price", { ascending: false });
        break;
      case "area_desc":
        query = query.order("area", { ascending: false });
        break;
      case "newest":
      default:
        query = query.order("created_at", { ascending: false });
        break;
    }

    // Pagination via range (offset + limit)
    const pageSize = options?.limit ?? 12;
    const offset = options?.offset ?? 0;
    query = query.range(offset, offset + pageSize - 1);

    const { data, error } = await query;
    if (error) {
      console.error("[getPublishedProperties] Supabase error:", error.message);
      return [];
    }

    let properties = ((data ?? []) as unknown as DbPropertyRow[]).map(
      mapDbRowToProperty
    );

    // Post-process filters on joined address columns
    if (
      options?.city &&
      options.city !== "Any" &&
      options.city !== "All Cities"
    ) {
      const cityLower = options.city.toLowerCase();
      properties = properties.filter(
        (p) => p.city.toLowerCase() === cityLower
      );
    }

    if (options?.locality) {
      const localityLower = options.locality.toLowerCase();
      properties = properties.filter((p) =>
        p.locality.toLowerCase().includes(localityLower)
      );
    }

    if (options?.searchQuery) {
      const q = options.searchQuery.toLowerCase().trim();
      properties = properties.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.property_type.toLowerCase().includes(q)
      );
    }

    return properties;
  } catch (err) {
    console.error("[getPublishedProperties] Unexpected error:", err);
    return [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type QueryFilterCallback = (q: any) => any;

// ── Helper to query single property row ───────────────────────────────────────
async function fetchPropertyRow(
  supabase: SupabaseClient,
  filterFn: QueryFilterCallback
): Promise<DbPropertyRow | null> {
  try {
    const baseQuery = supabase
      .from("properties")
      .select(PROPERTY_SELECT)
      .eq("is_active", true)
      .eq("is_deleted", false);

    const query = filterFn(baseQuery);
    const { data, error } = await query.maybeSingle();

    if (!error && data) {
      return data as unknown as DbPropertyRow;
    }
    return null;
  } catch {
    return null;
  }
}

// ── Look up a single property by its generated slug or property_code ──────────
// Slug formats:
//   1. <slugified-title>-<property_code> (e.g. "modern-4-bhk-penthouse-dp1-011")
//   2. Direct <property_code>            (e.g. "DP1-011" or "dp1-011")
//   3. Legacy UUID format                (e.g. "...-92299dcc65c842a09c36e89453255582")
export async function getPropertyBySlug(
  slug: string
): Promise<Property | null> {
  const cleanSlug = decodeURIComponent(slug).toLowerCase().trim();
  const segments = cleanSlug.split("-");

  try {
    const supabase = createPublicServerSupabaseClient();

    // ── Strategy 1: Direct property_code match ──────────────────────────────
    const byDirectCode = await fetchPropertyRow(supabase, (q) =>
      q.ilike("property_code", cleanSlug)
    );
    if (byDirectCode) return mapDbRowToProperty(byDirectCode);

    // ── Strategy 2: Match by candidate property_code suffix in slug ─────────
    const candidates = [
      segments.slice(-2).join("-"), // e.g. "dp1-011"
      segments.slice(-1)[0],        // e.g. "011"
      segments.slice(-3).join("-"), // e.g. "penthouse-dp1-011"
    ].filter(Boolean);

    for (const candidate of candidates) {
      const byCandidate = await fetchPropertyRow(supabase, (q) =>
        q.ilike("property_code", candidate)
      );
      if (byCandidate) return mapDbRowToProperty(byCandidate);
    }

    // ── Strategy 3: Full 32-char UUID suffix fallback (for backward compatibility) ─
    const rawHex = segments[segments.length - 1] ?? "";
    const uuid = rawHexToUuid(rawHex);
    if (uuid) {
      const byUuid = await fetchPropertyRow(supabase, (q) => q.eq("id", uuid));
      if (byUuid) return mapDbRowToProperty(byUuid);
    }

    console.error(`[getPropertyBySlug] Property not found for slug: ${slug}`);
    return null;
  } catch (err) {
    console.error("[getPropertyBySlug] Unexpected error:", err);
    return null;
  }
}

/**
 * Helper to identify test/sample/seed listings that must not be indexed or exposed in public sitemaps
 */
export function isTestProperty(title: string | null | undefined, id?: string | null | undefined): boolean {
  if (!title) return true;

  // Exclude mock seed UUIDs (00000000-0000-4000-b000-...)
  if (id && /^00000000-0000-4000-b000-/i.test(id)) {
    return true;
  }

  const t = title.toLowerCase().trim();
  return (
    t === "test" ||
    t.startsWith("test ") ||
    t.startsWith("test-") ||
    t.startsWith("test_") ||
    t.startsWith("[test]") ||
    t.includes("test property") ||
    t.includes("test ads") ||
    t.includes("test marketing") ||
    t.includes("test listing") ||
    t.includes("sample property") ||
    t.includes("mobile test")
  );
}

// ── Get all slugs for generateStaticParams ────────────────────────────────────
export async function getAllPropertySlugs(): Promise<string[]> {
  try {
    const supabase = createPublicServerSupabaseClient();
    const { data, error } = await supabase
      .from("properties")
      .select("id, property_title, property_code")
      .eq("is_active", true)
      .eq("is_deleted", false)
      .eq("property_status", "available");

    if (error || !data) return [];
    return data
      .filter((row: { id: string; property_title: string; property_code?: string | null }) => !isTestProperty(row.property_title, row.id))
      .map((row: { id: string; property_title: string; property_code?: string | null }) =>
        buildPropertySlug(row.property_title, row.property_code)
      );
  } catch (err) {
    console.error("[getAllPropertySlugs] Unexpected error:", err);
    return [];
  }
}

export interface PropertySitemapEntry {
  slug: string;
  updated_at?: string | null;
  created_at?: string | null;
}

// ── Get property entries with dates for XML sitemap ───────────────────────────
export async function getAllPropertiesForSitemap(): Promise<PropertySitemapEntry[]> {
  try {
    const supabase = createPublicServerSupabaseClient();
    const { data, error } = await supabase
      .from("properties")
      .select("id, property_title, property_code, updated_at, created_at")
      .eq("is_active", true)
      .eq("is_deleted", false)
      .eq("property_status", "available");

    if (error || !data) return [];
    return data
      .filter(
        (row: { id: string; property_title: string; property_code?: string | null; updated_at?: string; created_at?: string }) =>
          !isTestProperty(row.property_title, row.id)
      )
      .map((row: { id: string; property_title: string; property_code?: string | null; updated_at?: string; created_at?: string }) => ({
        slug: buildPropertySlug(row.property_title, row.property_code),
        updated_at: row.updated_at,
        created_at: row.created_at,
      }));
  } catch (err) {
    console.error("[getAllPropertiesForSitemap] Unexpected error:", err);
    return [];
  }
}

// ── Similar properties ────────────────────────────────────────────────────────
export async function getSimilarProperties(
  property: Property,
  limit: number = 3
): Promise<Property[]> {
  try {
    const all = await getPublishedProperties({ city: property.city, limit: 10 });
    return all
      .filter(
        (p) =>
          p.id !== property.id &&
          (p.city.toLowerCase() === property.city.toLowerCase() ||
            p.property_type === property.property_type)
      )
      .slice(0, limit);
  } catch {
    return [];
  }
}

// ── Property Type Counts (Real DB counts) ────────────────────────────────────
export async function getPropertyTypeCounts(): Promise<Record<string, number>> {
  try {
    const supabase = createPublicServerSupabaseClient();
    const { data, error } = await supabase
      .from("properties")
      .select("property_type")
      .eq("is_active", true)
      .eq("is_deleted", false)
      .eq("property_status", "available");

    if (error || !data) return {};

    const counts: Record<string, number> = {};
    for (const item of data) {
      const type = (item.property_type || "").toLowerCase().trim();
      if (type) {
        counts[type] = (counts[type] || 0) + 1;
      }
    }
    return counts;
  } catch (err) {
    console.error("[getPropertyTypeCounts] Unexpected error:", err);
    return {};
  }
}

// ── City Counts (Real DB counts) ─────────────────────────────────────────────
export async function getCityCounts(): Promise<Record<string, number>> {
  try {
    const supabase = createPublicServerSupabaseClient();
    const { data, error } = await supabase
      .from("properties")
      .select("addresses ( city )")
      .eq("is_active", true)
      .eq("is_deleted", false)
      .eq("property_status", "available");

    if (error || !data) return {};

    const counts: Record<string, number> = {};
    for (const item of (data as unknown as Array<{ addresses?: { city?: string | null } | Array<{ city?: string | null }> | null }>)) {
      let city: string | null | undefined = null;
      if (Array.isArray(item.addresses)) {
        city = item.addresses[0]?.city;
      } else if (item.addresses) {
        city = item.addresses.city;
      }
      if (city && typeof city === "string") {
        const key = city.trim().toLowerCase();
        counts[key] = (counts[key] || 0) + 1;
      }
    }
    return counts;
  } catch (err) {
    console.error("[getCityCounts] Unexpected error:", err);
    return {};
  }
}

// ── Property FAQs Query ───────────────────────────────────────────────────────
export async function getPropertyFaqs(propertyId: string): Promise<PropertyFAQ[]> {
  if (!propertyId) return [];

  try {
    const supabase = createPublicServerSupabaseClient();
    const { data, error } = await supabase
      .from("property_faqs")
      .select("id, property_id, question, answer, created_at, updated_at")
      .eq("property_id", propertyId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error(`[getPropertyFaqs] Error fetching FAQs for property ${propertyId}:`, error);
      return [];
    }

    return (data as PropertyFAQ[]) || [];
  } catch (err) {
    console.error("[getPropertyFaqs] Unexpected error:", err);
    return [];
  }
}
