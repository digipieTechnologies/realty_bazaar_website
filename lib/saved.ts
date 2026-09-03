"use client";

import { useState, useEffect, useCallback } from "react";
import type { Property } from "@/types";
import { trackPropertyFavourite } from "@/lib/analytics/clarity";

const STORAGE_KEY = "realty_bazaar_saved_properties";
const EVENT_NAME = "realty_bazaar_saved_change";

// ── Pure Storage Helpers ──────────────────────────────────────────────────────
export function getSavedPropertiesFromStorage(): Property[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function savePropertiesToStorage(properties: Property[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch {
    // Ignore storage quota errors
  }
}

export function togglePropertyInStorage(property: Property): boolean {
  if (typeof window === "undefined") return false;
  const current = getSavedPropertiesFromStorage();
  const index = current.findIndex((p) => p.id === property.id);
  let isSavedNow = false;

  if (index >= 0) {
    current.splice(index, 1);
    isSavedNow = false;
  } else {
    current.unshift(property);
    isSavedNow = true;
    trackPropertyFavourite(property);
  }

  savePropertiesToStorage(current);
  return isSavedNow;
}

export function removePropertyFromStorage(propertyId: string): void {
  if (typeof window === "undefined") return;
  const current = getSavedPropertiesFromStorage();
  const filtered = current.filter((p) => p.id !== propertyId);
  savePropertiesToStorage(filtered);
}

export function clearAllSavedPropertiesFromStorage(): void {
  if (typeof window === "undefined") return;
  savePropertiesToStorage([]);
}

// ── Global Reactive Hook ──────────────────────────────────────────────────────
export function useSavedProperties() {
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const sync = useCallback(() => {
    const items = getSavedPropertiesFromStorage();
    setSavedProperties(items);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    sync();

    const handleCustomChange = () => sync();
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) sync();
    };

    window.addEventListener(EVENT_NAME, handleCustomChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(EVENT_NAME, handleCustomChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [sync]);

  const isSaved = useCallback(
    (propertyId: string) => savedProperties.some((p) => p.id === propertyId),
    [savedProperties]
  );

  const toggleSave = useCallback((property: Property) => {
    togglePropertyInStorage(property);
  }, []);

  const removeSaved = useCallback((propertyId: string) => {
    removePropertyFromStorage(propertyId);
  }, []);

  const clearAll = useCallback(() => {
    clearAllSavedPropertiesFromStorage();
  }, []);

  return {
    savedProperties,
    savedCount: savedProperties.length,
    isLoaded,
    isSaved,
    toggleSave,
    removeSaved,
    clearAll,
  };
}

// ── Single Property Save Hook ─────────────────────────────────────────────────
export function useSavedProperty(property: Property) {
  const [saved, setSaved] = useState(false);

  const sync = useCallback(() => {
    if (!property?.id) return;
    const items = getSavedPropertiesFromStorage();
    setSaved(items.some((p) => p.id === property.id));
  }, [property?.id]);

  useEffect(() => {
    sync();

    const handleCustomChange = () => sync();
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) sync();
    };

    window.addEventListener(EVENT_NAME, handleCustomChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(EVENT_NAME, handleCustomChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [sync]);

  const toggleSave = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (!property?.id) return;
      const next = togglePropertyInStorage(property);
      setSaved(next);
    },
    [property]
  );

  return {
    isSaved: saved,
    toggleSave,
  };
}
