// app/code/page.tsx
import { Header } from '@/components';
import { getArticles, ArticleMeta } from '@/components/getArticles';

export default function CodePage() {
  const articles: ArticleMeta[] = getArticles();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Code & Development</h1>
          <p className="text-xl text-gray-600">Technical articles, coding tutorials, and development insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-8 h-8 bg-${article.color}-500 rounded-lg flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">{article.icon}</span>
                  </div>
                  <span className="ml-3 text-sm text-gray-500">{article.category}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                  <a href={`/code/${article.slug}`} className="text-blue-600 hover:text-blue-800 font-medium">
                    Read More →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
