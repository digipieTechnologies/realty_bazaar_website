import { getAllPropertySlugs } from "@/lib/supabase/queries";
import type { MetadataRoute } from "next";

const SITE_URL = "https://therealtybazaar.com";

const staticPages: MetadataRoute.Sitemap = [
  { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
  { url: `${SITE_URL}/for-brokers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/features`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/how-it-works`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  { url: `${SITE_URL}/properties`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  { url: `${SITE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: `${SITE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: `${SITE_URL}/refund`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const slugs = await getAllPropertySlugs();
    const propertyPages: MetadataRoute.Sitemap = slugs.map((slug) => ({
      url: `${SITE_URL}/properties/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticPages, ...propertyPages];
  } catch {
    return staticPages;
  }
}
