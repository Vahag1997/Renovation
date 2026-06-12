"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import type { CSSProperties } from "react";
import {
  getChildRoutes,
  getParentRoute,
  getRouteByHref,
  homeRoute,
  siteRoutes,
} from "@/app/_data/routes";

type RoutePlaceholderProps = {
  href: string;
};

import { portfolioProjects } from "@/app/_data/projects";
import { Calculator } from "@/app/_components/Calculator";

export function RoutePlaceholder({ href }: RoutePlaceholderProps) {
  const route = getRouteByHref(href) ?? homeRoute;
  const parent = getParentRoute(href);
  const children = getChildRoutes(href);
  const visibleSections = href === "/" ? siteRoutes : children;

  const [sliderPosition, setSliderPosition] = useState(50);
  const [formData, setFormData] = useState({ name: "", phone: "", area: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const revealElements = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
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

    return () => observer.disconnect();
  }, [href]);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealElements.current.includes(el)) {
      revealElements.current.push(el);
    }
  };

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const heroStyle = {
    backgroundImage: `url(${route.heroImage})`,
  } as CSSProperties;

  // Render home page placeholder for compatibility tests
  if (href === "/") {
    return (
      <main className="min-h-screen">
        {/* home-hero and home-hero-shell classes must exist for test suite */}
        <section 
          className="home-hero relative min-h-[85vh] bg-cover bg-center flex items-end py-20 px-margin-mobile md:px-margin-desktop border-b border-outline-variant"
          style={heroStyle}
        >
          <div className="absolute inset-0 bg-black/45 z-0"></div>
          <div className="home-hero-shell relative z-10 max-w-container-max-width mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-gutter items-end">
            <div className="col-span-12 md:col-span-8 text-white">
              <p className="font-label-caps text-label-caps text-secondary mb-4 tracking-widest">{route.eyebrow}</p>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight mb-8">{route.title}</h1>
              <p className="font-body-lg text-body-lg text-white/80 max-w-xl leading-relaxed">{route.description}</p>
              <div className="flex gap-4 mt-8 flex-wrap">
                <Link className="px-8 py-4 bg-white text-primary font-button text-button uppercase tracking-widest hover:bg-secondary hover:text-white transition-all" href="/uslugi">
                  Смотреть услуги
                </Link>
                <Link className="px-8 py-4 border border-white text-white font-button text-button uppercase tracking-widest hover:bg-white hover:text-primary transition-all" href="/portfolio">
                  Смотреть портфолио
                </Link>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 bg-background/90 backdrop-blur-md border border-outline-variant p-6 flex flex-col gap-4 text-primary mt-8 md:mt-0">
              <span className="font-label-caps text-[10px] text-secondary tracking-widest">Разделы сайта</span>
              {siteRoutes.map((item) => (
                <Link className="flex justify-between items-center py-2 border-b border-outline-variant/30 hover:opacity-75" href={item.href} key={item.href}>
                  <strong className="font-label-caps text-label-caps">{item.label}</strong>
                  <small className="font-body-md text-body-md opacity-60">{item.children ? `${item.children.length} страниц` : "Раздел"}</small>
                </Link>
              ))}
            </div>
          </div>

          <div className="absolute bottom-4 left-margin-mobile md:left-margin-desktop flex gap-4 text-white/60 font-label-caps text-[10px]">
            {route.bullets?.map((item) => <span key={item}>{item}</span>)}
          </div>
        </section>

        {/* route-preview-strip class must exist for test suite */}
        <section className="route-preview-strip border-b border-outline-variant py-4 px-margin-mobile md:px-margin-desktop bg-surface-container-low flex gap-4 overflow-x-auto">
          <span className="font-label-caps text-[10px] text-secondary">Главная</span>
          {siteRoutes.map((item) => (
            <Link className="font-label-caps text-[10px] hover:text-primary transition-colors text-on-surface-variant" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </section>
      </main>
    );
  }

  // Determine subroute details for portfolio and service pages
  const isServiceSubroute = href.startsWith("/uslugi/");
  const isPortfolioSubroute = href.startsWith("/portfolio/");
  const categorySlug = href.split("/").pop() ?? "";

  // Render Inner Route Layout with Stitch Design
  return (
    <main className="min-h-screen pt-12 overflow-x-hidden">
      {/* Hero section */}
      <section 
        className="relative min-h-[60vh] bg-cover bg-center flex items-center lg:items-end py-20 px-margin-mobile lg:px-margin-desktop border-b border-outline-variant"
        style={heroStyle}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative z-10 max-w-container-max-width mx-auto w-full">
          {isServiceSubroute ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
              {/* Left Column: Title and Details */}
              <div className="lg:col-span-7 text-white">
                <div className="flex gap-2 text-white/80 font-label-caps text-[10px] mb-6 flex-wrap">
                  <Link className="hover:text-white" href="/">Главная</Link>
                  {parent ? (
                    <>
                      <span>/</span>
                      <Link className="hover:text-white" href={parent.href}>{parent.label}</Link>
                    </>
                  ) : null}
                  <span>/</span>
                  <span className="text-white">{route.label}</span>
                </div>
                <p className="font-label-caps text-label-caps text-secondary mb-4 tracking-[0.25em]">{route.eyebrow}</p>
                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-6 leading-tight max-w-4xl">{route.title}</h1>
                <p className="font-body-lg text-body-lg text-white/85 max-w-2xl leading-relaxed">{route.description}</p>
                <div className="flex gap-4 mt-6 flex-wrap">
                  {route.bullets?.map((bullet) => (
                    <span key={bullet} className="px-3 py-1 bg-white/10 border border-white/20 text-white font-label-caps text-[9px] tracking-wider">
                      {bullet}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Right Column: Calculator */}
              <div className="lg:col-span-5 w-full mt-8 lg:mt-0">
                <Calculator isDark={true} />
              </div>
            </div>
          ) : (
            /* Standard Full-width layout for portfolio pages */
            <div className="text-white">
              <div className="flex gap-2 text-white/80 font-label-caps text-[10px] mb-6 flex-wrap">
                <Link className="hover:text-white" href="/">Главная</Link>
                {parent ? (
                  <>
                    <span>/</span>
                    <Link className="hover:text-white" href={parent.href}>{parent.label}</Link>
                  </>
                ) : null}
                <span>/</span>
                <span className="text-white">{route.label}</span>
              </div>
              <p className="font-label-caps text-label-caps text-secondary mb-4 tracking-[0.25em]">{route.eyebrow}</p>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-6 leading-tight max-w-4xl">{route.title}</h1>
              <p className="font-body-lg text-body-lg text-white/85 max-w-2xl leading-relaxed">{route.description}</p>
              <div className="flex gap-4 mt-6 flex-wrap">
                {route.bullets?.map((bullet) => (
                  <span key={bullet} className="px-3 py-1 bg-white/10 border border-white/20 text-white font-label-caps text-[9px] tracking-wider">
                    {bullet}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* page-showcase class must exist for test suite */}
      <section className="page-showcase max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-20">
        
        {/* Scenario 1: Parent Directory Page (e.g. general /uslugi or /portfolio) */}
        {visibleSections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
            <div className="md:col-span-4 sticky top-32">
              <span className="font-label-caps text-label-caps text-secondary mb-4 block">Раздел</span>
              <h2 className="font-headline-md text-headline-md text-primary mb-6">
                Направления и категории
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Пожалуйста, выберите интересующую категорию ниже. Каждая страница содержит детальные технические спецификации, перечень работ и сметные расчёты.
              </p>
            </div>

            <div className="md:col-span-8 mt-12 md:mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {visibleSections.map((item) => (
                  <Link 
                    className="border border-outline-variant bg-background group p-8 flex flex-col justify-between min-h-[260px] hover:border-secondary hover:shadow-sm transition-all duration-300" 
                    href={item.href} 
                    key={item.href}
                  >
                    <div>
                      <span className="font-label-caps text-[10px] text-secondary mb-2 block">{item.eyebrow}</span>
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary group-hover:underline mb-4">{item.label}</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 leading-relaxed mb-6">{item.description}</p>
                    </div>
                    <span className="font-label-caps text-[9px] text-primary tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                      ПОДРОБНЕЕ <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Scenario 2: Nested Subroute Leaf Page (e.g. /uslugi/remont-kvartir or /portfolio/kvartiry) */
          <div>
            {isServiceSubroute && (
              <div className="space-y-20">
                {/* Scope of Work Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
                  <div className="md:col-span-4 sticky top-32">
                    <h2 className="font-headline-md text-headline-md text-primary mb-6">
                      Объем и этапы работ
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Мы организуем весь цикл работ по стандарту STUDIO AURA: от детальных инженерных обследований до финальной сдачи ключей и расстановки декора.
                    </p>
                  </div>
                  <div className="md:col-span-8 space-y-8">
                    <div className="border border-outline-variant p-10 bg-surface-container-low">
                      <h3 className="font-label-caps text-label-caps text-primary mb-6 tracking-wider">СПЕЦИФИКАЦИЯ РАБОТ</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                        {route.bullets?.map((bullet, idx) => (
                          <div key={bullet} className="font-body-md text-body-md text-primary flex items-start">
                            <span className="font-label-caps text-secondary mr-4 text-xs font-bold">0{idx + 1}.</span>
                            <span>{bullet}</span>
                          </div>
                        ))}
                        <div className="font-body-md text-body-md text-primary flex items-start">
                          <span className="font-label-caps text-secondary mr-4 text-xs font-bold">05.</span>
                          <span>Контроль сметы и сроков</span>
                        </div>
                        <div className="font-body-md text-body-md text-primary flex items-start">
                          <span className="font-label-caps text-secondary mr-4 text-xs font-bold">06.</span>
                          <span>Гарантийное сопровождение</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="border border-outline-variant p-8 bg-background">
                        <h4 className="font-label-caps text-label-caps text-secondary mb-3">СТОИМОСТЬ РАБОТ</h4>
                        <p className="font-headline-md text-headline-md text-primary leading-none mb-2">от €750 / м²</p>
                        <p className="font-body-md text-body-md text-on-surface-variant">Включает полный комплекс черновых и чистовых материалов европейского качества.</p>
                      </div>
                      <div className="border border-outline-variant p-8 bg-background">
                        <h4 className="font-label-caps text-label-caps text-secondary mb-3">СРОКИ РЕАЛИЗАЦИИ</h4>
                        <p className="font-headline-md text-headline-md text-primary leading-none mb-2">от 3 месяцев</p>
                        <p className="font-body-md text-body-md text-on-surface-variant">Фиксированные сроки прописаны в договоре с жесткими штрафами за просрочку.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Request Form */}
                <div className="border border-outline-variant bg-surface-container-low p-10 md:p-16 text-center max-w-3xl mx-auto">
                  {submitted ? (
                    <div className="space-y-6 py-8">
                      <span className="material-symbols-outlined text-secondary text-5xl">check_circle</span>
                      <h3 className="font-headline-md text-headline-md text-primary">Заявка успешно отправлена</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
                        Наш главный инженер свяжется с вами в течение часа для согласования удобного времени визита на объект.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-8 text-left">
                      <div className="text-center mb-8">
                        <h3 className="font-headline-md text-headline-md text-primary mb-4">Рассчитать стоимость объекта</h3>
                        <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
                          Заполните форму ниже, и мы подготовим предварительное сметное предложение.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="font-label-caps text-[10px] text-secondary tracking-widest block mb-2">ВАШЕ ИМЯ</label>
                          <input 
                            required
                            type="text" 
                            value={formData.name} 
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-background border border-outline-variant px-4 py-3 font-body-md text-primary focus:outline-none focus:border-primary" 
                            placeholder="Константин"
                          />
                        </div>
                        <div>
                          <label className="font-label-caps text-[10px] text-secondary tracking-widest block mb-2">ТЕЛЕФОН</label>
                          <input 
                            required
                            type="tel" 
                            value={formData.phone} 
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-background border border-outline-variant px-4 py-3 font-body-md text-primary focus:outline-none focus:border-primary" 
                            placeholder="+7 (999) 000-00-00"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="font-label-caps text-[10px] text-secondary tracking-widest block mb-2">ОРИЕНТИРОВОЧНАЯ ПЛОЩАДЬ (М²)</label>
                        <input 
                          required
                          type="number" 
                          value={formData.area} 
                          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                          className="w-full bg-background border border-outline-variant px-4 py-3 font-body-md text-primary focus:outline-none focus:border-primary" 
                          placeholder="150"
                        />
                      </div>
                      <div>
                        <label className="font-label-caps text-[10px] text-secondary tracking-widest block mb-2">ОСОБЫЕ ПОЖЕЛАНИЯ</label>
                        <textarea 
                          value={formData.notes} 
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full bg-background border border-outline-variant px-4 py-3 font-body-md text-primary focus:outline-none focus:border-primary h-24" 
                          placeholder="Например, перепланировка, объединение комнат, звукоизоляция..."
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="w-full py-4 bg-primary text-on-primary font-button text-button uppercase tracking-widest hover:opacity-95 transition-opacity"
                      >
                        Запросить предварительную смету
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {isPortfolioSubroute && (
              <div className="space-y-20">
                {/* Filtered Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                  {portfolioProjects
                    .filter((project) => project.category === categorySlug)
                    .map((project, index) => {
                      // Alternate grid layouts to create an asymmetrical gallery effect
                      let gridClass = "col-span-12 md:col-span-7";
                      if (index % 2 === 1) gridClass = "col-span-12 md:col-span-4 md:mt-24";
                      if (index % 3 === 2) gridClass = "col-span-12 md:col-span-8 md:col-start-3 mt-12";
                      
                      return (
                        <div key={project.id} className={`${gridClass} group cursor-pointer overflow-hidden`}>
                          <div className="aspect-[4/3] md:aspect-[16/10] bg-surface-container mb-6 overflow-hidden border border-outline-variant/30">
                            <img 
                              alt={project.title} 
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-103 transition-all duration-1000 ease-in-out"
                              src={project.image}
                            />
                          </div>
                          <div className="flex justify-between items-baseline border-b border-outline-variant pb-4">
                            <div>
                              <h3 className="font-headline-sm text-headline-sm uppercase tracking-widest text-primary mb-1">{project.title}</h3>
                              <p className="font-body-md text-body-md text-on-surface-variant">{project.location} • {project.area}</p>
                            </div>
                            <span className="font-label-caps text-label-caps text-on-surface-variant">{project.year}</span>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Embed Before/After slider inside Apartments category */}
                {categorySlug === "kvartiry" && (
                  <div className="border-t border-outline-variant pt-20">
                    <div className="flex flex-col sm:flex-row justify-between items-baseline mb-8">
                      <h3 className="font-headline-md text-headline-md text-primary">
                        Трансформация пространства: Трайбека
                      </h3>
                      <span className="font-label-caps text-label-caps text-on-surface-variant tracking-wider mt-2 sm:mt-0">
                        ДВИГАЙТЕ ПОЛЗУНОК ДЛЯ СРАВНЕНИЯ (ДО / ПОСЛЕ)
                      </span>
                    </div>

                    <div
                      ref={containerRef}
                      onMouseMove={handleMouseMove}
                      onTouchMove={handleTouchMove}
                      onMouseDown={() => (isDragging.current = true)}
                      onMouseUp={() => (isDragging.current = false)}
                      onMouseLeave={() => (isDragging.current = false)}
                      className="relative w-full aspect-[16/9] cursor-ew-resize bg-surface-dim select-none border border-outline-variant overflow-hidden"
                    >
                      {/* Before Image */}
                      <img
                        className="absolute inset-0 w-full h-full object-cover grayscale brightness-[35%] pointer-events-none"
                        alt="До ремонта: бетонный каркас"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-yrY9S1jwfqv6avUJVF1wvoTgByPaEH__-yXt_cuqjFuHdzbTMeyLamb0hDQv_rykoPA4NYliNflLJzSNXAMFs552nLhKGMehsRZnoAYXRfCiPGimZvGw7Z7nKyQwA0RIB-XwKkfaYvsscNsISNZ03787wE_dODh5ae2cK7PyGL6UXfPof8kJF9SxvyvTeCGL0mWo90Au3YWt4uN4rjc72bhEbOViWb7COT_6h3rAqddlNXs2edYmeR4MBlAF2BoWSmn3yPeQr7U"
                      />
                      {/* After Image */}
                      <div
                        style={{ width: `${sliderPosition}%` }}
                        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                      >
                        <img
                          style={{ width: containerRef.current?.getBoundingClientRect().width ?? "100%" }}
                          className="absolute inset-0 max-w-none h-full object-cover pointer-events-none"
                          alt="После ремонта: готовый интерьер"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgqT6AWSHx4XSyHTvuZTroeEmcyX9tWlahtFH6sx0hCr2UhkCak9AncF-ilxNumkYYruwKIZVynuUrIh5AngSjONT6CO4_3SskXs2KOh4m3PIt24vl1bL4ToKMcA7npXRKL0NOooIbOGWaOSr858hpW0MUA3LxbdWpMx5PaYBNbJeb15ceV55UgMHrzreAQ7teU1nJ5k2AjG6u-ySvAghgp5Vev4RK5CbTtdlf2fchafB16eyboMEV7EPHxpp4KGXxwjiMawljs70"
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
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
