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

function resolvePostFile(dir: string, slug: string): string | null {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const match = files.find(
    (f) => f.replace(/^\d+\./, "").replace(/\.md$/, "") === slug
  );
  return match ? path.join(dir, match) : null;
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "src/content/posts");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => ({ slug: file.replace(/^\d+\./, "").replace(/\.md$/, "") }));
}

export const dynamicParams = false;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dir = path.join(process.cwd(), "src/content/posts");
  const filePath = resolvePostFile(dir, slug);

  if (!filePath) notFound();

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
    <div className="bg-white min-h-screen">
      <Header />
      <main className="max-w-[720px] mx-auto pt-16 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] font-medium mb-4">
            <time className="text-[rgba(0,0,0,0.55)]">{formattedDate}</time>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#15171a] leading-tight">
            {data.title}
          </h1>
        </header>
        <div
          className="markdown markdown-content text-[#15171a]"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </main>
      <BackToTopButton />
    </div>
  );
}
