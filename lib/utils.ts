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
  const type =
    property.property_type.charAt(0).toUpperCase() +
    property.property_type.slice(1);
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
