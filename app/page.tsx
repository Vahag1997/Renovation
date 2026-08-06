import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getAllProjects } from "@/app/_data/portfolio";
import { getProjectHref } from "@/app/_data/projects";
import { Calculator } from "@/app/_components/Calculator";
import { Reveal } from "@/app/_components/Reveal";
import { Workflow } from "@/app/_components/Workflow";
import { ServicesShowcase } from "@/app/_components/ServicesShowcase";
import { SkeletonProjectCard } from "@/app/_components/Skeleton";

export const metadata: Metadata = {
  description:
    "Studio Aura — премиальный ремонт и архитектурный дизайн интерьеров под ключ. Более 120 реализованных проектов в Ереване, Москве и Европе.",
  alternates: { canonical: "/" },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Only this part of the home page needs the database. Isolating it behind its
 * own Suspense boundary lets the hero and everything else paint immediately
 * instead of the whole page waiting on Supabase.
 *
 * Note: the boundary lives here rather than in a root `loading.tsx` on purpose —
 * a root-level loading file wraps every nested `error.tsx` in a Suspense, which
 * stops those boundaries from ever receiving an error (the visitor is left on a
 * skeleton forever). Keep page-level fallbacks page-level.
 */
async function ShowcaseGrid() {
  const showcaseProjects = (await getAllProjects()).slice(0, 6);

  return (
    <Reveal
      staggerMs={90}
      className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
    >
      {showcaseProjects.map((project) => (
        <Link
          key={project.id}
          href={getProjectHref(project)}
          className="relative aspect-[3/4] overflow-hidden group block bg-surface-container border border-outline-variant/30"
        >
          <Image
            className="object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1200ms] ease-out"
            alt={project.title}
            src={project.image}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end z-20 translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
            <p className="text-white font-sans text-sm md:text-base font-normal leading-relaxed mb-1.5">
              {project.description}
            </p>
            <span className="text-white/80 font-sans text-xs tracking-wider mb-6 block">
              {project.area}
            </span>
            <div className="flex items-center gap-2 text-[#eadbc5] font-sans text-xs tracking-[0.2em] font-black uppercase">
              <span>― подробнее</span>
            </div>
          </div>
        </Link>
      ))}
    </Reveal>
  );
}

function ShowcaseGridSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
    >
      <span className="sr-only">Загружаем проекты</span>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonProjectCard key={i} delayMs={i * 110} />
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* Full-Bleed Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-end md:items-center">
        <div className="absolute inset-0 z-0">
          <Image
            className="object-cover grayscale-[20%] transition-transform duration-[3000ms] hover:scale-105"
            alt="Минималистичный дизайн элитного интерьера с панорамными окнами"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDu77dm4QaRE2JSdD1fypOekeiFQTujjii_BoYkr0YdDsbEA-ShgpTKjHYRSQJez6qionDxnQ-yZrUNTJhKhRp-BAIAAncCkx3S60P2_txWTgq0sQgszDuHBXb8OG_F8t0Ddam5qmc0ZN-RGi6GskeXkmWobaG_OFPMf_ck6qQtX-ahYEWOWLluOaVCUkwNnhMF6SswuFatE95oWrZiMHxH7bxRVraVk3lMvOoVmckr1zB3olNe0lo4_YiPFBunxdhlpxhbXRK1v5Q"
            fill
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/15"></div>
        </div>
        <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop pb-20 md:pb-0">
          <div className="max-w-4xl">
            <h1 className="font-display-lg-mobile md:text-display-lg md:font-display-lg text-white leading-tight mb-10 drop-shadow-md">
              Проектирование и <br />
              Фундаментальный Ремонт
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
                историческим фундаментализмом.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <Reveal
        as="section"
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
      </Reveal>

      {/* Editorial Bento Feature - Portfolio Showcase */}
      <Reveal as="section" className="pb-section-gap px-margin-mobile lg:px-margin-desktop">
        {/* Title Section */}
        <div className="max-w-screen-xl mx-auto w-full mb-16">
          <div className="flex flex-col gap-2.5">
            <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
              Портфолио Студии
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-[52px] font-black uppercase tracking-tighter text-primary leading-[1.05] max-w-3xl">
              <span className="text-secondary font-light">120+</span> эксклюзивных <br />
              дизайн-проектов <br />
              реализовано
            </h2>
          </div>
        </div>

        {/* Project grid streams in behind its own skeleton; the rest of the page
            does not wait on the database. Cards cascade rather than popping in. */}
        <Suspense fallback={<ShowcaseGridSkeleton />}>
          <ShowcaseGrid />
        </Suspense>
      </Reveal>

      {/* Calculator Section */}
      <Reveal as="section" className="py-section-gap px-margin-mobile lg:px-margin-desktop bg-background border-t border-outline-variant/30">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Left Column: Context / Value Prop */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
              Сметный расчет
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-[42px] font-black uppercase tracking-tight text-primary leading-[1.1]">
              Узнайте бюджет <br />
              вашего ремонта <br />
              моментально
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              STUDIO AURA ценит прозрачность и точность планирования. Мы стараемся находить консенсус в живой беседе в реалиях самого заказчика и текущей обстановки в мире.
            </p>
            <div className="space-y-3 pt-4 border-t border-outline-variant/50">
              <div className="flex items-center gap-3 text-sm font-sans font-medium uppercase text-primary">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                Черновые и чистовые материалы
              </div>
              <div className="flex items-center gap-3 text-sm font-sans font-medium uppercase text-primary">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                Авторский надзор и контроль сметы
              </div>
              <div className="flex items-center gap-3 text-sm font-sans font-medium uppercase text-primary">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                Официальная гарантия по договору
              </div>
            </div>
          </div>

          {/* Right Column: Calculator Component */}
          <div className="lg:col-span-7 lg:col-start-6 w-full">
            <Calculator isDark={false} />
          </div>
        </div>
      </Reveal>

      <ServicesShowcase />

      <Workflow />


      {/* Magazine Section */}
      <Reveal
        as="section"
        className="py-section-gap bg-surface-container-low px-margin-mobile lg:px-margin-desktop"
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
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-surface-container">
                <Image
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Минималистичный интерьер в теплых лучах солнца"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZEORQ3a6l7m9L2y0Epu76SuEvsVt0RYFh3CtgM2u-B-P_ac5baChxxrBfaA0LIIrs29Sbl7XT27Th5L7h9vHV7FTEyi--uCR0_3Zhr0eiw7UMq7A3CprZa7pmsiqWXUcjuP9Fk6oAZsI77H7_pb7dZMb5NeuPH7MwlI1eB6MwyzVbHr7EPkqW3qOaXyvoebBbNFftnkvQTdCIDR9zuu7q7Xy3nh23Npo6qG946rqa9-9JGk5yhFnhKsU7iqv2ZuP-8Z1QU--__8E"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <p className="font-label-caps text-label-caps text-secondary mb-2">Материалы</p>
              <h4 className="font-headline-sm text-headline-sm group-hover:underline text-primary transition-all">
                Поэзия необработанного бетона в интерьере
              </h4>
            </Link>

            {/* Article 2 */}
            <Link href="/aura-journal" className="group cursor-pointer block">
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-surface-container">
                <Image
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Абстрактная лестница в интерьере"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvSxJGM209LGVLwKI6YA3nq77vgz0fA4Ro5qmrS4--YC_5Q2wVwAd2jgiLlGlpOHvaVELQY_H7WFKMzSBM9vVUxpUqOcrOalQRmnbY2ZcjUaIjdoZ5Y2lVAFRmJM4ZdjQwAl03y3-dHI4UcttlPsb2swZMueWCRFtHvH6iUNv9uk56lRi9_PgZGRtu3agmNSPFeBZ2tiXlSQsH4MhyDf614od5jNXu5J8oDABCKT79EzAjPD479DSfit2ekH3BIFZHeYUgj9G_ekA"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <p className="font-label-caps text-label-caps text-secondary mb-2">Пространство</p>
              <h4 className="font-headline-sm text-headline-sm group-hover:underline text-primary transition-all">
                Управление светом в городских апартаментах
              </h4>
            </Link>

            {/* Article 3 */}
            <Link href="/aura-journal" className="group cursor-pointer block">
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-surface-container">
                <Image
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Набор образцов натуральных материалов"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3PLFXe659f5udN-A0YVCtbgXjsGTgvImTYQk5nZySxTK1HyteEdMAiz13AdDtVsirYooatuKIGir5ZL_Ik1M9og7piyYDuVFr2wMxP9sIztCBJYIkdLw7TTV0NlBLeMMU3-x5ji3D2NVhegs95jKgZvrN-NQsHTaBVjwJqT5TH-8001pJrBs3SP76mosX5XyDnB_mvAxobJEGwva1ZL0MdfXo6UudsHPueovQrP2m9LHJYQBSTNqZqbcSsQGFfVqKdPio4wnp7CE"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
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
      </Reveal>
    </main>
  );
}
