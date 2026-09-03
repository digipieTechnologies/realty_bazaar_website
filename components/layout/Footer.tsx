import Link from "next/link";
import Image from "next/image";

const APP_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
  "https://play.google.com/store/apps/details?id=com.therealtybazaar";
const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ||
  "https://apps.apple.com/app/the-realty-bazaar/id123456789";

const footerLinks = {
  discover: [
    { label: "Browse All Properties", href: "/properties" },
    { label: "Properties for Sale", href: "/properties?transaction=sale" },
    { label: "Properties for Rent", href: "/properties?transaction=rent" },
    { label: "Commercial Properties", href: "/properties?type=commercial" },
    { label: "Apartments & Flats", href: "/properties?type=apartment" },
    { label: "Luxury Villas", href: "/properties?type=villa" },
  ],
  cities: [
    { label: "Properties in Surat", href: "/properties?city=Surat" },
    { label: "Properties in Ahmedabad", href: "/properties?city=Ahmedabad" },
    { label: "Properties in Vadodara", href: "/properties?city=Vadodara" },
    { label: "Properties in Mumbai", href: "/properties?city=Mumbai" },
    { label: "Properties in Pune", href: "/properties?city=Pune" },
    { label: "Properties in Rajkot", href: "/properties?city=Rajkot" },
  ],
  brokers: [
    { label: "For Real Estate Brokers", href: "/for-brokers" },
    { label: "Broker Partner Portal", href: "https://partners.therealtybazaar.com" },
    { label: "Mobile App Features", href: "/features" },
    { label: "Broker Pricing Plans", href: "/pricing" },
    { label: "How the Platform Works", href: "/how-it-works" },
  ],
  company: [
    { label: "About The Realty Bazaar", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#172033] text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10 pb-12 border-b border-white/10">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center transition-opacity hover:opacity-90">
              <Image
                src="/images/branding/logo-white.png"
                alt="The Realty Bazaar"
                width={190}
                height={44}
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Discover verified residential and commercial properties across India, connecting buyers and tenants directly with local real estate professionals.
            </p>

            {/* App store badges */}
            <div className="pt-2 space-y-2.5">
              <p className="text-xs font-bold text-white/50 uppercase tracking-wider">
                Broker App Download
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Link
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all duration-200"
                  id="footer-play-store"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0" aria-hidden="true">
                    <path d="M3.18 23.76A1.96 1.96 0 0 1 2 22V2C2 1.36 2.37.82 2.93.53L14.36 12 3.18 23.76ZM15.54 13.19l2.8 2.8-10.96 6.23 8.16-9.03ZM21.14 10.17c.57.31.86.79.86 1.83s-.29 1.52-.86 1.83l-2.57 1.46-3.16-3.16 3.16-3.16 2.57 1.2ZM7.38 1.81l10.96 6.23-2.8 2.8L6.38 1.81l1-.0Z" />
                  </svg>
                  <div>
                    <div className="text-[10px] text-slate-300 leading-none">Get it on</div>
                    <div className="text-xs font-semibold text-white leading-tight">Google Play</div>
                  </div>
                </Link>
                <Link
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all duration-200"
                  id="footer-app-store"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11Z" />
                  </svg>
                  <div>
                    <div className="text-[10px] text-slate-300 leading-none">Download on the</div>
                    <div className="text-xs font-semibold text-white leading-tight">App Store</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <Link
                href="https://instagram.com/therealtybazaar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link
                href="https://facebook.com/therealtybazaar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
              <Link
                href="https://linkedin.com/company/therealtybazaar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Discover links */}
          <div>
            <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-4">
              Discover
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.discover.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    rel={link.href.includes("?") ? "nofollow" : undefined}
                    className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Cities */}
          <div>
            <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-4">
              Top Cities
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.cities.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    rel={link.href.includes("?") ? "nofollow" : undefined}
                    className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Brokers */}
          <div>
            <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-4">
              For Brokers
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.brokers.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-300">
            © {new Date().getFullYear()} The Realty Bazaar. All rights reserved.
          </p>
          <p className="text-xs text-slate-300">
            India&apos;s Modern Real Estate Property Discovery Platform
          </p>
        </div>
      </div>
    </footer>
  );
}
