import {
  LoadingRegion,
  Skeleton,
  SkeletonHeading,
  SkeletonProjectCard,
} from "@/app/_components/Skeleton";

/**
 * Mirrors the real portfolio layout (heading, filter row, 3-column grid) so the
 * swap to real content is a fill-in rather than a jump.
 */
export default function PortfolioLoading() {
  return (
    <LoadingRegion label="Загружаем портфолио">
      <main className="px-margin-mobile lg:px-margin-desktop py-16 md:py-24">
        <div className="max-w-container-max-width mx-auto w-full">
          <SkeletonHeading />

          {/* Category filter row */}
          <div className="flex flex-wrap gap-3 mb-16">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-32" delayMs={i * 70} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonProjectCard key={i} delayMs={i * 110} />
            ))}
          </div>
        </div>
      </main>
    </LoadingRegion>
  );
}
