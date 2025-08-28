import { ArrowLeft, FileText, Hash } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedElement } from "@/components/animated-element";
import { BlogCard } from "@/components/blog-card";
import { ClickEffects } from "@/components/click-effects";
import { ParticleBackground } from "@/components/particle-background";
import { ScrollProgress } from "@/components/scroll-progress";
import { AnimatedHeading, GradientText } from "@/components/text-effects";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getAllTags, getPostsByTag } from "@/lib/mdx";

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    slug: tag.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tags = getAllTags();
  const tag = tags.find((t) => t.slug === slug);

  if (!tag) {
    return {
      title: "标签未找到",
    };
  }

  return {
    title: `${tag.name} - 标签`,
    description: `浏览所有关于 ${tag.name} 的文章`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tags = getAllTags();
  const tag = tags.find((t) => t.slug === slug);

  if (!tag) {
    notFound();
  }

  const posts = getPostsByTag(tag.name);

  // 获取标签颜色（基于标签名称的哈希）
  const getTagColor = (tagName: string) => {
    const colors = [
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#8b5cf6",
      "#06b6d4",
      "#84cc16",
      "#f97316",
      "#ec4899",
      "#6366f1",
    ];
    let hash = 0;
    for (let i = 0; i < tagName.length; i++) {
      hash = tagName.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const tagColor = getTagColor(tag.name);

  return (
    <div className="min-h-screen relative">
      {/* 背景特效 */}
      <ParticleBackground />

      {/* 滚动进度和回到顶部 */}
      <ScrollProgress />

      {/* 点击效果 */}
      <ClickEffects />

      <div className="pt-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 返回按钮 */}
          <AnimatedElement animation="fadeInLeft">
            <Link
              href="/tags"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              返回标签列表
            </Link>
          </AnimatedElement>

          {/* 标签头部 */}
          <AnimatedElement animation="slideInUp" className="mb-12">
            <Card className="p-8 border-2">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-xl text-4xl flex-shrink-0"
                  style={{ backgroundColor: `${tagColor}20` }}
                >
                  <Hash style={{ color: tagColor }} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <AnimatedHeading level={1} className="text-3xl md:text-4xl">
                      {tag.name}
                    </AnimatedHeading>
                    <Badge
                      variant="secondary"
                      style={{
                        backgroundColor: `${tagColor}20`,
                        color: tagColor,
                        borderColor: `${tagColor}40`,
                      }}
                    >
                      {posts.length} 篇文章
                    </Badge>
                  </div>

                  <div className="text-lg text-muted-foreground mb-4">
                    <GradientText className="text-lg">
                      {`浏览所有关于 "${tag.name}" 的技术文章和教程`}
                    </GradientText>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Hash className="h-4 w-4" />
                      <span>标签：{tag.slug}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{posts.length} 篇文章</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedElement>

          {/* 文章列表 */}
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <AnimatedElement
                  key={post.id}
                  animation="slideInUp"
                  delay={index * 0.1}
                >
                  <BlogCard post={post} />
                </AnimatedElement>
              ))}
            </div>
          ) : (
            <AnimatedElement animation="slideInUp" delay={0.2}>
              <Card className="p-12 text-center border-2">
                <div className="text-6xl mb-4">🏷️</div>
                <h3 className="text-xl font-semibold mb-2">暂无文章</h3>
                <p className="text-muted-foreground mb-6">
                  这个标签下还没有发布任何文章，敬请期待！
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  浏览所有文章
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Link>
              </Card>
            </AnimatedElement>
          )}

          {/* 相关标签 */}
          <AnimatedElement animation="slideInUp" delay={0.4} className="mt-12">
            <Card className="p-6 border-2">
              <h3 className="text-lg font-semibold mb-4">其他热门标签</h3>
              <div className="flex flex-wrap gap-2">
                {tags
                  .filter((t) => t.slug !== tag.slug)
                  .slice(0, 10)
                  .map((relatedTag) => {
                    const relatedTagColor = getTagColor(relatedTag.name);
                    return (
                      <Link
                        key={relatedTag.slug}
                        href={`/tags/${relatedTag.slug}`}
                      >
                        <Badge
                          variant="outline"
                          className="hover:scale-105 transition-transform"
                          style={{
                            borderColor: relatedTagColor,
                            color: relatedTagColor,
                            backgroundColor: `${relatedTagColor}10`,
                          }}
                        >
                          <Hash className="h-3 w-3 mr-1" />
                          {relatedTag.name}
                          <span className="ml-1 text-xs opacity-70">
                            {relatedTag.count}
                          </span>
                        </Badge>
                      </Link>
                    );
                  })}
              </div>
            </Card>
          </AnimatedElement>
        </div>
      </div>
    </div>
  );
}
