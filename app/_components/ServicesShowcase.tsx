"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface TabItem {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

const TABS_DATA: TabItem[] = [
  {
    id: "apartments",
    label: "Ремонт квартир",
    title: "Ремонт квартир под ключ",
    description: "Организуем полный цикл ремонта квартиры: обследование, инженерные сети, черновые и чистовые работы, комплектацию и финальную приемку. Все этапы ведет одна команда с единым контролем качества, бюджета и сроков.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAA2F7ce4aBeLVBnXauMVP6fmKgatvsb_dN28dbRT78g6BMUg9s60nSKmzmvE431CQQaonVKyHycvhlz1-YukKRTuzv5IkpA1p5BOJbVQYc20ooNcDVGkp-AQNX5Xwcp2Q2Jkhq8FysxAxNl1hlFxMSFit8qJ7wAaMn13Hdkw_voNnWYAkoSJEOuw4mmaACQHIlD1Znqqm6PSa-JwTR0ttFLP4hWkuntHe7vHucSG5msTOLra0wuioGZmmrb4g3b_qI45gyBQIjhl4",
    link: "/uslugi/remont-kvartir"
  },
  {
    id: "houses",
    label: "Ремонт домов",
    title: "Ремонт частных домов",
    description: "Работаем с загородными домами и резиденциями комплексно: от инженерной подготовки и фасадов до интерьеров, террас и оснащения. Учитываем архитектуру здания и особенности эксплуатации каждого помещения.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqplEB02zapq9gVXMkZd_wXQkBh-v8RfIzkcCNYTnjTVAD-Huf9mN_-hKDpdynU_A0Zp54R2v4qpzhgh1X4-dO4HwEOFuxFMECweP6S-GGzaduF0V0kopHohqykuwLOPccW1RIDdfJ0rJfCLnYlYEy-tfuhR8oZ7tGlTGpJgru0CQLJ5THtbMZ98wjkXtoDZxWv7g9PxcznpMYiUKv4_Px3brl6BPOGqjVSl7Nhi4FGqlMHtWK0Tz-0JMWSvc3IHz3IcYZjdDsHUI",
    link: "/uslugi/remont-domov"
  },
  {
    id: "design",
    label: "Дизайн-проекты",
    title: "Дизайн-проекты интерьеров",
    description: "Разрабатываем функциональную и визуальную концепцию пространства: планировочные решения, реалистичные визуализации, рабочие чертежи и спецификации. Проект становится точной основой для реализации без случайных решений на стройке.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3PLFXe659f5udN-A0YVCtbgXjsGTgvImTYQk5nZySxTK1HyteEdMAiz13AdDtVsirYooatuKIGir5ZL_Ik1M9og7piyYDuVFr2wMxP9sIztCBJYIkdLw7TTV0NlBLeMMU3-x5ji3D2NVhegs95jKgZvrN-NQsHTaBVjwJqT5TH-8001pJrBs3SP76mosX5XyDnB_mvAxobJEGwva1ZL0MdfXo6UudsHPueovQrP2m9LHJYQBSTNqZqbcSsQGFfVqKdPio4wnp7CE",
    link: "/uslugi/dizayn-proekty"
  },
  {
    id: "commercial",
    label: "Коммерческие помещения",
    title: "Ремонт коммерческих помещений",
    description: "Проектируем и реализуем офисы, салоны, шоурумы и пространства ритейла с учетом бизнес-процессов, потока посетителей и графика запуска. Координируем подрядчиков и инженерные работы до готовности объекта к эксплуатации.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXg_eyMN76Havk-_5L0J8oNAXCX5v53YEPtnAm3sWPBFBckuaOArssbNASJmMNvlcoqtnOUHCFf9EEdXLCMMZbQ-jBMAEzu-hMmsg8hUNOa8pH0IIf3-SmQAmkrC-PJn1apBzZq_bmcUdYMxjd3_Z5f5fyoIhLO72spbBe39xVXIdyG56rOU7AxqR6-E2aCTOxe1ZzhvJCBEq8Mb23iiaWhPI-S-djjIF2dA7_u1Z-xslbEDBzj4NU6A-Ld-4Z32o71M9a12srOH0",
    link: "/uslugi/remont-kommercheskih-pomescheniy"
  },
  {
    id: "landscape",
    label: "Ландшафтный дизайн",
    title: "Ландшафтный дизайн участка",
    description: "Создаем цельную среду вокруг дома: план участка, сценарии движения, озеленение, освещение, террасы и малые архитектурные формы. Проектируем пространство с учетом сезона, климата и дальнейшего ухода.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvSxJGM209LGVLwKI6YA3nq77vgz0fA4Ro5qmrS4--YC_5Q2wVwAd2jgiLlGlpOHvaVELQY_H7WFKMzSBM9vVUxpUqOcrOalQRmnbY2ZcjUaIjdoZ5Y2lVAFRmJM4ZdjQwAl03y3-dHI4UcttlPsb2swZMueWCRFtHvH6iUNv9uk56lRi9_PgZGRtu3agmNSPFeBZ2tiXlSQsH4MhyDf614od5jNXu5J8oDABCKT79EzAjPD479DSfit2ekH3BIFZHeYUgj9G_ekA",
    link: "/uslugi/landshaftnyy-dizayn"
  },
];

interface ValueBadge {
  icon: React.ReactNode;
  text: string;
}

interface ServicesShowcaseProps {
  showValues?: boolean;
}

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V"];

