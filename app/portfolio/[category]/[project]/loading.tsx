import { LoadingRegion, Skeleton } from "@/app/_components/Skeleton";

/** Project detail placeholder: full-bleed hero, then the meta/description split. */
export default function ProjectLoading() {
  return (
    <LoadingRegion label="Загружаем проект">
      <main>
        {/* Hero */}
        <Skeleton className="w-full h-[60vh] md:h-[80vh]" />

        <div className="px-margin-mobile lg:px-margin-desktop py-16 md:py-24">
          <div className="max-w-container-max-width mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Meta column */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="h-2.5 w-24" delayMs={i * 90} />
                  <Skeleton className="h-4 w-40" delayMs={i * 90 + 60} />
                </div>
              ))}
            </div>

            {/* Story column */}
            <div className="lg:col-span-7 lg:col-start-6 flex flex-col gap-4">
              <Skeleton className="h-8 w-2/3 mb-4" />
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className={`h-3.5 ${i === 4 ? "w-1/2" : "w-full"}`}
                  delayMs={i * 80}
                />
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="max-w-container-max-width mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] w-full" delayMs={i * 120} />
            ))}
          </div>
        </div>
      </main>
    </LoadingRegion>
  );
}
