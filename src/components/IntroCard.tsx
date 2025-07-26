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
    <div className="bg-white bg-opacity-90 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 max-w-sm ml-35 mt-35">
      {/* 头像和基本信息 */}
      <div className="text-center mb-4">
        <img
          src="/myblogs/a2.png"
          alt="Portrait of Lucas Marinotta"
          className="w-20 h-20 rounded-full mx-auto mb-3"
        />
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          Lucas Marinotta
        </h3>
        <p className="text-pink-600 font-medium text-sm mb-2">
          Full Stack Developer
        </p>
        <p className="text-gray-600 text-base leading-relaxed mb-4">
          you know that crazy person enjoy the world first.
        </p>
      </div>

      {/* 最新动态 */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">最新动态</h4>
        <ul className="list-disc list-inside space-y-1">
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

      {/* 总访问量 */}
      <p className="text-sm text-gray-500 mt-4 ">总访问量：6238</p>
    </div>
  );
};

export default IntroCard;