export function ServicesShowcase({ showValues = true }: ServicesShowcaseProps) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const activeTab = TABS_DATA[activeTabIdx];

  const handleTabChange = (idx: number) => {
    if (idx === activeTabIdx) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTabIdx(idx);
      setIsAnimating(false);
    }, 250);
  };

  const values: ValueBadge[] = [
    {
      icon: (
        <svg className="w-5 h-5 text-[#6b5849]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      text: "Более 12 лет опыта и премиальный поэтапный подход"
    },
    {
      icon: (
        <svg className="w-5 h-5 text-[#6b5849]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      text: "Полный цикл от планирования до декорирования"
    },
    {
      icon: (
        <svg className="w-5 h-5 text-[#6b5849]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      text: "Посещение строящихся объектов и жесткий контроль"
    },
    {
      icon: (
        <svg className="w-5 h-5 text-[#6b5849]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      text: "Прямые контракты с фабриками и прецизионный отбор"
    },
    {
      icon: (
        <svg className="w-5 h-5 text-[#6b5849]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      text: "Соблюдение сроков, зафиксированных в договоре"
    }
  ];

  return (
    <section className="py-24 md:py-32 px-margin-mobile lg:px-margin-desktop bg-background border-t border-outline-variant/30 overflow-hidden font-sans">
      <div className="max-w-screen-xl mx-auto">
        
        {/* Title */}
        <div className="max-w-3xl mb-16 md:mb-24 space-y-3">
          <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#6b5849] block">
            Направления работы
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-none tracking-tight text-primary">
            Наши услуги
          </h2>
        </div>

        {/* Interactive Layout: Sticky List Left & Visual Panel Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-gutter items-start">
          
          {/* Left Column: Vertical Catalog Selector */}
          <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-36">
            {TABS_DATA.map((tab, idx) => {
              const isActive = activeTabIdx === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(idx)}
                  className="w-full text-left py-5 border-b border-outline-variant/30 flex items-baseline gap-6 group transition-all duration-300 relative focus:outline-none cursor-pointer"
                >
                  <span className={`font-serif text-xl sm:text-2xl transition-all duration-500 ${
                    isActive ? "text-[#c5a880] font-bold scale-110" : "text-neutral-300 group-hover:text-primary"
                  }`}>
                    0{idx + 1}
                  </span>
                  <div className="flex-grow">
                    <span className={`font-sans text-xs sm:text-sm tracking-widest uppercase font-semibold transition-all duration-300 ${
                      isActive ? "text-[#6b5849] pl-2 font-bold" : "text-neutral-500 group-hover:text-primary"
                    }`}>
                      {tab.label}
                    </span>
                  </div>
                  <svg 
                    className={`w-4 h-4 transition-all duration-300 ${
                      isActive 
                        ? "text-[#c5a880] opacity-100 translate-x-0" 
                        : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth={2} 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              );
            })}
          </div>

          {/* Right Column: Visual Frame with Glassmorphic Overlay Panel */}
          <div className="lg:col-span-8 relative h-[520px] sm:h-[540px] lg:h-auto lg:aspect-[16/9.5] overflow-hidden border border-outline-variant/40 shadow-xl group">
            {/* Active Image */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={activeTab.image}
                alt={activeTab.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className={`object-cover transition-all duration-[1200ms] ${
                  isAnimating ? "scale-105 opacity-50 blur-[2px]" : "scale-100 opacity-100 blur-0"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />
            </div>

            {/* Floating Dark Glassmorphic Details Card */}
            <div className={`absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8 md:right-8 bg-[#121110]/92 backdrop-blur-md border border-white/10 p-6 md:p-8 text-white z-20 transition-all duration-500 flex flex-col justify-between min-h-[220px] ${
              isAnimating ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
            }`}>
              <div className="space-y-3">
                <span className="font-sans text-[9px] tracking-widest text-[#c5a880] font-bold uppercase block">
                  Направление работы
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-light tracking-wide text-white leading-tight">
                  {activeTab.title}
                </h4>
                <div className="w-8 h-[1px] bg-[#c5a880]/50" />
                <p className="font-body-sm text-body-sm text-white/70 leading-relaxed max-w-xl">
                  {activeTab.description}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 flex justify-between items-center">
                <Link
                  href={activeTab.link}
                  className="group/btn inline-flex items-center gap-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a880] hover:text-white transition-colors duration-300"
                >
                  Подробнее о направлении
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <span className="font-serif text-[11px] italic text-white/40">
                  0{activeTabIdx + 1} / {TABS_DATA.length.toString().padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Brand values / Badges strip */}
        {showValues && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 border-t border-b border-outline-variant/30 py-10 mt-24 gap-8">
          {values.map((val, idx) => (
            <div key={idx} className="flex gap-4 items-start group">
              <div className="w-8 h-8 rounded-full bg-[#6b5849]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#6b5849]/10 transition-colors duration-500">
                {val.icon}
              </div>
              <div className="space-y-1">
                <span className="font-sans text-[10px] tracking-[0.2em] text-[#c5a880] font-bold uppercase block">
                  Преимущество {ROMAN_NUMERALS[idx]}
                </span>
                <p className="font-sans text-[11px] leading-relaxed text-on-surface-variant font-medium tracking-wide">
                  {val.text}
                </p>
              </div>
            </div>
          ))}
        </div>}

      </div>
    </section>
  );
}
