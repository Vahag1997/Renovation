import Image from "next/image";
import Link from "next/link";
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

import { getProjectHref } from "@/app/_data/projects";
import { getProjectsByCategory } from "@/app/_data/portfolio";
import { BeforeAfterSlider } from "@/app/_components/BeforeAfterSlider";
import { Calculator } from "@/app/_components/Calculator";
import { Workflow } from "@/app/_components/Workflow";

export async function RoutePlaceholder({ href }: RoutePlaceholderProps) {
  const route = getRouteByHref(href) ?? homeRoute;
  const parent = getParentRoute(href);
  const children = getChildRoutes(href);
  const visibleSections = href === "/" ? siteRoutes : children;

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
  const categoryProjects = isPortfolioSubroute
    ? await getProjectsByCategory(categorySlug)
    : [];

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
                <Calculator isDark={true} isCompact={true} />
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

      {visibleSections.length > 0 ? (
        /* Scenario 1: Parent Directory Page (e.g. general /uslugi or /portfolio) */
        <section className="page-showcase max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-20">
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
        </section>
      ) : (
        /* Scenario 2: Nested Subroute Leaf Page (e.g. /uslugi/remont-kvartir or /portfolio/kvartiry) */
        <>
          {isServiceSubroute && (
            <>
              <section className="page-showcase max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-20 pb-0">
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
              </section>
              <Workflow />
            </>
          )}

          {isPortfolioSubroute && (
            <section className="page-showcase max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-20">
              <div className="space-y-20">
                {/* Filtered Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                  {categoryProjects
                    .map((project, index) => {
                      // Alternate grid layouts to create an asymmetrical gallery effect
                      let gridClass = "col-span-12 md:col-span-7";
                      if (index % 2 === 1) gridClass = "col-span-12 md:col-span-4 md:mt-24";
                      if (index % 3 === 2) gridClass = "col-span-12 md:col-span-8 md:col-start-3 mt-12";
                      
                      return (
                        <Link
                          key={project.id}
                          className={`${gridClass} group cursor-pointer overflow-hidden block`}
                          href={getProjectHref(project)}
                        >
                          <div className="relative aspect-[4/3] md:aspect-[16/10] bg-surface-container mb-6 overflow-hidden border border-outline-variant/30">
                            <Image
                              alt={project.title}
                              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-103 transition-all duration-1000 ease-in-out"
                              src={project.image}
                              fill
                              sizes="(max-width: 768px) 100vw, 58vw"
                            />
                          </div>
                          <div className="flex justify-between items-baseline border-b border-outline-variant pb-4">
                            <div>
                              <h3 className="font-headline-sm text-headline-sm uppercase tracking-widest text-primary mb-1">{project.title}</h3>
                              <p className="font-body-md text-body-md text-on-surface-variant">{project.location} • {project.area}</p>
                            </div>
                            <span className="font-label-caps text-label-caps text-on-surface-variant">{project.year}</span>
                          </div>
                        </Link>
                      );
                    })}
                </div>

                {/* Embed Before/After slider inside Apartments category */}
                {categorySlug === "kvartiry" && (
                  <BeforeAfterSlider
                    afterImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBgqT6AWSHx4XSyHTvuZTroeEmcyX9tWlahtFH6sx0hCr2UhkCak9AncF-ilxNumkYYruwKIZVynuUrIh5AngSjONT6CO4_3SskXs2KOh4m3PIt24vl1bL4ToKMcA7npXRKL0NOooIbOGWaOSr858hpW0MUA3LxbdWpMx5PaYBNbJeb15ceV55UgMHrzreAQ7teU1nJ5k2AjG6u-ySvAghgp5Vev4RK5CbTtdlf2fchafB16eyboMEV7EPHxpp4KGXxwjiMawljs70"
                    beforeImage="https://lh3.googleusercontent.com/aida-public/AB6AXuD-yrY9S1jwfqv6avUJVF1wvoTgByPaEH__-yXt_cuqjFuHdzbTMeyLamb0hDQv_rykoPA4NYliNflLJzSNXAMFs552nLhKGMehsRZnoAYXRfCiPGimZvGw7Z7nKyQwA0RIB-XwKkfaYvsscNsISNZ03787wE_dODh5ae2cK7PyGL6UXfPof8kJF9SxvyvTeCGL0mWo90Au3YWt4uN4rjc72bhEbOViWb7COT_6h3rAqddlNXs2edYmeR4MBlAF2BoWSmn3yPeQr7U"
                    className="border-t border-outline-variant pt-20"
                    contentClassName=""
                    title="Трайбека"
                  />
                )}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}
