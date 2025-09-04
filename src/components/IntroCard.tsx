"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { ArticleMeta } from "@/components/getArticles";

interface IntroCardProps {
  latestArticles: ArticleMeta[];
}

const IntroCard: React.FC<IntroCardProps> = ({ latestArticles }) => {
  const [, setVisitCount] = useState<number>(0);

  useEffect(() => {
    fetch("https://api.countapi.xyz/hit/impower-blogs/visits")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.value === "number") {
          setVisitCount(data.value);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col items-center justify-center border border-gray-900 p-3 ">
      <div className="w-100 p-10 text-center border border-gray-900" >
        <img
          src="/myblogs/a2.png"
          alt="Portrait of Lucas Marinotta"
          className="w-40 h-40 rounded-full mx-auto mb-5"
        />
        <h1 className="text-xl font-bold text-gray-900 mb-3">
          Lucas Marinotta
        </h1>
        <p className="text-l text-pink-600 font-medium mb-3">
          Cloud Computing Engineer
        </p>
        <p className="text-gray-600 text-m leading-relaxed mb-3">
          you know that crazy person enjoy the world first.
        </p>
        <p>
          who loves gaming, especially challenging AAA titles like Dark Souls
          and action games. I enjoy pop and rock music, from Lady Gaga to
          energetic tunes, and I m passionate about art and creativity, which
          inspire my imagination and approach to both life and work.
        </p>
      </div>

      {/* 最新动态 */}
      <div className="w-full max-w-xl">
        <h1 className="text-xl font-semibold text-gray-900 mb-5">最新动态</h1>
        <ul className="list-disc list-inside space-y-1 text-left">
          {latestArticles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/code/${article.slug}`}
                className="text-blue-600 hover:underline"
              >
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IntroCard;
