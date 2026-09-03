"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Building2,
  Phone,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  RefreshCw,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useMyVisits } from "@/lib/visits";
import type { PropertyVisit, VisitStatus } from "@/types";
import { formatPrice } from "@/lib/utils";

const STATUS_CONFIG: Record<
  VisitStatus,
  {
    label: string;
    bg: string;
    text: string;
    border: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
  }
> = {
  pending: {
    label: "Pending Confirmation",
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-200",
    icon: Clock,
    description: "Waiting for broker to accept or confirm the slot",
  },
  confirmed: {
    label: "Visit Confirmed",
    bg: "bg-green-50",
    text: "text-green-800",
    border: "border-green-200",
    icon: CheckCircle2,
    description: "Broker confirmed the site visit",
  },
  rescheduled: {
    label: "Rescheduled",
    bg: "bg-blue-50",
    text: "text-blue-800",
    border: "border-blue-200",
    icon: RotateCcw,
    description: "Broker proposed an alternate date/time",
  },
  cancelled: {
    label: "Cancelled / Rejected",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    icon: XCircle,
    description: "Visit request was declined or cancelled",
  },
  completed: {
    label: "Completed",
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200",
    icon: CheckCircle2,
    description: "Site visit completed",
  },
  no_show: {
    label: "No Show",
    bg: "bg-orange-50",
    text: "text-orange-800",
    border: "border-orange-200",
    icon: AlertCircle,
    description: "Visit slot marked as no show",
  },
  unknown: {
    label: "Unknown Status",
    bg: "bg-slate-50",
    text: "text-slate-600",
    border: "border-slate-200",
    icon: AlertCircle,
    description: "Status update pending from broker",
  },
};

