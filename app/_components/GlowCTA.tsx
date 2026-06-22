"use client";

import Link from "next/link";
import { useRef, useState } from "react";

/**
 * Final call-to-action band with a cursor-following radial glow.
 * Isolated as a Client Component so the surrounding page stays a Server Component.
 */
export function GlowCTA() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [glowStyle, setGlowStyle] = useState({
    "--x": "0px",
    "--y": "0px",
  } as React.CSSProperties);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    setGlowStyle({
      "--x": `${e.clientX - rect.left}px`,
      "--y": `${e.clientY - rect.top}px`,
    } as React.CSSProperties);
  };

  return (
    <section
      ref={ctaRef}
      onMouseMove={handleMouseMove}
      className="w-full bg-primary text-on-primary py-section-gap mt-section-gap overflow-hidden relative"
    >
      <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop text-center relative z-10">
        <span className="font-label-caps text-label-caps tracking-[0.3em] mb-8 block opacity-60">
          НАЧНИТЕ ДИАЛОГ
        </span>
        <h2 className="font-display-lg text-display-lg text-white mb-12">Сотрудничайте с Нами</h2>
        <Link
          className="inline-block border border-on-primary px-12 py-5 font-button text-button transition-all duration-500 hover:bg-on-primary hover:text-primary tracking-widest uppercase"
          href="/kontakty"
        >
          Записаться на консультацию
        </Link>
      </div>
      {/* Glow effect overlay */}
      <div
        style={glowStyle}
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-[radial-gradient(circle_at_var(--x)_var(--y),_#ffffff33_0%,_transparent_50%)]"
      ></div>
    </section>
  );
}
