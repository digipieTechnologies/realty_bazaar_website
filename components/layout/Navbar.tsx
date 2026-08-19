"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Download, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const APP_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
  "https://play.google.com/store/apps/details?id=com.therealtybazaar";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "For Brokers", href: "/for-brokers" },
  { label: "Properties", href: "/properties" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgb(0_0_0/0.06)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 shrink-0"
              aria-label="The Realty Bazaar — Home"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#397BCF] to-[#245FA8] flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
                  <path d="M3 12L12 3l9 9v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9z" opacity="0.3"/>
                  <path d="M9 21V12h6v9" />
                  <path d="M3 12L12 3l9 9" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="9" y="12" width="6" height="9" fill="white"/>
                  <circle cx="17" cy="7" r="2" fill="#6FA5E5"/>
                </svg>
              </div>
              <span
                className={cn(
                  "font-display font-bold text-base tracking-tight transition-colors duration-300",
                  "text-[#172033]"
                )}
              >
                The Realty Bazaar
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 animated-underline",
                    pathname === link.href
                      ? "text-[#397BCF] bg-[#EAF3FF]"
                      : "text-[#667085] hover:text-[#172033] hover:bg-[#F3F8FE]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/properties"
                className="text-sm font-medium text-[#667085] hover:text-[#172033] transition-colors px-3 py-2 rounded-lg hover:bg-[#F3F8FE]"
                id="nav-browse-properties"
              >
                Browse Properties
              </Link>
              <Link
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="nav-get-app"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#397BCF] hover:bg-[#245FA8] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                Get the App
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-[#172033] hover:bg-[#F3F8FE] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[90vw] bg-white z-50 shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#E4EAF2]">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#397BCF] to-[#245FA8] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden="true">
                      <path d="M3 12L12 3l9 9v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9z" opacity="0.3"/>
                      <rect x="9" y="12" width="6" height="9" fill="white"/>
                    </svg>
                  </div>
                  <span className="font-display font-bold text-sm text-[#172033]">The Realty Bazaar</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-[#F3F8FE] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-[#172033]" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-1" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      pathname === link.href
                        ? "bg-[#EAF3FF] text-[#397BCF]"
                        : "text-[#172033] hover:bg-[#F3F8FE]"
                    )}
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </Link>
                ))}
              </nav>

              <div className="p-4 border-t border-[#E4EAF2] space-y-3">
                <Link
                  href="/properties"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 border-2 border-[#397BCF] text-[#397BCF] text-sm font-semibold rounded-xl hover:bg-[#EAF3FF] transition-all"
                  id="mobile-browse-properties"
                >
                  Browse Properties
                </Link>
                <Link
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="mobile-get-app"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#397BCF] hover:bg-[#245FA8] text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Get the App
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to push content below fixed navbar */}
      <div className="h-16 lg:h-18" aria-hidden="true" />
    </>
  );
}
