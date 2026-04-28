import { getDocumentBySlug, getSlugs, getPostsByProject, getAllDocuments } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/components/MDXComponents";
import { TableOfContents } from "@/components/TableOfContents";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = getSlugs("projects");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getDocumentBySlug("projects", slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const { title, description, cover, tags, date } = project.frontmatter;

  return {
    title,
    description: description || `Explore "${title}" — a project from Geek Labs Studio.`,
    openGraph: {
      title: `${title} | Geek Labs Studio`,
      description: description || `Explore "${title}" — a project from Geek Labs Studio.`,
      type: "article",
      publishedTime: new Date(date).toISOString(),
      tags: tags || [],
      ...(cover && {
        images: [
          {
            url: cover,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || `Explore "${title}" — a project from Geek Labs Studio.`,
      ...(cover && { images: [cover] }),
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getDocumentBySlug("projects", slug);
  const relatedPosts = getPostsByProject(slug);

  if (!project) {
    notFound();
  }

  const allProjects = getAllDocuments("projects");
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;

  return (
    <div className="mx-auto max-w-5xl flex flex-col lg:flex-row gap-10 items-start">
      <article className="w-full max-w-3xl flex-1">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-4 text-sm text-muted-foreground">
          {format(new Date(project.frontmatter.date), "MMMM d, yyyy")}
        </div>
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {project.frontmatter.title}
        </h1>
        {project.frontmatter.tags && (
          <div className="flex flex-wrap justify-center gap-2">
            {project.frontmatter.tags.map((tag: string) => (
              <span key={tag} className="rounded-md bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {project.frontmatter.cover && (
        <div className="relative mb-12 aspect-[21/9] w-full overflow-hidden rounded-2xl border border-white/10 glass-card">
          <Image
            src={project.frontmatter.cover}
            alt={project.frontmatter.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-invert max-w-none">
        <MDXRemote 
          source={project.content} 
          components={MDXComponents} 
          options={{
            mdxOptions: {
              rehypePlugins: [
                [rehypePrettyCode as any, { theme: "github-dark" }],
                rehypeSlug as any,
              ],
            },
          }}
        />
      </div>

      {relatedPosts.length > 0 && (
        <div className="mt-16 border-t border-white/10 pt-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Project Devlogs</h2>
          <div className="flex flex-col gap-4">
            {relatedPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="glass-card flex flex-col justify-between gap-4 rounded-xl p-6 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{post.frontmatter.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{post.frontmatter.description}</p>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                    {format(new Date(post.frontmatter.date), "MMM d, yyyy")}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      )}

      {(prevProject || nextProject) && (
        <div className="mt-16 border-t border-white/10 pt-12 flex flex-col sm:flex-row justify-between gap-4">
          {prevProject ? (
            <Link href={`/projects/${prevProject.slug}`} className="group flex-1">
              <div className="glass-card flex h-full flex-col justify-center rounded-xl p-6 transition-colors group-hover:border-primary/50">
                <span className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowLeft size={16} /> Previous
                </span>
                <span className="font-bold group-hover:text-primary transition-colors line-clamp-1">{prevProject.frontmatter.title}</span>
              </div>
            </Link>
          ) : <div className="flex-1" />}
          
          {nextProject ? (
            <Link href={`/projects/${nextProject.slug}`} className="group flex-1 text-right">
              <div className="glass-card flex h-full flex-col justify-center rounded-xl p-6 transition-colors group-hover:border-primary/50">
                <span className="mb-2 flex items-center justify-end gap-2 text-sm text-muted-foreground">
                  Next <ArrowRight size={16} />
                </span>
                <span className="font-bold group-hover:text-primary transition-colors line-clamp-1">{nextProject.frontmatter.title}</span>
              </div>
            </Link>
          ) : <div className="flex-1" />}
        </div>
      )}
      </article>
      <TableOfContents source={project.content} />
    </div>
  );
}
