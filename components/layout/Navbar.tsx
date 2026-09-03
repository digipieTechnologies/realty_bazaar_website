"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, X, ChevronRight, PlusCircle, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ListPropertyModal from "@/components/ui/ListPropertyModal";

const navLinks = [
  { label: "Buy", href: "/properties?transaction=sale", paramKey: "transaction", paramValue: "sale" },
  { label: "Rent", href: "/properties?transaction=rent", paramKey: "transaction", paramValue: "rent" },
  { label: "Commercial", href: "/properties?type=commercial", paramKey: "type", paramValue: "commercial" },
  { label: "For Brokers", href: "/for-brokers" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [listModalOpen, setListModalOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, searchParams]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isLinkActive = (link: typeof navLinks[0]) => {
    if (link.paramKey && link.paramValue) {
      return (
        pathname === "/properties" &&
        searchParams?.get(link.paramKey) === link.paramValue
      );
    }
    return pathname === link.href;
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgb(0_0_0/0.06)] border-b border-[#E4EAF2]/60"
            : "bg-white/80 backdrop-blur-sm border-b border-[#E4EAF2]/40"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center shrink-0 transition-opacity hover:opacity-90 py-1"
              aria-label="The Realty Bazaar — Home"
            >
              <Image
                src="/images/branding/logo.png"
                alt="The Realty Bazaar"
                width={190}
                height={44}
                priority
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 animated-underline",
                      isActive
                        ? "text-[#397BCF] bg-[#EAF3FF]"
                        : "text-[#475467] hover:text-[#172033] hover:bg-[#F3F8FE]"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setListModalOpen(true)}
                id="nav-list-property"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#245FA8] hover:bg-[#1E4E8C] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                List Your Property
              </button>
            </div>

            {/* Mobile Actions: Hamburger */}
            <div className="flex items-center gap-1 lg:hidden">
              <button
                className="p-2 rounded-lg text-[#172033] hover:bg-[#F3F8FE] transition-colors cursor-pointer"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 lg:hidden"
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
                <Link href="/" className="flex items-center shrink-0" onClick={() => setMobileOpen(false)}>
                  <Image
                    src="/images/branding/logo.png"
                    alt="The Realty Bazaar"
                    width={160}
                    height={38}
                    className="h-8 w-auto object-contain"
                  />
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
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3] px-3 py-1">
                  Discover Properties
                </div>
                {navLinks.map((link) => {
                  const isActive = isLinkActive(link);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                        isActive
                          ? "bg-[#EAF3FF] text-[#397BCF]"
                          : "text-[#172033] hover:bg-[#F3F8FE]"
                      )}
                    >
                      {link.label}
                      <ChevronRight className="w-4 h-4 opacity-40" />
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-[#E4EAF2] space-y-2.5">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setListModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#245FA8] hover:bg-[#1E4E8C] text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
                  id="mobile-nav-list-property"
                >
                  <PlusCircle className="w-4 h-4" />
                  List Your Property
                </button>
                <Link
                  href="/for-brokers"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-[#E4EAF2] text-[#475467] hover:text-[#172033] hover:bg-[#F8FAFC] text-sm font-semibold rounded-xl transition-all"
                >
                  <Smartphone className="w-4 h-4" />
                  Broker App Overview
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* List Property Modal */}
      <ListPropertyModal
        isOpen={listModalOpen}
        onClose={() => setListModalOpen(false)}
      />

      {/* Spacer to push content below fixed navbar */}
      <div className="h-16 lg:h-[72px]" aria-hidden="true" />
    </>
  );
}

