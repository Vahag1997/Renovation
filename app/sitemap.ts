import type { MetadataRoute } from "next";

import { flatRoutes } from "@/app/_data/routes";
import { getProjectHref } from "@/app/_data/projects";
import { getAllProjects } from "@/app/_data/portfolio";
import { siteConfig } from "@/app/_data/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const projects = await getAllProjects();

  const staticRoutes: MetadataRoute.Sitemap = flatRoutes.map((route) => ({
    url: new URL(route.href, siteConfig.url).toString(),
    lastModified,
    changeFrequency: route.href === "/" ? "weekly" : "monthly",
    priority: route.href === "/" ? 1 : 0.7,
  }));

  // Pages that exist as routes but aren't part of the nav data.
  const extraRoutes: MetadataRoute.Sitemap = ["/aura-journal"].map((href) => ({
    url: new URL(href, siteConfig.url).toString(),
    lastModified,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: new URL(getProjectHref(project), siteConfig.url).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...extraRoutes, ...projectRoutes];
}
