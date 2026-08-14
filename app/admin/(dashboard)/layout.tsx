import Link from "next/link";
import { redirect } from "next/navigation";

import { isAuthed } from "@/app/_lib/auth";
import { logout } from "@/app/admin/_actions";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthed())) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-medium tracking-wide">
              STUDIO AURA · Админка
            </Link>
            <Link href="/admin" className="text-sm text-neutral-500 hover:text-neutral-900">
              Проекты
            </Link>
            <Link href="/admin/leads" className="text-sm text-neutral-500 hover:text-neutral-900">
              Заявки
            </Link>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-500 hover:text-neutral-900"
            >
              Открыть сайт ↗
            </Link>
          </div>
          <form action={logout}>
            <button className="text-sm text-neutral-500 hover:text-red-600">Выйти</button>
          </form>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
