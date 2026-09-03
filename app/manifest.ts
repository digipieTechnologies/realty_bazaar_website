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
        src: "/images/favicons/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/images/favicons/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/images/favicons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/favicons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/images/favicons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
