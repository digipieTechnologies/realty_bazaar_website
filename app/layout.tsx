import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://therealtybazaar.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#172033",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Realty Bazaar | India's Property Discovery Platform",
    template: "%s | The Realty Bazaar",
  },
  description:
    "The Realty Bazaar is India's leading PropTech platform for real-estate brokers. Market properties across Instagram & Facebook, generate verified buyer leads, and manage your pipeline with a mobile CRM.",
  keywords: [
    "real estate CRM India",
    "property marketing app",
    "broker CRM India",
    "lead management real estate",
    "properties for sale Surat",
    "properties for sale Gujarat",
    "real estate advertising app",
    "real estate broker platform",
    "proptech India",
    "property listing marketplace",
  ],
  authors: [{ name: "The Realty Bazaar", url: SITE_URL }],
  creator: "The Realty Bazaar",
  publisher: "The Realty Bazaar",
  category: "Real Estate & PropTech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "The Realty Bazaar",
    title: "The Realty Bazaar — Property Marketing & Lead Management for Real Estate Brokers",
    description:
      "Market properties, generate verified buyer leads and manage your entire real estate business from one powerful mobile platform.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "The Realty Bazaar — PropTech Platform for Indian Brokers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Realty Bazaar — Property Marketing & Lead Management",
    description:
      "Market properties, generate leads and manage your real estate business from one powerful mobile platform.",
    images: [`${SITE_URL}/og-image.jpg`],
    site: "@therealtybazaar",
    creator: "@therealtybazaar",
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-icon.png", sizes: "any", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

// JSON-LD structured data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "The Realty Bazaar",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
  },
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "PropTech platform and property discovery marketplace for Indian real-estate brokers — marketing, lead generation and CRM in one app.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressRegion: "Gujarat",
    addressLocality: "Surat",
  },
  areaServed: [
    { "@type": "City", name: "Surat" },
    { "@type": "State", name: "Gujarat" },
    { "@type": "Country", name: "India" },
  ],
  sameAs: [
    "https://www.instagram.com/therealtybazaar",
    "https://www.facebook.com/therealtybazaar",
    "https://www.linkedin.com/company/therealtybazaar",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "The Realty Bazaar",
  url: SITE_URL,
  description: "Property discovery platform for buyers and renters across India.",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/properties?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased">
        <Suspense fallback={<div className="h-16 lg:h-[72px] bg-white border-b border-[#E4EAF2]" />}>
          <Navbar />
        </Suspense>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

