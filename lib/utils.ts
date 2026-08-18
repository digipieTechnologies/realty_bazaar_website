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
  return `${bhk}${type} ${txn} in ${property.locality}, ${property.city} | The Realty Bazaar`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
