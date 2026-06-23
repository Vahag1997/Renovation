import { createClient } from "@supabase/supabase-js";

/**
 * Public Supabase client used on the server to READ published content.
 * Uses the public (anon/publishable) key — safe to ship; row-level security
 * only allows SELECT on content tables.
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } },
);
