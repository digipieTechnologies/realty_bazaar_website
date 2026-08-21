"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Sparkles, Share2, Target, CheckCircle2, QrCode } from "lucide-react";
import AppStoreButtons from "@/components/ui/AppStoreButtons";

interface ListPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ListPropertyModal({ isOpen, onClose }: ListPropertyModalProps) {
  return (
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

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-[#E4EAF2]"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[#172033] via-[#1e2d47] to-[#253553] p-6 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#397BCF]/30 border border-[#6FA5E5]/40 text-[#6FA5E5] rounded-full text-xs font-semibold mb-3">
                <Smartphone className="w-3.5 h-3.5" />
                For Real Estate Brokers
              </div>

              <h2 className="text-xl sm:text-2xl font-display font-bold mb-2">
                List Properties via the Mobile App
              </h2>
              <p className="text-sm text-white/70 leading-relaxed">
                Brokers list and manage properties exclusively from The Realty Bazaar mobile app. Everything syncs instantly to our public discovery marketplace.
              </p>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6">
              {/* How it works for brokers */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#667085]">
                  How it works:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      icon: Sparkles,
                      title: "1. Upload in App",
                      desc: "Add photos, videos, and property specs from your phone.",
                    },
                    {
                      icon: Share2,
                      title: "2. Auto-Publish",
                      desc: "Go live on therealtybazaar.com + Instagram & Facebook.",
                    },
                    {
                      icon: Target,
                      title: "3. Direct Buyers",
                      desc: "Buyers discover your listing and call/WhatsApp directly.",
                    },
                    {
                      icon: CheckCircle2,
                      title: "4. Integrated CRM",
                      desc: "All enquiries automatically land in your phone's CRM.",
                    },
                  ].map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#F8FAFC] border border-[#E4EAF2] rounded-xl flex items-start gap-2.5"
                    >
                      <step.icon className="w-4 h-4 text-[#397BCF] mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-[#172033]">{step.title}</div>
                        <div className="text-[11px] text-[#667085] leading-tight mt-0.5">
                          {step.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* App download section */}
              <div className="pt-2 border-t border-[#E4EAF2] text-center space-y-3">
                <div className="text-sm font-bold text-[#172033]">
                  Download the Free Mobile App to Start Listing:
                </div>
                <div className="flex justify-center">
                  <AppStoreButtons size="md" />
                </div>
                <p className="text-[11px] text-[#98A2B3]">
                  Available on Android & iOS. No web registration required.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
