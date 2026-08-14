import type { Metadata } from "next";
import Image from "next/image";

import { ContactForm } from "@/app/_components/ContactForm";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Рассчитайте предварительную стоимость ремонта и свяжитесь со Studio Aura. Офисы в Ереване и Москве, бесплатная первичная консультация.",
  alternates: { canonical: "/kontakty" },
};

export default function Contact() {
  return (
    <main className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row pt-6">
      {/* Left Column: Form Section */}
      <section className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-margin-desktop py-12 md:py-20 bg-background">
        <div className="max-w-xl mx-auto w-full">
          <header className="mb-12">
            <span className="font-label-caps text-label-caps text-secondary mb-4 block">
              ОЦЕНКА СТОИМОСТИ ПРОЕКТА
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight">
              Рассчитайте Стоимость Ремонта
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-6 leading-relaxed">
              Опишите параметры вашего объекта. Мы рассчитаем предварительный бюджет на основе
              высококлассных материалов и бескомпромиссного архитектурного контроля.
            </p>
          </header>

          <ContactForm />

          {/* Location details */}
          <div className="mt-12 pt-12 border-t border-outline-variant grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <span className="font-label-caps text-[10px] text-on-surface-variant block mb-2">
                ПРЯМАЯ СВЯЗЬ
              </span>
              <a href="mailto:hello@studioaura.design" className="font-body-md text-body-md text-primary font-medium hover:text-secondary transition-colors">
                hello@studioaura.design
              </a>
            </div>
            <div>
              <span className="font-label-caps text-[10px] text-on-surface-variant block mb-2">
                АДРЕС СТУДИИ
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                ул. Амиряна, 12, Ереван, Армения
                <br />
                Кутузовский Проспект, 21, Москва
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Right Column: Lifestyle Image */}
      <section className="hidden md:block md:w-1/2 relative overflow-hidden bg-surface-container">
        <Image
          alt="Роскошный минималистичный пентхаус во время заката"
          className="object-cover grayscale-[0.2] transition-transform duration-[4000ms] hover:scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHv5oBaxmULodJS_QgZdalxN2TuOGBLX8xZ-5_qXFbg_hIv7ctQZs9mHUB0yAphYRGW3w8GDm8retrgCpjQZM2v6YUTP1oGNG9cwEOat2OBObFc0yskAN_JsIvnQvhnfNQBF0NMNMmX_IDJrPcokoMUb4U-AUtCxZazPb_mF8yYMbNNpDt9Ri21b1SLhg91HCbIpLedSsrhaXOFnoakzDY07zBKu6r8cjWEVDdyZdsZTzSaBO5taJ-iwFKRRx5-tVnuAf11v0ntTY"
          fill
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-primary/5"></div>
        {/* Floating Quote Card */}
        <div className="absolute bottom-12 left-12 right-12 bg-black/10 backdrop-blur-xl border border-white/20 p-8 text-white">
          <span className="font-label-caps text-[10px] tracking-[0.2em] mb-4 block text-white/70">
            ПОРТФОЛИО № 42
          </span>
          <h3 className="font-headline-sm text-headline-sm italic leading-relaxed">
            «Простота — это высшая степень утонченности».
          </h3>
        </div>
      </section>

      {/* Mobile Bottom Image */}
      <div className="md:hidden h-[300px] relative w-full mt-12">
        <Image
          alt="Детали премиального мрамора и дерева"
          className="object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdi8KLTOxeyWkHKS915SMPbEn0kyOUBsWwGovJgReYgXz2OwuLJTcOLsKzxWbaiRdq8NQDJGTw3PuJc9ptvaLtcRPD3RIJl5mK2IpCSbEWfotGcFt8QItpywYH65ft0izdJQfLYexwjKBhwiKUO0FwVAAN4HP7cBPsOgKSsQmZCaPwWsyxuDqp6lgopHzo_j-kwQFb6RVSoZOwrmagJdAqPjfuoldtIv_VnrNyTi3jmpmBC9z2nGHG0gPcv6Urzf1PXwiaIqcOld4"
          fill
          sizes="100vw"
        />
      </div>
    </main>
  );
}
