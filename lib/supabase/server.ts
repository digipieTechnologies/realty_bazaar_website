import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client — uses secret key for elevated operations (e.g., submitting enquiries)
// NEVER import this in client components
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const secretKey = process.env.SUPABASE_SECRET_KEY!;

  return createClient(supabaseUrl, secretKey, {
    auth: { persistSession: false },
  });
}

// Server client using publishable key for standard public property reads
export function createPublicServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const pubKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

  return createClient(supabaseUrl, pubKey, {
    auth: { persistSession: false },
  });
}
