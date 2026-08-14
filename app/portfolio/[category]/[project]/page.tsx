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

// Cached shell, refreshed on demand by the admin panel (revalidatePath) and at
// most every 5 minutes as a safety net. `dynamicParams` keeps projects added
// after the build renderable on first request.
export const revalidate = 300;
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
