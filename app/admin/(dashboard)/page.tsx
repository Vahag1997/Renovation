import Link from "next/link";

import { hasSupabaseAdminConfig, supabaseAdmin } from "@/app/_lib/supabaseAdmin";
import { AdminConfigNotice } from "@/app/admin/_components/AdminConfigNotice";
import { deleteProject } from "@/app/admin/_actions";

export const dynamic = "force-dynamic";

type Row = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  category: { name: string } | null;
};

export default async function AdminProjectsPage() {
  if (!hasSupabaseAdminConfig()) {
    return <AdminConfigNotice />;
  }

  const { data } = await supabaseAdmin
    .from("projects")
    .select("id,title,slug,published, category:categories(name)")
    .order("sort_order");
  const projects = (data ?? []) as unknown as Row[];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Проекты портфолио</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-md bg-neutral-900 text-white text-sm font-medium px-4 py-2 hover:bg-neutral-700"
        >
          + Добавить проект
        </Link>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
        {projects.length === 0 ? (
          <p className="p-6 text-sm text-neutral-500">
            Пока нет проектов. Нажмите «Добавить проект».
          </p>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {projects.map((p) => (
              <li key={p.id} className="flex items-center justify-between px-5 py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{p.title}</span>
                    {!p.published && (
                      <span className="text-[11px] uppercase tracking-wide text-amber-700 bg-amber-100 rounded px-1.5 py-0.5">
                        черновик
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-neutral-500">
                    {p.category?.name ?? "—"} · /{p.slug}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/projects/${p.id}`}
                    className="text-sm text-neutral-900 underline underline-offset-4"
                  >
                    Редактировать
                  </Link>
                  <form action={deleteProject}>
                    <input type="hidden" name="id" value={p.id} />
                    <button className="text-sm text-neutral-400 hover:text-red-600">Удалить</button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
