"use client";

import { useState, useEffect } from "react";
import { submitEnquiry } from "@/app/actions";
import { Send, Phone, Calendar, ShieldCheck, CheckCircle2, Building } from "lucide-react";
import ScheduleVisitModal from "@/components/property/ScheduleVisitModal";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import type { Property } from "@/types";
import {
  trackPropertyCallClick,
  trackPropertyWhatsAppClick,
  trackPropertyLeadSubmit,
} from "@/lib/analytics/clarity";
import {
  getUserContact,
  saveUserContact,
  subscribeUserContact,
} from "@/lib/storage/userContact";

interface EnquiryFormProps {
  property: Property;
}

export default function EnquiryForm({ property }: EnquiryFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  // Auto-populate from localStorage and listen to real-time updates
  useEffect(() => {
    const saved = getUserContact();
    if (saved.name) setName((prev) => prev || saved.name);
    if (saved.phone) setPhone((prev) => prev || saved.phone);

    const unsubscribe = subscribeUserContact((contact) => {
      if (contact.name) setName(contact.name);
      if (contact.phone) setPhone(contact.phone);
    });

    return unsubscribe;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Name and phone number are required.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      saveUserContact({ name: name.trim(), phone: phone.trim() });
      const propertyDetails = property.title
        ? `${property.title} (${property.locality ? property.locality + ", " : ""}${property.city})`
        : null;
      await submitEnquiry(
        property.id,
        property.broker_id || null,
        name,
        phone,
        message,
        propertyDetails
      );
      setSubmitted(true);
      trackPropertyLeadSubmit(property);
    } catch {

      setError("Something went wrong. Please call or WhatsApp the broker directly.");
    } finally {
      setSubmitting(false);
    }
  };


  const cleanPhone = property.broker_phone?.replace(/\D/g, "") || "9876543210";
  const cleanWhatsApp = property.broker_whatsapp?.replace(/\D/g, "") || cleanPhone;

  return (
    <div className="bg-white border border-[#E4EAF2] rounded-3xl overflow-hidden shadow-sm sticky top-24">
      {/* Verified Broker Profile Header */}
      <div className="bg-gradient-to-br from-[#172033] via-[#1e2d47] to-[#253553] p-5 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#397BCF] to-[#245FA8] flex items-center justify-center font-display font-bold text-lg text-white shadow-md shrink-0">
            {property.broker_name ? property.broker_name.charAt(0) : "B"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-white font-bold text-sm truncate">
              <span>{property.broker_name || "Verified Real Estate Broker"}</span>
              <ShieldCheck className="w-4 h-4 text-[#6FA5E5] shrink-0" />
            </div>
            <div className="text-xs text-white/70 truncate mt-0.5">
              {property.broker_agency || "The Realty Bazaar Partner"}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Quick Action Buttons (Call & WhatsApp - Desktop sidebar only, mobile has sticky bar) */}
        <div className="hidden lg:grid grid-cols-2 gap-2.5">
          <a
            href={`tel:${property.broker_phone || "+919876543210"}`}
            id="property-call-broker"
            onClick={() => trackPropertyCallClick(property)}
            className="flex items-center justify-center gap-2 py-3 bg-[#F3F8FE] hover:bg-[#EAF3FF] text-[#245FA8] font-bold rounded-2xl text-xs transition-all border border-[#6FA5E5]/30 shadow-2xs active:scale-95"
          >
            <Phone className="w-3.5 h-3.5" />
            Call Broker
          </a>

          <a
            href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
              `Hi, I'm interested in viewing ${property.title} listed on The Realty Bazaar (${property.locality}, ${property.city}).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            id="property-whatsapp-broker"
            onClick={() => trackPropertyWhatsAppClick(property)}
            className="flex items-center justify-center gap-2 py-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold rounded-2xl text-xs transition-all border border-[#25D366]/30 shadow-2xs active:scale-95"
          >
            <WhatsAppIcon className="w-4 h-4" variant="brand" />
            WhatsApp
          </a>
        </div>

        {/* Site Visit Action */}
        <div>
          <button
            type="button"
            onClick={() => setScheduleModalOpen(true)}
            id="property-schedule-visit-btn"
            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-[#397BCF] text-[#397BCF] hover:bg-[#EAF3FF] font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-2xs active:scale-95 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Schedule a Physical Site Visit
          </button>
        </div>

        {/* Divider */}
        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E4EAF2]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-[11px] font-bold text-[#98A2B3] uppercase tracking-wider">
              or send enquiry
            </span>
          </div>
        </div>

        {/* Form */}
        {submitted ? (
          <div className="py-6 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-[#172033]">Enquiry Sent to Broker!</h4>
            <p className="text-xs text-[#667085]">
              The broker will call or message you shortly with details.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="enquiry-name" className="block text-[11px] font-bold text-[#172033] mb-1">
                Your Name <span className="text-[#397BCF]">*</span>
              </label>
              <input
                id="enquiry-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Priya Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] focus:border-[#397BCF] outline-none text-xs font-medium placeholder:text-[#98A2B3] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="enquiry-phone" className="block text-[11px] font-bold text-[#172033] mb-1">
                Phone Number <span className="text-[#397BCF]">*</span>
              </label>
              <input
                id="enquiry-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] focus:border-[#397BCF] outline-none text-xs font-medium placeholder:text-[#98A2B3] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="enquiry-message" className="block text-[11px] font-bold text-[#172033] mb-1">
                Message (Optional)
              </label>
              <textarea
                id="enquiry-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                placeholder="I would like to know more about this property..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] focus:border-[#397BCF] outline-none text-xs font-medium placeholder:text-[#98A2B3] transition-colors resize-none"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              id="property-send-enquiry-btn"
              className="w-full py-3 bg-[#397BCF] hover:bg-[#245FA8] disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-all shadow-sm active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              {submitting ? "Sending..." : "Send Free Enquiry"}
            </button>
          </form>
        )}

        <div className="pt-2 text-center text-[10px] text-[#98A2B3] border-t border-[#E4EAF2]">
          🔒 No account needed · Direct broker lead capture
        </div>
      </div>

      <ScheduleVisitModal
        property={property}
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
      />
    </div>
  );
}
