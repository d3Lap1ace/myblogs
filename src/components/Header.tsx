"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRss } from "react-icons/fa";

const navItems = [
  { name: "Posts", href: "/", match: (p: string) => p === "/" || p.startsWith("/posts") },
  { name: "About", href: "/about", match: (p: string) => p.startsWith("/about") },
];

const RSS_URL = "https://d3lap1ace.github.io/myblogs/rss.xml";

export default function Header({ className = "" }: { className?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={`bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-20 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center h-16 justify-between">
          <Link
            href="/"
            className="font-display text-2xl font-medium tracking-tight text-gray-900 hover:text-pink-600 transition-colors"
          >
            impower<span className="text-pink-600">&#39;</span>blogs
          </Link>

          <nav className="hidden md:flex space-x-2 items-center">
            {navItems.map((item) => {
              const isActive = item.match(pathname);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${
                    isActive ? "text-pink-800" : "text-pink-600 hover:text-pink-800"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute left-3 right-3 -bottom-px h-0.5 bg-pink-600" />
                  )}
                </Link>
              );
            })}
            <a
              href={RSS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="RSS Feed"
              className="px-3 py-2 text-pink-600 hover:text-pink-800 transition-colors"
            >
              <FaRss className="w-4 h-4" />
            </a>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="text-pink-600 hover:text-pink-800 focus:outline-none focus:text-pink-800"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
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
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navItems.map((item) => {
                const isActive = item.match(pathname);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium uppercase tracking-wide transition-colors duration-200 ${
                      isActive
                        ? "text-pink-800 border-b-2 border-pink-500"
                        : "text-pink-600 hover:text-pink-800"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <a
                href={RSS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium uppercase tracking-wide text-pink-600 hover:text-pink-800 transition-colors"
              >
                <FaRss className="w-4 h-4" />
                RSS
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
