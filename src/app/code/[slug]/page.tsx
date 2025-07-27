// app/code/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import { Header } from "@/components";
import BackToTopButton from "@/components/BackToTopButton";

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "src/content/code");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => ({ slug: file.replace(/\.md$/, "") }));
}

export const dynamicParams = false;

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "src/content/code", `${slug}.md`);

  if (!fs.existsSync(filePath)) notFound();

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();


  const dt = new Date(data.date);
  const formattedDate = dt.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto py-12 px-4">

        <h1 className="text-4xl md:text-4xl font-bold mb-2">{data.title}</h1>

        <div className="flex flex-wrap items-center text-gray-500 text-sm mb-8 space-x-4">
          <time>{formattedDate}</time>
          {data.readTime && <span> 阅读 {data.readTime}</span>}
          {data.category && <span> 分类：{data.category}</span>}
        </div>

        <div
          className="markdown markdown-content bg-white p-6 rounded-lg shadow"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </main>

      <BackToTopButton />
    </div>
  );
}