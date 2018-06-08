"use client";

import React from "react";
import Image from "next/image";
import { FaGithub, FaEnvelope } from "react-icons/fa";

const IntroCard: React.FC = () => {
  return (
    <div className="w-full p-6">
      <div className="text-center">
        <Image
          src="/myblogs/a2.png"
          alt="Portrait of Lucas Marinotta"
          width={160}
          height={160}
          className="w-40 h-40 rounded-full mx-auto mb-5"
        />
        <h1 className="text-xl font-bold text-gray-900 mb-3">
          Lucas Marinotta
        </h1>
        <p className="text-l text-pink-600 font-medium mb-3">
          Software Engineer
        </p>
        <p className="text-gray-600 text-m leading-relaxed mb-3 max-w-sm mx-auto">
          My name is Lucas Marinotta. I&apos;m 26 years old, born in China, and living in Manhattan, New York. And I believe that men and women deserve the free and equal right to choose how they live. Whether you are Asian, White, or Black; whether you are gay, straight, bi, or transgender; whether you are Catholic, Muslim, or Buddhist, your God is right here, your God is right there, no matter who you are.
        </p>
      </div>

      {/* Contact information */}
      <div className="mt-6 p-4 text-left">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact</h2>
        <div className="flex items-center text-gray-700 font-medium mb-2">
          <FaGithub className="w-5 h-5 mr-2 text-gray-700" />
          <a
            href="https://github.com/d3lap1ace"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-blue-600 cursor-pointer"
          >
            GitHub
          </a>
        </div>

        <div className="flex items-center text-gray-700 font-medium">
          <FaEnvelope className="w-5 h-5 mr-2 text-gray-700" />
          <a
            href="mailto:reald3lap1ace@gmail.com"
            className="text-gray-700 hover:text-blue-600 cursor-pointer"
          >
            Gmail
          </a>
        </div>
      </div>
    </div>
  );
};

export default IntroCard;
