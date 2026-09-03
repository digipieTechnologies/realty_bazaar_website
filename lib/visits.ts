"use client";

import { useState, useEffect, useCallback } from "react";
import type { Property, PropertyVisit, VisitStatus } from "@/types";
import { fetchVisitsForClient } from "@/app/actions";

export const VISITS_STORAGE_KEY = "realty_bazaar_my_visits";
export const VISITS_EVENT = "realty_bazaar_visits_change";

export interface LocalVisitItem {
  id: string;
  broker_id: string;
  property_id: string;
  client_name: string;
  client_phone: string;
  phone_country_code?: string | null;
  phone_country_iso?: string | null;
  visit_date: string;
  time_slot: string;
  status: VisitStatus;
  notes?: string | null;
  reschedule_count?: number;
  reschedule_reason?: string | null;
  cancelled_reason?: string | null;
  created_at: string;
  updated_at: string;
  property_snapshot?: {
    id: string;
    title: string;
    slug: string;
    city: string;
    locality?: string | null;
    price: number | null;
    price_display?: string | null;
    property_type: string;
    transaction_type: string;
    bedrooms?: number | null;
    bathrooms?: number | null;
    area_sqft?: number | null;
    image?: string | null;
    broker_name?: string | null;
    broker_phone?: string | null;
    broker_whatsapp?: string | null;
    broker_agency?: string | null;
  } | null;
}

/**
 * Read visits from localStorage safely
 */
export function getStoredVisits(): LocalVisitItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(VISITS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("[getStoredVisits] Error reading localStorage:", err);
    return [];
  }
}

/**
 * Save / update a visit in localStorage
 */
export function saveVisitToStorage(visit: PropertyVisit, property?: Property | null) {
  if (typeof window === "undefined" || !visit?.id) return;
  try {
    const current = getStoredVisits();
    const existingIndex = current.findIndex((item) => item.id === visit.id);

    const snapshot = property
      ? {
          id: property.id,
          title: property.title,
          slug: property.slug,
          city: property.city,
          locality: property.locality,
          price: property.price,
          price_display: property.price_display,
          property_type: property.property_type,
          transaction_type: property.transaction_type,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          area_sqft: property.area_sqft,
          image: property.images?.[0] || null,
          broker_name: property.broker_name,
          broker_phone: property.broker_phone,
          broker_whatsapp: property.broker_whatsapp,
          broker_agency: property.broker_agency,
        }
      : current[existingIndex]?.property_snapshot || null;

    const newItem: LocalVisitItem = {
      id: visit.id,
      broker_id: visit.broker_id,
      property_id: visit.property_id,
      client_name: visit.client_name,
      client_phone: visit.client_phone,
      phone_country_code: visit.phone_country_code,
      phone_country_iso: visit.phone_country_iso,
      visit_date: visit.visit_date,
      time_slot: visit.time_slot,
      status: visit.status || "pending",
      notes: visit.notes,
      reschedule_count: visit.reschedule_count || 0,
      reschedule_reason: visit.reschedule_reason,
      cancelled_reason: visit.cancelled_reason,
      created_at: visit.created_at || new Date().toISOString(),
      updated_at: visit.updated_at || new Date().toISOString(),
      property_snapshot: snapshot,
    };

    let updated: LocalVisitItem[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = {
        ...updated[existingIndex],
        ...newItem,
        property_snapshot: snapshot || updated[existingIndex].property_snapshot,
      };
    } else {
      updated = [newItem, ...current];
    }

    localStorage.setItem(VISITS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(VISITS_EVENT, { detail: { visitId: visit.id } }));
  } catch (err) {
    console.error("[saveVisitToStorage] Error saving to localStorage:", err);
  }
}

/**
 * Remove a visit record from localStorage
 */
export function removeVisitFromStorage(visitId: string) {
  if (typeof window === "undefined" || !visitId) return;
  try {
    const current = getStoredVisits();
    const filtered = current.filter((item) => item.id !== visitId);
    localStorage.setItem(VISITS_STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent(VISITS_EVENT, { detail: { visitId, removed: true } }));
  } catch (err) {
    console.error("[removeVisitFromStorage] Error removing from localStorage:", err);
  }
}

/**
 * React hook to manage and reactively fetch user's scheduled visits
 */
