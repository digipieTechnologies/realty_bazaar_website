/**
 * Storage and Event Synchronization Utility for User Contact Details
 * Persists Name and Phone Number across visits in localStorage (until cache cleared)
 * and dispatches cross-component / cross-tab synchronization events.
 */

import { setUserContactTags } from "@/lib/analytics/clarity";

const STORAGE_KEY_NAME = "trb_user_name";
const STORAGE_KEY_PHONE = "trb_user_phone";
const STORAGE_KEY_SUBMITTED = "trb_user_contact_submitted";
const STORAGE_KEY_SNOOZED_UNTIL = "trb_user_contact_snoozed_until";
const SESSION_KEY_DISMISSED = "trb_user_contact_popup_dismissed";
const SESSION_KEY_START_TIME = "trb_session_start_time";

const SNOOZE_HOURS_DEFAULT = 24; // 24-hour snooze if dismissed

const EVENT_USER_CONTACT_UPDATED = "trb_user_contact_updated";

export interface UserContact {
  name: string;
  phone: string;
}

/**
 * Get saved user contact info from localStorage safely
 */
export function getUserContact(): UserContact {
  if (typeof window === "undefined") {
    return { name: "", phone: "" };
  }
  try {
    const name = localStorage.getItem(STORAGE_KEY_NAME) || "";
    const phone = localStorage.getItem(STORAGE_KEY_PHONE) || "";
    return { name, phone };
  } catch {
    return { name: "", phone: "" };
  }
}

/**
 * Check if the user already has saved contact details
 */
export function hasUserContact(): boolean {
  const { name, phone } = getUserContact();
  return Boolean(name.trim() && phone.trim());
}

/**
 * Save user contact details to localStorage and broadcast update event
 */
export function saveUserContact(contact: Partial<UserContact>): void {

  if (typeof window === "undefined") return;

  try {
    const current = getUserContact();
    const updatedName = contact.name !== undefined ? contact.name.trim() : current.name;
    const updatedPhone = contact.phone !== undefined ? contact.phone.trim() : current.phone;

    if (updatedName) {
      localStorage.setItem(STORAGE_KEY_NAME, updatedName);
    }
    if (updatedPhone) {
      localStorage.setItem(STORAGE_KEY_PHONE, updatedPhone);
    }
    if (updatedName && updatedPhone) {
      localStorage.setItem(STORAGE_KEY_SUBMITTED, "true");
      setUserContactTags(true);
    }

    // Broadcast custom event for in-page reactive state updates
    window.dispatchEvent(
      new CustomEvent<UserContact>(EVENT_USER_CONTACT_UPDATED, {
        detail: { name: updatedName, phone: updatedPhone },
      })
    );
  } catch (error) {
    console.error("Failed to save user contact to localStorage:", error);
  }
}


/**
 * Check if the popup was dismissed/snoozed or already completed
 */
export function isPopupDismissed(): boolean {
  if (typeof window === "undefined") return true;
  try {
    // 1. If user details already exist, permanently suppress
    if (hasUserContact()) return true;
    if (localStorage.getItem(STORAGE_KEY_SUBMITTED) === "true") return true;

    // 2. If dismissed during the current active session, suppress
    if (sessionStorage.getItem(SESSION_KEY_DISMISSED) === "true") return true;

    // 3. Check 24-hour snooze window in localStorage
    const snoozedUntil = localStorage.getItem(STORAGE_KEY_SNOOZED_UNTIL);
    if (snoozedUntil) {
      const timestamp = parseInt(snoozedUntil, 10);
      if (!isNaN(timestamp) && Date.now() < timestamp) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Mark the popup as dismissed for current session and snooze for 24 hours
 */
export function setPopupDismissed(snoozeHours: number = SNOOZE_HOURS_DEFAULT): void {
  if (typeof window === "undefined") return;
  try {
    // Suppress for current tab/window session
    sessionStorage.setItem(SESSION_KEY_DISMISSED, "true");

    // Snooze for specified hours (default 24h) across browser sessions
    const snoozedUntil = Date.now() + snoozeHours * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY_SNOOZED_UNTIL, snoozedUntil.toString());
  } catch {
    // Fail-safe
  }
}


/**
 * Get or initialize session start timestamp to track 30 seconds across multi-page navigation
 */
export function getSessionStartTime(): number {
  if (typeof window === "undefined") return Date.now();
  try {
    const saved = sessionStorage.getItem(SESSION_KEY_START_TIME);
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed > 0) {
        return parsed;
      }
    }
    const now = Date.now();
    sessionStorage.setItem(SESSION_KEY_START_TIME, now.toString());
    return now;
  } catch {
    return Date.now();
  }
}

/**
 * Subscribe to contact updates (custom events + storage event across tabs)
 */
export function subscribeUserContact(
  callback: (contact: UserContact) => void
): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleCustomEvent = (event: Event) => {
    const customEvent = event as CustomEvent<UserContact>;
    if (customEvent.detail) {
      callback(customEvent.detail);
    } else {
      callback(getUserContact());
    }
  };

  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY_NAME || event.key === STORAGE_KEY_PHONE) {
      callback(getUserContact());
    }
  };

  window.addEventListener(EVENT_USER_CONTACT_UPDATED, handleCustomEvent);
  window.addEventListener("storage", handleStorageEvent);

  return () => {
    window.removeEventListener(EVENT_USER_CONTACT_UPDATED, handleCustomEvent);
    window.removeEventListener("storage", handleStorageEvent);
  };
}
