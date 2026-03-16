"use client";

import React from "react";
import Link from "next/link";
import type { ArticleMeta } from "@/components/getArticles";

interface LatestArticlesCardProps {
  latestArticles: ArticleMeta[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toISOString().split('T')[0];
}

const LatestArticlesCard: React.FC<LatestArticlesCardProps> = ({
  latestArticles,
}) => {
  const sortedArticles = [...latestArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-900 mb-5">Posts</h1>
      <div className="w-full grid gap-4 md:grid-cols-1">
        {sortedArticles.map((article) => (
          <div
            key={`${article.source}-${article.slug}`}
            className="p-4"
          >
            {article.date && (
              <p className="text-gray-400 text-sm mb-2">{formatDate(article.date)}</p>
            )}
            <Link href={`/life/${article.slug}`}>
              <h2 className="text-xl font-semibold text-gray-900 hover:text-pink-600 transition-colors">
                {article.title}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestArticlesCard;