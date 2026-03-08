"use client";

import Link from "next/link";
import type { ArticleMeta } from "@/components/getArticles";

interface ArticleListProps {
  articles: ArticleMeta[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-900 mb-5">
        Posts
      </h1>
      <div className="w-full grid gap-4 md:grid-cols-1">
        {articles.map((article) => (
          <div
            key={`${article.source}-${article.slug}`}
            className="p-4"
          >
            {article.date && (
              <p className="text-gray-400 text-sm mb-2">{article.date}</p>
            )}
            <Link href={`/${article.source}/${article.slug}`}>
              <h2 className="text-xl font-semibold text-gray-900 hover:text-pink-600 transition-colors">
                {article.title}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
