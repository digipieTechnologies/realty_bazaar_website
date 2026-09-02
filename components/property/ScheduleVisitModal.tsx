"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, CheckCircle2 } from "lucide-react";
import { submitEnquiry } from "@/app/actions";
import CustomSelect from "@/components/ui/CustomSelect";
import type { Property } from "@/types";
import { getUserContact, saveUserContact } from "@/lib/storage/userContact";

const timeSlotOptions = [
  { value: "10:00 AM", label: "Morning (10:00 AM – 12:00 PM)" },
  { value: "02:00 PM", label: "Afternoon (02:00 PM – 04:00 PM)" },
  { value: "05:00 PM", label: "Evening (05:00 PM – 07:00 PM)" },
  { value: "Weekend Slot", label: "Weekend Slot" },
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
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00 AM");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const saved = getUserContact();
      if (saved.name) setName((prev) => prev || saved.name);
      if (saved.phone) setPhone((prev) => prev || saved.phone);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date) {
      setError("Please fill in your name, phone number, and preferred date.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      saveUserContact({ name: name.trim(), phone: phone.trim() });
      const message = `Site Visit Request for ${property.title} on ${date} at ${time}.`;
      await submitEnquiry(property.id, null, name, phone, message);
      setSubmitted(true);
    } catch {
      setError("Could not submit your request. Please try again or WhatsApp the broker directly.");
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
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-display font-bold text-[#172033]">
                    Site Visit Requested!
                  </h4>
                  <p className="text-sm text-[#667085] max-w-sm mx-auto leading-relaxed">
                    The broker <strong className="text-[#172033]">{property.broker_name}</strong> will call/WhatsApp you at <strong className="text-[#172033]">{phone}</strong> to confirm the timing.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-4 px-6 py-2.5 bg-[#397BCF] text-white font-bold rounded-xl text-xs hover:bg-[#245FA8] transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Preferred Date */}
                    <div>
                      <label className="block text-xs font-bold text-[#172033] mb-1">
                        Preferred Date <span className="text-[#397BCF]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          required
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full px-3 py-2.5 rounded-xl border-2 border-[#E4EAF2] focus:border-[#397BCF] text-xs font-medium text-[#172033] outline-none"
                        />
                      </div>
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
