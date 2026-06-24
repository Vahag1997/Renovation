import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/app/_components/Reveal";
import { getAllProjects } from "@/app/_data/portfolio";
import { getProjectHref } from "@/app/_data/projects";

export const metadata: Metadata = {
  title: "Портфолио",
  description:
    "Реализованные проекты Studio Aura: квартиры, дома, коммерческие пространства и ландшафт. Архитектурный нарратив и тихая роскошь.",
  alternates: { canonical: "/portfolio" },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Portfolio() {
  const projects = await getAllProjects();

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

      {/* Portfolio Grid (Asymmetrical Masonry) — driven by the database */}
      <Reveal
        as="section"
        className="px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto mb-section-gap"
      >
        {projects.length === 0 ? (
          <p className="max-w-[1200px] mx-auto font-body-lg text-body-lg text-on-surface-variant">
            Проекты скоро появятся.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 gap-x-gutter">
            {projects.map((project, index) => {
              const wide = index % 2 === 0;
              return (
                <Link
                  key={project.id}
                  href={getProjectHref(project)}
                  className={`group cursor-pointer overflow-hidden block col-span-12 ${
                    wide ? "md:col-span-7" : "md:col-span-5 md:mt-20"
                  }`}
                >
                  <div
                    className={`relative ${
                      wide ? "aspect-[4/5]" : "aspect-[3/4]"
                    } bg-surface-container mb-6 overflow-hidden`}
                  >
                    <Image
                      alt={project.title}
                      className="object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[1200ms] ease-out"
                      src={project.image}
                      fill
                      sizes="(max-width: 768px) 100vw, 58vw"
                      priority={index === 0}
                    />
                  </div>
                  <div className="flex justify-between items-baseline border-b border-outline-variant pb-4">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm uppercase tracking-widest text-primary">
                        {project.title}
                      </h3>
                      {project.location ? (
                        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                          {project.location}
                          {project.area ? ` · ${project.area}` : ""}
                        </p>
                      ) : null}
                    </div>
                    <span className="font-label-caps text-label-caps text-on-surface-variant whitespace-nowrap pl-4">
                      {project.year}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
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
