import React from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  source: string;
}

export function TableOfContents({ source }: TableOfContentsProps) {
  // Extract headings using regex from raw markdown string
  const headingRegex = /\n(#{2,3})\s+(.+)/g;
  const headings: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(source)) !== null) {
    const level = match[1].length;
    let text = match[2].trim();
    
    // Remove bold/italic markdown from heading text
    text = text.replace(/\*\*(.*?)\*\*/g, '$1');
    text = text.replace(/\*(.*?)\*/g, '$1');
    
    // Generate a basic slug id
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
      
    headings.push({ id, text, level });
  }

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24 hidden xl:block w-64 shrink-0">
      <div className="glass-card rounded-xl border border-white/10 p-6">
        <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
          On this page
        </h4>
        <ul className="space-y-3 text-sm">
          {headings.map((heading, index) => (
            <li
              key={index}
              style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
            >
              <a
                href={`#${heading.id}`}
                className="text-muted-foreground hover:text-primary transition-colors line-clamp-2"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
