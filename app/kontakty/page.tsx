"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    service: "",
    timeline: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [estimate, setEstimate] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      
      // Dynamic budget estimate calculation helper
      if (name === "size" || name === "service") {
        const sizeVal = parseFloat(name === "size" ? value : updated.size) || 0;
        const serviceVal = name === "service" ? value : updated.service;
        
        if (sizeVal > 0 && serviceVal) {
          let multiplier = 750; // Standard tier I
          if (serviceVal === "full") multiplier = 1850; // Exclusive
          else if (serviceVal === "interior") multiplier = 1200; // Business
          else if (serviceVal === "consultancy") multiplier = 85; // Consultancy
          
          const totalMin = Math.round(sizeVal * multiplier * 0.9);
          const totalMax = Math.round(sizeVal * multiplier * 1.1);
          setEstimate(
            `€${totalMin.toLocaleString("ru-RU")} — €${totalMax.toLocaleString("ru-RU")}`
          );
        } else {
          setEstimate(null);
        }
      }
      
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.size || !formData.service) {
      alert("Пожалуйста, заполните основные поля.");
      return;
    }
    
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", size: "", service: "", timeline: "" });
        setEstimate(null);
      }, 4000);
    }, 1500);
  };

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

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Name */}
            <div className="relative">
              <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">
                ВАШЕ ИМЯ
              </label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full input-underline font-body-lg text-body-lg text-primary placeholder:text-outline/40"
                placeholder="Введите ФИО"
              />
            </div>

            {/* Size & Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
              <div className="relative">
                <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">
                  ПЛОЩАДЬ (М²)
                </label>
                <input
                  required
                  type="number"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full input-underline font-body-lg text-body-lg text-primary placeholder:text-outline/40"
                  placeholder="Например: 120"
                />
              </div>
              <div className="relative">
                <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">
                  ТИП УСЛУГИ
                </label>
                <select
                  required
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full input-underline font-body-md text-body-md text-primary appearance-none py-3"
                >
                  <option value="" disabled>
                    Выберите тип
                  </option>
                  <option value="full">Эксклюзивный Ремонт под Ключ</option>
                  <option value="interior">Дизайн-Проект и Снабжение</option>
                  <option value="consultancy">Архитектурный надзор и Консультации</option>
                </select>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">
                СРОКИ ЗАПУСКА ПРОЕКТА
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full input-underline font-body-md text-body-md text-primary appearance-none py-3"
              >
                <option value="" disabled>
                  Когда мы должны начать?
                </option>
                <option value="immediate">Срочно (в течение 1-3 месяцев)</option>
                <option value="near">Этап планирования (через 4-8 месяцев)</option>
                <option value="future">В перспективе (более года)</option>
              </select>
            </div>

            {/* Estimate Display (Dynamic Lead Nudge) */}
            {estimate && (
              <div className="p-6 bg-surface-container border border-outline-variant flex justify-between items-center animate-fade-in">
                <div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant block mb-1">
                    ПРЕДВАРИТЕЛЬНЫЙ БЮДЖЕТ (РАСЧЕТ)
                  </span>
                  <span className="font-headline-sm text-headline-sm text-secondary font-medium">
                    {estimate}
                  </span>
                </div>
                <span className="material-symbols-outlined text-secondary text-3xl">calculate</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={status !== "idle"}
                className={`w-full py-6 px-12 font-label-caps text-button uppercase tracking-widest transition-all duration-300 ${
                  status === "success"
                    ? "bg-secondary text-white"
                    : "bg-primary text-on-primary hover:opacity-90"
                }`}
              >
                {status === "idle" && "ЗАПРОСИТЬ КОНСУЛЬТАЦИЮ"}
                {status === "sending" && "РАСЧЕТ И ОТПРАВКА..."}
                {status === "success" && "СПАСИБО! ЗАЯВКА УСПЕШНО ОТПРАВЛЕНА"}
              </button>
            </div>
          </form>

          {/* Location details */}
          <div className="mt-12 pt-12 border-t border-outline-variant grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <span className="font-label-caps text-[10px] text-on-surface-variant block mb-2">
                ПРЯМАЯ СВЯЗЬ
              </span>
              <p className="font-body-md text-body-md text-primary font-medium">
                hello@studioaura.design
              </p>
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
        <img
          alt="Роскошный минималистичный пентхаус во время заката"
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] transition-transform duration-[4000ms] hover:scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHv5oBaxmULodJS_QgZdalxN2TuOGBLX8xZ-5_qXFbg_hIv7ctQZs9mHUB0yAphYRGW3w8GDm8retrgCpjQZM2v6YUTP1oGNG9cwEOat2OBObFc0yskAN_JsIvnQvhnfNQBF0NMNMmX_IDJrPcokoMUb4U-AUtCxZazPb_mF8yYMbNNpDt9Ri21b1SLhg91HCbIpLedSsrhaXOFnoakzDY07zBKu6r8cjWEVDdyZdsZTzSaBO5taJ-iwFKRRx5-tVnuAf11v0ntTY"
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
        <img
          alt="Детали премиального мрамора и дерева"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdi8KLTOxeyWkHKS915SMPbEn0kyOUBsWwGovJgReYgXz2OwuLJTcOLsKzxWbaiRdq8NQDJGTw3PuJc9ptvaLtcRPD3RIJl5mK2IpCSbEWfotGcFt8QItpywYH65ft0izdJQfLYexwjKBhwiKUO0FwVAAN4HP7cBPsOgKSsQmZCaPwWsyxuDqp6lgopHzo_j-kwQFb6RVSoZOwrmagJdAqPjfuoldtIv_VnrNyTi3jmpmBC9z2nGHG0gPcv6Urzf1PXwiaIqcOld4"
        />
      </div>
    </main>
  );
}
