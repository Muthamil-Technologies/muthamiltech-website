import { isJapanOne } from "./brand";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Public (anon) values from the Supabase project; set in .env.local and in Netlify.
// Without them the /learn pages still work, saving progress in this browser only.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Accounts are switched off on japanone.app for now (guest practice only, nothing stored on our side).
export const supabase: SupabaseClient | null = url && anonKey && !isJapanOne ? createClient(url, anonKey) : null;
