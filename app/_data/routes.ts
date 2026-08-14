export type SiteRoute = {
  label: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  tone: "green" | "blue" | "gold" | "stone";
  bullets?: string[];
  children?: SiteRoute[];
};

export const homeRoute: SiteRoute = {
  label: "Главная",
  href: "/",
  eyebrow: "Ремонт и дизайн",
  title: "Пространства под ключ: от планировки до последнего светильника",
  description:
    "Черновая версия сайта с реальными переходами. Можно ходить по разделам и проверять структуру будущего проекта.",
  heroImage:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=80",
  tone: "green",
  bullets: ["Ремонт", "Дизайн", "Комплектация", "Контроль сроков"],
};

export const siteRoutes: SiteRoute[] = [
  {
    label: "Услуги",
    href: "/uslugi",
    eyebrow: "Направления",
    title: "Услуги для жилых, коммерческих и открытых пространств",
    description:
      "Ремонт, дизайн и архитектурное проектирование полного цикла: от концепции и инженерных решений до комплектации и сдачи готового объекта.",
    heroImage:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
    tone: "green",
    bullets: ["Смета", "Материалы", "Прораб", "Сдача объекта"],
    children: [
      {
        label: "Ремонт квартир",
        href: "/uslugi/remont-kvartir",
        eyebrow: "Услуги",
        title: "Ремонт квартир",
        description:
          "Материализуем философию осознанной роскоши, где форма следует за функцией, а красота кроется в лаконичности. Мы создаем осязаемую основу для вашей жизни, сочетая природную фактуру материалов с ювелирной точностью строительного мастерства.",
        heroImage:
          "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=80",
        tone: "green",
        bullets: ["Черновые работы", "Инженерия", "Отделка", "Приемка"],
      },
      {
        label: "Ремонт домов",
        href: "/uslugi/remont-domov",
        eyebrow: "Услуги",
        title: "Ремонт домов",
        description:
          "Материализуем философию осознанной роскоши, где форма следует за функцией, а красота кроется в лаконичности. Мы создаем осязаемую основу для вашей жизни, сочетая природную фактуру материалов с ювелирной точностью строительного мастерства.",
        heroImage:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
        tone: "stone",
        bullets: ["Фасады", "Интерьеры", "Инженерные сети", "Террасы"],
      },
      {
        label: "Дизайн проекты",
        href: "/uslugi/dizayn-proekty",
        eyebrow: "Услуги",
        title: "Дизайн проекты",
        description:
          "Материализуем философию осознанной роскоши, где форма следует за функцией, а красота кроется в лаконичности. Мы создаем осязаемую основу для вашей жизни, сочетая природную фактуру материалов с ювелирной точностью строительного мастерства.",
        heroImage:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
        tone: "gold",
        bullets: ["Планировка", "Визуализации", "Чертежи", "Комплектация"],
      },
      {
        label: "Ремонт коммерческих помещений",
        href: "/uslugi/remont-kommercheskih-pomescheniy",
        eyebrow: "Услуги",
        title: "Ремонт коммерческих помещений",
        description:
          "Материализуем философию осознанной роскоши, где форма следует за функцией, а красота кроется в лаконичности. Мы создаем осязаемую основу для вашей жизни, сочетая природную фактуру материалов с ювелирной точностью строительного мастерства.",
        heroImage:
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
        tone: "blue",
        bullets: ["Офисы", "Ритейл", "Салоны", "График работ"],
      },
      {
        label: "Ландшафтный дизайн",
        href: "/uslugi/landshaftnyy-dizayn",
        eyebrow: "Услуги",
        title: "Ландшафтный дизайн",
        description:
          "Материализуем философию осознанной роскоши, где форма следует за функцией, а красота кроется в лаконичности. Мы создаем осязаемую основу для вашей жизни, сочетая природную фактуру материалов с ювелирной точностью строительного мастерства.",
        heroImage:
          "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1600&q=80",
        tone: "green",
        bullets: ["План участка", "Озеленение", "Освещение", "Малые формы"],
      },
    ],
  },
  {
    label: "Портфолио",
    href: "/portfolio",
    eyebrow: "Работы",
    title: "Портфолио по типам объектов",
    description:
      "Раздел для будущих кейсов. Категории уже разведены по маршрутам, чтобы проверить навигацию до загрузки проектов.",
    heroImage:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80",
    tone: "blue",
    bullets: ["Кейсы", "До/после", "Площади", "Сроки"],
    children: [
      {
        label: "Квартиры",
        href: "/portfolio/kvartiry",
        eyebrow: "Портфолио",
        title: "Квартиры",
        description:
          "Пустой маршрут для будущих квартирных проектов и карточек с результатами.",
        heroImage:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
        tone: "blue",
        bullets: ["Студии", "Семейные квартиры", "Премиум", "До/после"],
      },
      {
        label: "Дома",
        href: "/portfolio/doma",
        eyebrow: "Портфолио",
        title: "Дома",
        description:
          "Пустая страница для будущих проектов частных домов и коттеджей.",
        heroImage:
          "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=80",
        tone: "stone",
        bullets: ["Коттеджи", "Таунхаусы", "Фасады", "Интерьеры"],
      },
      {
        label: "Проекты",
        href: "/portfolio/proekty",
        eyebrow: "Портфолио",
        title: "Проекты",
        description:
          "Маршрут для дизайн-проектов, концепций и визуализаций до реализации.",
        heroImage:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
        tone: "gold",
        bullets: ["Планы", "3D", "Коллажи", "Спецификации"],
      },
      {
        label: "Коммерческие помещения",
        href: "/portfolio/kommercheskie-pomescheniya",
        eyebrow: "Портфолио",
        title: "Коммерческие помещения",
        description:
          "Пустая категория для будущих офисов, шоурумов, салонов и торговых зон.",
        heroImage:
          "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=80",
        tone: "blue",
        bullets: ["Офисы", "Шоурумы", "Салоны", "Ритейл"],
      },
      {
        label: "Ландшафт",
        href: "/portfolio/landshaft",
        eyebrow: "Портфолио",
        title: "Ландшафт",
        description:
          "Пустой маршрут для будущих садов, дворов, террас и благоустройства.",
        heroImage:
          "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1600&q=80",
        tone: "green",
        bullets: ["Сады", "Дворы", "Террасы", "Освещение"],
      },
    ],
  },
  {
    label: "Контакты",
    href: "/kontakty",
    eyebrow: "Связь",
    title: "Контакты",
    description:
      "Пустая контактная страница с заготовкой под форму, телефон, адрес и карту.",
    heroImage:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80",
    tone: "green",
    bullets: ["Телефон", "Заявка", "Карта", "Мессенджеры"],
  },
  {
    label: "О компании",
    href: "/o-kompanii",
    eyebrow: "Компания",
    title: "О компании",
    description:
      "Маршрут для будущей истории компании, подхода к работе, команды и гарантий.",
    heroImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
    tone: "stone",
    bullets: ["Команда", "Процесс", "Гарантии", "Документы"],
  },
  {
    label: "Партнеры",
    href: "/partnery",
    eyebrow: "Поставщики",
    title: "Партнеры",
    description:
      "Пустой раздел для брендов, материалов, производителей мебели, света и инженерии.",
    heroImage:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
    tone: "gold",
    bullets: ["Материалы", "Свет", "Мебель", "Инженерия"],
  },
];

export const flatRoutes = [
  homeRoute,
  ...siteRoutes.flatMap((route) => [route, ...(route.children ?? [])]),
];

export function getRouteByHref(href: string) {
  return flatRoutes.find((route) => route.href === href);
}

export function getChildRoutes(href: string) {
  return getRouteByHref(href)?.children ?? [];
}

export function getParentRoute(href: string) {
  return siteRoutes.find((route) =>
    route.children?.some((child) => child.href === href),
  );
}
