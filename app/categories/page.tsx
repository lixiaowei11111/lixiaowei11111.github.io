import { FileText, Folder } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedElement } from "@/components/animated-element";
import { ClickEffects } from "@/components/click-effects";
import { ParticleBackground } from "@/components/particle-background";
import { ScrollProgress } from "@/components/scroll-progress";
import { AnimatedHeading, GradientText } from "@/components/text-effects";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCategoryStats } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "文章分类",
  description: "浏览所有文章分类，快速找到感兴趣的内容",
};

export default function CategoriesPage() {
  const categoryStats = getCategoryStats();

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
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <AnimatedElement animation="slideInUp">
              <AnimatedHeading level={1} className="text-4xl sm:text-5xl mb-4">
                文章分类
              </AnimatedHeading>
              <div className="text-lg text-muted-foreground max-w-2xl mx-auto">
                <GradientText className="text-lg">
                  探索不同技术领域的文章，找到你感兴趣的内容
                </GradientText>
              </div>
            </AnimatedElement>
          </div>

          {/* 分类网格 */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categoryStats.map((stat, index) => (
              <AnimatedElement
                key={stat.category.id}
                animation="slideInUp"
                delay={index * 0.1}
              >
                <Link
                  href={`/categories/${stat.category.slug}`}
                  className="block h-full"
                >
                  <Card className="p-6 h-full border-2 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group">
                    <div className="space-y-4">
                      {/* 分类图标和名称 */}
                      <div className="flex items-center gap-3">
                        <div
                          className="flex items-center justify-center w-12 h-12 rounded-lg text-2xl transition-transform group-hover:scale-110"
                          style={{
                            backgroundColor: `${stat.category.color}20`,
                          }}
                        >
                          {stat.category.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                            {stat.category.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FileText className="h-4 w-4" />
                            <span>{stat.count} 篇文章</span>
                          </div>
                        </div>
                      </div>

                      {/* 分类描述 */}
                      <p className="text-muted-foreground leading-relaxed">
                        {stat.category.description}
                      </p>

                      {/* 文章数量徽章 */}
                      <div className="flex justify-between items-center">
                        <Badge
                          variant="secondary"
                          className="text-xs"
                          style={{
                            backgroundColor: `${stat.category.color}20`,
                            color: stat.category.color,
                            borderColor: `${stat.category.color}40`,
                          }}
                        >
                          {stat.category.slug}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Folder className="h-4 w-4" />
                          <span>查看全部</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </AnimatedElement>
            ))}
          </div>

          {/* 统计信息 */}
          <AnimatedElement animation="slideInUp" delay={0.6} className="mt-12">
            <Card className="p-8 text-center border-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {categoryStats.length}
                  </div>
                  <div className="text-muted-foreground">个分类</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {categoryStats.reduce(
                      (total, stat) => total + stat.count,
                      0,
                    )}
                  </div>
                  <div className="text-muted-foreground">篇文章</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {Math.round(
                      categoryStats.reduce(
                        (total, stat) => total + stat.count,
                        0,
                      ) / categoryStats.length,
                    )}
                  </div>
                  <div className="text-muted-foreground">
                    平均每个分类文章数
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedElement>
        </div>
      </div>
    </div>
  );
}
