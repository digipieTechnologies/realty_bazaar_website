import { getAllPropertiesForSitemap } from "@/lib/supabase/queries";
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://therealtybazaar.com";

// Core static pages with SEO priorities
const staticPages: MetadataRoute.Sitemap = [
  {
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  },
  {
    url: `${SITE_URL}/properties`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.95,
  },
  {
    url: `${SITE_URL}/for-brokers`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/pricing`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/features`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/how-it-works`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/about`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE_URL}/contact`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE_URL}/privacy`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${SITE_URL}/terms`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${SITE_URL}/refund`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export const revalidate = 3600; // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const propertyEntries = await getAllPropertiesForSitemap();

    const propertyPages: MetadataRoute.Sitemap = propertyEntries.map((item) => {
      const dateStr = item.updated_at || item.created_at;
      const parsedDate = dateStr ? new Date(dateStr) : new Date();
      const validDate = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

      return {
        url: `${SITE_URL}/properties/${item.slug}`,
        lastModified: validDate,
        changeFrequency: "weekly",
        priority: 0.8,
      };
    });

    return [...staticPages, ...propertyPages];
  } catch (error) {
    console.error("[sitemap] Failed to generate full dynamic sitemap:", error);
    return [...staticPages];
  }
}
