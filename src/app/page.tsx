import Header from "@/components/Header";
import ArticleList from "@/components/ArticleList";
import { getArticles } from "@/components/getArticles";

export default function HomePage() {
  const articles = getArticles();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-20">
        <h1 className="text-5xl sm:text-6xl font-bold text-[#15171a] mb-12">
            
        </h1>
        <ArticleList articles={articles} pageSize={10} />
      </main>
    </div>
  );
}
