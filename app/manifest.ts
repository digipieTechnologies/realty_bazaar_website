import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Realty Bazaar — PropTech & Property Marketplace",
    short_name: "The Realty Bazaar",
    description:
      "Property marketing, broker CRM, and verified property discovery platform for India.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#172033",
    icons: [
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
