import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailPage } from "@/app/_components/ProjectDetailPage";
import {
  getProjectByCategoryAndSlug,
  getProjectHref,
  portfolioProjects,
} from "@/app/_data/projects";

type ProjectPageProps = {
  params: Promise<{
    category: string;
    project: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    category: project.category,
    project: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { category, project } = await params;
  const item = getProjectByCategoryAndSlug(category, project);

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
  const item = getProjectByCategoryAndSlug(category, project);

  if (!item) {
    notFound();
  }

  return <ProjectDetailPage project={item} />;
}
