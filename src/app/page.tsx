import Header from "@/components/Header";
import IntroCard from "@/components/IntroCard";
import LatestArticlesCard from "@/components/LatestArticlesCard";
import { getArticles, ArticleMeta } from "@/components/getArticles";

function ProfileLayout({ latestArticles }: { latestArticles: ArticleMeta[] }) {
  return (
    <div className="flex flex-col-reverse lg:flex-row gap-10 items-start justify-center px-4 lg:px-20">
      {/* 个人简介 - 左侧 */}
      <div className="w-full lg:w-1/3" style={{ marginTop: "170px" }}>
        <IntroCard />
      </div>
      {/* 最近更新 - 上方（移动端）/ 右侧（桌面端） */}
      <div className="w-full lg:w-2/3" style={{ marginTop: "100px" }}>
        <LatestArticlesCard latestArticles={latestArticles} />
      </div>
    </div>
  );
}

export default function CodePage() {
  const latestArticles: ArticleMeta[] = getArticles().slice(0, 3);

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundColor: "#f7f9fc",
      }}
    >
      <div className="relative z-10">
        <Header />
        <ProfileLayout latestArticles={latestArticles} />
      </div>
    </div>
  );
}
