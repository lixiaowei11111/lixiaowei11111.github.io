import type { BlogPost } from "./types";

// 模拟博客数据 - 在实际项目中，这些数据可以来自 Markdown 文件或 CMS
export const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Next.js 15 与 React 19 新特性深度解析",
    excerpt:
      "深入探讨 Next.js 15 和 React 19 带来的革命性变化，包括新的编译器、并发特性和性能优化。",
    content: `
# Next.js 15 与 React 19 新特性深度解析

Next.js 15 和 React 19 的发布为前端开发带来了许多激动人心的新特性...

## 主要更新

### 1. 编译器优化
- 全新的 Turbopack 编译器
- 更快的热重载
- 优化的构建性能

### 2. React 19 新特性
- Actions 和 Form Actions
- 新的 Hook: useActionState
- 改进的 Suspense 机制

### 3. 性能提升
- 更好的代码分割
- 优化的图片处理
- 改进的缓存策略

## 实际应用

让我们看看如何在项目中使用这些新特性...
    `,
    author: "李小伟",
    publishedAt: "2024-01-15",
    tags: ["Next.js", "React", "Frontend", "JavaScript"],
    category: "frontend",
    readingTime: 8,
    coverImage: "/images/nextjs-react19.jpg",
    featured: true,
    slug: "nextjs-15-react-19-deep-dive",
  },
  {
    id: "2",
    title: "GSAP 动画库实战：打造丝滑的网页动效",
    excerpt:
      "从基础到进阶，全面掌握 GSAP 动画库的使用技巧，创建令人印象深刻的网页动效。",
    content: `
# GSAP 动画库实战：打造丝滑的网页动效

GSAP (GreenSock Animation Platform) 是目前最强大的 Web 动画库之一...

## 为什么选择 GSAP？

1. **性能优异** - 比 CSS3 动画更快
2. **功能强大** - 支持复杂的动画序列
3. **浏览器兼容性好** - 支持所有现代浏览器
4. **易于使用** - 直观的 API 设计

## 基础使用

### 简单的淡入动画
\`\`\`javascript
gsap.from(".element", {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power2.out"
});
\`\`\`

### 时间轴动画
\`\`\`javascript
const tl = gsap.timeline();
tl.from(".title", { opacity: 0, y: 30 })
  .from(".subtitle", { opacity: 0, y: 20 }, "-=0.5")
  .from(".content", { opacity: 0 }, "-=0.3");
\`\`\`

## 高级技巧

### ScrollTrigger 滚动动画
滚动触发动画是现代网站的重要特性...
    `,
    author: "李小伟",
    publishedAt: "2024-01-10",
    tags: ["GSAP", "Animation", "JavaScript", "Frontend"],
    category: "frontend",
    readingTime: 12,
    coverImage: "/images/gsap-animation.jpg",
    featured: true,
    slug: "gsap-animation-mastery",
  },
  {
    id: "3",
    title: "Tailwind CSS 4.0 新特性预览",
    excerpt:
      "Tailwind CSS 4.0 即将到来，让我们提前了解这个版本带来的激动人心的新功能。",
    content: `
# Tailwind CSS 4.0 新特性预览

Tailwind CSS 4.0 带来了许多令人兴奋的新特性...

## 主要更新

### 1. 全新的引擎
- 更快的编译速度
- 更小的输出文件
- 更好的开发体验

### 2. 原生 CSS 支持
- CSS 层叠和嵌套
- 现代 CSS 特性支持
- 更好的浏览器兼容性

### 3. 改进的配置系统
- 更灵活的主题配置
- 更简单的自定义
- 更好的类型支持
    `,
    author: "李小伟",
    publishedAt: "2024-01-05",
    tags: ["Tailwind", "CSS", "Frontend", "Styling"],
    category: "frontend",
    readingTime: 6,
    coverImage: "/images/tailwind-4.jpg",
    featured: false,
    slug: "tailwind-css-4-preview",
  },
  {
    id: "4",
    title: "TypeScript 5.0+ 高级类型编程实践",
    excerpt:
      "深入 TypeScript 5.0+ 的高级特性，掌握类型编程技巧，提升代码质量和开发效率。",
    content: `
# TypeScript 5.0+ 高级类型编程实践

TypeScript 作为 JavaScript 的超集，提供了强大的类型系统...

## 高级类型技巧

### 1. 条件类型
\`\`\`typescript
type NonNullable<T> = T extends null | undefined ? never : T;
\`\`\`

### 2. 映射类型
\`\`\`typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};
\`\`\`

### 3. 模板字面量类型
\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`;
\`\`\`

## 实际应用场景
让我们看看如何在实际项目中应用这些高级类型...
    `,
    author: "李小伟",
    publishedAt: "2023-12-28",
    tags: ["TypeScript", "JavaScript", "Types", "Programming"],
    category: "frontend",
    readingTime: 15,
    coverImage: "/images/typescript-advanced.jpg",
    featured: false,
    slug: "typescript-advanced-types",
  },
  {
    id: "5",
    title: "Docker 容器化部署前端应用最佳实践",
    excerpt:
      "从零开始学习 Docker，掌握前端应用容器化部署的完整流程和最佳实践。",
    content: `
# Docker 容器化部署前端应用最佳实践

在现代的软件开发中，容器化部署已经成为标准实践...

## Docker 基础概念

### 什么是 Docker？
Docker 是一个开源的容器化平台...

### 核心概念
- **镜像 (Image)**: 应用的快照
- **容器 (Container)**: 镜像的运行实例
- **Dockerfile**: 构建镜像的指令文件

## 前端应用 Dockerfile 示例

\`\`\`dockerfile
# 多阶段构建
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# 生产环境
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
\`\`\`

## 部署策略
让我们探讨不同的部署策略和最佳实践...
    `,
    author: "李小伟",
    publishedAt: "2023-12-20",
    tags: ["Docker", "DevOps", "Deployment", "Container"],
    category: "devops",
    readingTime: 10,
    coverImage: "/images/docker-frontend.jpg",
    featured: false,
    slug: "docker-frontend-deployment",
  },
];

