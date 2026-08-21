import { createPublicServerSupabaseClient } from "./server";
import type { Property } from "@/types";

// Rich fallback mock data representing verified Indian properties
export const MOCK_PROPERTIES: Property[] = [
  {
    id: "1",
    slug: "3-bhk-luxury-apartment-vesu-surat",
    title: "3 BHK Luxury High-Rise Apartment in Vesu",
    description:
      "A stunning, sun-drenched 3 BHK residence located in the most prestigious enclave of Vesu, Surat. Features Italian marble flooring, 11-foot ceilings, automated smart home lighting, three lavish en-suite bedrooms, and panoramic sunset balconies overlooking the skyline.",
    property_type: "apartment",
    transaction_type: "sale",
    price: 13500000,
    price_display: "₹1.35 Cr",
    price_per_sqft: 7500,
    city: "Surat",
    locality: "Vesu",
    address: "Skyline Heights, VIP Road, Vesu, Surat - 395007",
    area_sqft: 1800,
    carpet_sqft: 1450,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    floor: "8th of 14 Floors",
    facing: "East Facing (Vastu Compliant)",
    furnishing: "semi-furnished",
    possession: "ready-to-move",
    amenities: [
      "Clubhouse",
      "Infinity Swimming Pool",
      "Gym & Fitness Studio",
      "2 Covered Car Parking",
      "24x7 High-Tech Security",
      "High-Speed Passenger Lifts",
      "Children Play Arena",
      "100% Power Backup",
    ],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200",
    ],
    video_url: null,
    broker_name: "Rajesh K. Mehta",
    broker_agency: "Mehta Elite Realty",
    broker_phone: "+91-9876543210",
    broker_whatsapp: "+91-9876543210",
    broker_verified: true,
    featured: true,
    promoted: true,
    created_at: "2026-02-10T10:00:00Z",
    updated_at: "2026-02-10T10:00:00Z",
  },
  {
    id: "2",
    slug: "4-bhk-independent-villa-adajan-surat",
    title: "4 BHK Ultra-Luxury Independent Villa in Adajan",
    description:
      "Exclusive 4 BHK gated community villa with private landscaped garden, double-height living room, modular European kitchen, private terrace lounge, and dedicated servant quarters. Located in a quiet, tree-lined residential neighbourhood of Adajan.",
    property_type: "villa",
    transaction_type: "sale",
    price: 28000000,
    price_display: "₹2.80 Cr",
    price_per_sqft: 8235,
    city: "Surat",
    locality: "Adajan",
    address: "Palms Enclave, Near Anand Mahal Road, Adajan, Surat - 395009",
    area_sqft: 3400,
    carpet_sqft: 2850,
    bedrooms: 4,
    bathrooms: 4,
    balconies: 3,
    floor: "G + 2 Floors",
    facing: "North-East",
    furnishing: "fully-furnished",
    possession: "ready-to-move",
    amenities: [
      "Private Landscaped Garden",
      "Private Terrace Gazebo",
      "Modular German Kitchen",
      "2 Covered Car Garages",
      "Gated Security with CCTV",
      "Solar Water Heating",
      "Servant Room with Bath",
    ],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
    ],
    video_url: null,
    broker_name: "Karan Patel",
    broker_agency: "Gujarat Prime Properties",
    broker_phone: "+91-9876543211",
    broker_whatsapp: "+91-9876543211",
    broker_verified: true,
    featured: true,
    promoted: true,
    created_at: "2026-02-14T10:00:00Z",
    updated_at: "2026-02-14T10:00:00Z",
  },
  {
    id: "3",
    slug: "2-bhk-modern-apartment-pal-surat",
    title: "2 BHK Premium Road-Facing Apartment in Pal",
    description:
      "Well-planned 2 BHK apartment in the fast-appreciating locality of Pal, Surat. Excellent natural ventilation, proximity to top CBSE schools, shopping hubs, and major transport corridors. Perfect for young families or high-yield rental investment.",
    property_type: "apartment",
    transaction_type: "sale",
    price: 6800000,
    price_display: "₹68 Lakh",
    price_per_sqft: 5913,
    city: "Surat",
    locality: "Pal",
    address: "Shreeji Residency, Pal-Gam Road, Pal, Surat - 394510",
    area_sqft: 1150,
    carpet_sqft: 920,
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    floor: "4th of 11 Floors",
    facing: "East Facing",
    furnishing: "semi-furnished",
    possession: "ready-to-move",
    amenities: [
      "Reserved Stilt Parking",
      "Children Play Area",
      "Senior Citizen Sit-out",
      "Automatic High-Speed Lift",
      "24x7 Security & Intercom",
      "Rainwater Harvesting",
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
    ],
    video_url: null,
    broker_name: "Amit Solanki",
    broker_agency: "CityLink Real Estate",
    broker_phone: "+91-9876543212",
    broker_whatsapp: "+91-9876543212",
    broker_verified: true,
    featured: false,
    promoted: false,
    created_at: "2026-02-18T10:00:00Z",
    updated_at: "2026-02-18T10:00:00Z",
  },
  {
    id: "4",
    slug: "prime-commercial-office-space-ring-road-surat",
    title: "Grade-A Commercial Office Space on Ring Road",
    description:
      "Fully-fitted corporate office space in Surat's premier commercial corridor on Ring Road. Glass facade, centralized HVAC, reception lounge, 3 executive cabins, 24 workstations, conference room, and high-speed fiber connectivity.",
    property_type: "office",
    transaction_type: "rent",
    price: 95000,
    price_display: "₹95,000/mo",
    price_per_sqft: 43,
    city: "Surat",
    locality: "Ring Road",
    address: "World Trade Tower, Ring Road, Surat - 395002",
    area_sqft: 2200,
    carpet_sqft: 1850,
    bedrooms: null,
    bathrooms: 2,
    balconies: 0,
    floor: "6th of 18 Floors",
    facing: "Main Road Facing",
    furnishing: "fully-furnished",
    possession: "ready-to-move",
    amenities: [
      "Central Air Conditioning",
      "100% DG Power Backup",
      "3 Dedicated Basement Parking",
      "4 High-Speed Elevators",
      "Fire Fighting System",
      "Cafeteria in Building",
      "24x7 Access & Security",
    ],
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200",
    ],
    video_url: null,
    broker_name: "Nilesh Shah",
    broker_agency: "Commercial Point Consultants",
    broker_phone: "+91-9876543213",
    broker_whatsapp: "+91-9876543213",
    broker_verified: true,
    featured: false,
    promoted: true,
    created_at: "2026-02-20T10:00:00Z",
    updated_at: "2026-02-20T10:00:00Z",
  },
  {
    id: "5",
    slug: "3-bhk-garden-facing-apartment-althan-surat",
    title: "3 BHK Garden-Facing Flat in Althan",
    description:
      "Vastu-aligned 3 BHK flat with serene community garden views in Althan, Surat. Master bedroom with wooden flooring, wide modular kitchen with piped gas connection, and dedicated utility wash area.",
    property_type: "apartment",
    transaction_type: "sale",
    price: 10500000,
    price_display: "₹1.05 Cr",
    price_per_sqft: 6774,
    city: "Surat",
    locality: "Althan",
    address: "Green Meadows, Althan-Bhimrad Canal Road, Althan, Surat - 395017",
    area_sqft: 1550,
    carpet_sqft: 1220,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    floor: "5th of 12 Floors",
    facing: "North Facing",
    furnishing: "semi-furnished",
    possession: "ready-to-move",
    amenities: [
      "Grand Clubhouse",
      "Air-Conditioned Gym",
      "Swimming Pool with Kids Pool",
      "Badminton Court",
      "Covered Stilt Parking",
      "24x7 Security & CCTV",
      "Jogging Track",
    ],
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200",
    ],
    video_url: null,
    broker_name: "Vivek Deshmukh",
    broker_agency: "Prime Space Advisors",
    broker_phone: "+91-9876543214",
    broker_whatsapp: "+91-9876543214",
    broker_verified: true,
    featured: true,
    promoted: false,
    created_at: "2026-02-22T10:00:00Z",
    updated_at: "2026-02-22T10:00:00Z",
  },
  {
    id: "6",
    slug: "1-bhk-furnished-studio-citylight-surat",
    title: "1 BHK Designer Studio in City Light",
    description:
      "Fully furnished, thoughtfully designed 1 BHK studio in the elite City Light neighborhood. Includes custom wood finishes, built-in study nook, smart TV, inverter AC, refrigerator, and microwave.",
    property_type: "studio",
    transaction_type: "rent",
    price: 22000,
    price_display: "₹22,000/mo",
    price_per_sqft: 34,
    city: "Surat",
    locality: "City Light",
    address: "Urban Crest, Near Science Centre, City Light, Surat - 395007",
    area_sqft: 650,
    carpet_sqft: 520,
    bedrooms: 1,
    bathrooms: 1,
    balconies: 1,
    floor: "3rd of 8 Floors",
    facing: "West Facing",
    furnishing: "fully-furnished",
    possession: "ready-to-move",
    amenities: [
      "All Appliances Included",
      "High-Speed Wi-Fi Ready",
      "Covered 2-Wheeler & Car Parking",
      "Lift with Battery Backup",
      "24x7 Security Guard",
    ],
    images: [
      "https://images.unsplash.com/photo-1505873242700-f289a29e1724?w=1200",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200",
    ],
    video_url: null,
    broker_name: "Sneha Kapadia",
    broker_agency: "Urban Abode Realty",
    broker_phone: "+91-9876543215",
    broker_whatsapp: "+91-9876543215",
    broker_verified: true,
    featured: false,
    promoted: false,
    created_at: "2026-02-24T10:00:00Z",
    updated_at: "2026-02-24T10:00:00Z",
  },
  {
    id: "7",
    slug: "4-bhk-penthouse-piplod-surat",
    title: "4 BHK Sky Villa Penthouse in Piplod",
    description:
      "Spectacular duplex penthouse with private plunge pool and 360-degree views of Surat. Crafted for luxury living with imported marble, private elevator access, home theatre room, and double-height glass terrace.",
    property_type: "apartment",
    transaction_type: "sale",
    price: 36000000,
    price_display: "₹3.60 Cr",
    price_per_sqft: 8571,
    city: "Surat",
    locality: "Piplod",
    address: "Aura Royale, Dumas Road, Piplod, Surat - 395007",
    area_sqft: 4200,
    carpet_sqft: 3400,
    bedrooms: 4,
    bathrooms: 5,
    balconies: 3,
    floor: "Top 15th & 16th Floors",
    facing: "North-East",
    furnishing: "semi-furnished",
    possession: "ready-to-move",
    amenities: [
      "Private Splash Pool",
      "Private Sky Terrace",
      "Private Keycard Elevator",
      "3 Covered Parking Slots",
      "Clubhouse & Squash Court",
      "24x7 Valet & Concierge",
    ],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
    ],
    video_url: null,
    broker_name: "Rajesh K. Mehta",
    broker_agency: "Mehta Elite Realty",
    broker_phone: "+91-9876543210",
    broker_whatsapp: "+91-9876543210",
    broker_verified: true,
    featured: true,
    promoted: true,
    created_at: "2026-02-25T10:00:00Z",
    updated_at: "2026-02-25T10:00:00Z",
  },
  {
    id: "8",
    slug: "3-bhk-luxury-condo-sg-highway-ahmedabad",
    title: "3 BHK High-End Condo on SG Highway",
    description:
      "Modern luxury condominium located right off SG Highway in Ahmedabad. Seamless connectivity to GIFT City, top international universities, and tech parks.",
    property_type: "apartment",
    transaction_type: "sale",
    price: 16500000,
    price_display: "₹1.65 Cr",
    price_per_sqft: 7674,
    city: "Ahmedabad",
    locality: "SG Highway",
    address: "Signature Heights, Off SG Highway, Ahmedabad - 380054",
    area_sqft: 2150,
    carpet_sqft: 1720,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    floor: "7th of 16 Floors",
    facing: "East Facing",
    furnishing: "semi-furnished",
    possession: "ready-to-move",
    amenities: [
      "Olympic Length Swimming Pool",
      "State-of-art Gymnasium",
      "Badminton & Tennis Courts",
      "Banquet Hall",
      "2 Covered Car Parking",
      "EV Charging Stations",
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
    ],
    video_url: null,
    broker_name: "Hiren Trivedi",
    broker_agency: "Apex Realty Gujarat",
    broker_phone: "+91-9876543216",
    broker_whatsapp: "+91-9876543216",
    broker_verified: true,
    featured: true,
    promoted: false,
    created_at: "2026-02-26T10:00:00Z",
    updated_at: "2026-02-26T10:00:00Z",
  },
  {
    id: "9",
    slug: "residential-plot-dumas-road-surat",
    title: "500 Sq. Yard Freehold Residential Villa Plot on Dumas Road",
    description:
      "Premium NA plot inside an upscale gated township on Dumas Road, Surat. Complete underground utility cabling, broad 40ft internal paved roads, clear title deeds, and bank loan approvals from SBI & HDFC.",
    property_type: "plot",
    transaction_type: "sale",
    price: 22500000,
    price_display: "₹2.25 Cr",
    price_per_sqft: 5000,
    city: "Surat",
    locality: "Dumas Road",
    address: "Boulevard Greens Township, Dumas Road, Surat - 395007",
    area_sqft: 4500,
    carpet_sqft: null,
    bedrooms: null,
    bathrooms: null,
    balconies: null,
    floor: "NA Plot",
    facing: "Corner Plot (North & East Road)",
    furnishing: "unfurnished",
    possession: "ready-to-move",
    amenities: [
      "Gated Community with Boundary Wall",
      "24x7 Security & Guard House",
      "40 Ft Wide Concrete Internal Roads",
      "Underground Drainage & Electricity",
      "Landscaped Central Park",
    ],
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200",
      "https://images.unsplash.com/photo-1524813686514-a57563d77d61?w=1200",
    ],
    video_url: null,
    broker_name: "Karan Patel",
    broker_agency: "Gujarat Prime Properties",
    broker_phone: "+91-9876543211",
    broker_whatsapp: "+91-9876543211",
    broker_verified: true,
    featured: false,
    promoted: false,
    created_at: "2026-02-27T10:00:00Z",
    updated_at: "2026-02-27T10:00:00Z",
  },
  {
    id: "10",
    slug: "2-bhk-sea-view-bandra-west-mumbai",
    title: "2 BHK Sea-View Luxury Apartment in Bandra West",
    description:
      "Rare opportunity to own an unobstructed Arabian Sea-facing 2 BHK in the coveted Bandra West neighborhood. High ceiling interiors, curated Italian fixtures, and steps away from Carter Road promenade.",
    property_type: "apartment",
    transaction_type: "sale",
    price: 49500000,
    price_display: "₹4.95 Cr",
    price_per_sqft: 52105,
    city: "Mumbai",
    locality: "Bandra West",
    address: "Ocean Breeze, Off Carter Road, Bandra West, Mumbai - 400050",
    area_sqft: 950,
    carpet_sqft: 810,
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    floor: "11th of 14 Floors",
    facing: "West Facing (Sea View)",
    furnishing: "semi-furnished",
    possession: "ready-to-move",
    amenities: [
      "Direct Sea View",
      "Rooftop Infinity Lounge",
      "Automated Hydraulic Car Parking",
      "24x7 Multi-Tier Security",
      "Fitness Centre",
    ],
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200",
    ],
    video_url: null,
    broker_name: "Rohan Malhotra",
    broker_agency: "Malhotra & Partners Mumbai",
    broker_phone: "+91-9876543217",
    broker_whatsapp: "+91-9876543217",
    broker_verified: true,
    featured: true,
    promoted: true,
    created_at: "2026-02-28T10:00:00Z",
    updated_at: "2026-02-28T10:00:00Z",
  },
  {
    id: "11",
    slug: "prime-retail-showroom-ghod-dod-road-surat",
    title: "High-Footfall Main Road Retail Shop on Ghod Dod Road",
    description:
      "Premier ground floor commercial retail showroom on prestigious Ghod Dod Road in Surat. 30ft clear glass frontage, excellent street visibility, mezzanine floor, and customer parking.",
    property_type: "shop",
    transaction_type: "rent",
    price: 120000,
    price_display: "₹1.20 Lakh/mo",
    price_per_sqft: 80,
    city: "Surat",
    locality: "Ghod Dod Road",
    address: "Crystal Plaza, Ghod Dod Road, Surat - 395007",
    area_sqft: 1500,
    carpet_sqft: 1350,
    bedrooms: null,
    bathrooms: 1,
    balconies: 0,
    floor: "Ground Floor",
    facing: "Main Road Frontage",
    furnishing: "unfurnished",
    possession: "ready-to-move",
    amenities: [
      "30 Ft Frontage Glass Facade",
      "High Visibility Signage Area",
      "Customer Stilt Parking",
      "3 Phase Commercial Power",
      "Water Connection",
    ],
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200",
    ],
    video_url: null,
    broker_name: "Nilesh Shah",
    broker_agency: "Commercial Point Consultants",
    broker_phone: "+91-9876543213",
    broker_whatsapp: "+91-9876543213",
    broker_verified: true,
    featured: false,
    promoted: false,
    created_at: "2026-03-01T10:00:00Z",
    updated_at: "2026-03-01T10:00:00Z",
  },
  {
    id: "12",
    slug: "3-bhk-spacious-flat-vasna-vadodara",
    title: "3 BHK Peaceful Garden Residence in Vasna-Bhayli",
    description:
      "Spacious 3 BHK residence in Vadodara's most coveted residential suburb of Vasna-Bhayli. Surrounded by lush greenery, international schools, and sports clubs.",
    property_type: "apartment",
    transaction_type: "sale",
    price: 7800000,
    price_display: "₹78 Lakh",
    price_per_sqft: 4875,
    city: "Vadodara",
    locality: "Vasna-Bhayli",
    address: "Greenwood Palms, Vasna-Bhayli Road, Vadodara - 391410",
    area_sqft: 1600,
    carpet_sqft: 1280,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    floor: "3rd of 10 Floors",
    facing: "East Facing",
    furnishing: "semi-furnished",
    possession: "ready-to-move",
    amenities: [
      "Clubhouse & Yoga Lawn",
      "Swimming Pool",
      "Covered Car Parking",
      "24x7 Security",
      "Solar Lighting for Common Areas",
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
    ],
    video_url: null,
    broker_name: "Paresh Joshi",
    broker_agency: "Heritage City Homes",
    broker_phone: "+91-9876543218",
    broker_whatsapp: "+91-9876543218",
    broker_verified: true,
    featured: false,
    promoted: false,
    created_at: "2026-03-02T10:00:00Z",
    updated_at: "2026-03-02T10:00:00Z",
  },
];

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return (
    !!url &&
    url !== "https://your-project.supabase.co" &&
    !url.includes("your-project")
  );
}

