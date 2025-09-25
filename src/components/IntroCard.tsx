"use client";

import React from "react";
import { FaGithub, FaEnvelope } from "react-icons/fa";

const IntroCard: React.FC = () => {
  return (
    <div className="w-full border-gray-900 p-6">
      <div className="text-center">
        <img
          src="/myblogs/a2.png"
          alt="Portrait of Lucas Marinotta"
          className="w-40 h-40 rounded-full mx-auto mb-5"
        />
        <h1 className="text-xl font-bold text-gray-900 mb-3">
          Lucas Marinotta
        </h1>
        <p className="text-l text-pink-600 font-medium mb-3">
          Cloud Computing Engineer
        </p>
        <p className="text-gray-600 text-m leading-relaxed mb-3">
          you know that crazy person enjoy the world first.
        </p>
        <p className="text-gray-600 text-m leading-relaxed mb-3 max-w-sm mx-auto">
          who loves gaming, especially challenging AAA titles like Dark Souls
          and action games. I enjoy pop and rock music and passionate about art
          and creativity, which inspire my imagination and approach to both life
          and work.
        </p>
      </div>

      {/* Contact information */}
      <div className="mt-6 border-t border-gray-300 pt-4 text-left">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact</h2>
        <a
          href="https://github.com/d3lap1ace"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-700 hover:text-blue-600 font-medium mb-2"
        >
          <FaGithub className="w-5 h-5 mr-2" />
          GitHub
        </a>
        <a
          href="mailto:reald3lap1ace@gmail.com"
          className="flex items-center text-gray-700 hover:text-blue-600 font-medium"
        >
          <FaEnvelope className="w-5 h-5 mr-2" />
          Gmail
        </a>
      </div>
    </div>
  );
};

export default IntroCard;
