import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center px-margin-mobile lg:px-margin-desktop">
      <div className="max-w-container-max-width mx-auto w-full text-center">
        <p className="font-label-caps text-label-caps text-secondary mb-6 tracking-widest">
          Ошибка 404
        </p>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-8 leading-tight">
          Такой страницы не существует
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto mb-12 leading-relaxed">
          Возможно, ссылка устарела или была введена с ошибкой. Вернитесь на главную или
          посмотрите наши проекты.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-primary text-on-primary font-label-caps text-label-caps px-10 py-5 uppercase tracking-widest hover:opacity-85 transition-opacity"
          >
            На главную
          </Link>
          <Link
            href="/portfolio"
            className="inline-block border border-primary text-primary font-label-caps text-label-caps px-10 py-5 uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300"
          >
            Смотреть портфолио
          </Link>
        </div>
      </div>
    </main>
  );
}
