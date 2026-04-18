import Header from "@/components/Header";
import IntroCard from "@/components/IntroCard";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <IntroCard />
      </main>
    </div>
  );
}
