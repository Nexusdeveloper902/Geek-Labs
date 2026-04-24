import { getDocumentBySlug, getSlugs, getAllDocuments } from "@/lib/mdx";
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

  const allPosts = getAllDocuments("blog");
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <div className="mx-auto max-w-5xl flex gap-10 items-start">
      <article className="w-full max-w-3xl flex-1">
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
        <MDXRemote 
          source={post.content} 
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

      {(prevPost || nextPost) && (
        <div className="mt-16 border-t border-white/10 pt-12 flex flex-col sm:flex-row justify-between gap-4">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="group flex-1">
              <div className="glass-card flex h-full flex-col justify-center rounded-xl p-6 transition-colors group-hover:border-primary/50">
                <span className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowLeft size={16} /> Previous
                </span>
                <span className="font-bold group-hover:text-primary transition-colors line-clamp-1">{prevPost.frontmatter.title}</span>
              </div>
            </Link>
          ) : <div className="flex-1" />}
          
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className="group flex-1 text-right">
              <div className="glass-card flex h-full flex-col justify-center rounded-xl p-6 transition-colors group-hover:border-primary/50">
                <span className="mb-2 flex items-center justify-end gap-2 text-sm text-muted-foreground">
                  Next <ArrowRight size={16} />
                </span>
                <span className="font-bold group-hover:text-primary transition-colors line-clamp-1">{nextPost.frontmatter.title}</span>
              </div>
            </Link>
          ) : <div className="flex-1" />}
        </div>
      )}
      </article>
      <TableOfContents source={post.content} />
    </div>
  );
}
