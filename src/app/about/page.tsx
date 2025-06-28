import { Header } from '@/components';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* 个人介绍卡片 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">I</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">impower</h1>
              <p className="text-xl text-gray-600">Full Stack Developer & Tech Enthusiast</p>
            </div>

            {/* 个人简介 */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">关于我</h2>
              <p className="text-gray-700 mb-6">
                你好！我是impower，一名充满热情的全栈开发者。我热爱编程、游戏和音乐，
                喜欢探索新技术并将它们应用到实际项目中。
              </p>
              
              <p className="text-gray-700 mb-6">
                我专注于现代Web开发技术栈，包括React、Next.js、TypeScript等前端技术，
                以及Node.js、Python等后端技术。我相信技术的力量可以改变世界，
                并且一直在努力提升自己的技能。
              </p>

              <p className="text-gray-700 mb-8">
                除了编程，我还喜欢玩游戏和听音乐。这些爱好不仅让我放松身心，
                也为我提供了很多创意灵感。在这个博客里，我会分享我的技术心得、
                游戏体验和音乐推荐。
              </p>
            </div>

            {/* 技能展示 */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">技术技能</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-blue-600 font-semibold mb-1">前端</div>
                  <div className="text-sm text-gray-600">React, Next.js, TypeScript</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-green-600 font-semibold mb-1">后端</div>
                  <div className="text-sm text-gray-600">Node.js, Python, Express</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-purple-600 font-semibold mb-1">数据库</div>
                  <div className="text-sm text-gray-600">MongoDB, PostgreSQL</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <div className="text-yellow-600 font-semibold mb-1">工具</div>
                  <div className="text-sm text-gray-600">Git, Docker, AWS</div>
                </div>
              </div>
            </div>

            {/* 兴趣爱好 */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">兴趣爱好</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">游戏</h3>
                  <p className="text-gray-600 text-sm">喜欢各种类型的游戏，从独立游戏到3A大作</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">音乐</h3>
                  <p className="text-gray-600 text-sm">热爱各种音乐风格，从古典到电子音乐</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">编程</h3>
                  <p className="text-gray-600 text-sm">享受解决问题的过程，热爱学习新技术</p>
                </div>
              </div>
            </div>

            {/* 联系方式 */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">联系我</h2>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:contact@example.com" className="flex items-center text-blue-600 hover:text-blue-800">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-gray-800">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 