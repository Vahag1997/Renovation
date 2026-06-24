import "server-only";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseReadKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseReadKey);

/**
 * Public Supabase client used on the server to READ published content.
 * Uses the public (anon/publishable) key — safe to ship; row-level security
 * only allows SELECT on content tables.
 */
export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl!, supabaseReadKey!, { auth: { persistSession: false } })
  : null;
