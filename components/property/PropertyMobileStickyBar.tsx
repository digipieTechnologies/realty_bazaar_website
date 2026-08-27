"use client";

import { Phone, MessageCircle } from "lucide-react";
import SharePropertyButton from "./SharePropertyButton";
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
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#E4EAF2] p-3 flex items-center gap-2 z-40 shadow-2xl">
        <a
          href={`tel:${property.broker_phone || "+919876543210"}`}
          onClick={() => trackPropertyCallClick(property)}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-[#172033] text-white font-bold rounded-2xl text-xs transition-all active:scale-95"
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
          className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-[#25D366] hover:bg-[#1eb858] text-white font-bold rounded-2xl text-xs transition-all shadow-sm active:scale-95"
          id="mobile-whatsapp-broker"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          WhatsApp
        </a>
        <SharePropertyButton
          property={property}
          variant="icon"
          className="w-11 h-11 bg-[#F3F8FE] hover:bg-[#EAF3FF] border border-[#397BCF]/30 rounded-2xl shrink-0"
          id="mobile-share-broker"
        />
      </div>
      <div className="lg:hidden h-20" aria-hidden="true" />
    </>
  );
}
