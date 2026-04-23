import { getDocumentBySlug, getSlugs, getPostsByProject } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/components/MDXComponents";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

export async function generateStaticParams() {
  const slugs = getSlugs("projects");
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getDocumentBySlug("projects", slug);
  const relatedPosts = getPostsByProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-4 text-sm text-muted-foreground">
          {format(new Date(project.frontmatter.date), "MMMM d, yyyy")}
        </div>
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {project.frontmatter.title}
        </h1>
        {project.frontmatter.tags && (
          <div className="flex gap-2">
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
        <MDXRemote source={project.content} components={MDXComponents} />
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
    </article>
  );
}
