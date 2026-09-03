"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Copy,
  Check,
  Send,
  Mail,
  Smartphone,
  RotateCcw,
  Sparkles,
  Link2,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import type { Property } from "@/types";
import { generatePropertyDraftText } from "@/lib/share";
import { formatPrice } from "@/lib/utils";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { trackPropertyShare } from "@/lib/analytics/clarity";

// ── Secondary Social Icons for Expanded Tray ──────────────────────────────────
function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.97 0 1.75-.79 1.75-1.76s-.78-1.75-1.75-1.75c-.97 0-1.76.78-1.76 1.75s.79 1.76 1.76 1.76m1.4 9.74v-8.37H5.06v8.37h2.8z" />
    </svg>
  );
}

function TwitterIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

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
  const [showMoreApps, setShowMoreApps] = useState(false);
  const [prevPropId, setPrevPropId] = useState(property.id);
  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  if (prevPropId !== property.id) {
    setPrevPropId(property.id);
    setDraftText(generatePropertyDraftText(property));
    setCopiedType(null);
    setShowMoreApps(false);
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

  const handleMoreClick = async () => {
    if (canNativeShare) {
      await handleNativeShare();
    } else {
      setShowMoreApps((prev) => !prev);
    }
  };

  const handleInstagramShare = async () => {
    try {
      await navigator.clipboard.writeText(propertyUrl);
      setCopiedType("link");
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      // Fallback
    }
    trackPropertyShare(property, "instagram");
    window.open("https://instagram.com", "_blank", "noopener,noreferrer");
  };

  const handleResetDraft = () => {
    const defaultText = generatePropertyDraftText(property, propertyUrl);
    setDraftText(defaultText);
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    draftText
  )}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    propertyUrl
  )}`;
  const smsShareUrl = `sms:?body=${encodeURIComponent(draftText)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    propertyUrl
  )}&text=${encodeURIComponent(draftText)}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(
    `Property Listing: ${property.title}`
  )}&body=${encodeURIComponent(draftText)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    propertyUrl
  )}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    property.title
  )}&url=${encodeURIComponent(propertyUrl)}`;

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
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold mb-3 border border-white/10">
                <Share2 className="w-3.5 h-3.5 text-[#6FA5E5]" />
                <span>Share Property</span>
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

                {/* Action Row for Message: Copy Message + Copy Link Only */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  {/* Copy Message Button */}
                  <button
                    type="button"
                    onClick={handleCopyDraft}
                    className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs ${
                      copiedType === "draft"
                        ? "bg-green-600 text-white"
                        : "bg-[#172033] hover:bg-[#253553] text-white"
                    }`}
                  >
                    {copiedType === "draft" ? (
                      <>
                        <Check className="w-4 h-4 text-white shrink-0" />
                        <span className="truncate">Message Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 shrink-0" />
                        <span className="truncate">Copy Message</span>
                      </>
                    )}
                  </button>

                  {/* Copy Link Only Button */}
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs border ${
                      copiedType === "link"
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-[#F8FAFC] hover:bg-[#F3F8FE] border-[#E4EAF2] text-[#172033] hover:border-[#397BCF]/40"
                    }`}
                  >
                    {copiedType === "link" ? (
                      <>
                        <Check className="w-4 h-4 text-white shrink-0" />
                        <span className="truncate">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="w-4 h-4 text-[#397BCF] shrink-0" />
                        <span className="truncate">Copy Link Only</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Share via (Quick Channels) */}
              <div className="pt-4 border-t border-[#E4EAF2] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-[#172033]">
                    Share via
                  </div>
                  <div className="text-[11px] text-[#667085]">
                    Tap an app to share
                  </div>
                </div>

                {/* 5 Channels in a neat circle grid */}
                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                  {/* 1. WhatsApp */}
                  <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackPropertyShare(property, "whatsapp")}
                    className="flex flex-col items-center gap-1.5 p-1.5 rounded-2xl hover:bg-[#F8FAFC] transition-all group active:scale-95 text-center"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:shadow-md transition-all bg-white border border-[#E4EAF2] p-1">
                      <Image
                        src="/images/social/whatsapp-icon.avif"
                        alt="WhatsApp"
                        width={40}
                        height={40}
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-[#344054] truncate w-full">
                      WhatsApp
                    </span>
                  </a>

                  {/* 2. Instagram */}
                  <button
                    type="button"
                    onClick={handleInstagramShare}
                    className="flex flex-col items-center gap-1.5 p-1.5 rounded-2xl hover:bg-[#F8FAFC] transition-all group active:scale-95 text-center cursor-pointer"
                    title="Copy link and open Instagram"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:shadow-md transition-all bg-white border border-[#E4EAF2] p-1">
                      <Image
                        src="/images/social/instagram-icon.png"
                        alt="Instagram"
                        width={40}
                        height={40}
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-[#344054] truncate w-full">
                      Instagram
                    </span>
                  </button>

                  {/* 3. SMS */}
                  <a
                    href={smsShareUrl}
                    onClick={() => trackPropertyShare(property, "sms")}
                    className="flex flex-col items-center gap-1.5 p-1.5 rounded-2xl hover:bg-[#F8FAFC] transition-all group active:scale-95 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#172033] text-white flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:shadow-md transition-all">
                      <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#344054] truncate w-full">
                      SMS
                    </span>
                  </a>

                  {/* 4. Facebook */}
                  <a
                    href={facebookShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackPropertyShare(property, "facebook")}
                    className="flex flex-col items-center gap-1.5 p-1.5 rounded-2xl hover:bg-[#F8FAFC] transition-all group active:scale-95 text-center"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:shadow-md transition-all bg-white border border-[#E4EAF2] p-1">
                      <Image
                        src="/images/social/facebook-icon.png"
                        alt="Facebook"
                        width={40}
                        height={40}
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-[#344054] truncate w-full">
                      Facebook
                    </span>
                  </a>

                  {/* 5. More Apps (Three Dots in a Circle) */}
                  <button
                    type="button"
                    onClick={handleMoreClick}
                    className="flex flex-col items-center gap-1.5 p-1.5 rounded-2xl hover:bg-[#F8FAFC] transition-all group active:scale-95 text-center cursor-pointer"
                    title="More sharing apps"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#F3F8FE] border-2 border-[#E4EAF2] hover:border-[#397BCF] text-[#397BCF] flex items-center justify-center shadow-xs group-hover:scale-105 transition-all">
                      <MoreHorizontal className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#344054] truncate w-full">
                      More
                    </span>
                  </button>
                </div>

                {/* Additional Apps Tray (Expanded when clicking More on desktop / fallback) */}
                {showMoreApps && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-3 border-t border-[#E4EAF2] space-y-2.5 overflow-hidden"
                  >
                    <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                      More Apps
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {/* Telegram */}
                      <a
                        href={telegramShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-[#F8FAFC] text-center transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#229ED9] text-white flex items-center justify-center shadow-xs">
                          <Send className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-[#475467]">Telegram</span>
                      </a>

                      {/* Email */}
                      <a
                        href={emailShareUrl}
                        className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-[#F8FAFC] text-center transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#397BCF] text-white flex items-center justify-center shadow-xs">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-[#475467]">Email</span>
                      </a>

                      {/* LinkedIn */}
                      <a
                        href={linkedinShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-[#F8FAFC] text-center transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-xs">
                          <LinkedinIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[10px] font-semibold text-[#475467]">LinkedIn</span>
                      </a>

                      {/* X / Twitter */}
                      <a
                        href={twitterShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-[#F8FAFC] text-center transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-xs">
                          <TwitterIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[10px] font-semibold text-[#475467]">X (Twitter)</span>
                      </a>
                    </div>

                    {canNativeShare && (
                      <button
                        type="button"
                        onClick={handleNativeShare}
                        className="w-full py-2 px-3 bg-[#F3F8FE] hover:bg-[#EAF3FF] text-[#245FA8] rounded-xl text-xs font-bold transition-all text-center cursor-pointer border border-[#397BCF]/20 mt-1"
                      >
                        Open System Share Sheet
                      </button>
                    )}
                  </motion.div>
                )}
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
