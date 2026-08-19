"use client";

import { useState } from "react";
import { submitEnquiry } from "@/app/actions";
import { Send, Phone, MessageCircle, Calendar, Check } from "lucide-react";
import type { Property } from "@/types";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Name and phone are required.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await submitEnquiry(
        property.id,
        null, // broker_id resolved server-side from property
        name,
        phone,
        message
      );
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-[#E4EAF2] rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-[#172033] px-5 py-4">
        <div className="text-white font-bold text-sm mb-0.5">{property.broker_name || "Contact Broker"}</div>
        <div className="text-white/60 text-xs">Verified Broker · The Realty Bazaar</div>
      </div>

      <div className="p-5">
        {submitted ? (
          <div className="py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-[#172033] mb-1">Enquiry Sent!</h3>
            <p className="text-sm text-[#667085]">
              The broker will contact you shortly.
            </p>
          </div>
        ) : (
          <>
            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {property.broker_phone && (
                <a
                  href={`tel:${property.broker_phone}`}
                  id="property-call-broker"
                  className="flex items-center justify-center gap-2 py-2.5 bg-green-50 hover:bg-green-100 text-green-700 font-semibold rounded-xl text-xs transition-all border border-green-200"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Broker
                </a>
              )}
              {property.broker_whatsapp && (
                <a
                  href={`https://wa.me/${property.broker_whatsapp.replace(/\D/g, "")}?text=Hi, I'm interested in ${property.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="property-whatsapp-broker"
                  className="flex items-center justify-center gap-2 py-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-semibold rounded-xl text-xs transition-all border border-[#25D366]/20"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              )}
            </div>

            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E4EAF2]" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-[#98A2B3]">or send an enquiry</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="enquiry-name" className="block text-xs font-semibold text-[#172033] mb-1">
                  Your Name <span className="text-[#397BCF]">*</span>
                </label>
                <input
                  id="enquiry-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Priya Sharma"
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-[#E4EAF2] focus:border-[#397BCF] outline-none text-sm placeholder:text-[#98A2B3] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="enquiry-phone" className="block text-xs font-semibold text-[#172033] mb-1">
                  Phone Number <span className="text-[#397BCF]">*</span>
                </label>
                <input
                  id="enquiry-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-[#E4EAF2] focus:border-[#397BCF] outline-none text-sm placeholder:text-[#98A2B3] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="enquiry-message" className="block text-xs font-semibold text-[#172033] mb-1">
                  Message
                </label>
                <textarea
                  id="enquiry-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="I'm interested in this property..."
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-[#E4EAF2] focus:border-[#397BCF] outline-none text-sm placeholder:text-[#98A2B3] transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                  {error}
                </p>
              )}

              <button
                type="submit"
                id="property-send-enquiry"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#397BCF] hover:bg-[#245FA8] disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-all active:scale-[0.98] shadow-sm"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {submitting ? "Sending..." : "Send Enquiry"}
              </button>

              <a
                href={`https://wa.me/${property.broker_whatsapp?.replace(/\D/g, "")}?text=I'd like to schedule a site visit for ${property.title}`}
                target="_blank"
                rel="noopener noreferrer"
                id="property-schedule-visit"
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-[#397BCF] text-[#397BCF] hover:bg-[#EAF3FF] font-semibold rounded-xl text-sm transition-all active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4" />
                Schedule a Site Visit
              </a>
            </form>

            <p className="text-[10px] text-[#98A2B3] text-center mt-3">
              No account required. Your enquiry goes directly to the broker.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
