const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

function getPosts() {
  const posts = [];
  const categories = ["code", "life"];

  for (const category of categories) {
    const dir = path.join(process.cwd(), "src/content", category);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const filePath = path.join(dir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent);

      posts.push({
        title: data.title || file.replace(".md", ""),
        date: data.date || fs.statSync(filePath).mtime.toISOString(),
        slug: file.replace(".md", ""),
        category,
        excerpt: data.excerpt || content.slice(0, 200) + "...",
      });
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function generateRSS(posts) {
  const siteUrl = "https://d3lap1ace.github.io/myblogs";
  const buildDate = new Date().toISOString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>d3lap1ace&#39;s blog</title>
    <link>${siteUrl}</link>
    <description>My personal blog about code and life</description>
    <language>en</language>
    <lastBuildDate>${buildDate}</lastBuildDate>

${posts
  .map(
    (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/${post.category}/${post.slug}</link>
      <description><![CDATA[${post.excerpt || ""}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${siteUrl}/${post.category}/${post.slug}</guid>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;
}

// Generate RSS
const posts = getPosts();
const rss = generateRSS(posts);

// Ensure public directory exists
const publicDir = path.join(process.cwd(), "public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write RSS file
fs.writeFileSync(path.join(publicDir, "rss.xml"), rss);

console.log("✅ RSS feed generated at public/rss.xml");
