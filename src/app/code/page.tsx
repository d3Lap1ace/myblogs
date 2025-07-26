import { Header } from "@/components";
import { getArticles, ArticleMeta } from "@/components/getArticles";
import Link from "next/link";

export default function CodePage() {
  const articles: ArticleMeta[] = getArticles();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Code</h1>
          <p className="text-xl text-gray-600">
            Technical articles, coding tutorials, and development insights
          </p>
        </div>
        <div className="mb-4">
          <p className="text-2xl font-semibold text-gray-900 text-left">
            最新动态
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {articles.map((article) => {
            const dt = new Date(article.date);
            const formatted = dt.toLocaleString("zh-CN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });

            return (
              <div key={article.slug} className="bg-white rounded-lg shadow-md">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-1">
                    <Link
                      href={`/code/${article.slug}`}
                      className="hover:text-gray-600 hover:underline underline-offset-4"
                    >
                      {article.title}
                    </Link>
                  </h3>

                  <time className="block text-xs text-gray-400 mb-4">
                    {formatted}
                  </time>

                  <p className="mb-4">{article.excerpt}</p>

                  <div className="text-right">
                    <Link
                      href={`/code/${article.slug}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      More
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
