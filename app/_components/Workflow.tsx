"use client";

import { useState } from "react";

interface Stage {
  id: number;
  numberStr: string;
  label: string;
  title: string;
  description: string;
  deliverables: string[];
}

const STAGES: Stage[] = [
  {
    id: 1,
    numberStr: "01",
    label: "Демонтаж и перепланировка",
    title: "Демонтажные работы и планировочная подготовка",
    description: "Начальный этап реализации, закладывающий основу для будущей геометрии интерьера. Включает снос старых конструкций и возведение новых перегородок с соблюдением всех технологических зазоров и углов в 90 градусов.",
    deliverables: [
      "Демонтаж ненесущих стен, напольных покрытий и инженерных систем",
      "Расширение и усиление дверных и оконных проемов по проекту",
      "Возведение новых межкомнатных перегородок (газобетон, кирпич, ГКЛ с шумоизоляцией)",
      "Сортировка строительного мусора и вывоз специализированным транспортом"
    ]
  },
  {
    id: 2,
    numberStr: "02",
    label: "Инженерные сети",
    title: "Прокладка скрытых инженерных коммуникаций",
    description: "Развертывание ключевых систем жизнеобеспечения дома. Все трассы монтируются по детальным проектам с использованием материалов премиального сегмента для гарантии многолетней безаварийной эксплуатации.",
    deliverables: [
      "Штробление стен и разводка силовых и слаботочных кабелей",
      "Прокладка трубопроводов водоснабжения из сшитого полиэтилена (Rehau)",
      "Установка коллекторных групп, редукторов давления и систем защиты Aquastop",
      "Интеграция скрытых трасс кондиционирования и приточно-вытяжной вентиляции"
    ]
  },
  {
    id: 3,
    numberStr: "03",
    label: "Черновая отделка",
    title: "Выравнивание поверхностей и базовая подготовка",
    description: "Создание идеально ровного основания под финишные покрытия. Особое внимание уделяется гидроизоляции влажных зон и комплексной звукоизоляции жилых помещений.",
    deliverables: [
      "Штукатурка стен по маякам с контролем вертикальности",
      "Устройство полусухой или самовыравнивающейся стяжки пола по звукоизоляционной мембране",
      "Двухкомпонентная обмазочная гидроизоляция мокрых зон с проклейкой углов лентой",
      "Монтаж многоуровневых потолочных систем из влагостойкого гипсокартона"
    ]
  },
  {
    id: 4,
    numberStr: "04",
    label: "Чистовая отделка",
    title: "Нанесение декоративных покрытий",
    description: "Воплощение визуальной концепции в цвете и текстурах. Работа с тонкими, хрупкими и дорогостоящими материалами требует исключительного мастерства наших штатных декораторов.",
    deliverables: [
      "Укладка крупноформатного керамогранита и мозаики с идеальным подбором швов",
      "Монтаж паркетной доски, инженерной доски или художественного паркета",
      "Поклейка малярного стеклохолста, финишное шпатлевание и покраска красками Premium",
      "Нанесение фактурной декоративной штукатурки и монтаж гипсовой лепнины"
    ]
  },
  {
    id: 5,
    numberStr: "05",
    label: "Монтаж оборудования",
    title: "Установка сантехники, розеток и световых систем",
    description: "Подключение оборудования, формирующего бытовой комфорт и световую эстетику. Все приборы подгоняются с прецизионной точностью для минимизации видимых стыков.",
    deliverables: [
      "Монтаж магнитных трековых систем, безрамочных спотов и дизайнерских люстр",
      "Установка чистовой сантехники, смесителей скрытого монтажа и термостатов",
      "Установка электрофурнитуры премиум-серий из стекла, металла или бакелита",
      "Интеграция решеток кондиционирования и запуск систем климат-контроля"
    ]
  },
  {
    id: 6,
    numberStr: "06",
    label: "Меблировка и декор",
    title: "Инсталляция мебели и декорирование пространства",
    description: "Наполнение комнат мебельными композициями и текстилем, финальный штрих для создания уюта. Объект очищается от строительной пыли до состояния абсолютной чистоты.",
    deliverables: [
      "Сборка и подгонка встроенных шкафов, гардеробных систем и кухонного гарнитура",
      "Расстановка отдельно стоящей мягкой и корпусной мебели",
      "Профессиональное текстильное оформление (навеска штор, распределение ковров)",
      "Глубокий послестроительный клининг помещений специализированной техникой"
    ]
  },
  {
    id: 7,
    numberStr: "07",
    label: "Сдача объекта",
    title: "Финальная приемка и передача ключей",
    description: "Процесс передачи полностью готового к проживанию пространства. Мы сдаем объект в эксплуатацию с полной технической документацией и пожизненной заботой о вашем комфорте.",
    deliverables: [
      "Инспекция объекта главным инженером технадзора Studio Aura",
      "Проведение тепловизионного контроля качества теплоизоляции и сетей",
      "Передача клиенту исполнительной папки со схемами скрытых трасс и паспортами",
      "Подписание акта сдачи-приемки и запуск официальной 5-летней гарантии"
    ]
  }
];


interface Step {
  id: number;
  numberStr: string;
  title: string;
  description: string;
}

const COOPERATION_STEPS: Step[] = [
  {
    id: 1,
    numberStr: "01",
    title: "Знакомство с проектом",
    description: "Проверяем технические ошибки в дизайне ремонта квартиры, запрашиваем расчет и подробное техническое задание, изучаем степень и качество проработки проекта. Решения основываются на специфике каждой жилой зоны."
  },
  {
    id: 2,
    numberStr: "02",
    title: "Выезд на объект",
    description: "Выезжаем на объект для точных обмеров, лазерного 3D-сканирования, фото- и видеофиксации. Инженер оценивает состояние несущих конструкций, стяжки и вводных коммуникационных узлов."
  },
  {
    id: 3,
    numberStr: "03",
    title: "Детальный расчет",
    description: "Формируем прозрачную сметную документацию в течение 1–5 рабочих дней с детализацией по каждому проекту с разделением на работы, черновые и чистовые материалы для исключения непредвиденных расходов."
  },
  {
    id: 4,
    numberStr: "04",
    title: "Подписание договора",
    description: "Заключаем официальный договор, фиксируем итоговую стоимость, подробные графики платежей и производства работ со строгой финансовой ответственностью за соблюдение сроков."
  },
  {
    id: 5,
    numberStr: "05",
    title: "Инженерный этап",
    description: "Выполняем демонтаж, возведение перегородок и монтаж всех внутренних систем: электрики, водоснабжения, канализации, вентиляции и мультизонального кондиционирования по стандартам технадзора."
  },
  {
    id: 6,
    numberStr: "06",
    title: "Чистовая отделка & Сдача",
    description: "Реализуем финишные покрытия, монтируем световые сценарии и сантехнику, расставляем дизайнерскую мебель. Проводим генеральный клининг и сдаем объект с передачей исполнительных схем."
  }
];