function formatDateDisplay(dateStr: string) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function SiteVisitsClient() {
  const { visits, visitCount, pendingCount, confirmedCount, isLoaded, isRefreshing, refresh } =
    useMyVisits();
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "other">("all");

  const filteredVisits = visits.filter((v) => {
    if (filter === "pending") return v.status === "pending";
    if (filter === "confirmed") return v.status === "confirmed";
    if (filter === "other") return v.status !== "pending" && v.status !== "confirmed";
    return true;
  });

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#397BCF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4EAF2]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF3FF] text-[#245FA8] border border-[#6FA5E5]/30 text-xs font-bold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>{visitCount} {visitCount === 1 ? "Scheduled Site Visit" : "Scheduled Site Visits"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#172033] tracking-tight">
            My Site Visits
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] mt-1">
            Track confirmation status, reschedule notes, and visit appointments for your inspected properties.
          </p>
        </div>

        {/* Live Status Refresh */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={refresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E4EAF2] hover:border-[#397BCF] bg-white text-xs font-bold text-[#172033] hover:text-[#397BCF] transition-all shadow-2xs cursor-pointer disabled:opacity-50"
            title="Refresh latest broker status"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#397BCF]" : ""}`} />
            <span>{isRefreshing ? "Updating..." : "Refresh Status"}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      {visitCount > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer select-none shrink-0 ${
              filter === "all"
                ? "bg-[#172033] text-white shadow-2xs"
                : "bg-white text-[#667085] border border-[#E4EAF2] hover:bg-[#F8FAFC]"
            }`}
          >
            All Visits ({visitCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter("pending")}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer select-none shrink-0 ${
              filter === "pending"
                ? "bg-[#172033] text-white shadow-2xs"
                : "bg-white text-[#667085] border border-[#E4EAF2] hover:bg-[#F8FAFC]"
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter("confirmed")}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer select-none shrink-0 ${
              filter === "confirmed"
                ? "bg-[#172033] text-white shadow-2xs"
                : "bg-white text-[#667085] border border-[#E4EAF2] hover:bg-[#F8FAFC]"
            }`}
          >
            Confirmed ({confirmedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter("other")}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer select-none shrink-0 ${
              filter === "other"
                ? "bg-[#172033] text-white shadow-2xs"
                : "bg-white text-[#667085] border border-[#E4EAF2] hover:bg-[#F8FAFC]"
            }`}
          >
            Rescheduled / Cancelled ({visitCount - pendingCount - confirmedCount})
          </button>
        </div>
      )}

      {/* Visits List */}
      {visitCount > 0 ? (
        filteredVisits.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredVisits.map((visit) => (
              <VisitCard key={visit.id} visit={visit} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#E4EAF2] p-6">
            <p className="text-sm font-semibold text-[#172033]">No visits match this status filter.</p>
            <button
              type="button"
              onClick={() => setFilter("all")}
              className="mt-2 text-xs font-bold text-[#397BCF] hover:underline cursor-pointer"
            >
              Show all visits
            </button>
          </div>
        )
      ) : (
        /* Empty State */
        <div className="text-center py-16 sm:py-24 bg-white rounded-3xl border border-[#E4EAF2] shadow-2xs p-8 max-w-2xl mx-auto space-y-6">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-3xl bg-[#EAF3FF] text-[#397BCF] flex items-center justify-center mx-auto shadow-inner">
              <Calendar className="w-10 h-10 stroke-[1.75]" />
            </div>
            <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#172033] text-white flex items-center justify-center shadow-md">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#172033]">
              No Site Visits Scheduled Yet
            </h2>
            <p className="text-sm text-[#667085] max-w-md mx-auto leading-relaxed">
              When you book a physical visit on any property page, your appointment details, broker confirmation status, and live updates will appear right here.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#245FA8] hover:bg-[#1E4E8C] text-white font-bold rounded-2xl text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-98"
            >
              <span>Explore Properties to Visit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function VisitCard({ visit }: { visit: PropertyVisit }) {
  const statusCfg = STATUS_CONFIG[visit.status] || STATUS_CONFIG.pending;
  const StatusIcon = statusCfg.icon;
  const prop = visit.property;
  const fallbackImage = "/images/properties/property-placeholder.png";
  const propertyImg = prop?.images?.[0] || fallbackImage;
  const propertySlug = prop?.slug ? `/properties/${prop.slug}` : "/properties";
  const priceDisplay = prop ? formatPrice(prop.price, prop.price_display) : "";

  const cleanPhone = prop?.broker_phone?.replace(/\D/g, "") || "";
  const cleanWhatsApp = prop?.broker_whatsapp?.replace(/\D/g, "") || cleanPhone;

  return (
    <div className="bg-white rounded-2xl border border-[#E4EAF2] shadow-2xs hover:shadow-md transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between gap-3.5">
      {/* 1. Header: Status Badge & Dynamic Context Note */}
      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#E4EAF2]/80">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border} shrink-0`}
          >
            <StatusIcon className="w-3.5 h-3.5 shrink-0" />
            <span>{statusCfg.label}</span>
          </div>

          {/* Dynamic Note Beside Status */}
          {visit.status === "cancelled" && visit.cancelled_reason ? (
            <span className="text-xs font-semibold text-red-600 truncate max-w-[260px] sm:max-w-none">
              • Reason: <span className="font-normal text-red-700">{visit.cancelled_reason}</span>
            </span>
          ) : visit.status === "rescheduled" && visit.reschedule_reason ? (
            <span className="text-xs font-semibold text-blue-600 truncate max-w-[260px] sm:max-w-none">
              • Note: <span className="font-normal text-blue-700">{visit.reschedule_reason}</span>
            </span>
          ) : (
            <span className="text-xs text-[#98A2B3] truncate hidden sm:inline">
              • {statusCfg.description}
            </span>
          )}
        </div>
      </div>

      {/* 2. Property Brief */}
      <div className="flex gap-3 items-center">
        <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-[#0B132B] shrink-0 border border-[#E4EAF2]">
          <Image
            src={propertyImg}
            alt={prop?.title || "Property thumbnail"}
            fill
            className="object-cover"
            sizes="72px"
          />
        </div>

        <div className="min-w-0 flex-1 space-y-0.5">
          <Link
            href={propertySlug}
            className="font-display font-bold text-xs sm:text-sm text-[#172033] hover:text-[#397BCF] line-clamp-1 transition-colors flex items-center gap-1"
          >
            <span>{prop?.title || "Property Details"}</span>
            <ExternalLink className="w-3 h-3 text-[#98A2B3] shrink-0 opacity-70" />
          </Link>

          <div className="flex items-center gap-1 text-[11px] text-[#667085] truncate">
            <MapPin className="w-3 h-3 text-[#98A2B3] shrink-0" />
            <span className="truncate">
              {prop?.locality ? `${prop.locality}, ` : ""}{prop?.city || "Gujarat, India"}
            </span>
          </div>

          {priceDisplay && (
            <div className="text-xs sm:text-sm font-display font-bold text-[#245FA8]">
              {priceDisplay}
            </div>
          )}
        </div>
      </div>

      {/* 3. Integrated Booking Info */}
      <div className="bg-[#F8FAFC] border border-[#E4EAF2] rounded-xl p-3 space-y-2 text-xs">
        {/* Date & Time Row */}
        <div className="flex items-center justify-between text-xs text-[#172033] font-semibold flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#397BCF] shrink-0" />
            <span>{formatDateDisplay(visit.visit_date)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#397BCF] shrink-0" />
            <span>{visit.time_slot}</span>
          </div>
        </div>

        {/* Client Tag */}
        <div className="flex items-center justify-between text-[11px] text-[#667085] pt-1.5 border-t border-[#E4EAF2]/80">
          <span className="text-[#98A2B3]">Booked for:</span>
          <span className="font-semibold text-[#172033]">{visit.client_name} ({visit.client_phone})</span>
        </div>

        {visit.notes && (
          <div className="text-[11px] text-[#667085] bg-white border border-[#E4EAF2] rounded-lg px-2.5 py-1">
            <strong className="text-[#172033]">Your Note: </strong>
            <span>{visit.notes}</span>
          </div>
        )}
      </div>

      {/* 4. Footer Actions */}
      <div className="flex flex-wrap items-center gap-2 pt-0.5">
        <Link
          href={propertySlug}
          className="flex-1 min-w-[110px] inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#172033] hover:bg-[#253553] text-white text-xs font-bold rounded-xl transition-all shadow-2xs cursor-pointer"
        >
          <span>View Property</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {cleanPhone && (
          <a
            href={`tel:${cleanPhone}`}
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#F3F8FE] hover:bg-[#EAF3FF] text-[#245FA8] border border-[#6FA5E5]/30 text-xs font-bold rounded-xl transition-all cursor-pointer"
            title="Call listing broker"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Call Broker</span>
          </a>
        )}

        {cleanWhatsApp && (
          <a
            href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
              `Hi, I have scheduled a site visit for ${prop?.title || "the property"} on ${formatDateDisplay(visit.visit_date)} (${visit.time_slot}).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 text-xs font-bold rounded-xl transition-all cursor-pointer"
            title="WhatsApp listing broker"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        )}
      </div>
    </div>
  );
}
