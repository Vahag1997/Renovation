"use client";

import { useState } from "react";
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
    label: "Дизайн квартир",
    title: "Дизайн интерьера квартир",
    description: "Создание уникальных пространств для городских апартаментов премиум-класса. Мы разрабатываем проекты, которые объединяют функциональность, безупречную эргономику и высокое искусство. Каждый элемент интерьера — от планировочного решения до текстиля — создается и подбирается с учетом стиля жизни владельца.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAA2F7ce4aBeLVBnXauMVP6fmKgatvsb_dN28dbRT78g6BMUg9s60nSKmzmvE431CQQaonVKyHycvhlz1-YukKRTuzv5IkpA1p5BOJbVQYc20ooNcDVGkp-AQNX5Xwcp2Q2Jkhq8FysxAxNl1hlFxMSFit8qJ7wAaMn13Hdkw_voNnWYAkoSJEOuw4mmaACQHIlD1Znqqm6PSa-JwTR0ttFLP4hWkuntHe7vHucSG5msTOLra0wuioGZmmrb4g3b_qI45gyBQIjhl4",
    link: "/uslugi/remont-kvartir"
  },
  {
    id: "houses",
    label: "Дизайн домов",
    title: "Архитектурный дизайн резиденций",
    description: "Проектирование частных домов, загородных вилл и коттеджей. Мы создаем архитектурные концепции, гармонично вписанные в окружающий ландшафт. Комплексный подход включает в себя разработку фасадных решений, планов остекления, генерального плана участка и дизайн-проектов всех внутренних помещений.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqplEB02zapq9gVXMkZd_wXQkBh-v8RfIzkcCNYTnjTVAD-Huf9mN_-hKDpdynU_A0Zp54R2v4qpzhgh1X4-dO4HwEOFuxFMECweP6S-GGzaduF0V0kopHohqykuwLOPccW1RIDdfJ0rJfCLnYlYEy-tfuhR8oZ7tGlTGpJgru0CQLJ5THtbMZ98wjkXtoDZxWv7g9PxcznpMYiUKv4_Px3brl6BPOGqjVSl7Nhi4FGqlMHtWK0Tz-0JMWSvc3IHz3IcYZjdDsHUI",
    link: "/uslugi/remont-domov"
  },
  {
    id: "furniture",
    label: "Подбор мебели",
    title: "Комплектация и декорирование",
    description: "Эксклюзивный подбор мебели, сантехники, освещения и отделочных материалов от ведущих европейских и мировых фабрик. Мы работаем напрямую с производителями, обеспечивая лучшие условия поставок, логистику, проверку качества и полное соответствие предметов общей художественной концепции проекта.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3PLFXe659f5udN-A0YVCtbgXjsGTgvImTYQk5nZySxTK1HyteEdMAiz13AdDtVsirYooatuKIGir5ZL_Ik1M9og7piyYDuVFr2wMxP9sIztCBJYIkdLw7TTV0NlBLeMMU3-x5ji3D2NVhegs95jKgZvrN-NQsHTaBVjwJqT5TH-8001pJrBs3SP76mosX5XyDnB_mvAxobJEGwva1ZL0MdfXo6UudsHPueovQrP2m9LHJYQBSTNqZqbcSsQGFfVqKdPio4wnp7CE",
    link: "/uslugi/dizayn-proekty"
  },
  {
    id: "management",
    label: "Управление проектом",
    title: "Управление строительным процессом",
    description: "Полный контроль и координация всех процессов реализации на объекте. Мы связываем воедино работу проектировщиков, поставщиков, подрядчиков и строительных бригад. Обеспечиваем движение проекта без хаоса, срывов сроков и непредвиденного роста сметы, освобождая вас от строительной рутины.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXg_eyMN76Havk-_5L0J8oNAXCX5v53YEPtnAm3sWPBFBckuaOArssbNASJmMNvlcoqtnOUHCFf9EEdXLCMMZbQ-jBMAEzu-hMmsg8hUNOa8pH0IIf3-SmQAmkrC-PJn1apBzZq_bmcUdYMxjd3_Z5f5fyoIhLO72spbBe39xVXIdyG56rOU7AxqR6-E2aCTOxe1ZzhvJCBEq8Mb23iiaWhPI-S-djjIF2dA7_u1Z-xslbEDBzj4NU6A-Ld-4Z32o71M9a12srOH0",
    link: "/uslugi/remont-kommercheskih-pomescheniy"
  },
  {
    id: "supervision",
    label: "Авторский надзор",
    title: "Авторский и технический надзор",
    description: "Регулярные выезды автора проекта на объект для контроля точного соответствия выполняемых строительно-монтажных работ утвержденным чертежам и спецификациям. Мы оперативно вносим необходимые корректировки, консультируем строителей и решаем сложные технические вопросы в процессе реализации.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvSxJGM209LGVLwKI6YA3nq77vgz0fA4Ro5qmrS4--YC_5Q2wVwAd2jgiLlGlpOHvaVELQY_H7WFKMzSBM9vVUxpUqOcrOalQRmnbY2ZcjUaIjdoZ5Y2lVAFRmJM4ZdjQwAl03y3-dHI4UcttlPsb2swZMueWCRFtHvH6iUNv9uk56lRi9_PgZGRtu3agmNSPFeBZ2tiXlSQsH4MhyDf614od5jNXu5J8oDABCKT79EzAjPD479DSfit2ekH3BIFZHeYUgj9G_ekA",
    link: "/uslugi/landshaftnyy-dizayn"
  }
];

