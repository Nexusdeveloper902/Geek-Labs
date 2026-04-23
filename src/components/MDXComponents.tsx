import Image from 'next/image';

export const MDXComponents = {
  h1: (props: any) => <h1 className="mt-8 mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl" {...props} />,
  h2: (props: any) => <h2 className="mt-10 mb-4 text-3xl font-bold tracking-tight transition-colors first:mt-0" {...props} />,
  h3: (props: any) => <h3 className="mt-8 mb-4 text-2xl font-semibold tracking-tight" {...props} />,
  p: (props: any) => <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground" {...props} />,
  ul: (props: any) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-muted-foreground" {...props} />,
  ol: (props: any) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 text-muted-foreground" {...props} />,
  li: (props: any) => <li className="text-muted-foreground" {...props} />,
  a: (props: any) => <a className="font-medium text-primary underline underline-offset-4 hover:text-primary/80" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground" {...props} />
  ),
  code: (props: any) => {
    // If it has a language class, it's a code block
    if (props.className) {
      return <code className="relative rounded bg-muted/50 px-[0.3rem] py-[0.2rem] font-mono text-sm text-primary" {...props} />;
    }
    // Inline code
    return <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props} />;
  },
  pre: (props: any) => (
    <pre className="mt-6 mb-4 overflow-x-auto rounded-lg border border-white/10 bg-[#0d0d0e] p-4 glass-card" {...props} />
  ),
  img: (props: any) => (
    <span className="my-8 block overflow-hidden rounded-xl border border-white/10 glass-card">
      <img className="object-cover w-full h-auto" {...props} alt={props.alt || "Article image"} />
    </span>
  ),
  Image: (props: any) => (
    <span className="my-8 block overflow-hidden rounded-xl border border-white/10 glass-card relative aspect-video w-full">
      <Image fill className="object-cover" {...props} alt={props.alt || "Article image"} />
    </span>
  ),
};
