import type { CSSProperties } from "react";

type SkeletonProps = {
  className?: string;
  /** Staggers the shimmer so a group of blocks ripples instead of pulsing as one. */
  delayMs?: number;
};

/**
 * Single shimmering placeholder block. Server Component — loading UI must be
 * cheap and must not ship JS.
 */
export function Skeleton({ className = "", delayMs = 0 }: SkeletonProps) {
  const style: CSSProperties | undefined = delayMs
    ? { animationDelay: `${delayMs}ms` }
    : undefined;
  return <div aria-hidden className={`skeleton ${className}`} style={style} />;
}

/** Portfolio/showcase card placeholder that mirrors the real 3:4 project tile. */
export function SkeletonProjectCard({ delayMs = 0 }: { delayMs?: number }) {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="aspect-[3/4] w-full" delayMs={delayMs} />
      <Skeleton className="h-3 w-3/4" delayMs={delayMs + 80} />
      <Skeleton className="h-3 w-1/3" delayMs={delayMs + 160} />
    </div>
  );
}

/** Heading block used at the top of a loading page. */
export function SkeletonHeading() {
  return (
    <div className="flex flex-col gap-4 mb-16">
      <Skeleton className="h-3 w-40" />
      <Skeleton className="h-10 md:h-14 w-full max-w-2xl" delayMs={80} />
      <Skeleton className="h-10 md:h-14 w-2/3 max-w-xl" delayMs={160} />
    </div>
  );
}

/**
 * Accessible live-region wrapper. Screen readers announce that content is
 * loading while sighted users see the shimmer.
 */
export function LoadingRegion({
  children,
  label = "Загрузка содержимого",
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}
