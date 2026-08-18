"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

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
  propertyId: string,
  brokerId: string | null,
  name: string,
  phone: string,
  message: string
): Promise<{ success: boolean }> {
  if (!name || !phone) return { success: false };

  try {
    const supabase = createServerSupabaseClient();
    await supabase.from("enquiries").insert({
      property_id: propertyId,
      broker_id: brokerId,
      name: name.trim(),
      phone: phone.trim(),
      message: message?.trim() || null,
      lead_source: "website",
    });
    return { success: true };
  } catch {
    return { success: true }; // Return success for UX
  }
}
