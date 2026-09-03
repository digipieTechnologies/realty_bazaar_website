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
  Trash2,
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
  noShow: {
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
  const { visits, visitCount, pendingCount, confirmedCount, isLoaded, isRefreshing, removeVisit, refresh } =
    useMyVisits();
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "other">("all");
  const [removeId, setRemoveId] = useState<string | null>(null);

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
            Scheduled Site Visits
          </h1>
          <p className="text-sm text-[#667085] mt-1">
            Track your property inspection bookings, live broker confirmations, and reschedule updates.
          </p>
        </div>

        {visitCount > 0 && (
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => refresh()}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-[#F3F8FE] text-[#172033] border border-[#E4EAF2] rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer disabled:opacity-50"
              title="Refresh live status from broker CRM"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#397BCF] ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "Syncing..." : "Sync Status"}</span>
            </button>

            <Link
              href="/properties"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#245FA8] hover:bg-[#1E4E8C] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm"
            >
              <Building2 className="w-4 h-4" />
              <span>Browse More</span>
            </Link>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      {visitCount > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E4EAF2]/60">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
              filter === "all"
                ? "bg-[#172033] text-white shadow-xs"
                : "bg-white text-[#475467] hover:bg-[#F3F8FE] border border-[#E4EAF2]"
            }`}
          >
            All Visits ({visitCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
              filter === "pending"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-white text-[#475467] hover:bg-amber-50/50 border border-[#E4EAF2]"
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter("confirmed")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
              filter === "confirmed"
                ? "bg-green-700 text-white shadow-xs"
                : "bg-white text-[#475467] hover:bg-green-50/50 border border-[#E4EAF2]"
            }`}
          >
            Confirmed ({confirmedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter("other")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
              filter === "other"
                ? "bg-slate-700 text-white shadow-xs"
                : "bg-white text-[#475467] hover:bg-[#F3F8FE] border border-[#E4EAF2]"
            }`}
          >
            Rescheduled / Cancelled ({visits.length - pendingCount - confirmedCount})
          </button>
        </div>
      )}

      {/* Visits List */}
      {visitCount > 0 ? (
        filteredVisits.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredVisits.map((visit) => (
              <VisitCard key={visit.id} visit={visit} onRemove={() => setRemoveId(visit.id)} />
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

      {/* Remove Confirmation Modal */}
      {removeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E4EAF2] text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#172033]">Remove from your list?</h3>
              <p className="text-xs text-[#667085] mt-1.5">
                This will remove this visit record from your device.
              </p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setRemoveId(null)}
                className="flex-1 py-2.5 px-4 bg-[#F8FAFC] hover:bg-[#F3F8FE] text-[#172033] border border-[#E4EAF2] rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  removeVisit(removeId);
                  setRemoveId(null);
                }}
                className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VisitCard({ visit, onRemove }: { visit: PropertyVisit; onRemove: () => void }) {
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
    <div className="bg-white rounded-3xl border border-[#E4EAF2] shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Top Status Bar */}
      <div className="p-4 sm:p-5 border-b border-[#E4EAF2]/80 flex items-start justify-between gap-3 bg-[#F8FAFC]">
        <div className="flex items-center gap-2 flex-wrap">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}
          >
            <StatusIcon className="w-3.5 h-3.5 shrink-0" />
            <span>{statusCfg.label}</span>
          </div>

          <span className="text-[11px] text-[#98A2B3] hidden sm:inline">
            • {statusCfg.description}
          </span>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="p-1.5 rounded-lg text-[#98A2B3] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          title="Remove from your list"
          aria-label="Remove visit"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 sm:p-5 space-y-4 flex-1">
        {/* Rejection / Cancellation Reason (Prominent Alert) */}
        {visit.status === "cancelled" && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-800">
            <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Cancellation / Rejection Reason:</span>
              <p className="mt-0.5 text-red-700 leading-relaxed font-medium">
                {visit.cancelled_reason || "The broker was unavailable or declined this requested time slot."}
              </p>
            </div>
          </div>
        )}

        {/* Reschedule Reason */}
        {visit.status === "rescheduled" && visit.reschedule_reason && (
          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-2.5 text-xs text-blue-800">
            <RotateCcw className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Rescheduled Reason:</span>
              <p className="mt-0.5 text-blue-700 leading-relaxed font-medium">
                {visit.reschedule_reason}
              </p>
            </div>
          </div>
        )}

        {/* Property Brief Summary Card */}
        <div className="flex gap-3.5 items-start p-3 rounded-2xl bg-[#F8FAFC] border border-[#E4EAF2]/80 hover:bg-[#F3F8FE] transition-colors">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#0B132B] shrink-0">
            <Image
              src={propertyImg}
              alt={prop?.title || "Property image"}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <Link
              href={propertySlug}
              className="font-display font-bold text-sm sm:text-base text-[#172033] hover:text-[#397BCF] line-clamp-1 transition-colors flex items-center gap-1"
            >
              <span>{prop?.title || "Property Details"}</span>
              <ExternalLink className="w-3 h-3 text-[#98A2B3] shrink-0 opacity-70" />
            </Link>

            <div className="flex items-center gap-1 text-xs text-[#667085] truncate">
              <MapPin className="w-3.5 h-3.5 text-[#98A2B3] shrink-0" />
              <span className="truncate">
                {prop?.locality ? `${prop.locality}, ` : ""}{prop?.city || "Gujarat, India"}
              </span>
            </div>

            {priceDisplay && (
              <div className="text-sm font-display font-bold text-[#397BCF]">
                {priceDisplay}
              </div>
            )}
          </div>
        </div>

        {/* Scheduled Slot Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-2xl border border-[#E4EAF2] bg-white flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EAF3FF] text-[#397BCF] flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#98A2B3] tracking-wider">
                Visit Date
              </div>
              <div className="text-xs font-bold text-[#172033]">
                {formatDateDisplay(visit.visit_date)}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl border border-[#E4EAF2] bg-white flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EAF3FF] text-[#397BCF] flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#98A2B3] tracking-wider">
                Time Slot
              </div>
              <div className="text-xs font-bold text-[#172033]">
                {visit.time_slot}
              </div>
            </div>
          </div>
        </div>

        {/* Client & Booking Notes */}
        <div className="text-xs text-[#667085] space-y-1 bg-white p-3 rounded-2xl border border-[#E4EAF2]">
          <div className="flex items-center justify-between">
            <span className="text-[#98A2B3]">Booked for:</span>
            <span className="font-semibold text-[#172033]">{visit.client_name} ({visit.client_phone})</span>
          </div>
          {visit.notes && (
            <div className="pt-1 text-[11px] border-t border-[#E4EAF2] mt-1">
              <span className="font-bold text-[#172033]">Your Note: </span>
              <span>{visit.notes}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Broker Actions */}
      <div className="p-4 sm:p-5 pt-0 flex flex-wrap items-center gap-2">
        <Link
          href={propertySlug}
          className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#172033] hover:bg-[#253553] text-white text-xs font-bold rounded-xl transition-all shadow-2xs"
        >
          <span>View Property</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {cleanPhone && (
          <a
            href={`tel:${cleanPhone}`}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#F3F8FE] hover:bg-[#EAF3FF] text-[#245FA8] border border-[#6FA5E5]/30 text-xs font-bold rounded-xl transition-all"
            title="Call listing broker"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Broker</span>
          </a>
        )}

        {cleanWhatsApp && (
          <a
            href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
              `Hi, I have scheduled a site visit for ${prop?.title || "the property"} on ${formatDateDisplay(visit.visit_date)} (${visit.time_slot}).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 text-xs font-bold rounded-xl transition-all"
            title="WhatsApp listing broker"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        )}
      </div>
    </div>
  );
}
