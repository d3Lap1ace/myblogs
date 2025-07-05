// app/code/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { Header } from '@/components';


export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const filePath = path.join(process.cwd(), 'src/content/code', `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        notFound();
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const processedContent = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(content);

    const contentHtml = processedContent.toString();
    console.log(contentHtml);

    return (
        <div>
            <div>
                <Header />
            </div>
            <div className="max-w-3xl mx-auto py-12 px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{data.title}</h1>
                <div className="markdown" dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>
        </div>

    );
}