import { getDocumentBySlug, getSlugs } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/components/MDXComponents";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const slugs = getSlugs("blog");
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getDocumentBySlug("blog", slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl">
      <div className="mb-8">
        <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} /> Back to devlogs
        </Link>
        <h1 className="mb-4 mt-6 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {post.frontmatter.title}
        </h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <time dateTime={post.frontmatter.date}>
            {format(new Date(post.frontmatter.date), "MMMM d, yyyy")}
          </time>
          {post.frontmatter.tags && (
            <>
              <span>•</span>
              <div className="flex gap-2">
                {post.frontmatter.tags.map((tag: string) => (
                  <span key={tag} className="text-primary">#{tag}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {post.frontmatter.cover && (
        <div className="relative mb-12 aspect-[21/9] w-full overflow-hidden rounded-2xl border border-white/10 glass-card">
          <Image
            src={post.frontmatter.cover}
            alt={post.frontmatter.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-invert max-w-none">
        <MDXRemote source={post.content} components={MDXComponents} />
      </div>
    </article>
  );
}
