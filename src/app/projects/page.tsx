import { ProjectCard } from "@/components/ProjectCard";
import { getAllDocuments } from "@/lib/mdx";

export default function ProjectsPage() {
  const projects = getAllDocuments("projects");

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Projects</h1>
        <p className="text-lg text-muted-foreground">
          A showcase of my games, electronics, and embedded systems.
        </p>
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
    </div>
  );
}
