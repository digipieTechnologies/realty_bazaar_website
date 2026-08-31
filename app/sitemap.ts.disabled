import { getAllPropertiesForSitemap } from "@/lib/supabase/queries";
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://therealtybazaar.com";

// Core indexable static pages with realistic last-modified dates
// Utility and legal pages (/privacy, /terms, /refund) are excluded from the sitemap
const staticPages: MetadataRoute.Sitemap = [
  {
    url: `${SITE_URL}`,
    lastModified: new Date("2026-08-25"),
    changeFrequency: "daily",
    priority: 1.0,
  },
  {
    url: `${SITE_URL}/properties`,
    lastModified: new Date("2026-08-25"),
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/for-brokers`,
    lastModified: new Date("2026-08-25"),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/features`,
    lastModified: new Date("2026-08-25"),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE_URL}/how-it-works`,
    lastModified: new Date("2026-08-25"),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE_URL}/about`,
    lastModified: new Date("2026-08-25"),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${SITE_URL}/pricing`,
    lastModified: new Date("2026-08-25"),
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    url: `${SITE_URL}/contact`,
    lastModified: new Date("2026-08-25"),
    changeFrequency: "monthly",
    priority: 0.6,
  },
];

// Hourly ISR revalidation on Vercel edge/serverless runtime
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const propertyEntries = await getAllPropertiesForSitemap();

    const propertyPages: MetadataRoute.Sitemap = propertyEntries
      .filter((item) => item.slug && item.slug.trim().length > 0)
      .map((item) => {
        const dateStr = item.updated_at || item.created_at;
        const parsedDate = dateStr ? new Date(dateStr) : undefined;
        const validDate =
          parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate : undefined;

        return {
          url: `${SITE_URL}/properties/${item.slug}`,
          ...(validDate ? { lastModified: validDate } : {}),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        };
      });

    // Deduplicate all URLs defensively
    const sitemapMap = new Map<string, MetadataRoute.Sitemap[number]>();
    for (const entry of [...staticPages, ...propertyPages]) {
      if (entry.url && !sitemapMap.has(entry.url)) {
        sitemapMap.set(entry.url, entry);
      }
    }

    return Array.from(sitemapMap.values());
  } catch (error) {
    console.error("[sitemap] Failed to generate dynamic sitemap:", error);
    return [...staticPages];
  }
}
