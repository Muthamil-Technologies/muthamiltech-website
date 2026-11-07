import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Public (anon) values from the Supabase project; set in .env.local and in Netlify.
// Without them the /learn pages still work, saving progress in this browser only.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Accounts are optional: every page works without one.
export const supabase: SupabaseClient | null =
  import.meta.env.VITE_MOCK_DB === "1"
    ? ((await import("./mockSupabase")).mockSupabase as unknown as SupabaseClient)
    : url && anonKey
      ? createClient(url, anonKey)
      : null;
