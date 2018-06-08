import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ArticleMeta {
  slug: string;
  title: string;
  category: string;
  icon: string;
  color: string;
  excerpt: string;
  readTime: string;
  date: string;
  source: string;
}

function getArticlesFromDir(dirName: string): ArticleMeta[] {
  const dir = path.join(process.cwd(), "src/content", dirName);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(dir, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        slug: filename.replace(/\.md$/, ""),
        title: data.title,
        category: data.category,
        icon: data.icon,
        color: data.color,
        excerpt: data.excerpt,
        readTime: data.readTime,
        date: data.date,
        source: dirName,
      };
    });
}

export function getArticles(): ArticleMeta[] {
  const sources = ["code", "life"];
  const allArticles = sources.flatMap((src) => getArticlesFromDir(src));

  return allArticles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}