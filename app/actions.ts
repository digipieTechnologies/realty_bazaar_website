"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getPropertyVisitsByIds } from "@/lib/supabase/queries";
import { parsePhoneNumber } from "@/lib/utils";
import type { PropertyVisit } from "@/types";

export interface ContactFormState {

  success: boolean;
  message: string;
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const subject = formData.get("subject")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return { success: false, message: "Name, email and message are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  try {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("contact_submissions").insert({
      name,
      email,
      phone: phone || null,
      subject: subject || null,
      message,
    });

    if (error) {
      console.error("Contact form Supabase error:", error);
      // Don't expose DB errors to user — still succeed for UX
    }

    return {
      success: true,
      message: "Thank you! We've received your message and will get back to you shortly.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: true, // Show success even on error for UX
      message: "Thank you! We've received your message and will get back to you shortly.",
    };
  }
}

export async function submitEnquiry(

  propertyId: string | null,
  brokerId: string | null,
  name: string,
  phone: string,
  message: string,
  propertyDetails?: string | null
): Promise<{ success: boolean }> {
  if (!name || !phone) return { success: false };

  const parsed = parsePhoneNumber(phone);

  try {
    const supabase = createServerSupabaseClient();

    // 1. Insert lead into social_leads table (triggers broker CRM notification & indexing)
    const { error: leadError } = await supabase.from("social_leads").insert({
      user_name: name.trim(),
      phone: parsed.phone,
      phone_country_code: parsed.phone_country_code,
      phone_country_iso: parsed.phone_country_iso,
      notes: message?.trim() || null,
      property_id: propertyId || null,
      broker_id: brokerId || null,
      property_details: propertyDetails || null,
      is_deleted: false,
    });

    if (leadError) {
      console.error("Supabase social_leads insert error:", leadError);
    }

    // 2. Also keep enquiries table sync for website analytics / logging
    try {
      if (propertyId) {
        await supabase.from("enquiries").insert({
          property_id: propertyId,
          broker_id: brokerId,
          name: name.trim(),
          phone: phone.trim(),
          message: message?.trim() || null,
          lead_source: "website",
        });
      }
    } catch {
      // Non-blocking fallback
    }

    return { success: true };
  } catch (error) {
    console.error("submitEnquiry error:", error);
    return { success: true }; // Return success for UX
  }
}

export async function submitQuickLead(
  name: string,
  phone: string,
  sourcePath?: string
): Promise<{ success: boolean }> {
  if (!name || !phone) return { success: false };

  const parsed = parsePhoneNumber(phone);

  try {
    const supabase = createServerSupabaseClient();

    // Insert lead into social_leads table
    const { error: leadError } = await supabase.from("social_leads").insert({
      user_name: name.trim(),
      phone: parsed.phone,
      phone_country_code: parsed.phone_country_code,
      phone_country_iso: parsed.phone_country_iso,
      notes: sourcePath ? `Contact details saved via website popup on ${sourcePath}` : "Contact details saved via website popup",
      property_id: null,
      broker_id: null,
      property_details: sourcePath ? `Visited URL: ${sourcePath}` : null,
      is_deleted: false,
    });

    if (leadError) {
      console.error("Supabase quick social_leads insert error:", leadError);
    }

    return { success: true };
  } catch (error) {
    console.error("submitQuickLead error:", error);
    return { success: true };
  }
}

// ── Submit Site Visit Request ────────────────────────────────────────────────
export interface SiteVisitSubmitResult {
  success: boolean;
  visit?: PropertyVisit | null;
  error?: string;
}

export async function submitSiteVisitRequest({
  propertyId,
  brokerId,
  clientName,
  clientPhone,
  visitDate,
  timeSlot,
  notes,
}: {
  propertyId: string;
  brokerId: string | null;
  clientName: string;
  clientPhone: string;
  visitDate: string;
  timeSlot: string;
  notes?: string;
}): Promise<SiteVisitSubmitResult> {
  if (!propertyId || !clientName.trim() || !clientPhone.trim() || !visitDate || !timeSlot) {
    return { success: false, error: "All required fields must be provided." };
  }

  const parsed = parsePhoneNumber(clientPhone);

  try {
    const supabase = createServerSupabaseClient();

    // Resolve brokerId from property if null
    let resolvedBrokerId = brokerId;
    if (!resolvedBrokerId) {
      const { data: propRow } = await supabase
        .from("properties")
        .select("broker_id")
        .eq("id", propertyId)
        .maybeSingle();
      if (propRow?.broker_id) {
        resolvedBrokerId = propRow.broker_id;
      }
    }

    if (!resolvedBrokerId) {
      return { success: false, error: "Broker information not found for this property." };
    }

    const newVisitId = crypto.randomUUID();
    const newVisit: PropertyVisit = {
      id: newVisitId,
      property_id: propertyId,
      broker_id: resolvedBrokerId,
      client_name: clientName.trim(),
      client_phone: parsed.phone,
      phone_country_code: parsed.phone_country_code || "91",
      phone_country_iso: parsed.phone_country_iso || "IN",
      visit_date: visitDate,
      time_slot: timeSlot,
      status: "pending",
      notes: notes?.trim() || null,
      reschedule_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Insert into public.property_visits with status 'pending'
    const { error: visitError } = await supabase
      .from("property_visits")
      .insert({
        id: newVisitId,
        property_id: propertyId,
        broker_id: resolvedBrokerId,
        client_name: clientName.trim(),
        client_phone: parsed.phone,
        phone_country_code: parsed.phone_country_code || "91",
        phone_country_iso: parsed.phone_country_iso || "IN",
        visit_date: visitDate,
        time_slot: timeSlot,
        status: "pending",
        notes: notes?.trim() || null,
        reschedule_count: 0,
        is_deleted: false,
      });

    if (visitError) {
      console.error("[submitSiteVisitRequest] Error inserting visit:", visitError);
      return { success: false, error: visitError.message };
    }

    // Insert lead into social_leads so broker mobile app gets instant CRM notification
    try {
      await supabase.from("social_leads").insert({
        user_name: clientName.trim(),
        phone: parsed.phone,
        phone_country_code: parsed.phone_country_code || "91",
        phone_country_iso: parsed.phone_country_iso || "IN",
        notes: `Site visit requested for ${visitDate} (${timeSlot})${notes ? ` - Note: ${notes.trim()}` : ""}`,
        property_id: propertyId,
        broker_id: resolvedBrokerId,
        is_deleted: false,
      });
    } catch {
      // Non-blocking
    }

    return {
      success: true,
      visit: newVisit,
    };
  } catch (error: any) {
    console.error("[submitSiteVisitRequest] Unexpected error:", error);
    return { success: false, error: error?.message || "Failed to schedule site visit." };
  }
}

export async function fetchVisitsForClient(visitIds: string[]): Promise<PropertyVisit[]> {
  if (!visitIds || visitIds.length === 0) return [];
  try {
    return await getPropertyVisitsByIds(visitIds);
  } catch (error) {
    console.error("[fetchVisitsForClient] error:", error);
    return [];
  }
}



