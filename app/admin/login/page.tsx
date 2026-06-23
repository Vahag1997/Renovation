import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { isAuthed } from "@/app/_lib/auth";
import { login } from "@/app/admin/_actions";

export const metadata: Metadata = {
  title: "Вход — Админка",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ config?: string; error?: string }>;
}) {
  if (await isAuthed()) redirect("/admin");
  const { config, error } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-100 px-6">
      <div className="w-full max-w-sm bg-white border border-neutral-200 rounded-xl p-8 shadow-sm">
        <h1 className="text-xl font-medium text-neutral-900 mb-1">STUDIO AURA</h1>
        <p className="text-sm text-neutral-500 mb-6">Панель управления контентом</p>

        {config ? (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            ADMIN_PASSWORD is not configured on the server.
          </p>
        ) : error ? (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            Неверный пароль. Попробуйте ещё раз.
          </p>
        ) : null}

        <form action={login} className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-600 mb-1">Пароль</label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
              placeholder="Введите пароль"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-neutral-900 text-white text-sm font-medium py-2.5 hover:bg-neutral-700 transition-colors"
          >
            Войти
          </button>
        </form>
      </div>
    </main>
  );
}
