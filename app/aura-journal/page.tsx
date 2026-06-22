import type { Metadata } from "next";
import Image from "next/image";

import { JournalContent } from "@/app/_components/JournalContent";
import { Reveal } from "@/app/_components/Reveal";

export const metadata: Metadata = {
  title: "Издание Aura — Журнал",
  description:
    "Журнал Studio Aura: размышления об архитектурной целостности, материалах, свете и тихой роскоши в интерьере.",
  alternates: { canonical: "/aura-journal" },
};

export default function AuraJournal() {
  return (
    <main className="overflow-x-hidden pt-12">
      {/* Featured Editorial Hero */}
      <Reveal
        as="header"
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
            <div className="relative aspect-[4/5] overflow-hidden bg-surface-container">
              <Image
                className="object-cover transition-transform duration-[1200ms] hover:scale-105"
                alt="Минималистичный интерьер в лучах заходящего солнца"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVA6ZQ0FkfMxzbXC5Aq-li57WxOA75PBXsbTn_diD8trmGU9EWt8oiYXnJknso1UoqQ-EncDiJFYhmh9OnLOM4Zn1dq1E9vxhagm6_tIk-lmKjd9EOO6bSDOYsk6_7Zb4JyGfIptDmZgu01cLu0S7nbZeLeAXf2POqCSE4WNsmbpJXAxu2QH9SvgAgGX_q4Rwcv-iaf1I4EeS4uiD8_L_7iP82URVefT4wvArudklM0Jcb01jBqcMxBcrOdK3of6_oQJ8cKLFWFzg"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                priority
              />
            </div>
          </div>
        </div>
      </Reveal>

      <JournalContent />
    </main>
  );
}
