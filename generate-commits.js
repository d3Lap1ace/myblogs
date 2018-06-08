#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 设置Git配置
const GIT_AUTHOR_NAME = 'd3lap1ace';
const GIT_AUTHOR_EMAIL = 'reald3lap1ace@gmail.com';

// 辅助函数：执行命令
function exec(cmd) {
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    // Ignore errors
  }
}

// 辅助函数：设置Git环境变量并提交
function commitWithDate(message, date, fileChanges = {}) {
  // 添加文件更改
  for (const [filePath, content] of Object.entries(fileChanges)) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content, 'utf8');
  }

  // 添加文件
  exec('git add -A');

  // 使用环境变量设置提交时间
  const dateStr = date.toISOString();
  exec(`export GIT_AUTHOR_DATE="${dateStr}" GIT_COMMITTER_DATE="${dateStr}" && git commit -m "${message}"`);
}

// 随机数生成器
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 随机选择数组元素
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 博客文章模板
const blogTemplates = {
  code: [
    { title: 'JavaScript异步编程指南', content: '# JavaScript异步编程指南\n\n## Callback\n传统回调函数...\n\n## Promise\nPromise链式调用...\n\n## Async/Await\n现代异步解决方案...\n' },
    { title: 'React Hooks最佳实践', content: '# React Hooks最佳实践\n\n## useState\n状态管理...\n\n## useEffect\n副作用处理...\n\n## 自定义Hooks\n复用逻辑...\n' },
    { title: 'CSS Grid布局完全指南', content: '# CSS Grid布局完全指南\n\n## 基础概念\n网格容器和项目...\n\n## 实战案例\n响应式布局...\n' },
    { title: 'TypeScript进阶技巧', content: '# TypeScript进阶技巧\n\n## 泛型\n类型参数化...\n\n## 类型推断\n自动类型推导...\n' },
    { title: 'Node.js性能优化', content: '# Node.js性能优化\n\n## 内存管理\n内存泄漏排查...\n\n## 异步处理\n事件循环优化...\n' },
    { title: 'Webpack配置详解', content: '# Webpack配置详解\n\n## Loader\n文件转换...\n\n## Plugin\n功能扩展...\n' },
    { title: 'Docker容器化实践', content: '# Docker容器化实践\n\n## Dockerfile编写\n镜像构建...\n\n## Docker Compose\n多容器编排...\n' },
    { title: 'Git工作流指南', content: '# Git工作流指南\n\n## 分支管理\nGit Flow...\n\n## 代码审查\nCode Review最佳实践...\n' },
    { title: 'RESTful API设计', content: '# RESTful API设计\n\n## 资源设计\nURL设计规范...\n\n## 错误处理\nHTTP状态码...\n' },
    { title: '前端性能优化', content: '# 前端性能优化\n\n## 加载优化\n代码分割...\n\n## 渲染优化\n减少重排重绘...\n' },
    { title: 'Vue3 Composition API', content: '# Vue3 Composition API\n\n## setup函数\n组合式API...\n\n## 响应式API\nref和reactive...\n' },
    { title: 'MongoDB数据库设计', content: '# MongoDB数据库设计\n\n## 文档结构\n数据建模...\n\n## 索引优化\n查询性能...\n' },
    { title: 'Redis缓存策略', content: '# Redis缓存策略\n\n## 数据类型\nString、Hash、List...\n\n## 缓存更新\n缓存穿透、击穿、雪崩...\n' },
    { title: 'GraphQL入门与实践', content: '# GraphQL入门与实践\n\n## Schema定义\n类型系统...\n\n## Resolver编写\n数据获取...\n' },
    { title: '微前端架构实践', content: '# 微前端架构实践\n\n## 模块加载\n动态import...\n\n## 状态共享\n通信机制...\n' },
  ],
  life: [
    { title: '今日思考', content: '# 今日思考\n\n今天学到的一个新知识...\n\n## 收获\n- 技术方面...\n- 生活方面...\n' },
    { title: '读书笔记', content: '# 读书笔记\n\n最近读了一本好书...\n\n## 摘要\n核心观点...\n\n## 感悟\n个人思考...\n' },
    { title: '项目复盘', content: '# 项目复盘\n\n最近完成了一个项目...\n\n## 做得好的地方\n- 团队协作...\n- 技术选型...\n\n## 需要改进的地方\n- 时间管理...\n- 代码质量...\n' },
    { title: '学习计划', content: '# 学习计划\n\n接下来几个月的学习重点...\n\n## 技术栈\n- 深入学习React...\n- 掌握TypeScript...\n\n## 时间安排\n每天2小时学习时间...\n' },
    { title: '生活随笔', content: '# 生活随笔\n\n记录生活中的美好瞬间...\n\n今天天气不错，心情也很好...\n' },
    { title: '工具推荐', content: '# 工具推荐\n\n最近发现的好工具...\n\n## 功能特点\n- 提高效率...\n- 界面友好...\n\n## 使用场景\n日常开发...\n' },
    { title: '技术分享', content: '# 技术分享\n\n今天分享一个技术点...\n\n## 背景\n遇到的问题...\n\n## 实现方案\n解决思路...\n' },
    { title: '面试题整理', content: '# 面试题整理\n\n今天遇到的面试题...\n\n## 问题\n...\n\n## 解答\n...\n\n## 延伸思考\n...\n' },
  ]
};

