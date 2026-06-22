import type { MetadataRoute } from "next";

import { flatRoutes } from "@/app/_data/routes";
import { getProjectHref, portfolioProjects } from "@/app/_data/projects";
import { siteConfig } from "@/app/_data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

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

  const projectRoutes: MetadataRoute.Sitemap = portfolioProjects.map((project) => ({
    url: new URL(getProjectHref(project), siteConfig.url).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...extraRoutes, ...projectRoutes];
}
