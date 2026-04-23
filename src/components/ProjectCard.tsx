import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

interface ProjectCardProps {
  title: string;
  description: string;
  slug: string;
  cover: string;
  date: string;
  tags?: string[];
  type?: "blog" | "projects";
}

export function ProjectCard({ title, description, slug, cover, date, tags, type = "projects" }: ProjectCardProps) {
  return (
    <Link href={`/${type}/${slug}`} className="group block h-full">
      <article className="glass-card flex h-full flex-col overflow-hidden rounded-2xl">
        <div className="relative aspect-video w-full overflow-hidden bg-muted/50">
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <time dateTime={date}>{format(new Date(date), "MMMM d, yyyy")}</time>
          </div>
          <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
