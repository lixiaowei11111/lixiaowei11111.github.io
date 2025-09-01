"use client";

import { ArrowLeft, Calendar, Clock, Folder, Tag, User } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
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
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <ViewCounter slug={renderedPost.slug} />
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>阅读时间 {renderedPost.readingTime} 分钟</span>
                    </div>
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
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{renderedPost.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
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
                  {renderedPost.updatedAt && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        更新于{" "}
                        {new Date(renderedPost.updatedAt).toLocaleDateString(
                          "zh-CN",
                        )}
                      </span>
                    </div>
                  )}
                </div>

                {/* 标签 */}
                {renderedPost.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-2">
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
