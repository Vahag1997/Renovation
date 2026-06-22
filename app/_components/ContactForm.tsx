"use client";

import { useState } from "react";

/**
 * Lead-capture form with a live preliminary budget estimate.
 *
 * NOTE: submission is currently a local simulation. When the backend lands,
 * replace `handleSubmit` with a Server Action / route handler call that
 * validates input and persists the lead (DB / CRM).
 */
export function ContactForm() {
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
  );
}
