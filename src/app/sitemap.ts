import type { MetadataRoute } from "next";
import { getAllDocuments } from "@/lib/mdx";

const BASE_URL = "https://geek-labs-eight.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllDocuments("projects");
  const posts = getAllDocuments("blog");
  const experiments = getAllDocuments("experiments");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/experiments`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const experimentRoutes: MetadataRoute.Sitemap = experiments.map((exp) => ({
    url: `${BASE_URL}/experiments/${exp.slug}`,
    lastModified: new Date(exp.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes, ...experimentRoutes];
}
