"use client";

import { useState, useEffect, useRef } from "react";

const articles = [
  {
    id: 1,
    title: "Честность дикого камня: тактильное путешествие",
    category: "MATERIALS",
    categoryRu: "МАТЕРИАЛЫ",
    desc: "Почему современные дизайнеры возвращаются к нешлифованным минералам и вулканическим породам в отделке жилых пространств.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-LQqWSSgEcVGEwMh2ZWXsL5IWebtlPvtLTUa-t_Pxmnh9DtDLFBkI4B0iNEZ48bi4cbDvitk6YXrC_-iDFyoIQzmwXcY0J5EFkqM-qo3FROkfqd-1i8dnX5DuRahCsXHcA8UXaq_m4riYwBD6-wLS4gCIK2UZJTG-sKa8RfrhkGUWqq-KJR1uGJ9156DthO2o7L7aNnIeJrUKYlJqUS19JRjnIKF2HRc3z_C3XWoBZPBZ7F5VU8PTOfFDeK4QBVNfs8Kz4t6YrBY",
    span: "md:col-span-6",
    delay: 0,
  },
  {
    id: 2,
    title: "Форма следует за чувством: за пределами функционализма",
    category: "ARCHITECTURE",
    categoryRu: "АРХИТЕКТУРА",
    desc: "Переосмысление эмоциональной реакции человека на жилой объем, высоту потолков и пространственный ритм.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC88Is6Dabn2k2S548CO1fFYf39ryZAiKClle5oaa-rT6JeU8vTx7a-eZeNfjwCuYfsCtym9swUxjaHGGGZdwKFx6u1yPTX6f8YvW2KCTfg1gJ-Nb5GYzHdXn2aZMDlH-Ucv9FbfDQzV45AjrkUc27A7A1PO2zfBKwM4m3bGfgFj174IRt3lQ1h4iX9FV2VdtH7N-QOix7qGyFg_lLpkZNRC8dWqJunaNHijkuhu_Sggy01Xkcm3bHxYCOh7WMpu7ahUfWMr_vGGxg",
    span: "md:col-span-6 md:mt-24",
    delay: 200,
  },
  {
    id: 3,
    title: "Дисциплина эскизирования: от руки на бумаге",
    category: "PROCESS",
    categoryRu: "МЕТОДОЛОГИЯ",
    desc: "Почему физический эскиз архитектора остается главным инструментом концептуального поиска перед CAD-моделированием.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJN0Irzz1kxNNiVmz3QXtr0ERqI9fEC7DOGb6K0aqcMgPOJIKVS3xUiKp8sZStDdVqK1TcjmH2OU_5yaKiKPS6fMuH3nERt7BPfIlEEt87Wnsh3qhS6aBR7fCPftPot2trv-a0KE5uAt2l_-2euhdJkhiCzarc83patVRobcEy9s2jYdbO9p4SSR3sB4CbswttkZ9fgQdMhNfw53D941Y6bmxMpw0ZNB_5B0KpM3FoWNkNVVR8tS_xJ9cmMiedPJL1Mw3RT880Spk",
    span: "md:col-span-4",
    delay: 0,
  },
  {
    id: 4,
    title: "Атмосферная интимность: проектирование под золотой час",
    category: "LIGHTING",
    categoryRu: "СВЕТОДИЗАЙН",
    desc: "Как управлять естественными лучами заходящего солнца и балансировать их теплым искусственным светом.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ9mZzaYMgV1GYH6-lumxUBi081kndTC7FAKIrRin9b_s4jPf_FeIijoGe-OP_R1lhUJAB5BYEOTRTI0udaX754ykNYC6uglvFRZMdu3lxG8ReEoowTxRvCQz1uGgQQDl9znzeK7DI_Z47EEm4IYvih1dWeABs71HiMYDldB1RIK_GwDAE3jspyWH9rmd2vFdiaEPO_MDEOV_d5Q_Pqk0a8RErDgaaKXUTsuaDC46ebBKLAt7jSAnc5YBjqVdiAPAUaKoFlYMF00A",
    span: "md:col-span-8",
    delay: 200,
  },
];

