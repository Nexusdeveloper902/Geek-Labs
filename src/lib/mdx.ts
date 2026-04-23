import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export type ContentType = 'blog' | 'projects';

export interface Frontmatter {
  title: string;
  date: string;
  project?: string;
  tags?: string[];
  cover?: string;
  description?: string;
  [key: string]: any;
}

export interface MDXDocument {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}

export function getSlugs(type: ContentType): string[] {
  const dirPath = path.join(contentDirectory, type);
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath);
  return files.filter(file => file.endsWith('.mdx')).map(file => file.replace(/\.mdx$/, ''));
}

export function getDocumentBySlug(type: ContentType, slug: string): MDXDocument | null {
  try {
    const filePath = path.join(contentDirectory, type, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as Frontmatter,
      content,
    };
  } catch (e) {
    return null;
  }
}

export function getAllDocuments(type: ContentType): MDXDocument[] {
  const slugs = getSlugs(type);
  const docs = slugs
    .map((slug) => getDocumentBySlug(type, slug))
    .filter((doc): doc is MDXDocument => doc !== null)
    .sort((a, b) => (new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()));
  
  return docs;
}

export function getPostsByProject(projectSlug: string): MDXDocument[] {
  const allPosts = getAllDocuments("blog");
  return allPosts.filter(post => post.frontmatter.project === projectSlug);
}