// 获取所有文章
export function getAllPosts(): BlogPost[] {
  return mockPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

// 获取特色文章
export function getFeaturedPosts(): BlogPost[] {
  return mockPosts.filter((post) => post.featured);
}

// 根据 slug 获取文章
export function getPostBySlug(slug: string): BlogPost | undefined {
  return mockPosts.find((post) => post.slug === slug);
}

// 根据分类获取文章
export function getPostsByCategory(category: string): BlogPost[] {
  return mockPosts.filter((post) => post.category === category);
}

// 根据标签获取文章
export function getPostsByTag(tag: string): BlogPost[] {
  return mockPosts.filter((post) => post.tags.includes(tag));
}

// 获取所有标签
export function getAllTags(): string[] {
  const tags = new Set<string>();
  mockPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
}

// 搜索文章
export function searchPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return mockPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  );
}

// 获取相关文章
export function getRelatedPosts(
  currentPost: BlogPost,
  limit: number = 3,
): BlogPost[] {
  const related = mockPosts
    .filter((post) => post.id !== currentPost.id)
    .map((post) => ({
      post,
      score: calculateRelevanceScore(currentPost, post),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);

  return related;
}

// 计算文章相关性得分
function calculateRelevanceScore(post1: BlogPost, post2: BlogPost): number {
  let score = 0;

  // 相同分类加分
  if (post1.category === post2.category) {
    score += 10;
  }

  // 相同标签加分
  const commonTags = post1.tags.filter((tag) => post2.tags.includes(tag));
  score += commonTags.length * 5;

  // 发布时间接近加分
  const timeDiff = Math.abs(
    new Date(post1.publishedAt).getTime() -
      new Date(post2.publishedAt).getTime(),
  );
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
  if (daysDiff < 30) {
    score += 3;
  }

  return score;
}
