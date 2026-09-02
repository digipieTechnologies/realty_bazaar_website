"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Phone, User, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import {
  getUserContact,
  hasUserContact,
  isPopupDismissed,
  setPopupDismissed,
  saveUserContact,
  getSessionStartTime,
} from "@/lib/storage/userContact";
import { submitQuickLead } from "@/app/actions";
import {
  trackUserContactPopupOpen,
  trackUserContactPopupSubmit,
  trackUserContactPopupDismiss,
} from "@/lib/analytics/clarity";

const POPUP_DELAY_MS = 30000; // 30 seconds

export default function UserContactPopup() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);

    // If already saved or dismissed, don't set up the timer
    if (hasUserContact() || isPopupDismissed()) {
      return;
    }

    const sessionStart = getSessionStartTime();
    const timeSpent = Date.now() - sessionStart;
    const remainingTime = Math.max(0, POPUP_DELAY_MS - timeSpent);

    const timer = setTimeout(() => {
      // If user is currently on a specific property detail page, let the 25s property popup take precedence
      if (typeof window !== "undefined" && window.location.pathname.startsWith("/properties/")) {
        return;
      }

      // Re-check before showing in case the user filled a form in the meantime
      if (!hasUserContact() && !isPopupDismissed()) {
        const saved = getUserContact();
        if (saved.name) setName(saved.name);
        if (saved.phone) setPhone(saved.phone);
        setIsOpen(true);
        trackUserContactPopupOpen();
      }
    }, remainingTime);


    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") handleClose();
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setPopupDismissed();
    trackUserContactPopupDismiss();
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Please enter your name and phone number.");
      return;
    }

    // Validate phone (at least 7 digits)
    const cleanDigits = phone.replace(/\D/g, "");
    if (cleanDigits.length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // 1. Save to localStorage immediately & broadcast to active forms
      saveUserContact({ name: name.trim(), phone: phone.trim() });

      // 2. Submit details to server
      const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
      await submitQuickLead(name.trim(), phone.trim(), currentPath);

      trackUserContactPopupSubmit();
      setSubmitted(true);


      // Auto close after brief celebration
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch {
      // Still save locally for the user
      saveUserContact({ name: name.trim(), phone: phone.trim() });
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } finally {
      setSubmitting(false);
    }
  };

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
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            {/* Header with decorative background */}
            <div className="bg-gradient-to-br from-[#172033] via-[#1e2d47] to-[#253553] p-6 text-white relative">
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close popup"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#397BCF]/30 text-[#6FA5E5] rounded-full text-xs font-semibold mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-[#6FA5E5]" />
                One-Time Contact Setup
              </div>

              <h3 className="text-xl font-display font-bold leading-snug">
                Save Your Contact Details
              </h3>
              <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
                Enter your details once to quickly enquire about properties without having to re-type your information every time.
              </p>
            </div>

            {/* Content Body */}
            <div className="p-6">
              {submitted ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-display font-bold text-[#172033]">
                    Details Saved!
                  </h4>
                  <p className="text-xs text-[#667085] max-w-xs mx-auto leading-relaxed">
                    Your contact info is saved on this device and will now auto-populate whenever you submit property enquiries or book visits.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="user-contact-name" className="block text-xs font-bold text-[#172033] mb-1">
                      Your Full Name <span className="text-[#397BCF]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#98A2B3]">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        id="user-contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        required
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-[#E4EAF2] focus:border-[#397BCF] outline-none text-xs sm:text-sm font-medium text-[#172033] placeholder:text-[#98A2B3] transition-colors bg-white"
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label htmlFor="user-contact-phone" className="block text-xs font-bold text-[#172033] mb-1">
                      Phone / WhatsApp Number <span className="text-[#397BCF]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#98A2B3]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        id="user-contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        required
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-[#E4EAF2] focus:border-[#397BCF] outline-none text-xs sm:text-sm font-medium text-[#172033] placeholder:text-[#98A2B3] transition-colors bg-white"
                      />
                    </div>
                  </div>


                  {/* Features / Trust Badges */}
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#667085] font-medium bg-[#F8FAFC] p-2 rounded-lg border border-[#E4EAF2]">
                      <Zap className="w-3.5 h-3.5 text-[#397BCF] shrink-0" />
                      <span>Auto-fills Enquiries</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#667085] font-medium bg-[#F8FAFC] p-2 rounded-lg border border-[#E4EAF2]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#397BCF] shrink-0" />
                      <span>Stored on Your Device</span>
                    </div>
                  </div>

                  {error && (
                    <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200 font-medium">
                      {error}
                    </p>
                  )}

                  <div className="space-y-2 pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 bg-[#397BCF] hover:bg-[#245FA8] disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Saving Details...
                        </>
                      ) : (
                        "Save Contact Details"
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="w-full py-2 text-xs font-semibold text-[#98A2B3] hover:text-[#667085] transition-colors cursor-pointer text-center"
                    >
                      Maybe later
                    </button>
                  </div>

                  <div className="text-[10px] text-[#98A2B3] text-center pt-1 border-t border-[#E4EAF2]">
                    🔒 Saved securely in your browser · Stays until cache is cleared
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
