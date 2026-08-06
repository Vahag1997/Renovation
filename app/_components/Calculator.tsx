"use client";

import { useState } from "react";

import { submitLead } from "@/app/_actions/leads";

interface CalculatorProps {
  isDark?: boolean;
  isCompact?: boolean;
}

const PREMISES_LABELS: Record<string, string> = {
  apartment: "Квартира",
  house: "Дом",
  townhouse: "Таунхаус",
};

const STYLE_LABELS: Record<string, string> = {
  minimalism: "Минимализм",
  classic: "Классика",
  "art-deco": "Ар-деко",
  bespoke: "Дизайн-проект",
};

export function Calculator({ isDark = false, isCompact = false }: CalculatorProps) {
  const [premisesType, setPremisesType] = useState("apartment");
  const [styleType, setStyleType] = useState("minimalism");
  const [area, setArea] = useState<number>(80);
  const [complexName, setComplexName] = useState("");
  const [phone, setPhone] = useState("");
  const [isAgreed, setIsAgreed] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");
    // Format as Russian Phone: +7 (XXX) XXX-XX-XX
    if (input.startsWith("7") || input.startsWith("8")) {
      input = input.substring(1);
    }
    let formatted = "+7 ";
    if (input.length > 0) {
      formatted += "(" + input.substring(0, 3);
    }
    if (input.length >= 4) {
      formatted += ") " + input.substring(3, 6);
    }
    if (input.length >= 7) {
      formatted += "-" + input.substring(6, 8);
    }
    if (input.length >= 9) {
      formatted += "-" + input.substring(8, 10);
    }
    
    if (e.target.value === "") {
      setPhone("");
    } else {
      setPhone(formatted.substring(0, 18));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed || !phone || sending) return;
    setSending(true);
    setError(null);

    let res;
    try {
      res = await submitLead({
        source: "calculator",
        phone,
        area: `${area} м²`,
        premisesType: PREMISES_LABELS[premisesType] ?? premisesType,
        style: STYLE_LABELS[styleType] ?? styleType,
        complexName,
      });
    } catch {
      // Network drop or a server action that never came back.
      setSending(false);
      setError("Нет связи с сервером. Проверьте интернет и попробуйте ещё раз.");
      return;
    }

    setSending(false);
    if (res.ok) {
      setSubmitted(true);
    } else {
      setError(res.error);
    }
  };

  const inputBg = isDark ? "bg-black/40 text-white border-white/20 focus:border-white" : "bg-background text-primary border-outline-variant focus:border-primary";
  const labelColor = isDark ? "text-white/60" : "text-on-surface-variant/80";
  const cardBg = isDark ? "bg-black/75 backdrop-blur-md border border-white/10 text-white" : "bg-surface-container border border-outline-variant text-primary";
  const selectIcon = isDark ? "url('data:image/svg+xml;charset=utf-8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22white%22><path d=%22M7 10l5 5 5-5z%22/></svg>')" : "url('data:image/svg+xml;charset=utf-8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22black%22><path d=%22M7 10l5 5 5-5z%22/></svg>')";

  const paddingClass = isCompact ? "p-6" : "p-8 md:p-10";
  const gapClass = isCompact ? "space-y-4" : "space-y-6";

  if (submitted) {
    return (
      <div className={`${paddingClass} flex flex-col justify-center items-center text-center shadow-lg transition-all ${cardBg}`}>
        <div className="w-12 h-12 bg-secondary/15 rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-xl italic mb-3">Заявка отправлена</h3>
        <p className="font-sans text-[11px] opacity-80 max-w-sm leading-relaxed">
          Спасибо за обращение. Мы рассчитаем точную смету вашего ремонта ({area} м²) и наш технолог свяжется с вами по номеру <strong className="font-medium">{phone}</strong> в течение 15 минут.
        </p>
      </div>
    );
  }

  return (
    <div className={`${paddingClass} shadow-lg flex flex-col ${cardBg}`}>
      <h3 className="font-serif text-xl md:text-2xl italic text-center lg:text-left">Форма обратной связи</h3>
      {!isCompact && (
        <p className="font-sans text-[10px] tracking-widest uppercase text-secondary mb-6 text-center lg:text-left">Интерактивный расчет в реальном времени</p>
      )}
      
      <form onSubmit={handleSubmit} className={`${gapClass} ${isCompact ? "mt-4" : "mt-0"}`}>
        {/* Row 1: Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`font-sans text-[10px] tracking-widest uppercase font-semibold block mb-1.5 ${labelColor}`}>Тип помещения</label>
            <select
              value={premisesType}
              onChange={(e) => setPremisesType(e.target.value)}
              className={`w-full min-w-0 px-3 py-2 border font-sans text-[10px] uppercase tracking-wider focus:outline-none appearance-none ${inputBg}`}
              style={{
                backgroundImage: selectIcon,
                backgroundPosition: "right 8px center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "16px",
                paddingRight: "28px"
              }}
            >
              <option value="apartment">Квартира</option>
              <option value="house">Дом</option>
              <option value="townhouse">Таунхаус</option>
            </select>
          </div>
          <div>
            <label className={`font-sans text-[10px] tracking-widest uppercase font-semibold block mb-1.5 ${labelColor}`}>Выберите стиль</label>
            <select
              value={styleType}
              onChange={(e) => setStyleType(e.target.value)}
              className={`w-full min-w-0 px-3 py-2 border font-sans text-[10px] uppercase tracking-wider focus:outline-none appearance-none ${inputBg}`}
              style={{
                backgroundImage: selectIcon,
                backgroundPosition: "right 8px center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "16px",
                paddingRight: "28px"
              }}
            >
              <option value="minimalism">Минимализм</option>
              <option value="classic">Классика</option>
              <option value="art-deco">Ар-деко</option>
              <option value="bespoke">Дизайн-проект</option>
            </select>
          </div>
        </div>

        {/* Row 2: Area Slider & Input */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className={`font-sans text-[10px] tracking-widest uppercase font-semibold ${labelColor}`}>Площадь объекта</label>
            <span className="font-serif text-base italic text-secondary">{area} м²</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="30"
              max="500"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              aria-label="Площадь объекта в квадратных метрах"
              className="range-slim flex-grow min-w-0"
            />
            <input
              type="number"
              min="30"
              max="500"
              value={area}
              onChange={(e) => setArea(Math.max(30, Math.min(500, Number(e.target.value))))}
              aria-label="Площадь объекта"
              className={`w-16 px-2 py-2 border font-sans text-[11px] text-center focus:outline-none ${inputBg}`}
            />
          </div>
        </div>

        {/* Row 3: Complex Name & Phone (Condensed side-by-side Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`font-sans text-[10px] tracking-widest uppercase font-semibold block mb-1.5 ${labelColor}`}>Название ЖК или КП</label>
            <input
              type="text"
              value={complexName}
              onChange={(e) => setComplexName(e.target.value)}
              className={`w-full min-w-0 px-3 py-2 border font-sans text-xs focus:outline-none ${inputBg}`}
              placeholder="ЖК Савеловский"
            />
          </div>
          <div>
            <label className={`font-sans text-[10px] tracking-widest uppercase font-semibold block mb-1.5 ${labelColor}`}>Телефон</label>
            <input
              required
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              className={`w-full min-w-0 px-3 py-2 border font-sans text-xs focus:outline-none ${inputBg}`}
              placeholder="+7 (999) 000-00-00"
            />
          </div>
        </div>

        {/* Action button & agreement checkbox */}
        <div className="space-y-3">
          <button
            type="submit"
            disabled={!isAgreed || sending}
            aria-busy={sending}
            className={`w-full py-3 font-sans text-[10px] tracking-widest font-semibold uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 ${
              isDark
                ? "bg-secondary text-white hover:bg-secondary/90"
                : "bg-primary text-on-primary hover:bg-secondary"
            }`}
          >
            {sending && <span aria-hidden className="btn-spinner btn-spinner--sm" />}
            {sending ? "Отправка..." : "Рассчитать стоимость ремонта"}
          </button>

          {error && (
            <p
              role="alert"
              className="animate-fade-up font-sans text-[11px] leading-relaxed text-center text-error"
            >
              {error}
            </p>
          )}

          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="mt-0.5 accent-[#725b38] w-4 h-4 flex-shrink-0"
            />
            <span className="font-sans text-[10px] leading-relaxed opacity-60 text-left block">
              Согласен с регламентом обработки персональных данных.
            </span>
          </label>
        </div>
      </form>
    </div>
  );
}
