"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];
  const isOpen = activeIndex !== null;

  const openSlider = (index: number) => {
    setActiveIndex(index);
  };

  const closeSlider = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % images.length;
    });
  }, [images.length]);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + images.length) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSlider();
      }
      if (event.key === "ArrowRight") {
        showNext();
      }
      if (event.key === "ArrowLeft") {
        showPrevious();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeSlider, isOpen, showNext, showPrevious]);

  return (
    <>
      <section className="project-gallery-grid px-margin-mobile lg:px-margin-desktop pb-section-gap">
        <div className="max-w-container-max-width mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {images.map((image, index) => {
            const spanClass =
              index === 0
                ? "md:col-span-8"
                : index === 1
                  ? "md:col-span-4"
                  : index === 2
                    ? "md:col-span-5"
                    : index === 3
                      ? "md:col-span-7"
                      : "md:col-span-6";

            return (
              <button
                className={`${spanClass} project-gallery-tile group relative min-h-[320px] overflow-hidden bg-surface-container border border-outline-variant/40 text-left cursor-zoom-in`}
                key={`${title}-gallery-${image}`}
                onClick={() => openSlider(index)}
                style={{ animationDelay: `${index * 90}ms` }}
                type="button"
                aria-label={`Открыть фото ${index + 1} проекта ${title}`}
              >
                <Image
                  className="object-cover grayscale-[18%] brightness-95 transition-all duration-[1100ms] ease-out group-hover:scale-[1.08] group-hover:grayscale-0 group-hover:brightness-105"
                  src={image}
                  alt={`${title}: фото ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
                <span className="pointer-events-none absolute bottom-5 right-5 grid h-12 w-12 place-items-center border border-white/45 bg-black/35 text-white opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <span className="material-symbols-outlined text-[22px]">open_in_full</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {isOpen && activeImage ? (
        <div
          className="gallery-slider fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Галерея проекта ${title}`}
        >
          <button
            className="absolute inset-0 cursor-zoom-out"
            onClick={closeSlider}
            type="button"
            aria-label="Закрыть галерею фоном"
          />

          <div className="relative z-10 h-full w-full px-4 md:px-12 py-6 md:py-10 flex flex-col">
            <div className="flex items-center justify-between gap-4 text-white">
              <div>
                <span className="font-label-caps text-[10px] tracking-widest text-white/55 block mb-2">
                  {String((activeIndex ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </span>
                <h2 className="font-headline-sm text-headline-sm">{title}</h2>
              </div>
              <button
                className="grid h-11 w-11 place-items-center border border-white/25 text-white hover:bg-white hover:text-primary transition-colors"
                onClick={closeSlider}
                type="button"
                data-testid="gallery-slider-close"
                aria-label="Закрыть галерею"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            <div className="relative flex-1 min-h-0 flex items-center justify-center py-6">
              <button
                className="absolute left-0 md:left-2 z-20 grid h-12 w-12 place-items-center border border-white/25 bg-black/35 text-white hover:bg-white hover:text-primary transition-colors"
                onClick={showPrevious}
                type="button"
                aria-label="Предыдущее фото"
              >
                <span className="material-symbols-outlined text-[28px]">chevron_left</span>
              </button>

              <Image
                key={activeImage}
                className="gallery-slider-image object-contain shadow-2xl"
                src={activeImage}
                alt={`${title}: фото ${(activeIndex ?? 0) + 1}`}
                fill
                sizes="100vw"
              />

              <button
                className="absolute right-0 md:right-2 z-20 grid h-12 w-12 place-items-center border border-white/25 bg-black/35 text-white hover:bg-white hover:text-primary transition-colors"
                onClick={showNext}
                type="button"
                aria-label="Следующее фото"
              >
                <span className="material-symbols-outlined text-[28px]">chevron_right</span>
              </button>
            </div>

            <div className="mx-auto flex max-w-full gap-3 overflow-x-auto pb-1">
              {images.map((image, index) => (
                <button
                  className={`relative h-16 w-24 shrink-0 overflow-hidden border transition-all ${
                    index === activeIndex ? "border-white opacity-100" : "border-white/20 opacity-45 hover:opacity-80"
                  }`}
                  key={`${title}-slider-thumb-${image}`}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                  aria-label={`Показать фото ${index + 1}`}
                >
                  <Image className="object-cover" src={image} alt="" fill sizes="96px" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
