import React from 'react';

const IntroCard: React.FC = () => {

  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 max-w-sm ml-35 mt-35">
      {/* 头像和基本信息 */}
      <div className="text-center mb-4">
        <div className="rounded-full mx-auto mb-3 flex items-center justify-center">
          <img 
            src = 'a2.png'
            alt = 'dont touch me'
            className='w-20 h-20 rounded-full'
          />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">Lucas Marinotta</h3>
        <p className="text-pink-600 font-medium text-sm mb-2">Full Stack Developer</p>
        <p className="text-gray-600 text-m leading-relaxed">
          you know that crazy person enjor the world first.
        </p>
      </div>

      {/* 技能标签 */}
      {/* <div className="mb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {['React', 'TypeScript', 'Node.js', 'Python'].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div> */}

      {/* 社交媒体链接 */}
      {/* <div className="flex justify-center space-x-4">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-600 transition-colors duration-200 p-2 rounded-full hover:bg-pink-50"
            aria-label={social.name}
          >
            {social.icon}
          </a>
        ))}
      </div> */}

      {/* 快速统计 */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-around text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">3+</div>
            <div className="text-l text-gray-500">Years Exp</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">50+</div>
            <div className="text-l text-gray-500">Projects</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">5239</div>
            <div className="text-l text-gray-500">vistors</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroCard; 