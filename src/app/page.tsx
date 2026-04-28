import { ProjectCard } from "@/components/ProjectCard";
import { getAllDocuments } from "@/lib/mdx";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Geek Labs Studio — Code it. Build it. Break it.",
  },
  description:
    "Geek Labs Studio is the developer portfolio and engineering journal of Jerónimo — showcasing game development, embedded systems, hardware hacking, and experimental projects.",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jerónimo",
  url: "https://geek-labs-eight.vercel.app",
  sameAs: ["https://github.com/Nexusdeveloper902"],
  jobTitle: "Developer",
  knowsAbout: [
    "Game Development",
    "Embedded Systems",
    "Automation",
    "C++",
    "Raspberry Pi Pico",
    "Next.js",
  ],
};

export default function Home() {
  const projects = getAllDocuments("projects").slice(0, 2);
  const posts = getAllDocuments("blog").slice(0, 3);

  return (
    <div className="flex flex-col gap-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <section className="mt-12 flex flex-col gap-6" aria-label="Hero introduction">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          Hi, I'm <span className="text-primary">Jerónimo</span>
        </h1>
        <p className="max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
          <span className="bg-gradient-to-r from-primary via-emerald-400 to-secondary bg-clip-text text-transparent">
            Code it. Build it. Break it.
          </span>
        </p>
        <p className="max-w-2xl text-xl text-muted-foreground">
          Game Developer | Embedded Systems | Automation. <br />
          Building creative software, electronics projects, and experimental systems.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <Link
            href="/projects"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View Projects
          </Link>
          <Link
            href="/experiments"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-8 text-sm font-medium transition-colors hover:bg-white/10"
          >
            View Experiments
          </Link>
          <Link
            href="/blog"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-8 text-sm font-medium transition-colors hover:bg-white/10"
          >
            Read Blog
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-8" aria-label="Featured projects">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
          <Link href="/projects" className="group flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80">
            View all <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.frontmatter.title}
              description={project.frontmatter.description || ""}
              slug={project.slug}
              cover={project.frontmatter.cover || ""}
              date={project.frontmatter.date}
              tags={project.frontmatter.tags}
              type="projects"
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-8" aria-label="Latest devlogs">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Latest Devlogs</h2>
          <Link href="/blog" className="group flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80">
            View all <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="glass-card flex flex-col justify-between gap-4 rounded-xl p-6 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-xl font-bold group-hover:text-primary">{post.frontmatter.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{post.frontmatter.description}</p>
                </div>
                <div className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                  {new Date(post.frontmatter.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
