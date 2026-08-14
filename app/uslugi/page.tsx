import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Calculator } from "@/app/_components/Calculator";
import { Reveal } from "@/app/_components/Reveal";
import { ServicesCarousel3D } from "@/app/_components/ServicesCarousel3D";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Ремонт квартир, домов и коммерческих помещений, дизайн-проекты и ландшафтный дизайн. Полный цикл Studio Aura — от концепции до реализации.",
  alternates: { canonical: "/uslugi" },
};

export default function Services() {
  return (
    <main className="overflow-x-hidden">
      <header className="relative h-[72svh] min-h-[620px] max-h-[820px] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=88"
          alt="Современный интерьер, созданный Studio Aura"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 w-full max-w-screen-xl mx-auto px-margin-mobile lg:px-margin-desktop pb-16 md:pb-20 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter items-end">
            <div className="lg:col-span-8">
              <span className="font-label-caps text-label-caps text-[#eadbc5] block mb-6">
                Ремонт, дизайн и архитектура
              </span>
              <h1 className="font-display-lg-mobile md:font-display-lg md:text-display-lg leading-tight max-w-4xl">
                Услуги полного цикла
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="font-body-lg text-body-lg text-white/80 leading-relaxed mb-8">
                Проектируем, строим и комплектуем пространства одной командой —
                от первого эскиза до готового объекта.
              </p>
              <a
                href="#service-directions"
                className="inline-flex items-center gap-3 border-b border-white pb-2 font-label-caps text-label-caps"
              >
                Выбрать направление
                <span className="material-symbols-outlined text-[18px]">
                  south
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <ServicesCarousel3D />

      <Reveal
        as="section"
        className="py-20 md:py-section-gap px-margin-mobile lg:px-margin-desktop bg-background"
      >
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-gutter items-center">
          <div className="lg:col-span-7 relative aspect-[4/3] overflow-hidden bg-surface-container">
            <Image
              alt="Светлый интерьер с натуральными материалами"
              className="object-cover transition-transform duration-[1400ms] hover:scale-[1.025]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP9gqGZBlsdHkjnQYSYqlvM0uNpymH7uu9hDhU-vu681VcUkeDShuhZyEr5dQ1m4rCTl_0PZwF09H8FZ3GuzYhzLjaxbzBgeJ2hZdI48Q_ItsBVnO9jw2aRWwKKFfddYU_FruV_6cqPzxgCMxnIgYSZWC69ikmrdjyupDbIXGX_DCIxods2dfLf3lUJFvxB7KEAlYili2WfeW3qkShohvHiASAiscXrZog7CfZo1z-mWByFwjSdZIJ3sWf-00L8uybrhsM6wytw6E"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <span className="font-label-caps text-label-caps text-secondary block mb-5">
              Наш подход
            </span>
            <h2 className="font-headline-md text-[36px] md:text-[48px] leading-tight text-primary mb-8">
              Пространство начинается с точного решения
            </h2>
            <div className="w-16 h-px bg-primary mb-8" />
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-6">
              Материализуем философию осознанной роскоши, где форма следует за
              функцией, а красота кроется в лаконичности.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Мы создаем осязаемую основу для вашей жизни, сочетая природную
              фактуру материалов с ювелирной точностью строительного мастерства.
            </p>
          </div>
        </div>
      </Reveal>

      <section className="border-y border-outline-variant/40 bg-surface-container-low">
        <div className="max-w-screen-xl mx-auto px-margin-mobile lg:px-margin-desktop py-20 md:py-28">
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter mb-16 md:mb-24">
            <div className="lg:col-span-4">
              <span className="font-label-caps text-label-caps text-secondary block mb-5">
                Основа проекта
              </span>
            </div>
            <h2 className="lg:col-span-7 font-display-lg-mobile md:font-display-lg md:text-display-lg leading-tight text-primary">
              Проектирование и реализация без разрыва между идеей и стройкой
            </h2>
          </Reveal>

          <Reveal
            as="article"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter items-center border-t border-outline-variant py-12 md:py-16"
          >
            <div className="lg:col-span-5 order-2 lg:order-1">
              <span className="font-label-caps text-[10px] text-secondary block mb-4">
                I / Дизайн
              </span>
              <h3 className="font-headline-md text-[34px] md:text-[42px] leading-tight mb-6 text-primary">
                Дизайн интерьера
              </h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-8">
                Создаем полную визуальную и функциональную концепцию: планировки,
                мудборды, реалистичные 3D-визуализации, рабочие чертежи и
                спецификации мебели, света и отделочных материалов.
              </p>
              <div className="flex items-baseline gap-3">
                <span className="font-label-caps text-[10px] text-on-surface-variant">
                  Стоимость от
                </span>
                <strong className="font-serif text-3xl font-normal text-secondary">
                  €85 / м²
                </strong>
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2 relative aspect-[16/10] overflow-hidden bg-surface-container">
              <Image
                alt="Материалы и процесс разработки дизайн-проекта"
                className="object-cover transition-transform duration-[1200ms] hover:scale-[1.03]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXg_eyMN76Havk-_5L0J8oNAXCX5v53YEPtnAm3sWPBFBckuaOArssbNASJmMNvlcoqtnOUHCFf9EEdXLCMMZbQ-jBMAEzu-hMmsg8hUNOa8pH0IIf3-SmQAmkrC-PJn1apBzZq_bmcUdYMxjd3_Z5f5fyoIhLO72spbBe39xVXIdyG56rOU7AxqR6-E2aCTOxe1ZzhvJCBEq8Mb23iiaWhPI-S-djjIF2dA7_u1Z-xslbEDBzj4NU6A-Ld-4Z32o71M9a12srOH0"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>

          <Reveal
            as="article"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter items-center border-t border-outline-variant py-12 md:py-16"
          >
            <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden bg-surface-container">
              <Image
                alt="Архитектурные чертежи и техническое планирование"
                className="object-cover transition-transform duration-[1200ms] hover:scale-[1.03]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZy_m50VgWwIlrY70pFptqZ3O1VfaGFbDCvnFn2LugRf5ZvPetz7moQmTIDbEXHZCSo2xyefXzhIxKQOCMSSHb-wNYUmiG5GkeK8dbnVbRF8FpVQcoLN0sCYW0RAO1Xnkm64Ob5Q6VOhWGtfIi46xWEitbdZFVaCyuosIAIHbjQrCxf4TEaGjah5p_yS7uZs3xKbLskKQYWCLJYt__q1UsFMo5zACHAHEsSHeNatYLImR2QDFkZ2sBQCwtrQCszBk3eQY0CwdFTos"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <span className="font-label-caps text-[10px] text-secondary block mb-4">
                II / Архитектура
              </span>
              <h3 className="font-headline-md text-[34px] md:text-[42px] leading-tight mb-6 text-primary">
                Архитектурное проектирование
              </h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-8">
                Проводим инженерный анализ перепланировок, готовим разделы АР/КР и
                конструкторскую документацию. Технические решения подчинены
                архитектурной целостности и будущей эксплуатации объекта.
              </p>
              <div className="flex items-baseline gap-3">
                <span className="font-label-caps text-[10px] text-on-surface-variant">
                  Стоимость от
                </span>
                <strong className="font-serif text-3xl font-normal text-secondary">
                  €110 / м²
                </strong>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal
        as="section"
        className="bg-[#191815] text-white px-margin-mobile lg:px-margin-desktop py-20 md:py-28"
      >
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-gutter items-center">
          <div className="lg:col-span-5">
            <span className="font-label-caps text-label-caps text-[#c5a880] block mb-5">
              Обсудить объект
            </span>
            <h2 className="font-display-lg-mobile md:font-display-lg md:text-display-lg leading-tight mb-8">
              Начнем с задачи и масштаба
            </h2>
            <p className="font-body-lg text-body-lg text-white/65 leading-relaxed mb-10 max-w-lg">
              Выберите объект и оставьте номер телефона. Мы уточним вводные,
              предложим подходящий формат работы и подготовим предварительный
              ориентир по бюджету.
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-3 border-b border-white/70 pb-2 font-label-caps text-label-caps text-white/80 hover:text-white transition-colors"
            >
              Сначала посмотреть проекты
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </Link>
          </div>
          <div className="lg:col-span-7">
            <Calculator isDark />
          </div>
        </div>
      </Reveal>
    </main>
  );
}
