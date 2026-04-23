import Image from "next/image";

export default function IntroCard() {
  return (
    <article className="w-full">
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-8 mb-12">
        <Image
          src="/myblogs/a2.png"
          alt="Lucas Marinotta"
          width={160}
          height={160}
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full ring-4 ring-white shadow-lg"
        />
        <div className="text-center sm:text-left">
          <p className="text-xs uppercase tracking-[0.2em] text-pink-600 font-medium mb-2">
            ~/about
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold text-[#15171a] leading-none">
            Lucas Marinotta
          </h1>
          <p className="mt-3 text-lg text-[rgba(0,0,0,0.55)]">Software Engineer</p>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-[#15171a] leading-relaxed">
        <p>
          My name is Lucas Marinotta. I&apos;m 26 years old, born in China, and
          living in Manhattan, New York. And I believe that men and women
          deserve the free and equal right to choose how they live. Whether you
          are Asian, White, or Black; whether you are gay, straight, bi, or
          transgender; whether you are Catholic, Muslim, or Buddhist, your God
          is right here, your God is right there, no matter who you are.
        </p>
      </div>

    </article>
  );
}