export function Workflow() {
  const [activeStageId, setActiveStageId] = useState(1);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const activeStage = STAGES.find(s => s.id === activeStageId) || STAGES[0];

  const handleStageChange = (nextId: number) => {
    if (nextId === activeStageId) return;
    setSlideDirection(nextId > activeStageId ? "right" : "left");
    setActiveStageId(nextId);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;  // Swipe left -> Next step
    const isRightSwipe = distance < -50; // Swipe right -> Prev step

    if (isLeftSwipe && activeStageId < STAGES.length) {
      handleStageChange(activeStageId + 1);
    }
    if (isRightSwipe && activeStageId > 1) {
      handleStageChange(activeStageId - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="w-full">
      {/* 1. Cooperation Scheme - Dark Luxury Grid */}
      <section className="relative bg-[#121110] py-24 md:py-32 px-margin-mobile md:px-margin-desktop text-white overflow-hidden font-sans">
        {/* Subtle grid background for blueprint look */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800c_1px,transparent_1px),linear-gradient(to_bottom,#8080800c_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        <div className="relative z-10 max-w-screen-xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl mb-20 md:mb-28 space-y-4">
            <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#c5a880] block">
              Сотрудничество
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-none tracking-tight">
              Схема взаимодействия
            </h2>
            <p className="font-body-lg text-body-lg text-white/60 leading-relaxed pt-2">
              Мы одинаково сильны в проектировании интерьеров и реализации дизайна. Если ремонт проводится по готовому дизайн-проекту, порядок взаимодействия строится следующим образом:
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/10">
            {COOPERATION_STEPS.map((step, idx) => {
              const borderClasses = `
                border-white/10
                border-b
                ${idx < 3 ? 'md:border-b' : 'md:border-b-0'}
                ${idx % 3 !== 2 ? 'md:border-r' : 'md:border-r-0'}
                last:border-b-0
              `.trim().replace(/\s+/g, ' ');

              return (
                <div key={step.id} className={`group relative p-8 md:p-12 flex flex-col justify-between min-h-[380px] hover:bg-white/[0.01] transition-all duration-500 ease-out ${borderClasses}`}>
                  <div>
                    <span className="font-serif text-6xl md:text-7xl font-extralight text-[#c5a880]/30 group-hover:text-[#c5a880] transition-colors duration-500 block mb-8">
                      {step.numberStr}
                    </span>
                    <h3 className="font-sans text-lg md:text-xl font-bold uppercase tracking-wider text-white group-hover:text-[#c5a880] transition-colors duration-500 mb-4">
                      {step.title}
                    </h3>
                    <p className="font-body-md text-body-md text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-500">
                      {step.description}
                    </p>
                  </div>
                  <div className="w-12 h-[1px] bg-[#c5a880]/30 group-hover:w-full transition-all duration-500 ease-out mt-8" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Stages of Work - Asymmetric Luxury Editorial Timeline */}
      <section className="bg-[#fcfbf9] py-24 md:py-32 px-margin-mobile md:px-margin-desktop text-primary border-t border-outline-variant/30 overflow-hidden">
        <div className="max-w-screen-xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl mb-16 md:mb-24 space-y-4">
            <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#6b5849] block">
              Строительное производство
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-none tracking-tight text-primary">
              Этапы работ: полный цикл
            </h2>
          </div>

          {/* Desktop Asymmetric View (hidden lg:grid) */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-12 lg:gap-gutter items-start">
            {/* Left Column: Vertical Index Menu */}
            <div className="lg:col-span-5 space-y-2.5 relative border-l border-neutral-200 pl-6 py-2">
              {/* Vertical line indicator */}
              <div 
                className="absolute left-[-1px] w-[2px] bg-[#6b5849] transition-all duration-500 ease-out-quint"
                style={{
                  top: `${Math.max(0, activeStageId - 1) * 58 + 8}px`,
                  height: "36px"
                }}
              />
              {STAGES.map((stage) => {
                const isActive = activeStageId === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => handleStageChange(stage.id)}
                    className="w-full text-left flex items-center gap-6 py-2 group focus:outline-none"
                  >
                    <span className={`font-serif text-sm transition-all duration-300 ${isActive ? "text-[#6b5849] font-medium" : "text-neutral-400 group-hover:text-primary"}`}>
                      {stage.numberStr}
                    </span>
                    <span className={`font-sans text-sm tracking-wider uppercase transition-all duration-300 ${isActive ? "text-[#6b5849] font-bold translate-x-1" : "text-neutral-500 group-hover:text-primary"}`}>
                      {stage.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Stage Showcase Card */}
            <div 
              key={`${activeStageId}-${slideDirection}`}
              className={`lg:col-span-7 bg-white border border-outline-variant/50 p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-sm min-h-[500px] flex flex-col justify-between ${
                slideDirection === "right" ? "animate-slide-in-right" : "animate-slide-in-left"
              }`}
            >
              {/* Giant background watermark number */}
              <div className="absolute right-[-2rem] top-[-2rem] font-serif text-[18rem] md:text-[24rem] font-bold text-neutral-100 select-none pointer-events-none leading-none z-0">
                {activeStageId > 0 ? activeStage.numberStr : ""}
              </div>

              <div className="relative z-10 space-y-8">
                {/* Title */}
                <div className="space-y-4">
                  <span className="font-sans text-xs tracking-widest text-[#6b5849] font-semibold uppercase">
                    ЭТАП {activeStageId > 0 ? activeStage.id : ""}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-primary leading-tight max-w-xl">
                    {activeStageId > 0 ? activeStage.title : "Выберите этап"}
                  </h3>
                  <div className="w-16 h-[2px] bg-[#6b5849]" />
                </div>

                {/* Description */}
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl leading-relaxed">
                  {activeStageId > 0 ? activeStage.description : ""}
                </p>

                {/* Specific Deliverables List */}
                <div className="space-y-3 pt-6 border-t border-neutral-100 max-w-xl">
                  <h4 className="font-sans text-xs tracking-wider font-bold text-primary uppercase mb-4">
                    Что входит в этот этап:
                  </h4>
                  <ul className="space-y-3">
                    {activeStageId > 0 && activeStage.deliverables.map((item, index) => (
                      <li key={index} className="flex items-start gap-4 font-body-md text-body-md text-on-surface-variant">
                        <span className="w-1.5 h-[1.5px] bg-[#c5a880] mt-3 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Magazine Slider View (lg:hidden) */}
          <div className="lg:hidden flex flex-col">
            {/* Horizontal progress track line and step indicators */}
            <div className="relative flex justify-between items-center w-full px-2 mb-10">
              <div className="absolute left-0 right-0 h-[1px] bg-neutral-200 top-1/2 -translate-y-1/2 z-0" />
              <div 
                className="absolute left-0 h-[1.5px] bg-[#6b5849] top-1/2 -translate-y-1/2 z-0 transition-all duration-500 ease-out" 
                style={{ width: `${Math.max(0, activeStageId - 1) / (STAGES.length - 1) * 100}%` }}
              />
              {STAGES.map((stage) => {
                const isActive = activeStageId === stage.id;
                const isCompleted = stage.id < activeStageId;
                return (
                  <button
                    key={stage.id}
                    onClick={() => handleStageChange(stage.id)}
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-serif text-xs transition-all duration-300 ${
                      isActive 
                        ? "bg-[#6b5849] text-white font-bold ring-4 ring-[#6b5849]/10" 
                        : isCompleted 
                          ? "bg-[#6b5849] text-white" 
                          : "bg-white text-neutral-400 border border-neutral-200"
                    }`}
                  >
                    {stage.numberStr}
                  </button>
                );
              })}
            </div>

            {/* Active Stage Details Card with Touch Events for Swiping */}
            <div 
              key={`${activeStageId}-${slideDirection}`}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`bg-white border border-outline-variant/50 p-6 sm:p-8 relative overflow-hidden shadow-sm min-h-[380px] flex flex-col justify-between select-none touch-pan-y ${
                slideDirection === "right" ? "animate-slide-in-right" : "animate-slide-in-left"
              }`}
            >
              {/* Giant background watermark number */}
              <div className="absolute right-[-1.5rem] top-[-1.5rem] font-serif text-[12rem] font-bold text-neutral-100/70 select-none pointer-events-none leading-none z-0">
                {activeStageId > 0 ? activeStage.numberStr : ""}
              </div>

              <div className="relative z-10 space-y-6">
                {/* Title */}
                <div className="space-y-3">
                  <span className="font-sans text-[10px] tracking-widest text-[#6b5849] font-semibold uppercase">
                    ЭТАП {activeStageId > 0 ? activeStage.id : ""}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-primary leading-tight">
                    {activeStageId > 0 ? activeStage.title : "Выберите этап"}
                  </h3>
                  <div className="w-12 h-[1.5px] bg-[#6b5849]" />
                </div>

                {/* Description */}
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {activeStageId > 0 ? activeStage.description : ""}
                </p>

                {/* Specific Deliverables List */}
                <div className="space-y-3 pt-4 border-t border-neutral-100">
                  <span className="font-sans text-[10px] tracking-wider font-bold text-primary uppercase block">
                    Что входит в этот этап:
                  </span>
                  <ul className="space-y-2">
                    {activeStageId > 0 && activeStage.deliverables.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 font-body-sm text-body-sm text-on-surface-variant">
                        <span className="w-1.5 h-[1px] bg-[#c5a880] mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Slider Bottom Controls */}
            <div className="flex justify-between items-center mt-6 px-1">
              <button
                onClick={() => handleStageChange(activeStageId - 1)}
                disabled={activeStageId === 1}
                className="font-sans text-xs tracking-widest uppercase font-bold text-[#6b5849] disabled:opacity-30 transition-opacity flex items-center gap-2 py-2"
              >
                <span>&larr;</span> Назад
              </button>

              <span className="font-serif text-sm text-neutral-400">
                {activeStageId > 0 ? activeStage.numberStr : "00"} <span className="mx-1 text-neutral-300">/</span> {STAGES.length.toString().padStart(2, '0')}
              </span>

              <button
                onClick={() => handleStageChange(activeStageId + 1)}
                disabled={activeStageId === STAGES.length}
                className="font-sans text-xs tracking-widest uppercase font-bold text-[#6b5849] disabled:opacity-30 transition-opacity flex items-center gap-2 py-2"
              >
                Вперед <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
