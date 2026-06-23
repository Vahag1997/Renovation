import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Public Supabase client used on the server to READ published content.
 * Uses the public (anon/publishable) key — safe to ship; row-level security
 * only allows SELECT on content tables.
 */
export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl!, supabaseAnonKey!, { auth: { persistSession: false } })
  : null;
