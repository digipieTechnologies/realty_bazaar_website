"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Share2,
  Copy,
  Check,
  Send,
  Mail,
  Smartphone,
  FileText,
  RotateCcw,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import type { Property } from "@/types";
import { generatePropertyDraftText } from "@/lib/share";
import { formatPrice } from "@/lib/utils";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { trackPropertyShare } from "@/lib/analytics/clarity";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

interface SharePropertyModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export default function SharePropertyModal({
  property,
  isOpen,
  onClose,
}: SharePropertyModalProps) {
  const isClient = useIsClient();
  const [copiedType, setCopiedType] = useState<"draft" | "link" | null>(null);
  const [draftText, setDraftText] = useState(() => generatePropertyDraftText(property));
  const [prevPropId, setPrevPropId] = useState(property.id);
  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  if (prevPropId !== property.id) {
    setPrevPropId(property.id);
    setDraftText(generatePropertyDraftText(property));
    setCopiedType(null);
  }

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // Handle Escape key
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

  const propertyUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/properties/${property.slug}`
      : `https://therealtybazaar.com/properties/${property.slug}`;

  const price = formatPrice(property.price, property.price_display);
  const imageUrl =
    property.images?.[0] ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800";

  const handleCopyDraft = async () => {
    try {
      await navigator.clipboard.writeText(draftText);
      setCopiedType("draft");
      trackPropertyShare(property, "copy_draft");
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(propertyUrl);
      setCopiedType("link");
      trackPropertyShare(property, "copy_link");
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        trackPropertyShare(property, "native");
        await navigator.share({
          title: property.title,
          text: draftText,
          url: propertyUrl,
        });
      } catch {
        // Share cancelled or failed
      }
    }
  };

  const handleResetDraft = () => {
    const defaultText = generatePropertyDraftText(property, propertyUrl);
    setDraftText(defaultText);
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    draftText
  )}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    propertyUrl
  )}&text=${encodeURIComponent(draftText)}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(
    `Property Listing: ${property.title}`
  )}&body=${encodeURIComponent(draftText)}`;
  const smsShareUrl = `sms:?body=${encodeURIComponent(draftText)}`;

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

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="bg-[#172033] p-5 text-white relative">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#397BCF]/30 text-[#6FA5E5] rounded-full text-xs font-semibold mb-2">
                <Share2 className="w-3.5 h-3.5" />
                Share Property
              </div>

              {/* Property Mini Preview */}
              <div className="flex items-center gap-3 mt-1 pr-8">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/10 shrink-0 bg-[#253553]">
                  <Image
                    src={imageUrl}
                    alt={property.title}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-white truncate">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-white/70 mt-0.5">
                    <span className="font-semibold text-[#6FA5E5]">{price}</span>
                    <span>•</span>
                    <span className="truncate">
                      {property.locality}, {property.city}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              {/* Ready-to-Share Message Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#172033]">
                    <Sparkles className="w-3.5 h-3.5 text-[#397BCF]" />
                    <span>Ready-to-Share Message</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetDraft}
                    className="inline-flex items-center gap-1 text-[11px] text-[#667085] hover:text-[#397BCF] transition-colors cursor-pointer"
                    title="Reset to default template"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                </div>

                {/* Editable Message Text Area */}
                <div className="relative">
                  <textarea
                    value={draftText}
                    onChange={(e) => setDraftText(e.target.value)}
                    rows={6}
                    className="w-full p-3.5 bg-[#F8FAFC] border-2 border-[#E4EAF2] focus:border-[#397BCF] rounded-2xl text-xs font-mono text-[#172033] outline-none resize-none leading-relaxed transition-colors shadow-inner"
                    placeholder="Property message will appear here..."
                    aria-label="Property message text"
                  />
                  <div className="absolute bottom-3 right-3 text-[10px] text-[#98A2B3] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md border border-[#E4EAF2]">
                    Editable message
                  </div>
                </div>

                {/* Action Row for Message */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {/* Copy Message Button */}
                  <button
                    type="button"
                    onClick={handleCopyDraft}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs ${copiedType === "draft"
                      ? "bg-green-600 text-white"
                      : "bg-[#172033] hover:bg-[#253553] text-white"
                      }`}
                  >
                    {copiedType === "draft" ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        Message Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Message
                      </>
                    )}
                  </button>

                  {/* Send on WhatsApp Button */}
                  <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackPropertyShare(property, "whatsapp")}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95"
                  >
                    <WhatsAppIcon className="w-4 h-4" variant="white" />
                    Send on WhatsApp
                  </a>
                </div>
              </div>

              {/* Quick Channels */}
              <div className="pt-3 border-t border-[#E4EAF2] space-y-2.5">
                <div className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">
                  Quick Channels
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* WhatsApp */}
                  <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackPropertyShare(property, "whatsapp")}
                    className="flex flex-col items-center justify-center p-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-2xl transition-all group active:scale-95"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                      <WhatsAppIcon className="w-4 h-4" variant="white" />
                    </div>
                    <span className="text-xs font-bold text-[#172033] mt-1.5">
                      WhatsApp
                    </span>
                  </a>

                  {/* Telegram */}
                  <a
                    href={telegramShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/30 rounded-2xl transition-all group active:scale-95"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#229ED9] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                      <Send className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#172033] mt-1.5">
                      Telegram
                    </span>
                  </a>

                  {/* Email */}
                  <a
                    href={emailShareUrl}
                    className="flex flex-col items-center justify-center p-3 bg-[#397BCF]/10 hover:bg-[#397BCF]/20 border border-[#397BCF]/30 rounded-2xl transition-all group active:scale-95"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#397BCF] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#172033] mt-1.5">
                      Email
                    </span>
                  </a>

                  {/* SMS */}
                  <a
                    href={smsShareUrl}
                    className="flex flex-col items-center justify-center p-3 bg-[#F8FAFC] hover:bg-[#EAF3FF] border border-[#E4EAF2] rounded-2xl transition-all group active:scale-95"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#172033] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#172033] mt-1.5">
                      SMS
                    </span>
                  </a>
                </div>

                {/* Native Device Share Sheet Button if supported */}
                {canNativeShare && (
                  <button
                    type="button"
                    onClick={handleNativeShare}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#F3F8FE] hover:bg-[#EAF3FF] border border-[#397BCF]/30 text-[#245FA8] font-bold rounded-xl text-xs transition-all active:scale-95 cursor-pointer mt-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open System Share Sheet (More Apps)
                  </button>
                )}
              </div>

              {/* Direct Copy Actions */}
              <div className="pt-3 border-t border-[#E4EAF2] space-y-2.5">
                <div className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">
                  Direct Copy Actions
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleCopyDraft}
                    className="flex items-center justify-between px-3.5 py-2.5 bg-[#F8FAFC] hover:bg-[#F3F8FE] border border-[#E4EAF2] rounded-xl text-xs font-bold text-[#172033] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#397BCF]" />
                      Copy Message
                    </span>
                    {copiedType === "draft" ? (
                      <span className="text-green-600 text-[11px] flex items-center gap-0.5">
                        <Check className="w-3.5 h-3.5" /> Copied!
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#98A2B3]" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="flex items-center justify-between px-3.5 py-2.5 bg-[#F8FAFC] hover:bg-[#F3F8FE] border border-[#E4EAF2] rounded-xl text-xs font-bold text-[#172033] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5 text-[#397BCF]" />
                      Copy Link Only
                    </span>
                    {copiedType === "link" ? (
                      <span className="text-green-600 text-[11px] flex items-center gap-0.5">
                        <Check className="w-3.5 h-3.5" /> Copied!
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#98A2B3]" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer Note */}
            <div className="px-5 py-3 bg-[#F8FAFC] border-t border-[#E4EAF2] text-center text-[11px] text-[#98A2B3]">
              ✨ Includes price, key specifications, and direct link.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