// 提交消息模板
const commitMessages = {
  code: [
    '添加{title}文章',
    '更新{title}',
    '完善{title}内容',
    '修复{title}中的错误',
    '补充{title}示例',
    '重构{title}结构',
  ],
  life: [
    '记录{title}',
    '更新{title}',
    '添加{title}',
    '写一篇关于{title}',
  ],
  config: [
    '更新依赖版本',
    '优化构建配置',
    '添加新的npm scripts',
    '更新README',
    '优化项目结构',
    '修复lint问题',
    '更新gitignore',
    '添加环境变量配置',
    '优化TypeScript配置',
  ],
  feature: [
    '添加搜索功能',
    '优化文章列表展示',
    '添加评论功能',
    '优化移动端适配',
    '添加RSS订阅',
    '添加标签分类',
    '优化加载速度',
    '添加深色模式',
    '添加代码高亮',
  ],
  fix: [
    '修复导航栏问题',
    '修复链接错误',
    '修复样式bug',
    '修复404问题',
    '修复部署问题',
  ]
};

// 格式化日期为YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// 生成2018年6月8日 - 2019年2月8日的提交（每天1-3次，偶尔10+次）
function generate2018To2019() {
  console.log('生成2018.6.8 - 2019.2.8提交...');

  const startDate = new Date('2018-06-08T09:00:00+08:00');
  const endDate = new Date('2019-02-08T23:59:59+08:00');

  let currentDate = new Date(startDate);
  let articleCount = { code: 1, life: 1 };
  let totalCommits = 0;

  while (currentDate <= endDate) {
    // 偶尔有高产出日（5%概率）
    const isHighProductivityDay = Math.random() < 0.05;
    const commitsToday = isHighProductivityDay ? randomInt(10, 15) : randomInt(1, 3);

    for (let i = 0; i < commitsToday; i++) {
      const hours = randomInt(9, 22);
      const minutes = randomInt(0, 59);
      const commitDate = new Date(currentDate);
      commitDate.setHours(hours, minutes, randomInt(0, 59));

      const commitType = randomChoice(['code', 'life', 'config']);
      let message;
      let fileChanges = {};

      if (commitType === 'code' && Math.random() > 0.3) {
        const template = randomChoice(blogTemplates.code);
        const msgTemplate = randomChoice(commitMessages.code);
        const category = commitType;
        const slug = template.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
        const fileName = `${slug}-${articleCount.code++}.md`;
        message = msgTemplate.replace('{title}', template.title);
        fileChanges[`src/content/${category}/${fileName}`] = template.content;
      } else if (commitType === 'life' && Math.random() > 0.3) {
        const template = randomChoice(blogTemplates.life);
        const msgTemplate = randomChoice(commitMessages.life);
        const category = commitType;
        const slug = template.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
        const fileName = `${slug}-${articleCount.life++}.md`;
        message = msgTemplate.replace('{title}', template.title);
        fileChanges[`src/content/${category}/${fileName}`] = template.content;
      } else if (commitType === 'config') {
        message = randomChoice(commitMessages.config);
        if (Math.random() > 0.7) {
          const version = `1.${articleCount.code}.${randomInt(0, 100)}`;
          fileChanges['package.json'] = JSON.stringify({
            name: 'myblogs',
            version,
            description: 'Personal Blog',
            scripts: { dev: 'next dev', build: 'next build', start: 'next start', lint: 'next lint' }
          }, null, 2);
        }
      } else {
        message = randomChoice([...commitMessages.feature, ...commitMessages.fix]);
        fileChanges['README.md'] = `# My Blog\n\nLast updated: ${formatDate(commitDate)}\n`;
      }

      commitWithDate(message, commitDate, fileChanges);
      totalCommits++;
    }

    // 下一天
    currentDate.setDate(currentDate.getDate() + 1);
  }

  console.log(`2018-2019阶段完成，共${totalCommits}次提交`);
  return totalCommits;
}

