export function AdminConfigNotice() {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
      <h1 className="mb-2 text-xl font-medium text-amber-950">Admin database is not configured</h1>
      <p className="mb-4">
        The admin panel is open, but it needs Supabase server variables before it can load or edit projects.
      </p>
      <div className="rounded-lg bg-white/70 p-4 font-mono text-xs leading-6 text-amber-950">
        <div>NEXT_PUBLIC_SUPABASE_URL</div>
        <div>SUPABASE_SERVICE_ROLE_KEY</div>
      </div>
      <p className="mt-4">
        Add these variables in Vercel Project Settings, then redeploy.
      </p>
    </div>
  );
}
