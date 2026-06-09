"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Services() {
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
            Наши Направления
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg max-w-3xl leading-none">
            Продуманная среда. <br />
            Прецизионное качество.
          </h1>
          <div className="w-24 h-px bg-primary mt-12 mb-8"></div>
          <p className="font-body-lg text-body-lg max-w-xl text-on-surface-variant leading-relaxed">
            От масштабных перепланировок до тончайшего подбора отделки и текстиля. Мы
            создаем пространства, которые становятся тихой гаванью современной эстетики.
          </p>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap">
        {/* Renovation Tiers Header */}
        <div className="mb-12">
          <h2 className="font-label-caps text-label-caps tracking-widest text-on-surface">
            Тарифы на ремонтные работы
          </h2>
          <div className="w-full h-px bg-outline-variant mt-4"></div>
        </div>

        {/* 3-Column Renovation Grid */}
        <section
          ref={addToRefs}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-outline-variant divide-y md:divide-y-0 md:divide-x divide-outline-variant"
        >
          {/* Standard Tier */}
          <div className="p-10 flex flex-col h-full bg-background group">
            <div className="mb-12">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-2">
                ТАРИФ I
              </h3>
              <h4 className="font-headline-sm text-headline-sm mb-4 text-primary">Стандарт</h4>
              <div className="flex items-baseline gap-1">
                <span className="font-headline-md text-headline-md gold-accent">€750</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">
                  / м²
                </span>
              </div>
            </div>
            <ul className="space-y-6 flex-grow">
              <li className="font-body-md text-body-md gold-dash">Базовая штукатурка и окраска</li>
              <li className="font-body-md text-body-md gold-dash">
                Премиальная инженерная доска (дуб)
              </li>
              <li className="font-body-md text-body-md gold-dash">
                Комплексная замена базовой электрики
              </li>
              <li className="font-body-md text-body-md gold-dash">Установка дверей скрытого монтажа</li>
              <li className="font-body-md text-body-md gold-dash">Базовый сценарий освещения</li>
            </ul>
            <Link
              href="/kontakty"
              className="mt-16 w-full py-4 text-center border border-primary font-label-caps text-label-caps hover:bg-primary hover:text-on-primary transition-all duration-300 block"
            >
              Запросить смету
            </Link>
          </div>

          {/* Business Tier */}
          <div className="p-10 flex flex-col h-full bg-surface-container-low relative">
            <div className="absolute top-0 right-0 p-4">
              <span className="font-label-caps text-[10px] bg-primary text-on-primary px-3 py-1 tracking-wider">
                ПОПУЛЯРНЫЙ ВЫБОР
              </span>
            </div>
            <div className="mb-12">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-2">
                ТАРИФ II
              </h3>
              <h4 className="font-headline-sm text-headline-sm mb-4 text-primary">Бизнес</h4>
              <div className="flex items-baseline gap-1">
                <span className="font-headline-md text-headline-md gold-accent">€1,200</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">
                  / м²
                </span>
              </div>
            </div>
            <ul className="space-y-6 flex-grow">
              <li className="font-body-md text-body-md gold-dash">Все работы пакета «Стандарт»</li>
              <li className="font-body-md text-body-md gold-dash">
                Встроенная корпусная мебель на заказ
              </li>
              <li className="font-body-md text-body-md gold-dash">Интеграция систем Умного Дома</li>
              <li className="font-body-md text-body-md gold-dash">Художественная штукатурка стен</li>
              <li className="font-body-md text-body-md gold-dash">Сантехника ведущих брендов</li>
              <li className="font-body-md text-body-md gold-dash">
                Оптимизация приточно-вытяжной вентиляции
              </li>
            </ul>
            <Link
              href="/kontakty"
              className="mt-16 w-full py-4 text-center bg-primary text-on-primary font-label-caps text-label-caps hover:opacity-85 transition-opacity block"
            >
              Выбрать Бизнес
            </Link>
          </div>

          {/* Exclusive Tier */}
          <div className="p-10 flex flex-col h-full bg-background">
            <div className="mb-12">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-2">
                ТАРИФ III
              </h3>
              <h4 className="font-headline-sm text-headline-sm mb-4 text-primary">Эксклюзив</h4>
              <div className="flex items-baseline gap-1">
                <span className="font-headline-md text-headline-md gold-accent">€1,850</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">
                  / м²
                </span>
              </div>
            </div>
            <ul className="space-y-6 flex-grow">
              <li className="font-body-md text-body-md gold-dash">Полная перепланировка объемов</li>
              <li className="font-body-md text-body-md gold-dash">
                Облицовка натуральным камнем и мрамором
              </li>
              <li className="font-body-md text-body-md gold-dash">
                Дизайнерское многоуровневое освещение
              </li>
              <li className="font-body-md text-body-md gold-dash">
                Акустическое проектирование и звукоизоляция
              </li>
              <li className="font-body-md text-body-md gold-dash">
                Управление проектом (авторский надзор 24/7)
              </li>
              <li className="font-body-md text-body-md gold-dash">Bespoke ремесленные финиши</li>
            </ul>
            <Link
              href="/uslugi/remont-kvartir"
              className="mt-16 w-full py-4 text-center border border-primary font-label-caps text-label-caps hover:bg-primary hover:text-on-primary transition-all duration-300 block"
            >
              Подробнее о тарифе
            </Link>
          </div>
        </section>

        {/* Decorative Philosophy Section */}
        <section
          ref={addToRefs}
          className="mt-section-gap grid grid-cols-1 md:grid-cols-12 gap-gutter items-center"
        >
          <div className="md:col-span-7">
            <img
              alt="Минималистичный дизайн каминной зоны в светлых тонах"
              className="w-full h-[500px] md:h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP9gqGZBlsdHkjnQYSYqlvM0uNpymH7uu9hDhU-vu681VcUkeDShuhZyEr5dQ1m4rCTl_0PZwF09H8FZ3GuzYhzLjaxbzBgeJ2hZdI48Q_ItsBVnO9jw2aRWwKKFfddYU_FruV_6cqPzxgCMxnIgYSZWC69ikmrdjyupDbIXGX_DCIxods2dfLf3lUJFvxB7KEAlYili2WfeW3qkShohvHiASAiscXrZog7CfZo1z-mWByFwjSdZIJ3sWf-00L8uybrhsM6wytw6E"
            />
          </div>
          <div className="md:col-span-5 md:pl-12">
            <span className="font-label-caps text-label-caps text-on-surface-variant block mb-4">
              Философия
            </span>
            <h2 className="font-headline-md text-headline-md mb-8 text-primary">
              Атмосфера, которая находит отклик вне визуального восприятия.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Мы верим, что роскошь рождается из сдержанности. Наш творческий процесс
              начинается с раскрытия сути самой архитектуры: мы отсекаем все лишнее,
              обнажая природную красоту конструкций и чистоту материалов.
            </p>
          </div>
        </section>

        {/* Design Services Header */}
        <div ref={addToRefs} className="mt-section-gap mb-12">
          <h2 className="font-label-caps text-label-caps tracking-widest text-on-surface">
            Проектирование и Планирование
          </h2>
          <div className="w-full h-px bg-outline-variant mt-4"></div>
        </div>

        {/* 2-Column Design Section */}
        <section
          ref={addToRefs}
          className="grid grid-cols-1 md:grid-cols-2 border border-outline-variant divide-y md:divide-y-0 md:divide-x divide-outline-variant"
        >
          {/* Interior Design */}
          <div className="p-12 flex flex-col justify-between group bg-background">
            <div>
              <div className="mb-10 overflow-hidden bg-surface-container">
                <img
                  alt="Процесс проектирования и подбор материалов"
                  className="w-full h-80 object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-transform duration-1000"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXg_eyMN76Havk-_5L0J8oNAXCX5v53YEPtnAm3sWPBFBckuaOArssbNASJmMNvlcoqtnOUHCFf9EEdXLCMMZbQ-jBMAEzu-hMmsg8hUNOa8pH0IIf3-SmQAmkrC-PJn1apBzZq_bmcUdYMxjd3_Z5f5fyoIhLO72spbBe39xVXIdyG56rOU7AxqR6-E2aCTOxe1ZzhvJCBEq8Mb23iiaWhPI-S-djjIF2dA7_u1Z-xslbEDBzj4NU6A-Ld-4Z32o71M9a12srOH0"
                />
              </div>
              <h3 className="font-headline-sm text-headline-sm mb-6 text-primary">
                Дизайн Интерьера
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-12 leading-relaxed">
                Создание полной визуальной и функциональной концепции: мудборды, чертежи,
                реалистичные 3D-визуализации и спецификации мебели, света и отделочных
                материалов.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-outline-variant pt-8">
              <span className="font-label-caps text-label-caps text-on-surface-variant">
                СТОИМОСТЬ ОТ
              </span>
              <span className="font-display-lg text-headline-md md:text-display-lg gold-accent leading-none">
                €85
                <small className="text-sm font-label-caps opacity-60 ml-1">/м²</small>
              </span>
            </div>
          </div>

          {/* Architectural Planning */}
          <div className="p-12 flex flex-col justify-between group bg-background">
            <div>
              <div className="mb-10 overflow-hidden bg-surface-container">
                <img
                  alt="Строительные чертежи и планирование"
                  className="w-full h-80 object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-transform duration-1000"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZy_m50VgWwIlrY70pFptqZ3O1VfaGFbDCvnFn2LugRf5ZvPetz7moQmTIDbEXHZCSo2xyefXzhIxKQOCMSSHb-wNYUmiG5GkeK8dbnVbRF8FpVQcoLN0sCYW0RAO1Xnkm64Ob5Q6VOhWGtfIi46xWEitbdZFVaCyuosIAIHbjQrCxf4TEaGjah5p_yS7uZs3xKbLskKQYWCLJYt__q1UsFMo5zACHAHEsSHeNatYLImR2QDFkZ2sBQCwtrQCszBk3eQY0CwdFTos"
                />
              </div>
              <h3 className="font-headline-sm text-headline-sm mb-6 text-primary">
                Архитектурное Проектирование
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-12 leading-relaxed">
                Инженерный анализ перепланировок, подготовка разделов АР/КР, разработка
                конструкторской документации. Мы берем на себя всю техническую сложность
                ради эстетической чистоты.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-outline-variant pt-8">
              <span className="font-label-caps text-label-caps text-on-surface-variant">
                СТОИМОСТЬ ОТ
              </span>
              <span className="font-display-lg text-headline-md md:text-display-lg gold-accent leading-none">
                €110
                <small className="text-sm font-label-caps opacity-60 ml-1">/м²</small>
              </span>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          ref={addToRefs}
          className="mt-section-gap py-16 md:py-24 bg-surface-container flex flex-col items-center text-center px-6 border border-outline-variant"
        >
          <h2 className="font-headline-md text-display-lg-mobile md:text-headline-md mb-8 text-primary">
            Обсудите Ваше Видение
          </h2>
          <p className="font-body-lg text-body-lg max-w-2xl mb-12 text-on-surface-variant leading-relaxed">
            Каждый проект — это уникальное сотворчество. Мы предлагаем бесплатную первичную
            консультацию, чтобы обсудить масштабы и эстетические возможности вашего пространства.
          </p>
          <Link
            href="/kontakty"
            className="px-16 py-5 bg-primary text-on-primary font-label-caps text-label-caps tracking-widest hover:opacity-90 transition-opacity block"
          >
            Записаться На Консультацию
          </Link>
        </section>
      </main>
    </main>
  );
}
