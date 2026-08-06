"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import { ErrorState } from "@/app/_components/ErrorState";

/**
 * Catches render/data failures anywhere below the root layout — most often the
 * Supabase reads behind the portfolio and home showcase. The header and footer
 * stay mounted, so the visitor keeps working navigation.
 */
export default function RootError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[root error boundary]", error);
  }, [error]);

  return (
    <ErrorState
      title="Страница временно недоступна"
      description="Не удалось загрузить содержимое. Обычно это временный сбой — попробуйте обновить. Если ошибка повторяется, свяжитесь с нами, и мы поможем."
      onRetry={() => unstable_retry()}
      digest={error.digest}
    />
  );
}
