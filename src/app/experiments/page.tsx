import { getAllDocuments } from "@/lib/mdx";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiments",
  description:
    "Mini-projects, proof-of-concepts, and experimental tinkering from Geek Labs Studio — pushing the limits of hardware and code.",
  openGraph: {
    title: "Experiments | Geek Labs Studio",
    description:
      "Mini-projects, proof-of-concepts, and experimental tinkering — pushing the limits of hardware and code.",
  },
};

export default function ExperimentsPage() {
  const experiments = getAllDocuments("experiments");

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Experiments
        </h1>
        <p className="text-xl text-muted-foreground">
          Mini-projects, proof-of-concepts, and random tinkering.
        </p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {experiments.map((exp) => (
          <article key={exp.slug} className="break-inside-avoid">
            <Link href={`/experiments/${exp.slug}`} className="group block h-full">
              <div className="glass-card flex flex-col overflow-hidden rounded-2xl border border-white/10 transition-colors group-hover:border-primary/50">
                {exp.frontmatter.cover && (
                  <div className="relative aspect-video w-full overflow-hidden border-b border-white/5">
                    <Image
                      src={exp.frontmatter.cover}
                      alt={exp.frontmatter.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h2 className="mb-2 text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {exp.frontmatter.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {exp.frontmatter.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <time dateTime={exp.frontmatter.date} className="text-xs font-medium text-muted-foreground">
                      {format(new Date(exp.frontmatter.date), "MMM d, yyyy")}
                    </time>
                    {exp.frontmatter.tags && (
                      <div className="flex gap-1.5">
                        {exp.frontmatter.tags.slice(0, 2).map((tag: string) => (
                          <span key={tag} className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
