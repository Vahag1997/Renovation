"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import { ErrorState } from "@/app/_components/ErrorState";

/**
 * Portfolio-specific boundary. This subtree is the most data-dependent part of
 * the site (every route under it reads projects from Supabase), so it gets its
 * own copy that speaks to that content instead of the generic message.
 */
export default function PortfolioError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[portfolio error boundary]", error);
  }, [error]);

  return (
    <ErrorState
      eyebrow="Портфолио"
      title="Не удалось загрузить проекты"
      description="Каталог работ сейчас недоступен. Попробуйте обновить — обычно это занимает несколько секунд."
      onRetry={() => unstable_retry()}
      digest={error.digest}
    />
  );
}
