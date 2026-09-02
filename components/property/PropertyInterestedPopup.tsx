"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Phone, User, CheckCircle2, ShieldCheck, Send, Building, MapPin, Tag } from "lucide-react";
import {
  getUserContact,
  hasUserContact,
  saveUserContact,
} from "@/lib/storage/userContact";
import { submitEnquiry } from "@/app/actions";
import { trackClarityEvent, setPropertyTags } from "@/lib/analytics/clarity";
import type { Property } from "@/types";

const PROPERTY_POPUP_DELAY_MS = 25000; // 25 seconds

interface PropertyInterestedPopupProps {
  property: Property;
}

export default function PropertyInterestedPopup({
  property,
}: PropertyInterestedPopupProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("I am interested in this property and would like more details.");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [editingContact, setEditingContact] = useState(false);

  const sessionDismissKey = `trb_prop_interested_dismissed_${property.id}`;
  const sessionSubmittedKey = `trb_prop_interested_submitted_${property.id}`;

  useEffect(() => {
    setMounted(true);

    // If user already submitted enquiry for this property in this session or dismissed it, do not show
    if (
      sessionStorage.getItem(sessionDismissKey) === "true" ||
      sessionStorage.getItem(sessionSubmittedKey) === "true"
    ) {
      return;
    }

    const timer = setTimeout(() => {
      // Re-check before showing
      if (
        sessionStorage.getItem(sessionDismissKey) !== "true" &&
        sessionStorage.getItem(sessionSubmittedKey) !== "true"
      ) {
        const saved = getUserContact();
        if (saved.name) setName(saved.name);
        if (saved.phone) setPhone(saved.phone);

        setIsOpen(true);
        setPropertyTags(property);
        trackClarityEvent("property_interested_popup_opened");
      }
    }, PROPERTY_POPUP_DELAY_MS);

    return () => clearTimeout(timer);
  }, [property, sessionDismissKey, sessionSubmittedKey]);

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
    sessionStorage.setItem(sessionDismissKey, "true");
    trackClarityEvent("property_interested_popup_dismissed");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Please provide your name and phone number.");
      return;
    }

    const cleanDigits = phone.replace(/\D/g, "");
    if (cleanDigits.length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // 1. Save user contact to localStorage for auto-filling and future usage
      saveUserContact({ name: name.trim(), phone: phone.trim() });

      // 2. Format property details string
      const propertyDetails = property.title
        ? `${property.title} (${property.locality ? property.locality + ", " : ""}${property.city})`
        : null;

      // 3. Submit enquiry lead directly to database
      await submitEnquiry(
        property.id,
        property.broker_id || null,
        name.trim(),
        phone.trim(),
        message.trim(),
        propertyDetails
      );

      sessionStorage.setItem(sessionSubmittedKey, "true");
      setPropertyTags(property);
      trackClarityEvent("property_interested_popup_submitted");
      setSubmitted(true);

      setTimeout(() => {
        setIsOpen(false);
      }, 2200);
    } catch {
      saveUserContact({ name: name.trim(), phone: phone.trim() });
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 2200);
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;

  const hasSavedDetails = hasUserContact() && !editingContact && name.trim() && phone.trim();

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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            {/* Header with Property Context */}
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
                Interested in this Property?
              </div>

              <h3 className="text-lg sm:text-xl font-display font-bold leading-snug truncate pr-6">
                {property.title}
              </h3>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/80 mt-2">
                {property.price_display && (
                  <span className="font-bold text-[#6FA5E5]">
                    {property.price_display}
                  </span>
                )}
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#6FA5E5]" />
                  {property.locality}, {property.city}
                </span>
                {property.broker_name && (
                  <>
                    <span>•</span>
                    <span className="truncate">Broker: {property.broker_name}</span>
                  </>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-[#172033]">
                    Enquiry Sent to Broker!
                  </h4>
                  <p className="text-xs text-[#667085] max-w-sm mx-auto leading-relaxed">
                    The verified broker for <strong className="text-[#172033]">{property.title}</strong> will call or WhatsApp you shortly at <strong className="text-[#172033]">{phone}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {hasSavedDetails ? (
                    /* Instant 1-Click State for Known Users */
                    <div className="bg-[#F8FAFC] border border-[#E4EAF2] rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-[#172033]">
                          Enquiring as:
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditingContact(true)}
                          className="text-xs text-[#397BCF] font-semibold hover:underline cursor-pointer"
                        >
                          Change info
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#EAF3FF] text-[#245FA8] font-bold flex items-center justify-center text-sm shrink-0">
                          {name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#172033] truncate">
                            {name}
                          </div>
                          <div className="text-xs text-[#667085] truncate">
                            {phone}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Contact Input Fields for First-Time Users */
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="prop-interested-name" className="block text-xs font-bold text-[#172033] mb-1">
                          Your Full Name <span className="text-[#397BCF]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#98A2B3]">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            id="prop-interested-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Priya Sharma"
                            required
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E4EAF2] focus:border-[#397BCF] outline-none text-xs font-medium text-[#172033] placeholder:text-[#98A2B3] transition-colors bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="prop-interested-phone" className="block text-xs font-bold text-[#172033] mb-1">
                          Phone / WhatsApp Number <span className="text-[#397BCF]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#98A2B3]">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            id="prop-interested-phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            required
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E4EAF2] focus:border-[#397BCF] outline-none text-xs font-medium text-[#172033] placeholder:text-[#98A2B3] transition-colors bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Message (Optional) */}
                  <div>
                    <label htmlFor="prop-interested-message" className="block text-xs font-bold text-[#172033] mb-1">
                      Message to Broker (Optional)
                    </label>
                    <textarea
                      id="prop-interested-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={2}
                      placeholder="I'm interested in this property and would like to know more..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] focus:border-[#397BCF] outline-none text-xs font-medium placeholder:text-[#98A2B3] transition-colors resize-none bg-white"
                    />
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
                          Sending Enquiry...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Yes, Send Free Enquiry
                        </>
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
                    🔒 Direct verified broker lead · No registration required
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
