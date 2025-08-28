import { ArrowLeft, FileText, Folder } from "lucide-react";
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
import {
  getCategories,
  getCategoryBySlug,
  getPostsByCategory,
} from "@/lib/mdx";

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "分类未找到",
    };
  }

  return {
    title: `${category.name} - 文章分类`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const posts = getPostsByCategory(slug);

  if (!category) {
    notFound();
  }

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
          <AnimatedElement animation="slideInLeft">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              返回分类列表
            </Link>
          </AnimatedElement>

          {/* 分类头部 */}
          <AnimatedElement animation="slideInUp" className="mb-12">
            <Card className="p-8 border-2">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-xl text-4xl flex-shrink-0"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  {category.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <AnimatedHeading level={1} className="text-3xl md:text-4xl">
                      {category.name}
                    </AnimatedHeading>
                    <Badge
                      variant="secondary"
                      style={{
                        backgroundColor: `${category.color}20`,
                        color: category.color,
                        borderColor: `${category.color}40`,
                      }}
                    >
                      {posts.length} 篇文章
                    </Badge>
                  </div>

                  <div className="text-lg text-muted-foreground mb-4">
                    <GradientText className="text-lg">
                      {category.description}
                    </GradientText>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Folder className="h-4 w-4" />
                      <span>分类：{category.slug}</span>
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
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold mb-2">暂无文章</h3>
                <p className="text-muted-foreground mb-6">
                  这个分类下还没有发布任何文章，敬请期待！
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
        </div>
      </div>
    </div>
  );
}