export interface GetPropertiesOptions {
  limit?: number;
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

export async function getPublishedProperties(
  options?: GetPropertiesOptions
): Promise<Property[]> {
  if (!isSupabaseConfigured()) {
    let results = [...MOCK_PROPERTIES];

    if (options?.searchQuery) {
      const q = options.searchQuery.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.property_type.toLowerCase().includes(q)
      );
    }

    if (options?.featured) {
      results = results.filter((p) => p.featured);
    }

    if (options?.promoted) {
      results = results.filter((p) => p.promoted);
    }

    if (options?.city && options.city !== "Any" && options.city !== "All Cities") {
      results = results.filter(
        (p) => p.city.toLowerCase() === options.city!.toLowerCase()
      );
    }

    if (options?.locality) {
      results = results.filter(
        (p) => p.locality.toLowerCase().includes(options.locality!.toLowerCase())
      );
    }

    if (options?.transactionType && options.transactionType !== "any") {
      results = results.filter(
        (p) => p.transaction_type === options.transactionType
      );
    }

    if (options?.propertyType && options.propertyType !== "Any" && options.propertyType !== "All Types") {
      results = results.filter(
        (p) => p.property_type.toLowerCase() === options.propertyType!.toLowerCase()
      );
    }

    if (options?.bedrooms && options.bedrooms !== "Any") {
      const beds = typeof options.bedrooms === "string" ? parseInt(options.bedrooms, 10) : options.bedrooms;
      if (!isNaN(beds)) {
        results = results.filter((p) => (p.bedrooms || 0) >= beds);
      }
    }

    if (options?.minPrice) {
      results = results.filter((p) => (p.price || 0) >= options.minPrice!);
    }

    if (options?.maxPrice) {
      results = results.filter((p) => (p.price || 0) <= options.maxPrice!);
    }

    if (options?.sortBy) {
      switch (options.sortBy) {
        case "price_asc":
          results.sort((a, b) => (a.price || 0) - (b.price || 0));
          break;
        case "price_desc":
          results.sort((a, b) => (b.price || 0) - (a.price || 0));
          break;
        case "newest":
          results.sort(
            (a, b) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          break;
        case "area_desc":
          results.sort((a, b) => (b.area_sqft || 0) - (a.area_sqft || 0));
          break;
        default:
          break;
      }
    }

    if (options?.limit) {
      results = results.slice(0, options.limit);
    }

    return results;
  }

  try {
    const supabase = createPublicServerSupabaseClient();
    let query = supabase
      .from("properties")
      .select("*")
      .eq("published", true);

    if (options?.featured) query = query.eq("featured", true);
    if (options?.promoted) query = query.eq("promoted", true);
    if (options?.city && options.city !== "Any") query = query.ilike("city", options.city);
    if (options?.transactionType && options.transactionType !== "any")
      query = query.eq("transaction_type", options.transactionType);
    if (options?.propertyType && options.propertyType !== "Any")
      query = query.eq("property_type", options.propertyType);
    if (options?.limit) query = query.limit(options.limit);

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) throw error;
    return (data as Property[]) ?? [];
  } catch {
    return MOCK_PROPERTIES;
  }
}

export async function getPropertyBySlug(
  slug: string
): Promise<Property | null> {
  if (!isSupabaseConfigured()) {
    return MOCK_PROPERTIES.find((p) => p.slug === slug) ?? null;
  }

  try {
    const supabase = createPublicServerSupabaseClient();
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("published", true)
      .eq("slug", slug)
      .single();

    if (error) return null;
    return data as Property;
  } catch {
    return MOCK_PROPERTIES.find((p) => p.slug === slug) ?? null;
  }
}

export async function getAllPropertySlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_PROPERTIES.map((p) => p.slug);
  }

  try {
    const supabase = createPublicServerSupabaseClient();
    const { data, error } = await supabase
      .from("properties")
      .select("slug")
      .eq("published", true);

    if (error) return [];
    return data.map((p: { slug: string }) => p.slug);
  } catch {
    return MOCK_PROPERTIES.map((p) => p.slug);
  }
}

export async function getSimilarProperties(
  property: Property,
  limit: number = 3
): Promise<Property[]> {
  const all = await getPublishedProperties();
  return all
    .filter(
      (p) =>
        p.slug !== property.slug &&
        (p.city.toLowerCase() === property.city.toLowerCase() ||
          p.property_type === property.property_type)
    )
    .slice(0, limit);
}