export default function AuraJournal() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "success">("idle");
  const revealElements = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.current.forEach((el) => {
      if (el) {
        el.classList.add("scroll-reveal");
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [activeTab]);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealElements.current.includes(el)) {
      revealElements.current.push(el);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus("success");
    setTimeout(() => {
      setSubStatus("idle");
      setEmail("");
    }, 3000);
  };

  const filteredArticles =
    activeTab === "ALL"
      ? articles
      : articles.filter((art) => art.category === activeTab);

  return (
    <main className="overflow-x-hidden pt-12">
      {/* Featured Editorial Hero */}
      <header
        ref={addToRefs}
        className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop mt-12 mb-section-gap"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-7 order-2 md:order-1 mt-8 md:mt-0">
            <p className="font-label-caps text-label-caps text-secondary mb-4">
              РЕДАКЦИОННАЯ СТАТЬЯ
            </p>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-8 max-w-2xl text-primary leading-tight">
              Искусство Света в Городской Среде
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-lg leading-relaxed">
              Исследуем, как естественное освещение превращает бетонные плоскости в живые храмы покоя,
              переопределяя баланс между плотностью застройки мегаполиса и тихой безмятежностью.
            </p>
            <button className="group flex items-center gap-2 font-button text-button text-primary border-b border-primary w-fit pb-1 hover:opacity-75 transition-opacity">
              ЧИТАТЬ СТАТЬЮ
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
          <div className="md:col-span-5 order-1 md:order-2">
            <div className="aspect-[4/5] overflow-hidden bg-surface-container">
              <img
                className="w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-105"
                alt="Минималистичный интерьер в лучах заходящего солнца"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVA6ZQ0FkfMxzbXC5Aq-li57WxOA75PBXsbTn_diD8trmGU9EWt8oiYXnJknso1UoqQ-EncDiJFYhmh9OnLOM4Zn1dq1E9vxhagm6_tIk-lmKjd9EOO6bSDOYsk6_7Zb4JyGfIptDmZgu01cLu0S7nbZeLeAXf2POqCSE4WNsmbpJXAxu2QH9SvgAgGX_q4Rwcv-iaf1I4EeS4uiD8_L_7iP82URVefT4wvArudklM0Jcb01jBqcMxBcrOdK3of6_oQJ8cKLFWFzg"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Categories Filter Tabs */}
      <section ref={addToRefs} className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop mb-12">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-outline-variant pb-6">
          <span className="font-label-caps text-label-caps text-on-surface-variant opacity-50 uppercase mr-4">
            Фильтр:
          </span>
          {[
            { key: "ALL", label: "ВСЕ СТАТЬИ" },
            { key: "MATERIALS", label: "МАТЕРИАЛЫ" },
            { key: "ARCHITECTURE", label: "АРХИТЕКТУРА" },
            { key: "LIGHTING", label: "СВЕТОДИЗАЙН" },
            { key: "PROCESS", label: "МЕТОДОЛОГИЯ" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`font-label-caps text-label-caps transition-all ${
                activeTab === tab.key
                  ? "text-primary border-b border-primary pb-1"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Article Grid */}
      <main
        ref={addToRefs}
        className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop mb-section-gap"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {filteredArticles.map((art) => (
            <article
              style={{ transitionDelay: `${art.delay}ms` }}
              key={art.id}
              className={`${art.span} mb-16 group cursor-pointer`}
            >
              <div className="aspect-square bg-surface-container-low overflow-hidden mb-6 border border-outline-variant/30">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  alt={art.title}
                  src={art.image}
                />
              </div>
              <p className="font-label-caps text-label-caps text-secondary mb-2">
                {art.categoryRu}
              </p>
              <h3 className="font-headline-sm text-headline-sm mb-4 text-primary leading-snug group-hover:underline transition-all">
                {art.title}
              </h3>
              {art.desc && (
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed line-clamp-2">
                  {art.desc}
                </p>
              )}
              <span className="font-label-caps text-[11px] text-primary border-b border-outline-variant hover:border-primary pb-1 transition-all">
                ЧИТАТЬ СТАТЬЮ
              </span>
            </article>
          ))}
        </div>
      </main>

      {/* Newsletter Signup (Закрытый Клуб) */}
      <section ref={addToRefs} className="bg-surface-container-low py-section-gap border-t border-outline-variant">
        <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop text-center">
          <div className="max-w-2xl mx-auto border border-outline-variant p-12 md:p-20 bg-background shadow-sm">
            <p className="font-label-caps text-label-caps text-secondary mb-4">
              РЕДАКЦИОННАЯ ПОДПИСКА
            </p>
            <h2 className="font-headline-md text-headline-md mb-8 text-primary leading-tight">
              Присоединяйтесь к закрытому рассылочному клубу Aura.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-12 max-w-md mx-auto leading-relaxed">
              Раз в месяц мы отправляем глубокие размышления об архитектурной порядочности, подборе
              материалов и тихой роскоши в быту.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="w-full text-left">
                <label className="font-label-caps text-[10px] text-on-surface-variant mb-2 block">
                  EMAIL АДРЕС
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-primary px-0 py-3 focus:ring-0 font-body-md placeholder:text-outline/40 text-primary"
                  placeholder="email@example.com"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto bg-primary text-on-primary font-button text-button px-12 py-4 uppercase hover:bg-opacity-95 transition-all whitespace-nowrap tracking-wider"
              >
                {subStatus === "idle" ? "ПОДПИСАТЬСЯ" : "ГОТОВО!"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
