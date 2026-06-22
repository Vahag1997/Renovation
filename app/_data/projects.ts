export interface ProjectStorySection {
  title: string;
  body: string;
}

export interface ProjectDetail {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  location: string;
  area: string;
  year: string;
  image: string;
  heroVideo: string;
  gallery: string[];
  planningImages: string[];
  tasks: string[];
  details: ProjectDetail[];
  storySections: ProjectStorySection[];
  link: string;
  description: string;
}

const interiorImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAYrKOYzhtSGMBWaONBdzERTUhmiWFK87miHQ8w0HNp1IOnzX1SV-0miKwL76E_JxIdidKT3mDxEJ4pk1K85zvJ_9B3nikc5IgueiIeIxptzSB68eafknsKnJUFZe1blyzlc9QiJnYpwG1rHRIdg47nrgBi4GpEZKCtV4pzfHwoz7M6hzpA85tcYx-tHxKJH-PZgq1SsuXErJ0ricSrKRsJedklLf2qL2mDJDWaWNw9kej49IiIwxjsle9Lvc60EtKEwGGT8yQewHU",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAA2F7ce4aBeLVBnXauMVP6fmKgatvsb_dN28dbRT78g6BMUg9s60nSKmzmvE431CQQaonVKyHycvhlz1-YukKRTuzv5IkpA1p5BOJbVQYc20ooNcDVGkp-AQNX5Xwcp2Q2Jkhq8FysxAxNl1hlFxMSFit8qJ7wAaMn13Hdkw_voNnWYAkoSJEOuw4mmaACQHIlD1Znqqm6PSa-JwTR0ttFLP4hWkuntHe7vHucSG5msTOLra0wuioGZmmrb4g3b_qI45gyBQIjhl4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBmapc2y84hjCDauUuvGPx9BIY7TH2xRuwh06o8tzMxU4_4LcpQxA1QYLk-VunwptVz7ffpJUckpmrheUutFr8J7sggqRyK49DnJdY40v4lXXlezjhDXWg8setqFP0Fow0c70__33MlB8PQYub2-jgIQrNDVejsZW6tPSte8wunMdXGxMBswjvIKgv5vBgeT_hCPFmjAG0YpYIF_REImg3DqyoEo5FJlAlKdZ89kgOcjXxCGNmnhSRdDsC-txoB1yxPnQoPzkqpZto",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDqplEB02zapq9gVXMkZd_wXQkBh-v8RfIzkcCNYTnjTVAD-Huf9mN_-hKDpdynU_A0Zp54R2v4qpzhgh1X4-dO4HwEOFuxFMECweP6S-GGzaduF0V0kopHohqykuwLOPccW1RIDdfJ0rJfCLnYlYEy-tfuhR8oZ7tGlTGpJgru0CQLJ5THtbMZ98wjkXtoDZxWv7g9PxcznpMYiUKv4_Px3brl6BPOGqjVSl7Nhi4FGqlMHtWK0Tz-0JMWSvc3IHz3IcYZjdDsHUI",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCEeWMEY79PjjagjRJj5F5Z4vqTaaNc1FUx8KxbYoR2VrOW3xSCCAMLjNoQpRJFhPQpVonZGmLGs4qxlIeXQ2Tza_R9gCtJHgKC9NUNiqpP90d6SIMYSxW5qb-BNKQXJZmzq0IPqnPcilH_ozfTAnHwkNTH7giCPs8Psv0QU5TDsXPyolEq3rXkydARa3S31cigWV1ZIAKCLeiBi07UvXOuXHPi1e7EWIqcxejiljOa_HJazTBCfN9pR73hx50uuBETlYRu3QH7NMA",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB3PLFXe659f5udN-A0YVCtbgXjsGTgvImTYQk5nZySxTK1HyteEdMAiz13AdDtVsirYooatuKIGir5ZL_Ik1M9og7piyYDuVFr2wMxP9sIztCBJYIkdLw7TTV0NlBLeMMU3-x5ji3D2NVhegs95jKgZvrN-NQsHTaBVjwJqT5TH-8001pJrBs3SP76mosX5XyDnB_mvAxobJEGwva1ZL0MdfXo6UudsHPueovQrP2m9LHJYQBSTNqZqbcSsQGFfVqKdPio4wnp7CE",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBP9gqGZBlsdHkjnQYSYqlvM0uNpymH7uu9hDhU-vu681VcUkeDShuhZyEr5dQ1m4rCTl_0PZwF09H8FZ3GuzYhzLjaxbzBgeJ2hZdI48Q_ItsBVnO9jw2aRWwKKFfddYU_FruV_6cqPzxgCMxnIgYSZWC69ikmrdjyupDbIXGX_DCIxods2dfLf3lUJFvxB7KEAlYili2WfeW3qkShohvHiASAiscXrZog7CfZo1z-mWByFwjSdZIJ3sWf-00L8uybrhsM6wytw6E",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBXg_eyMN76Havk-_5L0J8oNAXCX5v53YEPtnAm3sWPBFBckuaOArssbNASJmMNvlcoqtnOUHCFf9EEdXLCMMZbQ-jBMAEzu-hMmsg8hUNOa8pH0IIf3-SmQAmkrC-PJn1apBzZq_bmcUdYMxjd3_Z5f5fyoIhLO72spbBe39xVXIdyG56rOU7AxqR6-E2aCTOxe1ZzhvJCBEq8Mb23iiaWhPI-S-djjIF2dA7_u1Z-xslbEDBzj4NU6A-Ld-4Z32o71M9a12srOH0",
];

