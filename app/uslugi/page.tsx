import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/app/_components/Reveal";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Ремонт под ключ, дизайн-проекты и архитектурное проектирование интерьеров премиум-класса. Полный цикл — от планировки до реализации.",
  alternates: { canonical: "/uslugi" },
};

export default function Services() {
  return (
    <main className="overflow-x-hidden pt-12">
      {/* Hero Header */}
      <Reveal as="header" className="pt-24 pb-16 px-margin-mobile md:px-margin-desktop">
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
      </Reveal>

      {/* Main Content Grid */}
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap">
        {/* Decorative Philosophy Section */}
        <Reveal
          as="section"
          className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center"
        >
          <div className="md:col-span-7 relative w-full h-[500px] md:h-[600px]">
            <Image
              alt="Минималистичный дизайн каминной зоны в светлых тонах"
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP9gqGZBlsdHkjnQYSYqlvM0uNpymH7uu9hDhU-vu681VcUkeDShuhZyEr5dQ1m4rCTl_0PZwF09H8FZ3GuzYhzLjaxbzBgeJ2hZdI48Q_ItsBVnO9jw2aRWwKKFfddYU_FruV_6cqPzxgCMxnIgYSZWC69ikmrdjyupDbIXGX_DCIxods2dfLf3lUJFvxB7KEAlYili2WfeW3qkShohvHiASAiscXrZog7CfZo1z-mWByFwjSdZIJ3sWf-00L8uybrhsM6wytw6E"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
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
        </Reveal>

        {/* Design Services Header */}
        <div className="mt-section-gap mb-12">
          <h2 className="font-label-caps text-label-caps tracking-widest text-on-surface">
            Проектирование и Планирование
          </h2>
          <div className="w-full h-px bg-outline-variant mt-4"></div>
        </div>

        {/* 2-Column Design Section */}
        <Reveal
          as="section"
          className="grid grid-cols-1 md:grid-cols-2 border border-outline-variant divide-y md:divide-y-0 md:divide-x divide-outline-variant"
        >
          {/* Interior Design */}
          <div className="p-12 flex flex-col justify-between group bg-background">
            <div>
              <div className="relative h-80 mb-10 overflow-hidden bg-surface-container">
                <Image
                  alt="Процесс проектирования и подбор материалов"
                  className="object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-transform duration-1000"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXg_eyMN76Havk-_5L0J8oNAXCX5v53YEPtnAm3sWPBFBckuaOArssbNASJmMNvlcoqtnOUHCFf9EEdXLCMMZbQ-jBMAEzu-hMmsg8hUNOa8pH0IIf3-SmQAmkrC-PJn1apBzZq_bmcUdYMxjd3_Z5f5fyoIhLO72spbBe39xVXIdyG56rOU7AxqR6-E2aCTOxe1ZzhvJCBEq8Mb23iiaWhPI-S-djjIF2dA7_u1Z-xslbEDBzj4NU6A-Ld-4Z32o71M9a12srOH0"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
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
              <div className="relative h-80 mb-10 overflow-hidden bg-surface-container">
                <Image
                  alt="Строительные чертежи и планирование"
                  className="object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-transform duration-1000"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZy_m50VgWwIlrY70pFptqZ3O1VfaGFbDCvnFn2LugRf5ZvPetz7moQmTIDbEXHZCSo2xyefXzhIxKQOCMSSHb-wNYUmiG5GkeK8dbnVbRF8FpVQcoLN0sCYW0RAO1Xnkm64Ob5Q6VOhWGtfIi46xWEitbdZFVaCyuosIAIHbjQrCxf4TEaGjah5p_yS7uZs3xKbLskKQYWCLJYt__q1UsFMo5zACHAHEsSHeNatYLImR2QDFkZ2sBQCwtrQCszBk3eQY0CwdFTos"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
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
        </Reveal>

        {/* Final CTA */}
        <Reveal
          as="section"
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
        </Reveal>
      </div>
    </main>
  );
}
