/**
 * Central site configuration. Override the public URL per environment with
 * `NEXT_PUBLIC_SITE_URL` (e.g. in `.env.production`).
 */
export const siteConfig = {
  name: "STUDIO AURA",
  title: "STUDIO AURA | Ремонт и Дизайн Премиум-Класса",
  description:
    "Эксклюзивный ремонт и архитектурный дизайн интерьеров в Ереване и Москве",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://studioaura.design",
  locale: "ru_RU",
} as const;