// 生成2019年2月28日 - 2022年末的提交（每周3-4次）
function generate2019To2022() {
  console.log('生成2019.2.28 - 2022.12.31提交...');

  const startDate = new Date('2019-02-28T09:00:00+08:00');
  const endDate = new Date('2022-12-31T23:59:59+08:00');

  let currentDate = new Date(startDate);
  let articleCount = { code: 100, life: 100 };
  let totalCommits = 0;

  while (currentDate <= endDate) {
    // 每周3-4次提交
    const commitsThisWeek = randomInt(3, 4);

    for (let i = 0; i < commitsThisWeek; i++) {
      const dayOffset = randomInt(0, 6);
      const commitDate = new Date(currentDate);
      commitDate.setDate(commitDate.getDate() + dayOffset);
      commitDate.setHours(randomInt(9, 22), randomInt(0, 59), randomInt(0, 59));

      const commitType = randomChoice(['code', 'life', 'config']);
      let message;
      let fileChanges = {};

      if (commitType === 'code' && Math.random() > 0.4) {
        const template = randomChoice(blogTemplates.code);
        const msgTemplate = randomChoice(commitMessages.code);
        const category = commitType;
        const slug = template.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
        const fileName = `${slug}-${articleCount.code++}.md`;
        message = msgTemplate.replace('{title}', template.title);
        fileChanges[`src/content/${category}/${fileName}`] = template.content;
      } else if (commitType === 'life' && Math.random() > 0.4) {
        const template = randomChoice(blogTemplates.life);
        const msgTemplate = randomChoice(commitMessages.life);
        const category = commitType;
        const slug = template.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
        const fileName = `${slug}-${articleCount.life++}.md`;
        message = msgTemplate.replace('{title}', template.title);
        fileChanges[`src/content/${category}/${fileName}`] = template.content;
      } else if (commitType === 'config') {
        message = randomChoice(commitMessages.config);
        if (Math.random() > 0.7) {
          const version = `2.${articleCount.code}.${randomInt(0, 100)}`;
          fileChanges['package.json'] = JSON.stringify({
            name: 'myblogs',
            version,
            description: 'Personal Blog',
            scripts: { dev: 'next dev', build: 'next build', start: 'next start', lint: 'next lint' }
          }, null, 2);
        }
      } else {
        message = randomChoice([...commitMessages.feature, ...commitMessages.fix]);
        fileChanges['README.md'] = `# My Blog\n\nLast updated: ${formatDate(commitDate)}\n`;
      }

      commitWithDate(message, commitDate, fileChanges);
      totalCommits++;
    }

    // 下一周
    currentDate.setDate(currentDate.getDate() + 7);
  }

  console.log(`2019-2022阶段完成，共${totalCommits}次提交`);
  return totalCommits;
}

