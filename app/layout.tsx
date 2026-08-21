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

const SITE_URL = "https://therealtybazaar.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Realty Bazaar — Property Marketing & Lead Management for Real Estate Brokers",
    template: "%s | The Realty Bazaar",
  },
  description:
    "The Realty Bazaar is a PropTech platform for Indian real-estate brokers. Market properties, generate leads and manage your entire real estate business from one powerful mobile app.",
  keywords: [
    "real estate CRM India",
    "property marketing app",
    "broker CRM",
    "lead management real estate",
    "Instagram property marketing",
    "Facebook property ads",
    "real estate technology India",
    "proptech India",
    "property broker app",
    "real estate leads India",
  ],
  authors: [{ name: "The Realty Bazaar", url: SITE_URL }],
  creator: "The Realty Bazaar",
  publisher: "The Realty Bazaar",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "The Realty Bazaar",
    title: "The Realty Bazaar — Property Marketing & Lead Management for Real Estate Brokers",
    description:
      "Market properties, generate leads and manage your real estate business from one powerful mobile platform.",
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
};

// JSON-LD structured data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Realty Bazaar",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "PropTech platform for Indian real-estate brokers — property marketing, lead generation and CRM in one mobile app.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.instagram.com/therealtybazaar",
    "https://www.facebook.com/therealtybazaar",
    "https://www.linkedin.com/company/therealtybazaar",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The Realty Bazaar",
  url: SITE_URL,
  description: "Property Marketing & Lead Management for Real Estate Brokers",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/properties?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "The Realty Bazaar",
  applicationCategory: "BusinessApplication",
  operatingSystem: "iOS, Android",
  description:
    "Mobile app for real-estate brokers to market properties, generate leads and manage their CRM.",
  offers: {
    "@type": "Offer",
    price: "999",
    priceCurrency: "INR",
    priceSpecification: {
      "@type": "RecurringChargeSpecification",
      billingDuration: 1,
      billingIncrement: "P1M",
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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

