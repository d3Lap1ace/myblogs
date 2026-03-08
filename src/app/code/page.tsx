import { Header } from "@/components";
import { getArticles, ArticleMeta } from "@/components/getArticles";
import ArticleList from "@/components/ArticleList";

export default function CodePage() {
  const articles: ArticleMeta[] = getArticles().filter(
    (a) => a.source === "code"
  );

  const sortedArticles = articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ArticleList articles={sortedArticles} />
      </main>
    </div>
  );
}
