"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[admin error boundary]", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-neutral-100 px-6 py-24 text-neutral-900">
      <div className="mx-auto max-w-lg rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
        <p className="mb-2 text-sm font-medium text-red-700">Ошибка панели управления</p>
        <h1 className="mb-4 text-2xl font-medium">Операцию не удалось завершить</h1>
        <p className="mb-6 text-sm leading-relaxed text-neutral-600">
          Проверьте подключение к Supabase и повторите действие. Данные формы останутся в браузере до обновления страницы.
        </p>
        <button type="button" onClick={() => unstable_retry()} className="rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700">
          Повторить
        </button>
        {error.digest ? <p className="mt-6 text-xs text-neutral-400">Код: {error.digest}</p> : null}
      </div>
    </main>
  );
}
