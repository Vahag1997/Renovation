"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Reveal } from "@/app/_components/Reveal";

type Article = {
  id: number;
  title: string;
  category: string;
  categoryRu: string;
  desc: string;
  image: string;
  span: string;
};

const articles: Article[] = [
  {
    id: 1,
    title: "Честность дикого камня: тактильное путешествие",
    category: "MATERIALS",
    categoryRu: "МАТЕРИАЛЫ",
    desc: "Почему современные дизайнеры возвращаются к нешлифованным минералам и вулканическим породам в отделке жилых пространств.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-LQqWSSgEcVGEwMh2ZWXsL5IWebtlPvtLTUa-t_Pxmnh9DtDLFBkI4B0iNEZ48bi4cbDvitk6YXrC_-iDFyoIQzmwXcY0J5EFkqM-qo3FROkfqd-1i8dnX5DuRahCsXHcA8UXaq_m4riYwBD6-wLS4gCIK2UZJTG-sKa8RfrhkGUWqq-KJR1uGJ9156DthO2o7L7aNnIeJrUKYlJqUS19JRjnIKF2HRc3z_C3XWoBZPBZ7F5VU8PTOfFDeK4QBVNfs8Kz4t6YrBY",
    span: "md:col-span-6",
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
  },
];

const filterTabs = [
  { key: "ALL", label: "ВСЕ СТАТЬИ" },
  { key: "MATERIALS", label: "МАТЕРИАЛЫ" },
  { key: "ARCHITECTURE", label: "АРХИТЕКТУРА" },
  { key: "LIGHTING", label: "СВЕТОДИЗАЙН" },
  { key: "PROCESS", label: "МЕТОДОЛОГИЯ" },
];

export function JournalContent() {
  const [activeTab, setActiveTab] = useState("ALL");

  const filteredArticles =
    activeTab === "ALL"
      ? articles
      : articles.filter((art) => art.category === activeTab);

  return (
    <>
      {/* Categories Filter Tabs */}
      <section className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop mb-12">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-outline-variant pb-6">
          <span className="font-label-caps text-label-caps text-on-surface-variant opacity-50 uppercase mr-4">
            Фильтр:
          </span>
          {filterTabs.map((tab) => (
            <button
              type="button"
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              aria-pressed={activeTab === tab.key}
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
      <section id="journal-articles" className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop mb-section-gap scroll-mt-36">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {filteredArticles.map((art) => (
            <article key={art.id} className={`${art.span} mb-16 group`}>
              <div className="relative aspect-square bg-surface-container-low overflow-hidden mb-6 border border-outline-variant/30">
                <Image
                  className="object-cover transition-transform duration-700 group-hover:scale-103"
                  alt={art.title}
                  src={art.image}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
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
            </article>
          ))}
        </div>
      </section>

      {/* Contact CTA. A real newsletter backend can replace this later; do not
          present a fake successful subscription in production. */}
      <Reveal as="section" className="bg-surface-container-low py-section-gap border-t border-outline-variant">
        <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop text-center">
          <div className="max-w-2xl mx-auto border border-outline-variant p-12 md:p-20 bg-background shadow-sm">
            <p className="font-label-caps text-label-caps text-secondary mb-4">
              ДИАЛОГ С AURA
            </p>
            <h2 className="font-headline-md text-headline-md mb-8 text-primary leading-tight">
              Обсудите с нами ваш будущий интерьер.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-12 max-w-md mx-auto leading-relaxed">
              Расскажите о пространстве, сроках и задачах. Мы предложим следующий практический шаг и предварительную оценку.
            </p>
            <Link href="/kontakty" className="inline-block bg-primary text-on-primary font-button text-button px-12 py-4 uppercase hover:opacity-90 transition-opacity tracking-wider">
              ОБСУДИТЬ ПРОЕКТ
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
