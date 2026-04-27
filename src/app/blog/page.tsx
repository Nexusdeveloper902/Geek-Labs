import { getAllDocuments } from "@/lib/mdx";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devlog",
  description:
    "Notes, progress updates, and technical deep-dives into game development, embedded systems, and hardware hacking projects at Geek Labs Studio.",
  openGraph: {
    title: "Devlog | Geek Labs Studio",
    description:
      "Notes, progress updates, and technical deep-dives into game development, embedded systems, and hardware hacking projects.",
  },
};

export default function BlogPage() {
  const posts = getAllDocuments("blog");

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Devlog</h1>
        <p className="text-lg text-muted-foreground">
          Notes, progress updates, and technical deep-dives into my projects.
        </p>
      </div>
      
      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <article className="glass-card group flex flex-col overflow-hidden rounded-2xl sm:flex-row">
              {post.frontmatter.cover && (
                <div className="relative aspect-video w-full sm:w-1/3">
                  <Image
                    src={post.frontmatter.cover}
                    alt={post.frontmatter.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col justify-center p-6">
                <div className="mb-2 text-sm text-muted-foreground">
                  {format(new Date(post.frontmatter.date), "MMMM d, yyyy")}
                </div>
                <h2 className="mb-3 text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  {post.frontmatter.title}
                </h2>
                <p className="text-muted-foreground line-clamp-2">
                  {post.frontmatter.description}
                </p>
                {post.frontmatter.tags && (
                  <div className="mt-4 flex gap-2">
                    {post.frontmatter.tags.map((tag: string) => (
                      <span key={tag} className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
