"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { portfolioProjects } from "@/app/_data/projects";

export default function Home() {
  const revealElements = useRef<HTMLElement[]>([]);

  const project1 = portfolioProjects.find((p) => p.id === "monolith") || portfolioProjects[0];
  const project2 = portfolioProjects.find((p) => p.id === "penthouse-ues") || portfolioProjects[1];
  const project3 = portfolioProjects.find((p) => p.id === "lake-como") || portfolioProjects[3];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
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

  return (
    <main className="overflow-x-hidden">
      {/* Full-Bleed Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-end md:items-center">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover grayscale-[20%] transition-transform duration-[3000ms] hover:scale-105"
            alt="Минималистичный дизайн элитного интерьера с панорамными окнами"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDu77dm4QaRE2JSdD1fypOekeiFQTujjii_BoYkr0YdDsbEA-ShgpTKjHYRSQJez6qionDxnQ-yZrUNTJhKhRp-BAIAAncCkx3S60P2_txWTgq0sQgszDuHBXb8OG_F8t0Ddam5qmc0ZN-RGi6GskeXkmWobaG_OFPMf_ck6qQtX-ahYEWOWLluOaVCUkwNnhMF6SswuFatE95oWrZiMHxH7bxRVraVk3lMvOoVmckr1zB3olNe0lo4_YiPFBunxdhlpxhbXRK1v5Q"
          />
          <div className="absolute inset-0 bg-black/15"></div>
        </div>
        <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop pb-20 md:pb-0">
          <div className="max-w-4xl">
            <p className="font-label-caps text-label-caps text-white mb-6 flex items-center gap-4 drop-shadow-sm">
              <span className="w-12 h-[1px] bg-white"></span>
              Создано в 2014 г. — Милан & Париж
            </p>
            <h1 className="font-display-lg-mobile md:text-display-lg md:font-display-lg text-white leading-tight mb-10 drop-shadow-md">
              Проектирование и <br />
              Высококлассный Ремонт
            </h1>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <Link
                href="/portfolio"
                className="px-10 py-5 bg-white text-primary font-button text-button uppercase tracking-widest hover:bg-secondary hover:text-white transition-all duration-300"
              >
                Смотреть Портфолио
              </Link>
              <p className="max-w-xs font-body-md text-body-md text-white/90 drop-shadow-sm leading-relaxed pt-2">
                Создаем интерьеры, балансирующие между современным минимализмом и
                историческим характером.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section
        ref={addToRefs}
        className="py-section-gap px-margin-mobile md:px-margin-desktop bg-background"
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
            <div className="md:col-span-4">
              <span className="font-label-caps text-label-caps text-secondary mb-4 block">
                Философия
              </span>
              <h2 className="font-headline-md text-headline-md text-primary leading-tight">
                Переосмысление Пространства
              </h2>
            </div>
            <div className="md:col-start-6 md:col-span-6">
              <div className="font-body-lg text-body-lg text-on-surface-variant space-y-8 leading-relaxed">
                <p>
                  В Studio Aura мы убеждены, что истинная роскошь заключается не в
                  избыточности деталей, а в осознанном избавлении от лишнего. К
                  каждому проекту мы подходим как к глубокому диалогу между
                  существующей архитектурой здания и личностью его владельца.
                </p>
                <p>
                  Наш творческий метод укоренен в архитектурной целостности. Мы
                  фокусируемся на естественном освещении, тактильных свойствах
                  благородных материалов и эмоциональном восприятии объема. Мы
                  превращаем квартиры в современные оазисы гармонии и спокойствия.
                </p>
                <div className="pt-8">
                  <Link
                    className="group inline-flex items-center gap-4 font-label-caps text-label-caps text-primary border-b border-primary pb-2 transition-colors duration-300"
                    href="/portfolio"
                  >
                    Подробнее о нашем подходе
                    <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-2 text-[18px]">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Bento Feature */}
      <section ref={addToRefs} className="pb-section-gap px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter h-auto md:h-[800px]">
          {/* Main Case Study Link */}
          <Link
            href={`${project1.link}/${project1.category}`}
            className="md:col-span-7 h-[500px] md:h-full relative overflow-hidden group block"
          >
            <img
              className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[1500ms] ease-out"
              alt={project1.title}
              src={project1.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-white z-10">
              <p className="font-sans text-[10px] leading-none tracking-widest font-semibold uppercase mb-2 text-white/70">Проект 01</p>
              <h3 className="font-serif text-2xl md:text-3xl italic mb-2">{project1.title}</h3>
              <p className="font-sans text-xs tracking-wider text-white/85">{project1.location} • {project1.area}</p>
            </div>
          </Link>

          {/* Right Bento Cards */}
          <div className="md:col-span-5 flex flex-col gap-gutter">
            {/* Project 2 */}
            <Link
              href={`${project2.link}/${project2.category}`}
              className="flex-1 relative overflow-hidden group block min-h-[280px]"
            >
              <img
                className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[1500ms] ease-out"
                alt={project2.title}
                src={project2.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white z-10">
                <p className="font-sans text-[10px] leading-none tracking-widest font-semibold uppercase mb-2 text-white/70">Проект 02</p>
                <h4 className="font-serif text-xl italic mb-1">{project2.title}</h4>
                <p className="font-sans text-[11px] tracking-wider text-white/85">{project2.location} • {project2.area}</p>
              </div>
            </Link>

            {/* Project 3 */}
            <Link
              href={`${project3.link}/${project3.category}`}
              className="flex-1 relative overflow-hidden group block min-h-[280px]"
            >
              <img
                className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[1500ms] ease-out"
                alt={project3.title}
                src={project3.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white z-10">
                <p className="font-sans text-[10px] leading-none tracking-widest font-semibold uppercase mb-2 text-white/70">Проект 03</p>
                <h4 className="font-serif text-xl italic mb-1">{project3.title}</h4>
                <p className="font-sans text-[11px] tracking-wider text-white/85">{project3.location} • {project3.area}</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Magazine Section */}
      <section
        ref={addToRefs}
        className="py-section-gap bg-surface-container-low px-margin-mobile md:px-margin-desktop"
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="font-label-caps text-label-caps text-on-surface-variant mb-4">
                Журнал
              </h2>
              <h3 className="font-display-lg-mobile md:text-headline-md md:font-headline-md text-primary">
                Издание Aura
              </h3>
            </div>
            <Link
              href="/aura-journal"
              className="hidden md:block font-label-caps text-label-caps border border-primary px-8 py-4 hover:bg-primary hover:text-on-primary transition-all duration-300"
            >
              Читать Все Статьи
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Article 1 */}
            <Link href="/aura-journal" className="group cursor-pointer block">
              <div className="aspect-[4/5] overflow-hidden mb-6 bg-surface-container">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Минималистичный интерьер в теплых лучах солнца"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZEORQ3a6l7m9L2y0Epu76SuEvsVt0RYFh3CtgM2u-B-P_ac5baChxxrBfaA0LIIrs29Sbl7XT27Th5L7h9vHV7FTEyi--uCR0_3Zhr0eiw7UMq7A3CprZa7pmsiqWXUcjuP9Fk6oAZsI77H7_pb7dZMb5NeuPH7MwlI1eB6MwyzVbHr7EPkqW3qOaXyvoebBbNFftnkvQTdCIDR9zuu7q7Xy3nh23Npo6qG946rqa9-9JGk5yhFnhKsU7iqv2ZuP-8Z1QU--__8E"
                />
              </div>
              <p className="font-label-caps text-label-caps text-secondary mb-2">Материалы</p>
              <h4 className="font-headline-sm text-headline-sm group-hover:underline text-primary transition-all">
                Поэзия необработанного бетона в интерьере
              </h4>
            </Link>

            {/* Article 2 */}
            <Link href="/aura-journal" className="group cursor-pointer block">
              <div className="aspect-[4/5] overflow-hidden mb-6 bg-surface-container">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Абстрактная лестница в интерьере"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvSxJGM209LGVLwKI6YA3nq77vgz0fA4Ro5qmrS4--YC_5Q2wVwAd2jgiLlGlpOHvaVELQY_H7WFKMzSBM9vVUxpUqOcrOalQRmnbY2ZcjUaIjdoZ5Y2lVAFRmJM4ZdjQwAl03y3-dHI4UcttlPsb2swZMueWCRFtHvH6iUNv9uk56lRi9_PgZGRtu3agmNSPFeBZ2tiXlSQsH4MhyDf614od5jNXu5J8oDABCKT79EzAjPD479DSfit2ekH3BIFZHeYUgj9G_ekA"
                />
              </div>
              <p className="font-label-caps text-label-caps text-secondary mb-2">Пространство</p>
              <h4 className="font-headline-sm text-headline-sm group-hover:underline text-primary transition-all">
                Управление светом в городских апартаментах
              </h4>
            </Link>

            {/* Article 3 */}
            <Link href="/aura-journal" className="group cursor-pointer block">
              <div className="aspect-[4/5] overflow-hidden mb-6 bg-surface-container">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Набор образцов натуральных материалов"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3PLFXe659f5udN-A0YVCtbgXjsGTgvImTYQk5nZySxTK1HyteEdMAiz13AdDtVsirYooatuKIGir5ZL_Ik1M9og7piyYDuVFr2wMxP9sIztCBJYIkdLw7TTV0NlBLeMMU3-x5ji3D2NVhegs95jKgZvrN-NQsHTaBVjwJqT5TH-8001pJrBs3SP76mosX5XyDnB_mvAxobJEGwva1ZL0MdfXo6UudsHPueovQrP2m9LHJYQBSTNqZqbcSsQGFfVqKdPio4wnp7CE"
                />
              </div>
              <p className="font-label-caps text-label-caps text-secondary mb-2">Процесс</p>
              <h4 className="font-headline-sm text-headline-sm group-hover:underline text-primary transition-all">
                Тактильный опыт: выбор материалов наощупь
              </h4>
            </Link>
          </div>

          {/* Mobile CTA */}
          <div className="mt-12 text-center md:hidden">
            <Link
              href="/aura-journal"
              className="inline-block font-label-caps text-label-caps border border-primary px-8 py-4 hover:bg-primary hover:text-on-primary transition-all duration-300 w-full"
            >
              Читать Все Статьи
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
