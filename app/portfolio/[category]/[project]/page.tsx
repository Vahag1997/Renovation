import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailPage } from "@/app/_components/ProjectDetailPage";
import { getProjectByCategoryAndSlug, getAllProjects } from "@/app/_data/portfolio";
import { getProjectHref } from "@/app/_data/projects";

type ProjectPageProps = {
  params: Promise<{
    category: string;
    project: string;
  }>;
};

// Re-check the database every 60s, and render projects added after build on demand.
export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    category: project.category,
    project: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { category, project } = await params;
  const item = await getProjectByCategoryAndSlug(category, project);

  if (!item) {
    return {
      title: "Проект не найден",
    };
  }

  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: getProjectHref(item) },
    openGraph: {
      title: item.title,
      description: item.description,
      images: [{ url: item.image }],
    },
  };
}

export default async function PortfolioProjectPage({ params }: ProjectPageProps) {
  const { category, project } = await params;
  const item = await getProjectByCategoryAndSlug(category, project);

  if (!item) {
    notFound();
  }

  return <ProjectDetailPage project={item} />;
}
