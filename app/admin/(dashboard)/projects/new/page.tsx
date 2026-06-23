import Link from "next/link";

import { hasSupabaseAdminConfig, supabaseAdmin } from "@/app/_lib/supabaseAdmin";
import { AdminConfigNotice } from "@/app/admin/_components/AdminConfigNotice";
import { createProject } from "@/app/admin/_actions";

export const dynamic = "force-dynamic";

type CategoryRow = {
  id: string;
  name: string;
};

export default async function NewProjectPage() {
  if (!hasSupabaseAdminConfig()) {
    return <AdminConfigNotice />;
  }

  const { data: categories } = await supabaseAdmin
    .from("categories")
    .select("id,name")
    .order("sort_order");

  return (
    <div className="max-w-xl">
      <Link href="/admin" className="text-sm text-neutral-500 hover:text-neutral-900">
        ← Назад к списку
      </Link>
      <h1 className="text-2xl font-medium mt-3 mb-1">Новый проект</h1>
      <p className="text-sm text-neutral-500 mb-6">
        Введите название и категорию — фото и тексты добавите на следующем шаге.
      </p>

      <form action={createProject} className="space-y-4 bg-white border border-neutral-200 rounded-xl p-6">
        <div>
          <label className="block text-sm text-neutral-600 mb-1">Название проекта *</label>
          <input
            name="title"
            required
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
            placeholder="Например: Вилла на озере Комо"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-600 mb-1">
            Адрес в ссылке (необязательно)
          </label>
          <input
            name="slug"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
            placeholder="villa-como (если пусто — создам автоматически)"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-600 mb-1">Категория *</label>
          <select
            name="category_id"
            required
            defaultValue=""
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm bg-white focus:outline-none focus:border-neutral-900"
          >
            <option value="" disabled>
              Выберите категорию
            </option>
            {((categories ?? []) as CategoryRow[]).map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <button className="rounded-md bg-neutral-900 text-white text-sm font-medium px-4 py-2.5 hover:bg-neutral-700">
          Создать и продолжить
        </button>
      </form>
    </div>
  );
}
