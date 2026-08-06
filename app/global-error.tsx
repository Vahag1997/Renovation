"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import "./globals.css";

/**
 * Last-resort boundary: this replaces the root layout, so it must ship its own
 * <html>/<body> and cannot rely on the site shell, the loaded fonts, or
 * `metadata`. Kept deliberately dependency-free for that reason.
 */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[global error boundary]", error);
  }, [error]);

  return (
    <html lang="ru">
      <body className="bg-background text-on-surface antialiased">
        <title>Ошибка — STUDIO AURA</title>
        <main className="min-h-screen flex items-center justify-center px-6 py-24 text-center">
          <div className="max-w-xl">
            <span className="block font-serif text-2xl tracking-[0.3em] text-primary mb-16">
              STUDIO AURA
            </span>
            <p className="text-xs uppercase tracking-[0.15em] font-medium text-secondary mb-6">
              Непредвиденная ошибка
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-primary leading-tight mb-8">
              Сайт временно недоступен
            </h1>
            <p className="text-base leading-relaxed text-on-surface-variant mb-12">
              Мы уже знаем о проблеме. Попробуйте обновить страницу через несколько
              секунд.
            </p>
            <button
              type="button"
              onClick={() => unstable_retry()}
              className="inline-block bg-primary text-on-primary text-xs uppercase tracking-[0.15em] font-medium px-10 py-5 hover:opacity-85 transition-opacity cursor-pointer"
            >
              Обновить
            </button>
            {error.digest && (
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/50 mt-12">
                Код ошибки: {error.digest}
              </p>
            )}
          </div>
        </main>
      </body>
    </html>
  );
}
