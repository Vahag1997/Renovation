"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function About() {
  const revealElements = useRef<HTMLElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [glowStyle, setGlowStyle] = useState({ "--x": "0px", "--y": "0px" } as React.CSSProperties);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.current.forEach((el) => {
      if (el) {
        el.classList.add("scroll-reveal");
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealElements.current.includes(el)) {
      revealElements.current.push(el);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGlowStyle({
      "--x": `${x}px`,
      "--y": `${y}px`,
    } as React.CSSProperties);
  };

  return (
    <main className="overflow-x-hidden pt-12">
      {/* Hero Section */}
      <section className="w-full h-[75vh] overflow-hidden relative flex items-end">
        <img
          alt="Пространство дизайн-студии Studio Aura"
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 transition-transform duration-[3000ms] hover:scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAq5ysJTrrWTlYgp5_6zd762ppWrQmqo2bvxX6RomSYe_hFmglFTf5yLNklXuFvyUgZBq5LVoEmaVvcwZ_Lwdi_s2bay_Bg3SA58USgB2jaIAiStb8kUusyg6l9w9oTWlM0o-2UPo1-LBPe2KYXn3YVs9ylFstHy4mvQDFNFEghDSAglGjvuwiC1bKwXMOcGb15Yy4hN7OgsrR5_lESPK9AudJSlxL_odcUt-LTQRbjADDrO5OUF2KqSBZ8QUxHSYz9cgQKRIha9A8"
        />
        <div className="absolute inset-0 bg-black/15"></div>
        <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop pb-16 max-w-container-max-width mx-auto">
          <h1 className="font-display-lg-mobile md:text-display-lg font-display-lg text-white drop-shadow-sm max-w-2xl leading-none">
            Создаем пространства, которые находят отклик в душе.
          </h1>
        </div>
      </section>

      {/* Philosophy Section */}
      <section
        ref={addToRefs}
        className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop mt-section-gap"
      >
        <div className="editorial-grid">
          <div className="col-span-12 md:col-span-5">
            <span className="font-label-caps text-label-caps text-secondary mb-4 block">
              ФИЛОСОФИЯ
            </span>
            <h2 className="font-headline-md text-headline-md text-primary mb-8 leading-tight">
              Поэтика Пространства
            </h2>
          </div>
          <div className="col-span-12 md:col-start-7 md:col-span-6 border-t border-outline-variant pt-8 md:pt-0 md:border-t-0">
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
              В Studio Aura мы верим, что архитектура — это больше, чем просто несущая конструкция.
              Это глубокий эмоциональный опыт. Наш подход, укорененный в «поэтике пространства»,
              фокусируется на тонком взаимодействии естественного света, честности сырых материалов
              и безмолвном резонансе пустых объемов.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
              Мы осознанно избегаем сиюминутных интерьерных трендов, отдавая предпочтение вневременному
              минимализму, который уважает контекст места и личность владельца. Каждая линия, которую
              мы чертим — преднамеренна, каждая тень спроектирована так, чтобы дарить чувство покоя и
              ясности в стремительно ускоряющемся и шумном мире.
            </p>
            <div className="pt-8 border-t border-outline-variant w-24"></div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        ref={addToRefs}
        className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop mt-section-gap"
      >
        <span className="font-label-caps text-label-caps text-secondary mb-12 block text-center tracking-widest">
          АРХИТЕКТОРЫ И ДИЗАЙНЕРЫ AURA
        </span>
        <div className="editorial-grid">
          {/* Team Member 1 */}
          <div className="col-span-12 md:col-span-4 mb-12 md:mb-0 group cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden mb-6 bg-surface-container">
              <img
                alt="Елена Вэнс — Главный Архитектор"
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0UHkG1W0nX-M5PrfTXPa3l7-5HXhRH-YRcDcuwMP_MmiqZJMRZTgYxYZBSjq2fktvz9DQvgPvecpDz_hmDcVb10s-dFFv-pqA_KOPMQO_Hkikaq8OFXnywJ_bwyOtXoMcNTQ0hcGTTsX_jLjo4axdaOae1WLnGSeMedNibyRtBF-9EWgo07D_1JajaltGPRRnEQGlID1A2VAm7LtJFGqE7pcVjZfjKVm8iMPb1TLELZ_xQxIy4sBVh3NFmM4BwYZslDr2iID40ng"
              />
            </div>
            <div className="border-l border-primary pl-4">
              <h3 className="font-headline-sm text-headline-sm text-primary">Елена Вэнс</h3>
              <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">
                ГЛАВНЫЙ АРХИТЕКТОР
              </p>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="col-span-12 md:col-span-4 mb-12 md:mb-0 group cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden mb-6 bg-surface-container">
              <img
                alt="Джулиан Торн — Ведущий Дизайнер"
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA-N5liX_Yb5yU7XjrqCX7PKUFDK0JVCLV-p69QO2daNLmmjYxqEUvPTpwUzPufhf8Eq8SnxlRIszwuq3a6KURESY4MIDXDLHjpQ6DnSJjazjivRCAMdslqRS02LOJ-lasIcdcdh-8mVqNlrDB6RqlaV3b_qc6NbytvnyQ6Pxi8ElDTY6HcOWQ3muZXAdD6tLYLRiHQM50y7CYDotfhdq4uCWJByZH9dRPxtSoVmQWRcswYpb9_uQnpPBEIHtUxTMcKf16PPyoCd4"
              />
            </div>
            <div className="border-l border-primary pl-4">
              <h3 className="font-headline-sm text-headline-sm text-primary">Джулиан Торн</h3>
              <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">
                ВЕДУЩИЙ ДИЗАЙНЕР
              </p>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="col-span-12 md:col-span-4 group cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden mb-6 bg-surface-container">
              <img
                alt="Сана Ахмед — Руководитель Проектов"
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFpXPwJjL9odGGPS0ec8ctZYX6VXwMWCcXC-3Mcl-db41nn5Lh8M9bIoZGRXJKO1o0rvhmBbqkIwfIsViRc7FcNkMJ2WyWjvuS49e3xE0eN45UXH-DY0Kmq1tofgHAR3zQHuTXbKKEzy0mJdoiRC1uAY-pGs1U7eBzO28nz6jEMP2RRtUYmJ5QkLlpdVQkZ07_E7Tvvrgsz-z80gL6hRvCloHJ3mK6BXqfqzWv-0qnzqpB_JRHoKGH740uPyshB5tt7FB3ukTfKx8"
              />
            </div>
            <div className="border-l border-primary pl-4">
              <h3 className="font-headline-sm text-headline-sm text-primary">Сана Ахмед</h3>
              <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">
                ДИРЕКТОР ПРОЕКТОВ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={addToRefs}
        className="bg-surface-container-low py-20 mt-section-gap border-y border-outline-variant"
      >
        <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter text-center">
            <div>
              <div className="font-display-lg text-display-lg text-primary">12</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant tracking-[0.2em] mt-2">
                ЛЕТ ПРАКТИКИ
              </div>
            </div>
            <div>
              <div className="font-display-lg text-display-lg text-primary">85</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant tracking-[0.2em] mt-2">
                СДАННЫХ ОБЪЕКТОВ
              </div>
            </div>
            <div>
              <div className="font-display-lg text-display-lg text-primary">24</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant tracking-[0.2em] mt-2">
                НАГРАДЫ ЗА ДИЗАЙН
              </div>
            </div>
            <div>
              <div className="font-display-lg text-display-lg text-primary">06</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant tracking-[0.2em] mt-2">
                МИРОВЫХ ПРЕДСТАВИТЕЛЬСТВ
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Overview Section */}
      <section
        ref={addToRefs}
        className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop mt-section-gap"
      >
        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
          <h2 className="font-headline-md text-headline-md text-primary max-w-xs mb-8 md:mb-0 leading-tight">
            Сотрудничаем с лучшими ремесленными мастерскими мира.
          </h2>
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <Link
                href="/partnery"
                className="border-b border-outline-variant pb-4 flex justify-between items-center group cursor-pointer"
              >
                <span className="font-label-caps text-label-caps group-hover:text-secondary transition-colors text-primary">
                  CARRARA STONE GUILD
                </span>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors text-[20px]">
                  arrow_outward
                </span>
              </Link>
              <Link
                href="/partnery"
                className="border-b border-outline-variant pb-4 flex justify-between items-center group cursor-pointer"
              >
                <span className="font-label-caps text-label-caps group-hover:text-secondary transition-colors text-primary">
                  VITRA COLLECTIONS
                </span>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors text-[20px]">
                  arrow_outward
                </span>
              </Link>
              <Link
                href="/partnery"
                className="border-b border-outline-variant pb-4 flex justify-between items-center group cursor-pointer"
              >
                <span className="font-label-caps text-label-caps group-hover:text-secondary transition-colors text-primary">
                  NORDIC LUMEN WORKS
                </span>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors text-[20px]">
                  arrow_outward
                </span>
              </Link>
              <Link
                href="/partnery"
                className="border-b border-outline-variant pb-4 flex justify-between items-center group cursor-pointer"
              >
                <span className="font-label-caps text-label-caps group-hover:text-secondary transition-colors text-primary">
                  TEXTURA WEAVERS
                </span>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors text-[20px]">
                  arrow_outward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
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
    </main>
  );
}
