import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Timestamp } from 'next/dist/server/lib/cache-handlers/types';

export interface ArticleMeta {
  slug: string;
  title: string;
  category: string;
  icon: string;
  color: string;
  excerpt: string;
  readTime: string;
  date: string;
}

export function getArticles(): ArticleMeta[] {
  const dir = path.join(process.cwd(), '/src/content/code/');
  const filenames = fs.readdirSync(dir);

  return filenames.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    return {
      slug: filename.replace(/\.md$/, ''),
      title: data.title,
      category: data.category,
      icon: data.icon,
      color: data.color,
      excerpt: data.excerpt,
      readTime: data.readTime,
      date: data.date,
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
