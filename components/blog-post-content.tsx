"use client";

import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Copy,
  File,
  Folder,
  Tag,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatedElement } from "@/components/animated-element";
import { BlogCard } from "@/components/blog-card";
import { ClickEffects } from "@/components/click-effects";
import { Comments } from "@/components/comments";
import { trackEvent, trackPageView } from "@/components/google-analytics";
import { ScrollProgress } from "@/components/scroll-progress";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ViewCounter } from "@/components/view-counter";
import type { BlogPost, Category } from "@/lib/types";

// 代码复制按钮组件
function CodeCopyButton({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);

      // 1.5秒后重置状态
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      // 兼容性回退
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  return (
    <button
      type="button"
      aria-label="复制代码"
      className="flex items-center justify-center rounded-md p-1.5 text-muted-foreground hover:bg-muted-foreground/10 transition-colors cursor-pointer"
      onClick={handleCopy}
      title="复制代码"
    >
      {isCopied ? (
        <Check
          className="h-4 w-4"
          style={{ color: "#22c55e", strokeWidth: 3 }}
        />
      ) : (
        <Copy className="h-4 w-4 cursor-pointer" />
      )}
    </button>
  );
}

interface BlogPostContentProps {
  renderedPost: BlogPost & { renderedContent: string };
  category: Category | null;
  relatedPosts: BlogPost[];
}

export function BlogPostContent({
  renderedPost,
  category,
  relatedPosts,
}: BlogPostContentProps) {
  // 页面访问统计
  useEffect(() => {
    // 统计页面访问
    trackPageView(window.location.href, renderedPost.title);

    // 统计文章阅读事件
    trackEvent("article_view", "blog", renderedPost.slug);
  }, [renderedPost.title, renderedPost.slug]);

  // 给代码块添加复制按钮和文件名标题栏
  const articleRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;

    const pres = Array.from(
      el.querySelectorAll<HTMLPreElement>("pre:not([data-copy-initialized])"),
    );
    pres.forEach((pre) => {
      pre.dataset.copyInitialized = "true";

      // 获取代码内容和语言
      const code = pre.querySelector("code");
      const text = (code?.textContent || pre.textContent || "").replace(
        /\n$/,
        "",
      );

      // 检查是否为MDX组件渲染的新样式(有父级div包裹)
      const isNewStyle = pre.parentElement?.classList.contains("rounded-lg");

      if (isNewStyle) {
        // 找到标题栏并添加复制按钮
        const headerBar = pre.parentElement?.querySelector(
          "div.flex.items-center.justify-between",
        );
        if (headerBar) {
          const buttonContainer = document.createElement("div");
          headerBar.appendChild(buttonContainer);
          const root = createRoot(buttonContainer);
          root.render(<CodeCopyButton text={text} />);
        }
      } else {
        // 旧样式兼容 - 完全创建Rspack样式
        pre.classList.add("overflow-x-auto", "p-4", "text-sm", "m-0");
        pre.style.margin = "0";

        // 获取语言
        let language: string | null = null;

        if (code?.className) {
          const match = /language-(\w+)/.exec(code.className);
          if (match) {
            language = match[1];
          }
        }

        // 创建包装容器
        const wrapper = document.createElement("div");
        wrapper.className =
          "mb-6 mt-6 overflow-hidden rounded-lg border border-border bg-muted";

        // 创建标题栏，使用两端对齐布局
        const headerBar = document.createElement("div");
        headerBar.className =
          "flex items-center justify-between bg-muted/80 px-4 py-2 border-b border-border";

        // 创建左侧空白区域
        const leftSide = document.createElement("div");
        leftSide.className = "flex-1";
        headerBar.appendChild(leftSide);

        // 创建右侧容器，用于放置语言标签和复制按钮
        const rightSide = document.createElement("div");
        rightSide.className = "flex items-center gap-3";

        // 添加语言标签（如果有）
        if (language) {
          const langTag = document.createElement("div");
          langTag.className =
            "text-xs px-2 py-0.5 rounded-md bg-muted-foreground/10 text-muted-foreground font-medium";
          langTag.textContent = language;
          rightSide.appendChild(langTag);
        }

        // 添加复制按钮容器
        const buttonContainer = document.createElement("div");
        rightSide.appendChild(buttonContainer);

        // 将右侧容器添加到标题栏
        headerBar.appendChild(rightSide);

        // 添加标题栏到包装器
        wrapper.appendChild(headerBar);

        // 替换原来的pre元素
        pre.parentNode?.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        // 渲染复制按钮
        const root = createRoot(buttonContainer);
        root.render(<CodeCopyButton text={text} />);
      }
    });
  }, []); // 无需依赖项，仅在组件挂载时运行一次

  return (
    <div className="min-h-screen">
      <ClickEffects />
      <ScrollProgress />

      <div className="pt-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 返回按钮 */}
          <AnimatedElement animation="fadeInLeft">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              返回博客
            </Link>
          </AnimatedElement>

          {/* 文章头部 - 优化布局 */}
          <AnimatedElement animation="slideInUp" className="mb-8">
            <Card className="p-6 border">
              <div className="space-y-4">
                {/* 分类标签 */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  {category && (
                    <div className="flex items-center gap-2">
                      <Folder
                        className="h-4 w-4"
                        style={{ color: category.color }}
                      />
                      <Link
                        href={`/categories/${category.slug}`}
                        className="text-sm font-medium hover:underline"
                        style={{ color: category.color }}
                      >
                        {category.name}
                      </Link>
                    </div>
                  )}

                  {/* 右侧元信息 */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <ViewCounter slug={renderedPost.slug} />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>阅读时间 {renderedPost.readingTime} 分钟</span>
                    </div>
                    {renderedPost.updatedAt && (
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          更新于
                          {new Date(renderedPost.updatedAt).toLocaleDateString(
                            "zh-CN",
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 标题 */}
                <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                  {renderedPost.title}
                </h1>

                {/* 摘要 */}
                {renderedPost.excerpt && (
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {renderedPost.excerpt}
                  </p>
                )}

                {/* 作者和日期信息 */}
                <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{renderedPost.author}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={renderedPost.publishedAt}>
                      {new Date(renderedPost.publishedAt).toLocaleDateString(
                        "zh-CN",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </time>
                  </div>
                </div>

                {/* 标签 */}
                {renderedPost.tags.length > 0 && (
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    {renderedPost.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <Badge
                          variant="secondary"
                          className="hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </AnimatedElement>

          {/* 文章内容 */}
          <Card className="p-8 border">
            <article
              ref={articleRef}
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-m-20 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-primary prose-pre:bg-muted prose-pre:text-foreground prose-code:text-foreground"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: MDX content is pre-processed and safe
              dangerouslySetInnerHTML={{
                __html: renderedPost.renderedContent,
              }}
            />
          </Card>

          {/* 评论区 */}
          <AnimatedElement animation="slideInUp" delay={0.3} className="mt-12">
            <Comments slug={renderedPost.slug} />
          </AnimatedElement>

          {/* 相关文章 */}
          {relatedPosts.length > 0 && (
            <AnimatedElement
              animation="slideInUp"
              delay={0.4}
              className="mt-12"
            >
              <div>
                <Separator className="mb-8" />
                <h2 className="text-2xl font-bold mb-6">相关文章</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <BlogCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </div>
              </div>
            </AnimatedElement>
          )}
        </div>
      </div>
    </div>
  );
}
