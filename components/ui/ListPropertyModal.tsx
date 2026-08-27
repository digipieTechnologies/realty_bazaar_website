"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Sparkles, Share2, Target, CheckCircle2, QrCode, ExternalLink, Globe } from "lucide-react";
import AppStoreButtons from "@/components/ui/AppStoreButtons";
import { BROKER_PORTAL_URL } from "@/lib/constants";

interface ListPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ListPropertyModal({ isOpen, onClose }: ListPropertyModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-[#172033] to-[#245FA8] p-6 text-white">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#397BCF]/30 border border-[#6FA5E5]/40 text-[#6FA5E5] rounded-full text-xs font-semibold mb-3">
                <Smartphone className="w-3.5 h-3.5" />
                For Real Estate Brokers
              </div>

              <h2 className="text-xl sm:text-2xl font-display font-bold mb-2">
                List &amp; Manage Properties
              </h2>
              <p className="text-sm text-white/70 leading-relaxed">
                Brokers list and manage properties via the official Partner Portal and mobile app. Listings sync instantly to our public discovery marketplace.
              </p>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6">
              {/* How it works for brokers */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-[#667085] uppercase tracking-wider">
                  How Listing Works
                </p>
                <div className="space-y-2.5">
                  {[
                    {
                      step: "1",
                      icon: Globe,
                      title: "Open Partner Portal or App",
                      desc: "Log in via partners.therealtybazaar.com or download the mobile app.",
                    },
                    {
                      step: "2",
                      icon: Sparkles,
                      title: "Add Property in 60 Seconds",
                      desc: "Upload photos/videos. AI auto-generates your title, description and hashtags.",
                    },
                    {
                      step: "3",
                      icon: Share2,
                      title: "Auto-Publish to Web & Social",
                      desc: "Your listing appears here on therealtybazaar.com and can be posted to Instagram/Facebook with 1 tap.",
                    },
                    {
                      step: "4",
                      icon: Target,
                      title: "Receive Direct Leads in App CRM",
                      desc: "Buyers discover your listing and call/WhatsApp directly.",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3 p-3 rounded-2xl bg-[#F8FAFC] border border-[#E4EAF2]">
                      <div className="w-7 h-7 rounded-xl bg-[#397BCF] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {item.step}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#172033] flex items-center gap-1.5">
                          <item.icon className="w-3.5 h-3.5 text-[#397BCF]" />
                          {item.title}
                        </div>
                        <p className="text-[11px] text-[#667085] mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Partner Portal & Download Links */}
              <div className="pt-2 border-t border-[#E4EAF2] text-center space-y-3">
                <a
                  href={BROKER_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="list-modal-partner-portal-btn"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#397BCF] hover:bg-[#245FA8] text-white font-bold rounded-2xl text-sm transition-all shadow-sm active:scale-98"
                >
                  <span>Launch Broker Partner Web Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <p className="text-xs font-bold text-[#667085] pt-1">
                  Or Get the Mobile App
                </p>
                <div className="flex justify-center">
                  <AppStoreButtons className="w-full max-w-xs justify-center" />
                </div>
                <div className="flex items-center justify-center gap-4 text-[11px] text-[#667085] pt-1">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Free broker account
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Free listing tier
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