const commonVideo = "/media/project-hero.mp4";

function makeDetails(project: {
  categoryLabel: string;
  location: string;
  area: string;
  year: string;
}): ProjectDetail[] {
  return [
    { label: "Категория", value: project.categoryLabel },
    { label: "Локация", value: project.location },
    { label: "Площадь", value: project.area },
    { label: "Год", value: project.year },
  ];
}

function makeTasks(categoryLabel: string): string[] {
  return [
    `Разработать цельную концепцию для категории «${categoryLabel}»`,
    "Собрать планировочные решения и рабочую документацию",
    "Подобрать материалы, свет, мебель и декоративные акценты",
    "Сопроводить реализацию до финальной приемки объекта",
  ];
}

function makeStory(title: string, area: string): ProjectStorySection[] {
  return [
    {
      title: "Идея проекта",
      body: `${title} построен вокруг спокойной архитектурной базы: чистые линии, крупные плоскости, натуральные фактуры и сценарии света. Мы оставили пространство визуально свободным, но добавили достаточно деталей, чтобы интерьер не выглядел холодным.`,
    },
    {
      title: "Планировка и сценарии",
      body: `На площади ${area} зона входа, приватные комнаты и общие пространства разделены так, чтобы движение по объекту было интуитивным. Главные видовые точки раскрываются постепенно: от лаконичного холла к центральной гостиной и камерным зонам отдыха.`,
    },
    {
      title: "Материалы и атмосфера",
      body: "В отделке использованы камень, шпон, крупноформатная плитка, скрытые системы хранения и мягкая подсветка. Цветовая палитра держится на нейтральной базе с глубокими графитовыми и теплыми акцентами.",
    },
  ];
}

function createProject(project: Omit<Project, "details" | "tasks" | "storySections" | "heroVideo" | "gallery" | "planningImages">): Project {
  const galleryStart = portfolioProjectsSeedIndex[project.id] ?? 0;
  const gallery = Array.from({ length: 6 }, (_, index) => interiorImages[(galleryStart + index) % interiorImages.length]);
  const planningImages = [gallery[2], gallery[4]];

  return {
    ...project,
    heroVideo: commonVideo,
    gallery,
    planningImages,
    tasks: makeTasks(project.categoryLabel),
    details: makeDetails(project),
    storySections: makeStory(project.title, project.area),
  };
}

const portfolioProjectsSeedIndex: Record<string, number> = {
  monolith: 0,
  "penthouse-ues": 1,
  "loft-tribeca": 2,
  "lake-como": 3,
  "montauk-residence": 4,
  "milan-boutique": 5,
  "zurich-office": 6,
  "florence-garden": 4,
  "nice-terrace": 6,
  "concept-blueprints": 7,
};

