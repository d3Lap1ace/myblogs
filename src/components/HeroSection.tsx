'use client';

import React, { useState } from 'react';

const HeroSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const cards = [
    {
      title: 'About Me',
      description: 'Learn more about who I am and what I do',
      icon: '👤'
    },
    {
      title: 'Code',
      description: 'Technical articles and coding tutorials',
      icon: '💻'
    },
    {
      title: 'Game',
      description: 'Gaming experiences and reviews',
      icon: '🎮'
    },
    {
      title: 'Music',
      description: 'Music recommendations and thoughts',
      icon: '🎵'
    }
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* 主页欢迎内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to MyBlogs
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Explore my thoughts on code, games, music, and more
          </p>
        </div>
      </main>

      {/* 侧边栏切换按钮 */}
      <button
        onClick={toggleSidebar}
        className="fixed top-20 left-4 z-50 bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* 侧边栏遮罩 - 更透明以显示背景 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* 侧边栏 */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white bg-opacity-95 backdrop-blur-sm shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* 侧边栏头部 */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-pink-600 mb-2">
            Navigation
          </h2>
          <p className="text-gray-600 text-sm">
            Choose a category to explore
          </p>
        </div>

        {/* 侧边栏内容 */}
        <div className="p-6">
          <div className="space-y-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-80 backdrop-blur-sm p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-opacity-90 border border-gray-100 cursor-pointer group"
                onClick={() => {
                  // 这里可以添加导航逻辑
                  console.log(`Navigating to ${card.title}`);
                }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{card.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors duration-200">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {card.description}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-pink-600 transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* 侧边栏底部 */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                Made with ❤️ by impower
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection; 