export function useMyVisits() {
  const [visits, setVisits] = useState<PropertyVisit[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadVisits = useCallback(async () => {
    const stored = getStoredVisits();
    if (stored.length === 0) {
      setVisits([]);
      setIsLoaded(true);
      return;
    }

    // First, map local items to PropertyVisit representation for instantaneous rendering
    const localMapped: PropertyVisit[] = stored.map((item) => ({
      id: item.id,
      broker_id: item.broker_id,
      property_id: item.property_id,
      client_name: item.client_name,
      client_phone: item.client_phone,
      phone_country_code: item.phone_country_code,
      phone_country_iso: item.phone_country_iso,
      visit_date: item.visit_date,
      time_slot: item.time_slot,
      status: item.status,
      notes: item.notes,
      reschedule_count: item.reschedule_count || 0,
      reschedule_reason: item.reschedule_reason,
      cancelled_reason: item.cancelled_reason,
      created_at: item.created_at,
      updated_at: item.updated_at,
      property: item.property_snapshot
        ? ({
            id: item.property_snapshot.id,
            title: item.property_snapshot.title,
            slug: item.property_snapshot.slug,
            city: item.property_snapshot.city,
            locality: item.property_snapshot.locality || "",
            price: item.property_snapshot.price,
            price_display: item.property_snapshot.price_display,
            property_type: item.property_snapshot.property_type,
            transaction_type: item.property_snapshot.transaction_type,
            bedrooms: item.property_snapshot.bedrooms,
            bathrooms: item.property_snapshot.bathrooms,
            area_sqft: item.property_snapshot.area_sqft,
            images: item.property_snapshot.image ? [item.property_snapshot.image] : [],
            broker_name: item.property_snapshot.broker_name,
            broker_phone: item.property_snapshot.broker_phone,
            broker_whatsapp: item.property_snapshot.broker_whatsapp,
            broker_agency: item.property_snapshot.broker_agency,
          } as unknown as Property)
        : null,
    }));

    setVisits(localMapped);
    setIsLoaded(true);

    // Now fetch fresh live statuses from Supabase (to catch broker accept/reject/reschedule changes)
    setIsRefreshing(true);
    try {
      const visitIds = stored.map((v) => v.id);
      const liveData = await fetchVisitsForClient(visitIds);

      if (liveData && liveData.length > 0) {
        // Merge fresh status into local storage and state
        const liveMap = new Map(liveData.map((d) => [d.id, d]));
        const merged: PropertyVisit[] = localMapped.map((loc) => {
          const live = liveMap.get(loc.id);
          if (live) {
            // Update local item cache with fresh status & reasons
            return {
              ...loc,
              status: live.status,
              reschedule_count: live.reschedule_count,
              reschedule_reason: live.reschedule_reason,
              cancelled_reason: live.cancelled_reason,
              visit_date: live.visit_date || loc.visit_date,
              time_slot: live.time_slot || loc.time_slot,
              updated_at: live.updated_at || loc.updated_at,
              property: live.property || loc.property,
            };
          }
          return loc;
        });

        setVisits(merged);

        // Update localStorage with fresh statuses
        try {
          const updatedStorage: LocalVisitItem[] = merged.map((m) => {
            const orig = stored.find((s) => s.id === m.id);
            return {
              id: m.id,
              broker_id: m.broker_id,
              property_id: m.property_id,
              client_name: m.client_name,
              client_phone: m.client_phone,
              phone_country_code: m.phone_country_code,
              phone_country_iso: m.phone_country_iso,
              visit_date: m.visit_date,
              time_slot: m.time_slot,
              status: m.status,
              notes: m.notes,
              reschedule_count: m.reschedule_count,
              reschedule_reason: m.reschedule_reason,
              cancelled_reason: m.cancelled_reason,
              created_at: m.created_at,
              updated_at: m.updated_at,
              property_snapshot: orig?.property_snapshot || null,
            };
          });
          localStorage.setItem(VISITS_STORAGE_KEY, JSON.stringify(updatedStorage));
        } catch {
          // ignore
        }
      }
    } catch (err) {
      console.error("[useMyVisits] Failed to fetch live visit updates:", err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadVisits();

    const handleCustomChange = () => {
      loadVisits();
    };

    window.addEventListener(VISITS_EVENT, handleCustomChange);
    window.addEventListener("storage", handleCustomChange);
    window.addEventListener("focus", handleCustomChange);

    return () => {
      window.removeEventListener(VISITS_EVENT, handleCustomChange);
      window.removeEventListener("storage", handleCustomChange);
      window.removeEventListener("focus", handleCustomChange);
    };
  }, [loadVisits]);

  const removeVisit = (visitId: string) => {
    removeVisitFromStorage(visitId);
  };

  const visitCount = visits.length;
  const pendingCount = visits.filter((v) => v.status === "pending").length;
  const confirmedCount = visits.filter((v) => v.status === "confirmed").length;

  return {
    visits,
    visitCount,
    pendingCount,
    confirmedCount,
    isLoaded,
    isRefreshing,
    removeVisit,
    refresh: loadVisits,
  };
}
