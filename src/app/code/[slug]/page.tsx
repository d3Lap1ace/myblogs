import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'src/content/code');
  const files = fs.readdirSync(dir);
  return files.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const filePath = path.join(process.cwd(), 'src/content/code', `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContent);
  return {
    title: data.title || params.slug,
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'src/content/code', `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  const contentHtml = processedContent.toString();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-500 mb-6">{data.readTime}</p>
      <article className="prose prose-lg" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
