import Image from "next/image";
import Link from "next/link";

import { BeforeAfterSlider } from "@/app/_components/BeforeAfterSlider";
import { ProjectGallery } from "@/app/_components/ProjectGallery";
import type { Project } from "@/app/_data/projects";
import { getProjectHref } from "@/app/_data/projects";
import { getRelatedProjects } from "@/app/_data/portfolio";

type ProjectDetailPageProps = {
  project: Project;
};

export async function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const relatedProjects = await getRelatedProjects(project);

  return (
    <main className="overflow-x-clip bg-background text-on-background">
      <section className="project-detail-hero relative min-h-[72svh] lg:min-h-[82vh] flex items-end overflow-hidden border-b border-outline-variant">
        <Image
          className="absolute inset-0 object-cover grayscale-[12%]"
          src={project.image}
          alt=""
          fill
          sizes="100vw"
          priority
        />
        <video
          className="project-hero-video absolute inset-0 h-full w-full object-cover grayscale-[12%]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={project.image}
        >
          <source src={project.heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15" />

        <div className="project-hero-content relative z-10 w-full px-margin-mobile lg:px-margin-desktop pb-12 lg:pb-20">
          <div className="max-w-container-max-width mx-auto">
            <div className="mb-8 flex flex-wrap items-center gap-2 font-label-caps text-[10px] tracking-widest text-white/75">
              <Link className="hover:text-white" href="/">
                Главная
              </Link>
              <span>/</span>
              <Link className="hover:text-white" href="/portfolio">
                Портфолио
              </Link>
              <span>/</span>
              <Link className="hover:text-white" href={`/portfolio/${project.category}`}>
                {project.categoryLabel}
              </Link>
              <span>/</span>
              <span className="text-white">{project.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-end">
              <div className="lg:col-span-8">
                <p className="font-label-caps text-label-caps text-secondary mb-5 tracking-[0.25em]">
                  {project.categoryLabel} / {project.year}
                </p>
                <h1 className="font-display-lg-mobile md:text-display-lg md:font-display-lg text-white leading-tight max-w-5xl">
                  {project.title}
                </h1>
              </div>
              <div className="lg:col-span-4">
                <p className="font-body-lg text-body-lg text-white/85 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 border border-white/25 bg-black/20 backdrop-blur-sm">
              {project.details.map((detail) => (
                <div className="border-r border-white/15 last:border-r-0 p-5" key={detail.label}>
                  <span className="font-label-caps text-[9px] tracking-widest text-white/55 block mb-2">
                    {detail.label}
                  </span>
                  <strong className="font-sans text-sm md:text-base font-medium text-white">
                    {detail.value}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-margin-mobile lg:px-margin-desktop py-section-gap">
        <div className="max-w-container-max-width mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-4">
            <span className="font-label-caps text-label-caps text-secondary block mb-4">
              Задачи проекта
            </span>
            <h2 className="font-headline-md text-headline-md text-primary max-w-sm">
              Что нужно было решить внутри объекта
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-outline-variant">
              {project.tasks.map((task, index) => (
                <div className="border-b border-outline-variant py-8 sm:pr-8" key={task}>
                  <span className="font-label-caps text-[10px] text-secondary tracking-widest block mb-4">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-body-lg text-body-lg text-primary leading-relaxed">{task}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-margin-mobile lg:px-margin-desktop pb-section-gap">
        <BeforeAfterSlider
          afterAlt={`${project.title}: после`}
          afterImage={project.afterImage ?? project.gallery[0]}
          beforeAlt={`${project.title}: до`}
          beforeImage={project.beforeImage ?? project.gallery[1] ?? project.gallery[0]}
          contentClassName="max-w-container-max-width mx-auto"
          title={project.title}
        />
      </section>

      <ProjectGallery images={project.gallery} title={project.title} />

      <section className="bg-surface-container-low border-y border-outline-variant px-margin-mobile lg:px-margin-desktop py-section-gap">
        <div className="max-w-container-max-width mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-36">
            <span className="font-label-caps text-label-caps text-secondary block mb-4">
              Планировочное решение
            </span>
            <h2 className="font-headline-md text-headline-md text-primary mb-6">
              Логика пространства до деталей
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Блок повторяет структуру реального кейса: сначала показываем итоговый образ, затем объясняем планировку,
              сценарии и материалы, чтобы посетитель понимал не только картинку, но и решение.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {project.planningImages.map((image, index) => (
                <div className="relative aspect-[4/3] overflow-hidden border border-outline-variant bg-background" key={image}>
                  <Image
                    className="object-cover grayscale-[18%]"
                    src={image}
                    alt={`${project.title}: планировочный кадр ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>

            <article className="space-y-10">
              {project.storySections.map((section) => (
                <div className="grid grid-cols-1 md:grid-cols-8 gap-gutter border-t border-outline-variant pt-8" key={section.title}>
                  <h3 className="md:col-span-3 font-headline-sm text-headline-sm text-primary">
                    {section.title}
                  </h3>
                  <p className="md:col-span-5 font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    {section.body}
                  </p>
                </div>
              ))}
            </article>
          </div>
        </div>
      </section>

      <section className="more-projects px-margin-mobile lg:px-margin-desktop py-section-gap">
        <div className="max-w-container-max-width mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="font-label-caps text-label-caps text-secondary block mb-4">
                Ещё проекты
              </span>
              <h2 className="font-headline-md text-headline-md text-primary">
                Похожие работы Studio Aura
              </h2>
            </div>
            <Link
              className="font-label-caps text-label-caps text-primary border border-primary px-7 py-4 hover:bg-primary hover:text-on-primary transition-all text-center"
              href="/portfolio"
            >
              Все проекты
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {relatedProjects.map((related) => (
              <Link className="group block" href={getProjectHref(related)} key={related.id}>
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-container border border-outline-variant/40 mb-5">
                  <Image
                    className="object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[900ms]"
                    src={related.image}
                    alt={related.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-outline-variant pb-4">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm uppercase tracking-widest text-primary group-hover:text-secondary">
                      {related.title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                      {related.location} / {related.area}
                    </p>
                  </div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant">
                    {related.year}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-margin-mobile lg:px-margin-desktop pb-section-gap">
        <div className="max-w-container-max-width mx-auto border border-outline-variant bg-primary text-on-primary p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-8">
            <span className="font-label-caps text-label-caps text-secondary block mb-4">
              Обсудить объект
            </span>
            <h2 className="font-headline-md text-headline-md max-w-3xl">
              Соберём похожую структуру проекта под вашу квартиру, дом или коммерческое пространство.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              className="inline-block bg-background text-primary px-8 py-5 font-label-caps text-label-caps hover:bg-secondary hover:text-on-secondary transition-colors"
              href="/kontakty"
            >
              Связаться
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
