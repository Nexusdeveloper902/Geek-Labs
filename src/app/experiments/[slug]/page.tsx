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
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = getSlugs("experiments");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const experiment = getDocumentBySlug("experiments", slug);

  if (!experiment) {
    return { title: "Experiment Not Found" };
  }

  const { title, description, cover, tags, date } = experiment.frontmatter;

  return {
    title,
    description: description || `Check out "${title}" — an experiment from Geek Labs Studio.`,
    openGraph: {
      title: `${title} | Geek Labs Studio`,
      description: description || `Check out "${title}" — an experiment from Geek Labs Studio.`,
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
      description: description || `Check out "${title}" — an experiment from Geek Labs Studio.`,
      ...(cover && { images: [cover] }),
    },
  };
}

export default async function ExperimentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experiment = getDocumentBySlug("experiments", slug);

  if (!experiment) {
    notFound();
  }

  const allExperiments = getAllDocuments("experiments");
  const currentIndex = allExperiments.findIndex((e) => e.slug === slug);
  const nextExperiment = currentIndex < allExperiments.length - 1 ? allExperiments[currentIndex + 1] : null;
  const prevExperiment = currentIndex > 0 ? allExperiments[currentIndex - 1] : null;

  return (
    <div className="mx-auto max-w-5xl flex flex-col lg:flex-row gap-10 items-start">
      <article className="w-full max-w-3xl flex-1">
        <div className="mb-8">
          <Link href="/experiments" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back to experiments
          </Link>
          <div className="mb-4 mt-6 flex items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={experiment.frontmatter.date}>
              {format(new Date(experiment.frontmatter.date), "MMMM d, yyyy")}
            </time>
            {experiment.frontmatter.tags && (
              <>
                <span className="hidden sm:inline">•</span>
                <div className="flex flex-wrap gap-2">
                  {experiment.frontmatter.tags.map((tag: string) => (
                    <span key={tag} className="text-primary">#{tag}</span>
                  ))}
                </div>
              </>
            )}
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {experiment.frontmatter.title}
          </h1>
        </div>

        {experiment.frontmatter.cover && (
          <div className="relative mb-12 aspect-[21/9] w-full overflow-hidden rounded-2xl border border-white/10 glass-card">
            <Image
              src={experiment.frontmatter.cover}
              alt={experiment.frontmatter.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-invert max-w-none">
          <MDXRemote 
            source={experiment.content} 
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

        {(prevExperiment || nextExperiment) && (
          <div className="mt-16 border-t border-white/10 pt-12 flex flex-col sm:flex-row justify-between gap-4">
            {prevExperiment ? (
              <Link href={`/experiments/${prevExperiment.slug}`} className="group flex-1">
                <div className="glass-card flex h-full flex-col justify-center rounded-xl p-6 transition-colors group-hover:border-primary/50">
                  <span className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <ArrowLeft size={16} /> Previous
                  </span>
                  <span className="font-bold group-hover:text-primary transition-colors line-clamp-1">{prevExperiment.frontmatter.title}</span>
                </div>
              </Link>
            ) : <div className="flex-1" />}
            
            {nextExperiment ? (
              <Link href={`/experiments/${nextExperiment.slug}`} className="group flex-1 text-right">
                <div className="glass-card flex h-full flex-col justify-center rounded-xl p-6 transition-colors group-hover:border-primary/50">
                  <span className="mb-2 flex items-center justify-end gap-2 text-sm text-muted-foreground">
                    Next <ArrowRight size={16} />
                  </span>
                  <span className="font-bold group-hover:text-primary transition-colors line-clamp-1">{nextExperiment.frontmatter.title}</span>
                </div>
              </Link>
            ) : <div className="flex-1" />}
          </div>
        )}
      </article>
      <TableOfContents source={experiment.content} />
    </div>
  );
}
