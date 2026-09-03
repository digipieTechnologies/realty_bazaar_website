import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.therealtybazaar.com",
          },
        ],
        destination: "https://therealtybazaar.com/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/logo.png", destination: "/images/branding/logo.png" },
      { source: "/logo-white.png", destination: "/images/branding/logo-white.png" },
      { source: "/logo-icon.png", destination: "/images/branding/logo-icon.png" },
      { source: "/og-image.jpg", destination: "/images/og/og-image.jpg" },
      { source: "/images/hero-architectural-sketch.jpg", destination: "/images/hero/hero-architectural-sketch.jpg" },
      { source: "/property-placeholder.png", destination: "/images/properties/property-placeholder.png" },
      { source: "/facebook-icon.png", destination: "/images/social/facebook-icon.png" },
      { source: "/instagram-icon.png", destination: "/images/social/instagram-icon.png" },
      { source: "/whatsapp-icon.avif", destination: "/images/social/whatsapp-icon.avif" },
      { source: "/apple-touch-icon.png", destination: "/images/favicons/apple-touch-icon.png" },
      { source: "/icon-192.png", destination: "/images/favicons/icon-192.png" },
      { source: "/icon-512.png", destination: "/images/favicons/icon-512.png" },
      { source: "/favicon-48x48.png", destination: "/images/favicons/favicon-48x48.png" },
      { source: "/favicon-96x96.png", destination: "/images/favicons/favicon-96x96.png" },
      { source: "/favicon-32x32.png", destination: "/images/favicons/favicon-32x32.png" },
      { source: "/favicon-16x16.png", destination: "/images/favicons/favicon-16x16.png" },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days image cache
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 450],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.r2.dev",
      },
    ],
  },
};

export default nextConfig;

