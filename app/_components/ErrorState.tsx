"use client";

import Link from "next/link";

type ErrorStateProps = {
  /** Small caps line above the title. */
  eyebrow?: string;
  title: string;
  description: string;
  /** Re-runs the failed segment. Omitted on boundaries that cannot recover. */
  onRetry?: () => void;
  /** Server error identifier, shown small so a visitor can quote it to support. */
  digest?: string;
  /** Hide the site links when the shell itself is broken (global-error). */
  showLinks?: boolean;
};

/**
 * Shared fallback for every error boundary, so a failure looks like part of the
 * site rather than a stack trace. Deliberately free of any site chrome — the
 * boundary it renders in may be above or below the header.
 */
export function ErrorState({
  eyebrow = "Что-то пошло не так",
  title,
  description,
  onRetry,
  digest,
  showLinks = true,
}: ErrorStateProps) {
  return (
    <main className="min-h-[70vh] flex items-center px-margin-mobile lg:px-margin-desktop py-24">
      <div className="max-w-container-max-width mx-auto w-full text-center animate-fade-up">
        <p className="font-label-caps text-label-caps text-secondary mb-6 tracking-widest">
          {eyebrow}
        </p>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-8 leading-tight">
          {title}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto mb-12 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-block bg-primary text-on-primary font-label-caps text-label-caps px-10 py-5 uppercase tracking-widest hover:bg-secondary transition-colors duration-300 cursor-pointer"
            >
              Попробовать снова
            </button>
          )}
          {showLinks && (
            <Link
              href="/"
              className="inline-block border border-primary text-primary font-label-caps text-label-caps px-10 py-5 uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300"
            >
              На главную
            </Link>
          )}
        </div>

        {digest && (
          <p className="font-sans text-[10px] tracking-widest uppercase text-on-surface-variant/50 mt-12">
            Код ошибки: {digest}
          </p>
        )}
      </div>
    </main>
  );
}