// 生成2025年至今的提交（每周5-10次）
function generate2025ToPresent() {
  console.log('生成2025.1.1 - 2026.3.16提交...');

  const startDate = new Date('2025-01-01T09:00:00+08:00');
  const endDate = new Date('2026-03-16T23:59:59+08:00');

  let currentDate = new Date(startDate);
  let articleCount = { code: 500, life: 500 };
  let totalCommits = 0;

  while (currentDate <= endDate) {
    // 每周5-10次提交
    const commitsThisWeek = randomInt(5, 10);

    for (let i = 0; i < commitsThisWeek; i++) {
      const dayOffset = randomInt(0, 6);
      const commitDate = new Date(currentDate);
      commitDate.setDate(commitDate.getDate() + dayOffset);
      commitDate.setHours(randomInt(9, 22), randomInt(0, 59), randomInt(0, 59));

      const commitType = randomChoice(['code', 'life', 'config']);
      let message;
      let fileChanges = {};

      if (commitType === 'code' && Math.random() > 0.3) {
        const template = randomChoice(blogTemplates.code);
        const msgTemplate = randomChoice(commitMessages.code);
        const category = commitType;
        const slug = template.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
        const fileName = `${slug}-${articleCount.code++}.md`;
        message = msgTemplate.replace('{title}', template.title);
        fileChanges[`src/content/${category}/${fileName}`] = template.content;
      } else if (commitType === 'life' && Math.random() > 0.3) {
        const template = randomChoice(blogTemplates.life);
        const msgTemplate = randomChoice(commitMessages.life);
        const category = commitType;
        const slug = template.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
        const fileName = `${slug}-${articleCount.life++}.md`;
        message = msgTemplate.replace('{title}', template.title);
        fileChanges[`src/content/${category}/${fileName}`] = template.content;
      } else if (commitType === 'config') {
        message = randomChoice(commitMessages.config);
        if (Math.random() > 0.7) {
          const version = `3.${articleCount.code}.${randomInt(0, 100)}`;
          fileChanges['package.json'] = JSON.stringify({
            name: 'myblogs',
            version,
            description: 'Personal Blog',
            scripts: { dev: 'next dev', build: 'next build', start: 'next start', lint: 'next lint' }
          }, null, 2);
        }
      } else {
        message = randomChoice([...commitMessages.feature, ...commitMessages.fix]);
        fileChanges['README.md'] = `# My Blog\n\nLast updated: ${formatDate(commitDate)}\n`;
      }

      commitWithDate(message, commitDate, fileChanges);
      totalCommits++;
    }

    // 下一周
    currentDate.setDate(currentDate.getDate() + 7);
  }

  console.log(`2025至今阶段完成，共${totalCommits}次提交`);
  return totalCommits;
}

// 主函数
function main() {
  console.log('开始生成提交历史...\n');

  // 先删除当前的所有提交，创建新的初始提交
  console.log('创建新的初始提交...');
  const initialDate = new Date('2018-06-08T09:00:00+08:00');

  // 创建初始提交
  exec('git checkout --orphan new-branch');
  exec('git add -A');
  exec(`export GIT_AUTHOR_DATE="${initialDate.toISOString()}" GIT_COMMITTER_DATE="${initialDate.toISOString()}" && git commit -m "Initial commit"`);

  // 生成各时间段提交
  const c1 = generate2018To2019();
  const c2 = generate2019To2022();
  const c3 = generate2025ToPresent();

  // 删除旧分支并重命名新分支
  console.log('\n整理分支...');
  exec('git branch -D master 2>/dev/null || true');
  exec('git branch -m master');

  console.log('\n========================================');
  console.log('完成！提交历史已生成。');
  console.log(`总提交数: ${c1 + c2 + c3}`);
  console.log('========================================');
  console.log('使用 "git push --force origin master" 推送到远程仓库。');
}

main();
