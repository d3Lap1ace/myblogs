---
title: React 入门
excerpt: 安装、配置与常见问题
date: "2025-07-28"
---
## 前置JavaScript基本用法

### Ajax

- **Ajax** 是一种在网页不重新加载的情况下，异步与服务器交换数据的技术。
- 传统网页交互需要整页刷新，而 Ajax 可以在后台请求数据，更新网页局部内容，提升用户体验。
- 名称中包含 **XML**，是因为最早 Ajax 传输数据多用 XML，但现在多用 JSON 或其他格式。

```jsx
const xhr = new XMLHttpRequest();
xhr.open('POST', '/api/submit', true);
xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log('提交成功:', xhr.responseText);
    } else {
      console.error('提交失败，状态码:', xhr.status);
    }
  }
};

const data = JSON.stringify({ name: 'lucas', age: 25 });
xhr.send(data);

```

# fetch

- Fetch 是现代浏览器提供的用于发送 HTTP 请求的接口，替代传统的 XMLHttpRequest（XHR）。
- 它基于 Promise，语法更简洁、功能更强大。
- 主要用来进行网络请求，获取资源（JSON、文本、文件等）。

## 基本语法

```jsx
fetch(url, options).then(response => {
  // response是 Response 对象
});
```

- `url`：请求地址。
- `options`（可选）：配置请求方法、请求头、请求体等

## Request 和 Response 对象

- `fetch` 返回一个 Promise，resolve 后得到的是 `Response` 对象。
- `Response` 对象包含状态码、状态文本、头部信息以及方法读取响应体。

常用 Response 读取方法：

- `response.text()` — 返回 Promise，解析为纯文本。
- `response.json()` — 返回 Promise，解析为 JSON。
- `response.blob()` — 返回 Promise，解析为二进制 Blob。
- `response.arrayBuffer()` — 返回 Promise，解析为 ArrayBuffer（二进制缓冲区）。

## options 配置详解

```jsx
fetch(url, {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',  // 请求方法，默认 GET
  headers: { 'Content-Type': 'application/json', ... }, // 请求头
  body: JSON.stringify(data),                            // 请求体（POST/PUT 等）
  mode: 'cors' | 'no-cors' | 'same-origin',             // 跨域模式
  credentials: 'omit' | 'same-origin' | 'include',       // 是否携带cookie
  cache: 'default' | 'no-store' | 'reload' | 'force-cache' | 'only-if-cached', // 缓存策略
  redirect: 'follow' | 'error' | 'manual',               // 重定向处理
  referrer: 'client' | URL,                              // referrer 头
  integrity: '',                                         // Subresource Integrity (SRI)
  keepalive: true | false,                               // 页面卸载时是否继续请求
  signal: AbortSignal,                                   // 用于取消请求
});
```

# Promise

**Promise** 是一种表示异步操作最终完成或失败的对象。它用来解决传统回调函数地狱（callback hell）问题，使异步代码写起来更清晰、更易维护。

## Promise 的三个状态

一个 Promise 有三种状态（state）：

| 状态 | 说明 |
| --- | --- |
| **Pending** | 等待中，异步操作尚未完成 |
| **Fulfilled** | 完成，异步操作成功并得到结果 |
| **Rejected** | 拒绝，异步操作失败并返回错误 |

状态只能从 Pending 变成 Fulfilled 或 Rejected，且一旦改变，状态就不可再更改（不可逆）。

## Promise 的基本用法

```jsx
const promise = new Promise((resolve, reject) => {
  // 异步操作，比如网络请求、定时器等
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('操作成功的结果');  // 状态变为 Fulfilled，传递成功值
    } else {
      reject('操作失败的原因');    // 状态变为 Rejected，传递失败原因
    }
  }, 1000);
});

promise
  .then(result => {
    console.log('成功:', result);
  })
  .catch(error => {
    console.log('失败:', error);
  });
```

## Promise 的核心方法

- **new Promise(executor)**
    
    创建一个 Promise，executor 是一个函数，接受两个参数 `resolve` 和 `reject`，它们分别用来标记成功或失败。
    
- **then(onFulfilled, onRejected)**
    
    注册成功回调和失败回调，返回新的 Promise，支持链式调用。
    
- **catch(onRejected)**
    
    只注册失败回调，等同于 `.then(null, onRejected)`。
    
- **finally(onFinally)**
    
    不管成功还是失败，都会执行的回调。
    

# startup

```bash
npx create-next-app@latest myblog-app
```

# package file

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "这是一个示例项目",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "keywords": ["node", "example"],
  "author": "Lucas",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "jest": "^29.5.0"
  }
}
```

## 重要字段解释

| 字段名 | 说明 |
| --- | --- |
| `name` | 项目名称，必须小写且不带空格，推荐用连字符 `-` 分割 |
| `version` | 项目版本号，遵循语义化版本规范（SemVer），如 `1.0.0` |
| `description` | 项目描述 |
| `main` | 项目入口文件路径，默认 `index.js` |
| `scripts` | 定义脚本命令，可以用 `npm run <script-name>` 来执行 |
| `keywords` | 关键字数组，有助于 npm 搜索 |
| `author` | 作者信息 |
| `license` | 许可证类型 |
| `dependencies` | 生产环境依赖库，项目运行时需要 |
| `devDependencies` | 开发环境依赖库，比如测试、构建工具 |

## `scripts` 示例常用脚本

```json
json
CopyEdit
"scripts": {
  "start": "node server.js",
  "build": "webpack --config webpack.config.js",
  "test": "jest",
  "lint": "eslint .",
  "dev": "nodemon server.js"
}

```

- `npm start` 执行 `start` 脚本
- `npm test` 执行 `test` 脚本
- 自定义脚本用 `npm run <name>` 来执行，比如 `npm run build`

## 依赖版本符号说明

| 符号 | 含义 |
| --- | --- |
| `^1.2.3` | 兼容 1.x.x，且版本 >=1.2.3 <2.0.0 |
| `~1.2.3` | 兼容 1.2.x，且版本 >=1.2.3 <1.3.0 |
| `1.2.3` | 精确版本 1.2.3 |
| `*` | 任意版本 |

## 创建 `package.json`

你可以用命令快速生成：

```bash
bash
CopyEdit
npm init
# 或快速配置
npm init -y

```