"use client";

import React from "react";
import Link from "next/link";
import type { ArticleMeta } from "@/components/getArticles";

interface LatestArticlesCardProps {
  latestArticles: ArticleMeta[];
}

const LatestArticlesCard: React.FC<LatestArticlesCardProps> = ({
  latestArticles,
}) => {
  const sortedArticles = [...latestArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-900 mb-5">Latest updates</h1>
      <div className="w-full grid gap-4 md:grid-cols-1">
        {sortedArticles.map((article) => (
          <Link
            key={`${article.source}-${article.slug}`}
            href={`/${article.source}/${article.slug}`}
            className="block border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              {article.title}
            </h2>
            {article.date && (
              <p className="text-gray-400 text-xs mb-3">{article.date}</p>
            )}
            {article.excerpt && (
              <p className="text-gray-600 text-sm mb-2">{article.excerpt}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestArticlesCard;