"use client";

import { useState } from "react";

interface CalculatorProps {
  isDark?: boolean;
}

const RATES: Record<string, number> = {
  minimalism: 750,
  classic: 950,
  "art-deco": 850,
  bespoke: 1100,
};

const MULTIPLIERS: Record<string, number> = {
  apartment: 1.0,
  "new-building": 1.05,
  house: 1.15,
  townhouse: 1.10,
};

export function Calculator({ isDark = false }: CalculatorProps) {
  const [premisesType, setPremisesType] = useState("apartment");
  const [styleType, setStyleType] = useState("minimalism");
  const [area, setArea] = useState<number>(80);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isAgreed, setIsAgreed] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  // Live calculation
  const baseRate = RATES[styleType] || 750;
  const multiplier = MULTIPLIERS[premisesType] || 1.0;
  const totalCost = area * baseRate * multiplier;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed || !phone) return;
    setSubmitted(true);
  };

  const inputBg = isDark ? "bg-black/40 text-white border-white/20 focus:border-white" : "bg-background text-primary border-outline-variant focus:border-primary";
  const labelColor = isDark ? "text-white/60" : "text-on-surface-variant/80";
  const cardBg = isDark ? "bg-black/75 backdrop-blur-md border border-white/10 text-white" : "bg-surface-container border border-outline-variant text-primary";
  const selectIcon = isDark ? "url('data:image/svg+xml;charset=utf-8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22white%22><path d=%22M7 10l5 5 5-5z%22/></svg>')" : "url('data:image/svg+xml;charset=utf-8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22black%22><path d=%22M7 10l5 5 5-5z%22/></svg>')";

  if (submitted) {
    return (
      <div className={`p-8 md:p-12 flex flex-col justify-center items-center text-center shadow-lg transition-all ${cardBg}`}>
        <div className="w-16 h-16 bg-secondary/15 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl italic mb-4">Расчет Зафиксирован</h3>
        <p className="font-sans text-xs tracking-wider uppercase text-secondary mb-6">Предварительная смета: €{Math.round(totalCost).toLocaleString("ru-RU")}</p>
        <p className="font-body-md text-body-md opacity-80 max-w-sm leading-relaxed">
          Наш ведущий технолог-сметчик свяжется с вами по номеру <strong className="font-medium">{phone}</strong> в течение 15 минут для детального разбора спецификации материалов и согласования выезда на замер.
        </p>
      </div>
    );
  }

  return (
    <div className={`p-8 md:p-10 shadow-lg flex flex-col ${cardBg}`}>
      <h3 className="font-serif text-2xl italic mb-2 text-center lg:text-left">Рассчитать стоимость ремонта</h3>
      <p className="font-sans text-[10px] tracking-widest uppercase text-secondary mb-8 text-center lg:text-left">Интерактивный расчет в реальном времени</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`font-sans text-[10px] tracking-widest uppercase font-semibold block mb-2 ${labelColor}`}>Тип помещения</label>
            <select
              value={premisesType}
              onChange={(e) => setPremisesType(e.target.value)}
              className={`w-full px-4 py-3 border font-sans text-xs uppercase tracking-wider focus:outline-none appearance-none ${inputBg}`}
              style={{
                backgroundImage: selectIcon,
                backgroundPosition: "right 12px center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "20px",
                paddingRight: "40px"
              }}
            >
              <option value="apartment">Квартира (Вторичка)</option>
              <option value="new-building">Новостройка (Бетон)</option>
              <option value="house">Коттедж / Дом</option>
              <option value="townhouse">Таунхаус</option>
            </select>
          </div>
          <div>
            <label className={`font-sans text-[10px] tracking-widest uppercase font-semibold block mb-2 ${labelColor}`}>Стиль ремонта</label>
            <select
              value={styleType}
              onChange={(e) => setStyleType(e.target.value)}
              className={`w-full px-4 py-3 border font-sans text-xs uppercase tracking-wider focus:outline-none appearance-none ${inputBg}`}
              style={{
                backgroundImage: selectIcon,
                backgroundPosition: "right 12px center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "20px",
                paddingRight: "40px"
              }}
            >
              <option value="minimalism">Премиум Минимализм</option>
              <option value="classic">Классический / Исторический</option>
              <option value="art-deco">Современный Ар-деко</option>
              <option value="bespoke">Индивидуальный Дизайн</option>
            </select>
          </div>
        </div>

        {/* Row 2: Area Slider & Input */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className={`font-sans text-[10px] tracking-widest uppercase font-semibold ${labelColor}`}>Площадь объекта</label>
            <span className="font-serif text-lg italic text-secondary">{area} м²</span>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="30"
              max="500"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="flex-grow accent-[#725b38] h-1 bg-outline-variant/30 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="number"
              min="30"
              max="500"
              value={area}
              onChange={(e) => setArea(Math.max(30, Math.min(500, Number(e.target.value))))}
              className={`w-20 px-3 py-1.5 border font-sans text-xs text-center focus:outline-none ${inputBg}`}
            />
          </div>
        </div>

        {/* Real-time Calculation Panel */}
        <div className={`p-5 border flex flex-col justify-center items-center text-center ${isDark ? "bg-white/5 border-white/10" : "bg-background border-outline-variant/50"}`}>
          <span className={`font-sans text-[9px] tracking-widest uppercase ${labelColor} mb-1`}>Ориентировочная стоимость</span>
          <div className="font-serif text-3xl font-light text-secondary">
            €{Math.round(totalCost).toLocaleString("ru-RU")}
          </div>
          <span className="font-sans text-[9px] opacity-60 mt-1">Включает высококлассные работы и премиум материалы</span>
        </div>

        {/* Lead Capture */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`font-sans text-[10px] tracking-widest uppercase font-semibold block mb-2 ${labelColor}`}>Ваше имя</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3 border font-sans text-xs focus:outline-none ${inputBg}`}
                placeholder="Константин"
              />
            </div>
            <div>
              <label className={`font-sans text-[10px] tracking-widest uppercase font-semibold block mb-2 ${labelColor}`}>Телефон для сметы</label>
              <input
                required
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                className={`w-full px-4 py-3 border font-sans text-xs focus:outline-none ${inputBg}`}
                placeholder="+7 (999) 000-00-00"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!isAgreed}
            className={`w-full py-4 font-sans text-xs tracking-widest font-semibold uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
              isDark 
                ? "bg-secondary text-white hover:bg-secondary/90" 
                : "bg-primary text-on-primary hover:bg-secondary"
            }`}
          >
            Зафиксировать стоимость
          </button>

          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="mt-1 accent-[#725b38] w-3.5 h-3.5"
            />
            <span className="font-sans text-[9px] leading-relaxed opacity-60 text-left block">
              Согласен с регламентом обработки персональных данных и условиями конфиденциальности.
            </span>
          </label>
        </div>
      </form>
    </div>
  );
}
