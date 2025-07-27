import Header from "@/components/Header";
import IntroCard from "@/components/IntroCard";
import { getArticles, ArticleMeta } from "@/components/getArticles";

export default function CodePage() {
  // 在这里安全地使用 fs、gray-matter
  const latestArticles: ArticleMeta[] = getArticles()
    .slice(0, 3);

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: "url(/myblogs/am_background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative z-10">
        <Header />
        <IntroCard latestArticles={latestArticles} />
      </div>
    </div>
  );
}