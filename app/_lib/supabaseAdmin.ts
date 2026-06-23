import { createClient } from "@supabase/supabase-js";

/**
 * SERVER-ONLY Supabase client with the service-role key.
 * Bypasses Row Level Security — full read/write access.
 * NEVER import this into a Client Component. Use it only inside
 * Server Actions / server code in the admin panel.
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } },
);

export const MEDIA_BUCKET = "project-media";
