"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, CheckCircle2, ArrowRight, Clock } from "lucide-react";
import { submitSiteVisitRequest } from "@/app/actions";
import CustomSelect from "@/components/ui/CustomSelect";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import type { Property } from "@/types";
import { getUserContact, saveUserContact } from "@/lib/storage/userContact";
import { saveVisitToStorage } from "@/lib/visits";
import {
  trackScheduleVisitModalOpen,
  trackScheduleVisitSubmit,
} from "@/lib/analytics/clarity";
import { useIsClient } from "@/lib/hooks/useIsClient";

const timeSlotOptions = [
  { value: "10:00 AM – 12:00 PM", label: "Morning (10:00 AM – 12:00 PM)" },
  { value: "12:00 PM – 02:00 PM", label: "Midday (12:00 PM – 02:00 PM)" },
  { value: "02:00 PM – 04:00 PM", label: "Afternoon (02:00 PM – 04:00 PM)" },
  { value: "04:00 PM – 06:00 PM", label: "Evening (04:00 PM – 06:00 PM)" },
  { value: "06:00 PM – 08:00 PM", label: "Late Evening (06:00 PM – 08:00 PM)" },
];

interface ScheduleVisitModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export default function ScheduleVisitModal({
  property,
  isOpen,
  onClose,
}: ScheduleVisitModalProps) {
  const isClient = useIsClient();
  const [name, setName] = useState(() => getUserContact().name || "");
  const [phone, setPhone] = useState(() => getUserContact().phone || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00 AM – 12:00 PM");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      trackScheduleVisitModalOpen(property);

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
  }, [isOpen, onClose, property]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date) {
      setError("Please fill in your name, phone number, and preferred date.");
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
      saveUserContact({ name: name.trim(), phone: phone.trim() });

      const res = await submitSiteVisitRequest({
        propertyId: property.id,
        brokerId: property.broker_id || null,
        clientName: name.trim(),
        clientPhone: phone.trim(),
        visitDate: date,
        timeSlot: time,
        notes: notes.trim() || undefined,
      });

      if (res.success && res.visit) {
        saveVisitToStorage(res.visit, property);
      }

      trackScheduleVisitSubmit(property);
      setSubmitted(true);
    } catch {
      setError("Could not submit your request. Please try again or WhatsApp the broker directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isClient) return null;

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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#172033] to-[#253553] p-6 text-white relative">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#397BCF]/30 text-[#6FA5E5] rounded-full text-xs font-semibold mb-2">
                <Calendar className="w-3.5 h-3.5" />
                Schedule a Site Visit
              </div>
              <h3 className="text-lg sm:text-xl font-display font-bold">{property.title}</h3>
              <p className="text-xs text-white/70 mt-1">
                {property.locality}, {property.city} · Broker: {property.broker_name || "Verified Broker"}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {submitted ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100/80 text-amber-800 text-[11px] font-bold mb-1.5">
                      Status: Pending Broker Confirmation
                    </div>
                    <h4 className="text-xl font-display font-bold text-[#172033]">
                      Site Visit Requested!
                    </h4>
                    <p className="text-xs sm:text-sm text-[#667085] max-w-sm mx-auto leading-relaxed mt-1">
                      Your request for <strong className="text-[#172033]">{date} ({time})</strong> has been sent to the broker. They will review and confirm via their mobile app.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                    <Link
                      href="/site-visits"
                      onClick={onClose}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#245FA8] hover:bg-[#1E4E8C] text-white font-bold rounded-xl text-xs transition-all shadow-sm"
                    >
                      <span>View Scheduled Visits</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#F8FAFC] hover:bg-[#F3F8FE] text-[#172033] border border-[#E4EAF2] font-bold rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Preferred Date */}
                    <div>
                      <label className="block text-xs font-bold text-[#172033] mb-1">
                        Preferred Date <span className="text-[#397BCF]">*</span>
                      </label>
                      <CustomDatePicker
                        value={date}
                        onChange={setDate}
                        placeholder="Select date"
                        size="sm"
                        triggerClassName="!py-2.5 !text-xs !font-medium text-[#172033]"
                        required
                      />
                    </div>

                    {/* Preferred Time */}
                    <div>
                      <label className="block text-xs font-bold text-[#172033] mb-1">
                        Preferred Time Slot
                      </label>
                      <CustomSelect
                        value={time}
                        onChange={setTime}
                        options={timeSlotOptions}
                        size="sm"
                        triggerClassName="!py-2.5 !text-xs !font-medium text-[#172033]"
                      />
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#172033] mb-1">
                      Your Full Name <span className="text-[#397BCF]">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      required
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-[#E4EAF2] focus:border-[#397BCF] text-xs font-medium text-[#172033] placeholder:text-[#98A2B3] outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-[#172033] mb-1">
                      Phone Number (WhatsApp) <span className="text-[#397BCF]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-[#E4EAF2] focus:border-[#397BCF] text-xs font-medium text-[#172033] placeholder:text-[#98A2B3] outline-none"
                    />
                  </div>

                  {/* Notes / Special Requests */}
                  <div>
                    <label className="block text-xs font-bold text-[#172033] mb-1">
                      Notes / Message <span className="text-xs text-[#98A2B3] font-normal">(Optional)</span>
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Visiting with family, prefer afternoon slot..."
                      rows={2}
                      className="w-full px-3 py-2 rounded-xl border-2 border-[#E4EAF2] focus:border-[#397BCF] text-xs font-medium text-[#172033] placeholder:text-[#98A2B3] outline-none resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-[#397BCF] hover:bg-[#245FA8] disabled:opacity-50 text-white font-bold rounded-2xl text-sm transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    {submitting ? "Requesting Visit..." : "Confirm Site Visit Request"}
                  </button>

                  <p className="text-[11px] text-[#98A2B3] text-center">
                    🔒 Your contact information is sent only to the verified listing broker.
                  </p>
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
