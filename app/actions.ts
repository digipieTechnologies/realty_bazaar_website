"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { parsePhoneNumber } from "@/lib/utils";

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


