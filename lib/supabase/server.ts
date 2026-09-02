import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client — uses service/publishable key for operations (e.g., submitting enquiries)
// NEVER import this in client components
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_SECRET_KEY!;

  return createClient(supabaseUrl, key, {
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
