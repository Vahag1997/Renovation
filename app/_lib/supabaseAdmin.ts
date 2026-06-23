import { createClient } from "@supabase/supabase-js";

type SupabaseAdminClient = ReturnType<typeof createClient>;
type SupabaseError = { message: string };
type SupabaseResult<T = unknown> = PromiseLike<{ data: T; error: SupabaseError | null }>;
type SupabaseQueryBuilder = SupabaseResult & {
  delete: () => SupabaseQueryBuilder;
  eq: (...args: unknown[]) => SupabaseQueryBuilder;
  insert: (...args: unknown[]) => SupabaseQueryBuilder;
  maybeSingle: () => SupabaseResult;
  neq: (...args: unknown[]) => SupabaseQueryBuilder;
  order: (...args: unknown[]) => SupabaseQueryBuilder;
  select: (...args: unknown[]) => SupabaseQueryBuilder;
  single: () => SupabaseResult<{ id: string }>;
  update: (...args: unknown[]) => SupabaseQueryBuilder;
};
type SupabaseStorageBucket = {
  getPublicUrl: (path: string) => { data: { publicUrl: string } };
  remove: (...args: unknown[]) => Promise<{ error: SupabaseError | null }>;
  upload: (...args: unknown[]) => Promise<{ error: SupabaseError | null }>;
};
type SupabaseAdminFacade = {
  from: (table: string) => SupabaseQueryBuilder;
  storage: {
    from: (bucket: string) => SupabaseStorageBucket;
  };
};

/**
 * SERVER-ONLY Supabase client with the service-role key.
 * Bypasses Row Level Security — full read/write access.
 * NEVER import this into a Client Component. Use it only inside
 * Server Actions / server code in the admin panel.
 */
let supabaseAdminClient: SupabaseAdminClient | null = null;

export function hasSupabaseAdminConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase admin environment variables are required for admin actions.");
  }

  supabaseAdminClient ??= createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  return supabaseAdminClient;
}

export const supabaseAdmin = new Proxy({} as SupabaseAdminClient, {
  get(_target, property) {
    const client = getSupabaseAdmin();
    const value = client[property as keyof SupabaseAdminClient];

    return typeof value === "function" ? value.bind(client) : value;
  },
}) as unknown as SupabaseAdminFacade;

export const MEDIA_BUCKET = "project-media";
