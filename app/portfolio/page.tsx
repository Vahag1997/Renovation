import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/app/_components/Reveal";

export const metadata: Metadata = {
  title: "Портфолио",
  description:
    "Реализованные проекты Studio Aura: квартиры, дома, коммерческие пространства и ландшафт. Архитектурный нарратив и тихая роскошь.",
  alternates: { canonical: "/portfolio" },
};

export default function Portfolio() {
  return (
    <main className="overflow-x-hidden pt-12">
      {/* Hero Section */}
      <Reveal as="section" className="px-margin-mobile md:px-margin-desktop pt-24 mb-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-gutter">
          <div className="col-span-12 md:col-span-8">
            <span className="font-label-caps text-label-caps text-secondary mb-4 block">
              Наши Проекты
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-8 leading-tight">
              Архитектурный Нарратив <br />и Тихая Роскошь.
            </h1>
          </div>
        </div>
      </Reveal>

      {/* Portfolio Grid (Asymmetrical Masonry) */}
      <Reveal
        as="section"
        className="px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto mb-section-gap"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 gap-x-gutter">
          {/* Project 1 - Main Monolith Case */}
          <div className="col-span-12 md:col-span-7 group cursor-pointer overflow-hidden">
            <Link href="/portfolio/kvartiry/monolith" className="block">
              <div className="relative aspect-[4/5] bg-surface-container mb-6 overflow-hidden">
                <Image
                  alt="Элегантная гостиная The Monolith Residence в Нью-Йорке"
                  className="object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[1200ms] ease-out"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA2F7ce4aBeLVBnXauMVP6fmKgatvsb_dN28dbRT78g6BMUg9s60nSKmzmvE431CQQaonVKyHycvhlz1-YukKRTuzv5IkpA1p5BOJbVQYc20ooNcDVGkp-AQNX5Xwcp2Q2Jkhq8FysxAxNl1hlFxMSFit8qJ7wAaMn13Hdkw_voNnWYAkoSJEOuw4mmaACQHIlD1Znqqm6PSa-JwTR0ttFLP4hWkuntHe7vHucSG5msTOLra0wuioGZmmrb4g3b_qI45gyBQIjhl4"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  priority
                />
              </div>
              <div className="flex justify-between items-baseline border-b border-outline-variant pb-4">
                <h3 className="font-headline-sm text-headline-sm uppercase tracking-widest text-primary">
                  The Monolith Residence / Нью-Йорк
                </h3>
                <span className="font-label-caps text-label-caps text-on-surface-variant">2023</span>
              </div>
            </Link>
          </div>

          {/* Spacer Column for Asymmetry */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Project 2 */}
          <Link
            href="/portfolio/kvartiry/loft-tribeca"
            className="col-span-12 md:col-span-4 mt-0 md:mt-32 group cursor-pointer overflow-hidden block"
          >
            <div className="relative aspect-[3/4] bg-surface-container mb-6 overflow-hidden">
              <Image
                alt="Минималистичный дизайн спальни"
                className="object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[1200ms] ease-out"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmapc2y84hjCDauUuvGPx9BIY7TH2xRuwh06o8tzMxU4_4LcpQxA1QYLk-VunwptVz7ffpJUckpmrheUutFr8J7sggqRyK49DnJdY40v4lXXlezjhDXWg8setqFP0Fow0c70__33MlB8PQYub2-jgIQrNDVejsZW6tPSte8wunMdXGxMBswjvIKgv5vBgeT_hCPFmjAG0YpYIF_REImg3DqyoEo5FJlAlKdZ89kgOcjXxCGNmnhSRdDsC-txoB1yxPnQoPzkqpZto"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex justify-between items-baseline border-b border-outline-variant pb-4">
              <h3 className="font-headline-sm text-headline-sm uppercase tracking-widest text-primary">
                Tribeca Loft / Нью-Йорк
              </h3>
              <span className="font-label-caps text-label-caps text-on-surface-variant">2022</span>
            </div>
          </Link>

          {/* Project 3 */}
          <Link
            href="/portfolio/doma/montauk-residence"
            className="col-span-12 md:col-span-5 md:col-start-2 group cursor-pointer overflow-hidden block"
          >
            <div className="relative aspect-[16/9] bg-surface-container mb-6 overflow-hidden">
              <Image
                alt="Кухонная зона из белого мрамора"
                className="object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[1200ms] ease-out"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEeWMEY79PjjagjRJj5F5Z4vqTaaNc1FUx8KxbYoR2VrOW3xSCCAMLjNoQpRJFhPQpVonZGmLGs4qxlIeXQ2Tza_R9gCtJHgKC9NUNiqpP90d6SIMYSxW5qb-BNKQXJZmzq0IPqnPcilH_ozfTAnHwkNTH7giCPs8Psv0QU5TDsXPyolEq3rXkydARa3S31cigWV1ZIAKCLeiBi07UvXOuXHPi1e7EWIqcxejiljOa_HJazTBCfN9pR73hx50uuBETlYRu3QH7NMA"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>
            <div className="flex justify-between items-baseline border-b border-outline-variant pb-4">
              <h3 className="font-headline-sm text-headline-sm uppercase tracking-widest text-primary">
                Montauk House / Лонг-Айленд
              </h3>
              <span className="font-label-caps text-label-caps text-on-surface-variant">2023</span>
            </div>
          </Link>

          {/* Project 4 */}
          <Link
            href="/portfolio/doma/lake-como"
            className="col-span-12 md:col-span-6 group cursor-pointer overflow-hidden mt-0 md:-mt-48 block"
          >
            <div className="relative aspect-[4/5] bg-surface-container mb-6 overflow-hidden">
              <Image
                alt="Обеденная зона на вилле"
                className="object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[1200ms] ease-out"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqplEB02zapq9gVXMkZd_wXQkBh-v8RfIzkcCNYTnjTVAD-Huf9mN_-hKDpdynU_A0Zp54R2v4qpzhgh1X4-dO4HwEOFuxFMECweP6S-GGzaduF0V0kopHohqykuwLOPccW1RIDdfJ0rJfCLnYlYEy-tfuhR8oZ7tGlTGpJgru0CQLJ5THtbMZ98wjkXtoDZxWv7g9PxcznpMYiUKv4_Px3brl6BPOGqjVSl7Nhi4FGqlMHtWK0Tz-0JMWSvc3IHz3IcYZjdDsHUI"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex justify-between items-baseline border-b border-outline-variant pb-4">
              <h3 className="font-headline-sm text-headline-sm uppercase tracking-widest text-primary">
                Lake Como Villa / Италия
              </h3>
              <span className="font-label-caps text-label-caps text-on-surface-variant">2024</span>
            </div>
          </Link>
        </div>
      </Reveal>

      {/* Process Section */}
      <Reveal as="section" className="bg-surface-container-low py-section-gap px-margin-mobile md:px-margin-desktop border-y border-outline-variant">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-20 md:flex justify-between items-end border-b border-outline-variant pb-12">
            <div className="max-w-2xl">
              <span className="font-label-caps text-label-caps text-secondary mb-4 block">
                НАШ МЕТОД
              </span>
              <h2 className="font-display-lg text-display-lg max-md:text-display-lg-mobile mb-6 text-primary">
                Дисциплина творческого процесса.
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Шестиэтапная методология гарантирует безупречную реализацию проекта,
                от первой эскизной идеи до финальной расстановки предметов искусства.
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <Link href="/uslugi" className="font-label-caps text-label-caps text-primary hover:underline block pb-2">
                СМОТРЕТЬ ВСЕ УСЛУГИ
              </Link>
            </div>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-gutter">
            {/* Step 01 */}
            <div className="relative flex flex-col group">
              <div className="font-display-lg text-[96px] leading-none text-surface-dim opacity-30 group-hover:text-secondary-container transition-colors duration-500 font-bold mb-4">
                01
              </div>
              <h3 className="font-headline-md text-headline-md mb-4 border-l-2 border-primary pl-6 text-primary">
                Консультация
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant pl-6 leading-relaxed">
                Первое погружение в ваш образ жизни, эстетические требования и раскрытие потенциала
                пространства.
              </p>
            </div>
            {/* Step 02 */}
            <div className="relative flex flex-col group">
              <div className="font-display-lg text-[96px] leading-none text-surface-dim opacity-30 group-hover:text-secondary-container transition-colors duration-500 font-bold mb-4">
                02
              </div>
              <h3 className="font-headline-md text-headline-md mb-4 border-l-2 border-primary pl-6 text-primary">
                Концепт
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant pl-6 leading-relaxed">
                Создание цельного визуального стиля через подбор текстурных мудбордов и планировку.
              </p>
            </div>
            {/* Step 03 */}
            <div className="relative flex flex-col group">
              <div className="font-display-lg text-[96px] leading-none text-surface-dim opacity-30 group-hover:text-secondary-container transition-colors duration-500 font-bold mb-4">
                03
              </div>
              <h3 className="font-headline-md text-headline-md mb-4 border-l-2 border-primary pl-6 text-primary">
                Проектирование
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant pl-6 leading-relaxed">
                Детальная рабочая документация и реалистичные 3D-рендеры для исключения ошибок.
              </p>
            </div>
            {/* Step 04 */}
            <div className="relative flex flex-col group">
              <div className="font-display-lg text-[96px] leading-none text-surface-dim opacity-30 group-hover:text-secondary-container transition-colors duration-500 font-bold mb-4">
                04
              </div>
              <h3 className="font-headline-md text-headline-md mb-4 border-l-2 border-primary pl-6 text-primary">
                Комплектация
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant pl-6 leading-relaxed">
                Поставка эксклюзивных материалов, сантехники и уникальной мебели от ремесленных производств.
              </p>
            </div>
            {/* Step 05 */}
            <div className="relative flex flex-col group">
              <div className="font-display-lg text-[96px] leading-none text-surface-dim opacity-30 group-hover:text-secondary-container transition-colors duration-500 font-bold mb-4">
                05
              </div>
              <h3 className="font-headline-md text-headline-md mb-4 border-l-2 border-primary pl-6 text-primary">
                Строительство
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant pl-6 leading-relaxed">
                Координация строительных работ на объекте с жестким надзором технического контроля.
              </p>
            </div>
            {/* Step 06 */}
            <div className="relative flex flex-col group">
              <div className="font-display-lg text-[96px] leading-none text-surface-dim opacity-30 group-hover:text-secondary-container transition-colors duration-500 font-bold mb-4">
                06
              </div>
              <h3 className="font-headline-md text-headline-md mb-4 border-l-2 border-primary pl-6 text-primary">
                Декорирование
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant pl-6 leading-relaxed">
                Финальное декорирование интерьера: подбор арт-объектов, текстиля и деталей для завершения атмосферы.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* CTA Section */}
      <Reveal as="section" className="px-margin-mobile md:px-margin-desktop py-section-gap flex flex-col items-center text-center max-w-[1200px] mx-auto">
        <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary max-w-4xl mb-12">
          Создадим Вашу Атмосферу Вместе.
        </h2>
        <div className="flex flex-col sm:flex-row gap-8 w-full sm:w-auto">
          <Link
            href="/kontakty"
            className="bg-primary text-on-primary font-label-caps text-label-caps px-12 py-5 hover:opacity-85 transition-opacity text-center block uppercase tracking-widest"
          >
            Обсудить Проект
          </Link>
          <Link
            href="/aura-journal"
            className="border border-primary text-primary font-label-caps text-label-caps px-12 py-5 hover:bg-primary hover:text-on-primary transition-all duration-300 text-center block uppercase tracking-widest"
          >
            Наш Журнал
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
