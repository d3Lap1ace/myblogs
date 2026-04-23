"use client";

import { useState } from "react";
import Link from "next/link";
import type { ArticleMeta } from "@/components/getArticles";

interface ArticleListProps {
  articles: ArticleMeta[];
  pageSize?: number;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function ArticleList({ articles, pageSize = 10 }: ArticleListProps) {
  const [visible, setVisible] = useState(pageSize);
  const shown = articles.slice(0, visible);
  const hasMore = visible < articles.length;

  return (
    <section>
      <ul className="divide-y divide-[rgba(0,0,0,0.08)]">
        {shown.map((article) => (
          <li key={article.slug} className="group">
            <Link href={`/posts/${article.slug}`} className="block py-5">
              {article.date && (
                <div className="flex items-center justify-end mb-2 text-xs uppercase tracking-[0.15em] font-medium">
                  <time className="text-[rgba(0,0,0,0.55)] shrink-0">
                    {formatDate(article.date)}
                  </time>
                </div>
              )}
              <h3 className="text-xl sm:text-2xl font-medium text-[#15171a] leading-snug group-hover:text-pink-600 transition-colors">
                {article.title}
              </h3>
            </Link>
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + pageSize)}
            className="text-sm tracking-[0.15em] uppercase text-pink-600 hover:text-pink-800 border border-pink-300 hover:border-pink-600 rounded px-6 py-2 transition-colors"
          >
            $ load --more
          </button>
        </div>
      )}
    </section>
  );
}
