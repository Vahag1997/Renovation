"use client";

import { useRef, useState } from "react";

type BeforeAfterSliderProps = {
  afterAlt?: string;
  afterImage: string;
  beforeAlt?: string;
  beforeImage: string;
  className?: string;
  contentClassName?: string;
  title: string;
};

export function BeforeAfterSlider({
  afterAlt = "После ремонта: готовый интерьер",
  afterImage,
  beforeAlt = "До ремонта: бетонный каркас",
  beforeImage,
  className = "",
  contentClassName = "",
  title,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 2;
    if (event.key === "ArrowLeft") setSliderPosition((value) => Math.max(0, value - step));
    else if (event.key === "ArrowRight") setSliderPosition((value) => Math.min(100, value + step));
    else if (event.key === "Home") setSliderPosition(0);
    else if (event.key === "End") setSliderPosition(100);
    else return;
    event.preventDefault();
  };

  return (
    <div className={className}>
      <div className={contentClassName}>
        <div className="flex flex-col sm:flex-row justify-between items-baseline mb-8">
          <h3 className="font-headline-md text-headline-md text-primary">
            Трансформация пространства: {title}
          </h3>
          <span className="font-label-caps text-label-caps text-on-surface-variant tracking-wider mt-2 sm:mt-0">
            ДВИГАЙТЕ ПОЛЗУНОК ДЛЯ СРАВНЕНИЯ (ДО / ПОСЛЕ)
          </span>
        </div>

        <div
          ref={containerRef}
          role="slider"
          tabIndex={0}
          aria-label={`Сравнение до и после: ${title}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPosition)}
          onKeyDown={handleKeyDown}
          onPointerDown={(event) => {
            isDragging.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            handleMove(event.clientX);
          }}
          onPointerMove={(event) => {
            if (isDragging.current) handleMove(event.clientX);
          }}
          onPointerUp={(event) => {
            isDragging.current = false;
            event.currentTarget.releasePointerCapture(event.pointerId);
          }}
          onPointerCancel={() => (isDragging.current = false)}
          style={{ touchAction: "none" }}
          className="before-after-slider relative w-full aspect-[16/9] cursor-ew-resize bg-surface-dim select-none border border-outline-variant overflow-hidden"
        >
          {/* Before Image */}
          {/* Plain <img> on purpose: the clip-reveal relies on an absolutely
              positioned image whose pixel width is driven by the container's
              measured width — a pattern next/image's `fill` can't reproduce. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-[35%] pointer-events-none"
            alt={beforeAlt}
            src={beforeImage}
            draggable={false}
          />
          {/* After Image */}
          <div
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            className="absolute inset-0 overflow-hidden pointer-events-none"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              alt={afterAlt}
              src={afterImage}
              draggable={false}
            />
          </div>
          {/* Handle */}
          <div
            style={{ left: `${sliderPosition}%` }}
            className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white bg-black/60 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xs select-none">unfold_more</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
