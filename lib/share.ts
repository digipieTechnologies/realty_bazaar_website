import type { Property } from "@/types";
import { formatPrice } from "./utils";

/**
 * Generates an engaging, structured draft text for sharing property details
 * across WhatsApp, Telegram, SMS, Email, and social platforms.
 */
export function generatePropertyDraftText(
  property: Property,
  propertyUrl?: string
): string {
  const url =
    propertyUrl ||
    (typeof window !== "undefined"
      ? `${window.location.origin}/properties/${property.slug}`
      : `https://therealtybazaar.com/properties/${property.slug}`);

  const formattedPrice = formatPrice(property.price, property.price_display);
  const txnType = property.transaction_type === "sale" ? "Sale" : "Rent";
  const propType =
    property.property_type.charAt(0).toUpperCase() +
    property.property_type.slice(1);

  const lines: string[] = [];

  // Title / Headline
  lines.push(`🏡 *${property.title}*`);
  lines.push(`📍 *Location:* ${property.locality}, ${property.city}`);

  // Price line
  if (property.price_per_sqft && property.transaction_type === "sale") {
    lines.push(
      `💰 *Price:* ${formattedPrice} (₹${property.price_per_sqft.toLocaleString("en-IN")}/sq ft)`
    );
  } else {
    lines.push(`💰 *Price:* ${formattedPrice} (For ${txnType})`);
  }

  // Key Specs
  const specs: string[] = [];
  if (property.bedrooms) specs.push(`${property.bedrooms} BHK`);
  if (property.bathrooms) specs.push(`${property.bathrooms} Bathrooms`);
  if (property.area_sqft) specs.push(`${property.area_sqft.toLocaleString("en-IN")} sq ft`);
  if (property.furnishing) specs.push(`${property.furnishing} Furnished`);

  if (specs.length > 0) {
    lines.push(`📐 *Specs:* ${specs.join(" | ")}`);
  }

  // Additional details if available
  const details: string[] = [];
  if (propType) details.push(`Type: ${propType}`);
  if (property.floor) details.push(`Floor: ${property.floor}`);
  if (property.facing) details.push(`Facing: ${property.facing}`);
  if (property.possession) details.push(`Possession: ${property.possession}`);
  if (details.length > 0) {
    lines.push(`🏢 *Details:* ${details.join(" • ")}`);
  }

  // Amenities summary
  if (property.amenities && property.amenities.length > 0) {
    const topAmenities = property.amenities.slice(0, 4).join(", ");
    lines.push(`✨ *Highlights:* ${topAmenities}`);
  }

  // Broker Contact if available
  if (property.broker_name) {
    const brokerContact = property.broker_phone ? ` (${property.broker_phone})` : "";
    lines.push(`👤 *Listing Broker:* ${property.broker_name}${brokerContact}`);
  }

  lines.push("");
  lines.push(`🔗 *View Full Details & Photos:*`);
  lines.push(url);
  lines.push("");
  lines.push(`_Shared via The Realty Bazaar — Direct Verified Properties_`);

  return lines.join("\n");
}
