import { cache } from "react";

import { hasSupabaseConfig, supabase } from "@/app/_lib/supabase";
import { portfolioProjects, type Project } from "@/app/_data/projects";

/** Local fallback hero video used when a project has no video set. */
const LOCAL_HERO_VIDEO = "/media/project-hero.mp4";

/** Neutral placeholder shown when a project has no images yet (avoids empty <Image src>). */
const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80";

type ImageRow = { url: string; kind: "gallery" | "planning"; sort_order: number };
type SectionRow = { title: string; body: string; sort_order: number };

type ProjectRow = {
  slug: string;
  title: string;
  location: string | null;
  area: string | null;
  year: string | null;
  description: string | null;
  cover_image: string | null;
  hero_video: string | null;
  before_image: string | null;
  after_image: string | null;
  tasks: string[] | null;
  category: { slug: string; name: string } | null;
  project_images: ImageRow[] | null;
  project_sections: SectionRow[] | null;
};

const PROJECT_SELECT =
  "slug,title,location,area,year,description,cover_image,hero_video,before_image,after_image,tasks," +
  "category:categories(slug,name)," +
  "project_images(url,kind,sort_order)," +
  "project_sections(title,body,sort_order)";

function bySort<T extends { sort_order: number }>(a: T, b: T) {
  return a.sort_order - b.sort_order;
}

/** Map a database row into the `Project` shape the UI components already expect. */
function mapProject(row: ProjectRow): Project {
  const images = [...(row.project_images ?? [])].sort(bySort);
  const gallery = images.filter((i) => i.kind === "gallery").map((i) => i.url);
  const planning = images.filter((i) => i.kind === "planning").map((i) => i.url);
  const sections = [...(row.project_sections ?? [])]
    .sort(bySort)
    .map((s) => ({ title: s.title, body: s.body }));

  const categoryLabel = row.category?.name ?? "";
  const cover = row.cover_image || gallery[0] || PLACEHOLDER_IMAGE;

  return {
    id: row.slug,
    title: row.title,
    category: row.category?.slug ?? "",
    categoryLabel,
    location: row.location ?? "",
    area: row.area ?? "",
    year: row.year ?? "",
    image: cover,
    heroVideo: row.hero_video ?? LOCAL_HERO_VIDEO,
    gallery: gallery.length ? gallery : [cover].filter(Boolean),
    planningImages: planning.length ? planning : gallery.slice(0, 2),
    tasks: row.tasks ?? [],
    details: [
      { label: "Категория", value: categoryLabel },
      { label: "Локация", value: row.location ?? "" },
      { label: "Площадь", value: row.area ?? "" },
      { label: "Год", value: row.year ?? "" },
    ],
    storySections: sections,
    link: "/portfolio",
    description: row.description ?? "",
    beforeImage: row.before_image ?? undefined,
    afterImage: row.after_image ?? undefined,
  };
}

/** All published projects, ordered. Cached per-request to avoid duplicate queries. */
export const getAllProjects = cache(async (): Promise<Project[]> => {
  if (!hasSupabaseConfig || !supabase) {
    return portfolioProjects;
  }

  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_SELECT)
    .eq("published", true)
    .order("sort_order");

  if (error) throw new Error(`Supabase getAllProjects: ${error.message}`);
  return (data as unknown as ProjectRow[]).map(mapProject);
});

export async function getProjectsByCategory(categorySlug: string): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((p) => p.category === categorySlug);
}

export const getProjectByCategoryAndSlug = cache(
  async (categorySlug: string, slug: string): Promise<Project | null> => {
    const projects = await getAllProjects();
    return (
      projects.find((p) => p.category === categorySlug && p.id === slug) ?? null
    );
  },
);

export async function getRelatedProjects(project: Project, limit = 3): Promise<Project[]> {
  const projects = await getAllProjects();
  const sameCategory = projects.filter(
    (p) => p.category === project.category && p.id !== project.id,
  );
  const others = projects.filter(
    (p) => p.category !== project.category && p.id !== project.id,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