export const portfolioProjects: Project[] = [
  createProject({
    id: "monolith",
    title: "The Monolith Residence",
    category: "kvartiry",
    categoryLabel: "Квартиры",
    location: "Ереван, Малый Центр",
    area: "220 м²",
    year: "2024",
    image: interiorImages[0],
    link: "/portfolio",
    description:
      "Архитектурное проектирование и премиум-ремонт просторной квартиры для ценителей минимализма в ЖК «Монолит»",
  }),
  createProject({
    id: "penthouse-ues",
    title: "Penthouse Upper East Side",
    category: "kvartiry",
    categoryLabel: "Квартиры",
    location: "Нью-Йорк, Манхэттен",
    area: "340 м²",
    year: "2023",
    image: interiorImages[1],
    link: "/portfolio",
    description:
      "Дизайн интерьера и высококлассный ремонт двухуровневого пентхауса с панорамными окнами на Манхэттене",
  }),
  createProject({
    id: "loft-tribeca",
    title: "Loft Tribeca",
    category: "kvartiry",
    categoryLabel: "Квартиры",
    location: "Нью-Йорк, Трайбека",
    area: "180 м²",
    year: "2022",
    image: interiorImages[2],
    link: "/portfolio",
    description:
      "Дизайн интерьера и ремонт квартиры в стиле индустриальный лофт для карьериста в историческом районе Трайбека",
  }),
  createProject({
    id: "lake-como",
    title: "Villa Lake Como",
    category: "doma",
    categoryLabel: "Дома",
    location: "Италия, Комо",
    area: "450 м²",
    year: "2024",
    image: interiorImages[3],
    link: "/portfolio",
    description:
      "Эксклюзивный ремонт и декорирование загородной виллы на побережье озера Комо с использованием натурального мрамора",
  }),
  createProject({
    id: "montauk-residence",
    title: "Residence Montauk",
    category: "doma",
    categoryLabel: "Дома",
    location: "США, Лонг-Айленд",
    area: "310 м²",
    year: "2023",
    image: interiorImages[4],
    link: "/portfolio",
    description:
      "Архитектурный дизайн и отделка современной загородной резиденции на первой линии Атлантического океана",
  }),
  createProject({
    id: "milan-boutique",
    title: "Modern Minimalist Boutique",
    category: "kommercheskie-pomescheniya",
    categoryLabel: "Коммерческие помещения",
    location: "Италия, Милан",
    area: "120 м²",
    year: "2023",
    image: interiorImages[5],
    link: "/portfolio",
    description:
      "Проектирование и отделка коммерческого пространства премиум-класса для модного бутика в центре Милана",
  }),
  createProject({
    id: "zurich-office",
    title: "Urban Executive Office",
    category: "kommercheskie-pomescheniya",
    categoryLabel: "Коммерческие помещения",
    location: "Швейцария, Цюрих",
    area: "280 м²",
    year: "2024",
    image: interiorImages[6],
    link: "/portfolio",
    description:
      "Комплексный ремонт и инженерное оснащение представительского офиса класса А в деловом центре Цюриха",
  }),
  createProject({
    id: "florence-garden",
    title: "Villa Florence Garden",
    category: "landshaft",
    categoryLabel: "Ландшафт",
    location: "Италия, Флоренция",
    area: "1200 м²",
    year: "2023",
    image: interiorImages[4],
    link: "/portfolio",
    description:
      "Ландшафтный дизайн и благоустройство частного парка загородной усадьбы во Флоренции",
  }),
  createProject({
    id: "nice-terrace",
    title: "Penthouse Terrace Nice",
    category: "landshaft",
    categoryLabel: "Ландшафт",
    location: "Франция, Ницца",
    area: "85 м²",
    year: "2024",
    image: interiorImages[6],
    link: "/portfolio",
    description:
      "Озеленение и обустройство эксплуатируемой террасы пентхауса с видом на Лазурный Берег",
  }),
  createProject({
    id: "concept-blueprints",
    title: "Concept Blueprints and 3D Schematics",
    category: "proekty",
    categoryLabel: "Проекты",
    location: "Россия, Москва",
    area: "150 м²",
    year: "2023",
    image: interiorImages[7],
    link: "/portfolio",
    description:
      "Разработка концептуальных архитектурных планов и трехмерных схем зонирования жилого пространства",
  }),
];

export function getProjectHref(project: Pick<Project, "category" | "id">) {
  return `/portfolio/${project.category}/${project.id}`;
}

export function getProjectByCategoryAndSlug(category: string, project: string) {
  return portfolioProjects.find((item) => item.category === category && item.id === project);
}

export function getRelatedProjects(project: Project, limit = 3) {
  const sameCategory = portfolioProjects.filter(
    (item) => item.category === project.category && item.id !== project.id,
  );
  const otherProjects = portfolioProjects.filter(
    (item) => item.category !== project.category && item.id !== project.id,
  );

  return [...sameCategory, ...otherProjects].slice(0, limit);
}
