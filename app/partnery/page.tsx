"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const partnersList = [
  {
    name: "CARRARA STONE GUILD",
    title: "Гильдия каррарского мрамора",
    tag: "НАТУРАЛЬНЫЙ КАМЕНЬ",
    desc: "Поставка редких сортов итальянского мрамора напрямую из карьеров Тосканы. Каждый слэб отбирается вручную нашими архитекторами для облицовки стен, кухонных островов и изготовления скульптурных деталей интерьера.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "VITRA COLLECTIONS",
    title: "Мебельная коллекция Vitra",
    tag: "ДИЗАЙНЕРСКАЯ МЕБЕЛЬ",
    desc: "Эксклюзивные поставки культовой дизайнерской мебели и предметов интерьера. Сочетание эргономичности, проверенной временем классики и современных форм обеспечивает безупречный баланс в жилых зонах.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "NORDIC LUMEN WORKS",
    title: "Архитектурный свет Nordic Lumen",
    tag: "ОСВЕЩЕНИЕ",
    desc: "Светотехническое оборудование премиум-класса из Скандинавии. Разработка и поставка систем скрытого профильного освещения и дизайнерских светильников для создания сценариев «теплых» и «интимных» световых объемов.",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "TEXTURA WEAVERS",
    title: "Ткацкие мастерские Textura",
    tag: "ПРЕМИАЛЬНЫЙ ТЕКСТИЛЬ",
    desc: "Индивидуальный пошив штор, обивки и интерьерного текстиля из натурального льна, шелка и кашемира. Особое внимание к переплетению нитей и тактильным свойствам материалов для завершения целостности пространства.",
    image:
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Partners() {
  const revealElements = useRef<HTMLElement[]>([]);

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

  return (
    <main className="overflow-x-hidden pt-12">
      {/* Hero Header */}
      <header ref={addToRefs} className="pt-24 pb-16 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-[1200px] mx-auto">
          <span className="font-label-caps text-label-caps text-secondary mb-6 block">
            Качество и Материалы
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg max-w-3xl leading-none">
            Наши Партнеры и Поставщики
          </h1>
          <div className="w-24 h-px bg-primary mt-12 mb-8"></div>
          <p className="font-body-lg text-body-lg max-w-xl text-on-surface-variant leading-relaxed">
            Мы работаем исключительно с авторитетными мировыми брендами и локальными гильдиями
            ремесленников, разделяющими наши ценности долговечности, честности материалов и
            эстетической безупречности.
          </p>
        </div>
      </header>

      {/* Partners List Grid */}
      <section
        ref={addToRefs}
        className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-16 border-t border-outline-variant pt-16">
          {partnersList.map((partner, index) => (
            <div key={partner.name} className="flex flex-col group">
              <div className="aspect-[16/10] overflow-hidden bg-surface-container mb-6 border border-outline-variant">
                <img
                  alt={partner.title}
                  className="w-full h-full object-cover grayscale group-hover:scale-103 group-hover:grayscale-0 transition-all duration-[1200ms]"
                  src={partner.image}
                />
              </div>
              <div className="flex justify-between items-baseline mb-3">
                <span className="font-label-caps text-[11px] text-secondary tracking-widest">
                  {partner.tag}
                </span>
                <span className="font-label-caps text-[10px] text-on-surface-variant/60">
                  ПАРТНЕР № 0{index + 1}
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-3">
                {partner.name}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {partner.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={addToRefs}
        className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop mb-24 text-center"
      >
        <div className="bg-surface-container py-16 px-6 border border-outline-variant">
          <h2 className="font-headline-md text-headline-md text-primary mb-6">
            Желаете стать нашим партнером?
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mb-10 leading-relaxed">
            Мы открыты к сотрудничеству с производителями эксклюзивных материалов, мебели,
            авторских светильников и ремесленниками. Свяжитесь с нами для проведения аудита
            качества.
          </p>
          <Link
            href="/kontakty"
            className="inline-block bg-primary text-on-primary font-label-caps text-label-caps px-12 py-5 uppercase tracking-widest hover:opacity-85 transition-opacity"
          >
            Связаться с нами
          </Link>
        </div>
      </section>
    </main>
  );
}
