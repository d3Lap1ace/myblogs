import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
}

export function getArticles(): ArticleMeta[] {
  const dir = path.join(process.cwd(), "src/content/posts");
  if (!fs.existsSync(dir)) return [];

  const articles = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(dir, filename);
      const { data } = matter(fs.readFileSync(filePath, "utf8"));
      const date = data.date instanceof Date ? data.date.toISOString() : data.date;
      return {
        slug: filename.replace(/^\d+\./, "").replace(/\.md$/, ""),
        title: data.title,
        date,
      };
    });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
