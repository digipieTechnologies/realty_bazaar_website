"use client";

import { Phone } from "lucide-react";
import SharePropertyButton from "./SharePropertyButton";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { trackPropertyCallClick, trackPropertyWhatsAppClick } from "@/lib/analytics/clarity";
import type { Property } from "@/types";

interface PropertyMobileStickyBarProps {
  property: Property;
  cleanWhatsApp: string;
}

export default function PropertyMobileStickyBar({
  property,
  cleanWhatsApp,
}: PropertyMobileStickyBarProps) {
  return (
    <>
      {/* Mobile Bottom Sticky Contact & Share Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#E4EAF2] px-3.5 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(23,32,51,0.1)] flex items-center gap-2">
        <a
          href={`tel:${property.broker_phone || "+919876543210"}`}
          onClick={() => trackPropertyCallClick(property)}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-[#172033] hover:bg-[#253553] text-white font-bold rounded-2xl text-xs transition-all active:scale-95 shadow-xs"
          id="mobile-call-broker"
        >
          <Phone className="w-3.5 h-3.5" />
          Call
        </a>

        <a
          href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
            `Hi, I'm interested in ${property.title} in ${property.locality}, ${property.city}.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackPropertyWhatsAppClick(property)}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-2xl text-xs transition-all shadow-xs active:scale-95"
          id="mobile-whatsapp-broker"
        >
          <WhatsAppIcon className="w-4 h-4" variant="white" />
          WhatsApp
        </a>

        <SharePropertyButton
          property={property}
          variant="icon"
          id="mobile-share-broker"
        />
      </div>

      {/* Spacer so bottom page content / footer is never obscured */}
      <div className="lg:hidden h-20" aria-hidden="true" />
    </>
  );
}
