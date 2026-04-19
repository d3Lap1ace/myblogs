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
import Header from "@/components/Header";
import BackToTopButton from "@/components/BackToTopButton";

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "src/content/posts");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => ({ slug: file.replace(/\.md$/, "") }));
}

export const dynamicParams = false;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "src/content/posts", `${slug}.md`);

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

  const formattedDate = new Date(data.date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="bg-[#f7f9fc] min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto pt-16 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] font-medium mb-4">
            <time className="text-gray-500">{formattedDate}</time>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            {data.title}
          </h1>
        </header>
        <div
          className="markdown markdown-content bg-white p-6 sm:p-10 rounded-lg text-gray-900 shadow-sm"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </main>
      <BackToTopButton />
    </div>
  );
}
