export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(price: number | null, display: string | null): string {
  if (display) return display;
  if (!price) return "Price on request";
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(0)} Lakh`;
  return `₹${price.toLocaleString("en-IN")}`;
}

export function formatArea(sqft: number | null): string {
  if (!sqft) return "";
  return `${sqft.toLocaleString("en-IN")} sq ft`;
}

export function formatLocation(locality?: string | null, city?: string | null): string {
  const cleanLoc = (locality || "").trim();
  const cleanCity = (city || "").trim();

  if (cleanLoc && cleanCity) {
    if (cleanLoc.toLowerCase() === cleanCity.toLowerCase()) {
      return cleanCity;
    }
    const regex = new RegExp(`\\b${cleanCity.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
    if (regex.test(cleanLoc)) {
      return cleanLoc;
    }
    return `${cleanLoc}, ${cleanCity}`;
  }

  if (cleanLoc) return cleanLoc;
  if (cleanCity) return cleanCity;
  return "India";
}

export function generatePropertyMetaTitle(property: {
  bedrooms: number | null;
  property_type: string;
  transaction_type: string;
  locality: string;
  city: string;
}): string {
  const bhk = property.bedrooms ? `${property.bedrooms} BHK ` : "";
  const rawType = property.property_type.replace(/_/g, " ").trim();
  const type = rawType.charAt(0).toUpperCase() + rawType.slice(1);
  const txn = property.transaction_type === "sale" ? "for Sale" : "for Rent";
  const locStr = formatLocation(property.locality, property.city);
  return `${bhk}${type} ${txn} in ${locStr}`;
}


export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface ParsedPhone {
  phone: string;
  phone_country_code: string;
  phone_country_iso: string;
}

const COUNTRY_PREFIXES: Array<{ prefix: string; code: string; iso: string }> = [
  { prefix: "91", code: "91", iso: "IN" },
  { prefix: "1", code: "1", iso: "US" },
  { prefix: "44", code: "44", iso: "GB" },
  { prefix: "971", code: "971", iso: "AE" },
  { prefix: "65", code: "65", iso: "SG" },
  { prefix: "61", code: "61", iso: "AU" },
  { prefix: "966", code: "966", iso: "SA" },
  { prefix: "974", code: "974", iso: "QA" },
  { prefix: "968", code: "968", iso: "OM" },
  { prefix: "965", code: "965", iso: "KW" },
  { prefix: "973", code: "973", iso: "BH" },
  { prefix: "49", code: "49", iso: "DE" },
  { prefix: "33", code: "33", iso: "FR" },
  { prefix: "81", code: "81", iso: "JP" },
  { prefix: "86", code: "86", iso: "CN" },
];

/**
 * Parses user-provided phone number into phone digits, country code and ISO
 * Defaults to 91 and IN if unspecified.
 */
export function parsePhoneNumber(raw: string): ParsedPhone {
  if (!raw) {
    return { phone: "", phone_country_code: "91", phone_country_iso: "IN" };
  }

  const trimmed = raw.trim();
  const digits = trimmed.replace(/\D/g, "");

  // If user explicitly provided + prefix
  if (trimmed.startsWith("+")) {
    for (const item of COUNTRY_PREFIXES) {
      if (digits.startsWith(item.prefix)) {
        const localPhone = digits.slice(item.prefix.length);
        if (localPhone.length >= 5) {
          return {
            phone: localPhone,
            phone_country_code: item.code,
            phone_country_iso: item.iso,
          };
        }
      }
    }
  }

  // If 12 digits starting with 91 (e.g. 919876543210)
  if (digits.length === 12 && digits.startsWith("91")) {
    return {
      phone: digits.slice(2),
      phone_country_code: "91",
      phone_country_iso: "IN",
    };
  }

  // If standard 10-digit Indian mobile number (e.g. 9876543210)
  if (digits.length === 10) {
    return {
      phone: digits,
      phone_country_code: "91",
      phone_country_iso: "IN",
    };
  }

  // If starting with 0 followed by 10 digits
  if (digits.length === 11 && digits.startsWith("0")) {
    return {
      phone: digits.slice(1),
      phone_country_code: "91",
      phone_country_iso: "IN",
    };
  }

  // Check matching other prefix lengths
  for (const item of COUNTRY_PREFIXES) {
    if (digits.startsWith(item.prefix) && digits.length > item.prefix.length + 6) {
      return {
        phone: digits.slice(item.prefix.length),
        phone_country_code: item.code,
        phone_country_iso: item.iso,
      };
    }
  }

  // Default fallback
  return {
    phone: digits || trimmed,
    phone_country_code: "91",
    phone_country_iso: "IN",
  };
}

/**
 * Generates an accessible Google / Apple Maps navigation URL from property coordinates or address
 */
export function getMapUrl(property: {
  latitude?: number | null;
  longitude?: number | null;
  address?: string | null;
  locality?: string | null;
  city?: string | null;
}): string {
  if (property.latitude && property.longitude) {
    return `https://www.google.com/maps/search/?api=1&query=${property.latitude},${property.longitude}`;
  }

  const parts = [property.address, property.locality, property.city, "India"].filter(Boolean);
  const query = parts.join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}