interface ValueBadge {
  icon: React.ReactNode;
  text: string;
}

export function ServicesShowcase() {
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
        <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      text: "Более 12 лет опыта и премиальный поэтапный подход к реализации"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      text: "Полный цикл работ от эскизных планов до финального декорирования"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      text: "Регулярный доступ на строящиеся объекты и контроль качества"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      text: "Прямые контракты с фабриками и прецизионный авторский отбор"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      text: "Безупречное соблюдение сроков, зафиксированных в договоре"
    }
  ];

  return (
    <section className="py-section-gap px-margin-mobile lg:px-margin-desktop bg-background border-t border-outline-variant/30 overflow-hidden font-sans">
      <div className="max-w-screen-xl mx-auto">
        
        {/* Title */}
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-secondary block">
            Направления работы
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-none tracking-tight text-primary">
            Наши услуги
          </h2>
        </div>

        {/* Brand values / Badges row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 border-b border-outline-variant/30 pb-16 mb-16">
          {values.map((val, idx) => (
            <div key={idx} className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left group">
              <div className="w-12 h-12 rounded-full bg-secondary/5 flex items-center justify-center group-hover:bg-secondary/10 transition-colors duration-500">
                {val.icon}
              </div>
              <p className="font-sans text-[11px] leading-relaxed text-on-surface-variant font-medium tracking-wide max-w-[200px]">
                {val.text}
              </p>
            </div>
          ))}
        </div>

        {/* Custom Tab Navigation Bar */}
        <div className="flex overflow-x-auto scrollbar-hide border border-outline-variant/40 bg-surface-container-low p-1.5 gap-1.5 select-none mb-12">
          {TABS_DATA.map((tab, idx) => {
            const isActive = activeTabIdx === idx;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(idx)}
                className={`flex-1 min-w-[150px] text-center py-4 px-3 font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 border focus:outline-none cursor-pointer ${
                  isActive
                    ? "bg-secondary text-on-secondary border-secondary shadow-sm"
                    : "bg-transparent text-on-surface-variant/80 border-transparent hover:text-primary hover:border-outline-variant/30"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-gutter items-center transition-all duration-300 ${
          isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}>
          {/* Left Column: Description & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-sans text-[10px] tracking-widest text-secondary font-bold uppercase block">
              Услуга • 0{activeTabIdx + 1}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-primary leading-tight">
              {activeTab.title}
            </h3>
            <div className="w-12 h-[2px] bg-secondary" />
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {activeTab.description}
            </p>
            <div className="pt-4">
              <Link
                href={activeTab.link}
                className="group inline-flex items-center gap-4 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-primary border-b border-primary pb-2 hover:text-secondary hover:border-secondary transition-all duration-300"
              >
                Подробнее об услуге
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden border border-outline-variant/40 shadow-md group">
              <img
                src={activeTab.image}
                alt={activeTab.title}
                className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-103 transition-all duration-[1200ms] ease-out"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
