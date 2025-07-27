'use client';

import { useState, useEffect } from 'react';

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // 滚动超过 300px 时显示
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    // 初始检查一次
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="
        fixed bottom-8 right-8
        bg-pink-600 text-white
        p-3 rounded-full
        shadow-lg hover:bg-pink-700
        transition-colors
      "
      aria-label="回到顶部"
    >
      ↑
    </button>
  );
}