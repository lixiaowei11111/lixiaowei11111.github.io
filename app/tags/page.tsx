import { Hash, Tag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedElement } from "@/components/animated-element";
import { ClickEffects } from "@/components/click-effects";
import { ParticleBackground } from "@/components/particle-background";
import { ScrollProgress } from "@/components/scroll-progress";
import { AnimatedHeading, GradientText } from "@/components/text-effects";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getAllTags } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "标签云",
  description: "浏览所有文章标签，快速找到相关主题的内容",
};

export default function TagsPage() {
  const tags = getAllTags();

  // 根据文章数量计算标签大小
  const getTagSize = (count: number, maxCount: number) => {
    const minSize = 0.8;
    const maxSize = 2.5;
    const ratio = count / maxCount;
    return minSize + (maxSize - minSize) * ratio;
  };

  // 获取标签颜色
  const getTagColor = (index: number) => {
    const colors = [
      "#3b82f6", // blue
      "#10b981", // emerald
      "#f59e0b", // amber
      "#ef4444", // red
      "#8b5cf6", // violet
      "#06b6d4", // cyan
      "#84cc16", // lime
      "#f97316", // orange
      "#ec4899", // pink
      "#6366f1", // indigo
    ];
    return colors[index % colors.length];
  };

  const maxCount = Math.max(...tags.map((tag) => tag.count));

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
                标签云
              </AnimatedHeading>
              <div className="text-lg text-muted-foreground max-w-2xl mx-auto">
                <GradientText className="text-lg">
                  通过标签快速找到相关主题的文章，探索感兴趣的技术领域
                </GradientText>
              </div>
            </AnimatedElement>
          </div>

          {/* 统计信息 */}
          <AnimatedElement animation="slideInUp" delay={0.2} className="mb-12">
            <Card className="p-6 border-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {tags.length}
                  </div>
                  <div className="text-muted-foreground">个标签</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {tags.reduce((total, tag) => total + tag.count, 0)}
                  </div>
                  <div className="text-muted-foreground">篇文章</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {maxCount}
                  </div>
                  <div className="text-muted-foreground">最热门标签文章数</div>
                </div>
              </div>
            </Card>
          </AnimatedElement>

          {/* 标签云 */}
          <AnimatedElement animation="slideInUp" delay={0.4} className="mb-12">
            <Card className="p-8 border-2">
              <div className="flex flex-wrap justify-center items-center gap-4">
                {tags.map((tag, index) => {
                  const size = getTagSize(tag.count, maxCount);
                  const color = getTagColor(index);
                  return (
                    <Link
                      key={tag.slug}
                      href={`/tags/${tag.slug}`}
                      className="inline-block transition-all duration-300 hover:scale-110"
                      style={{
                        fontSize: `${size}rem`,
                      }}
                    >
                      <Badge
                        variant="outline"
                        className="px-3 py-1 text-sm font-medium hover:shadow-lg transition-all duration-300"
                        style={{
                          borderColor: color,
                          color: color,
                          backgroundColor: `${color}10`,
                          fontSize: `${Math.max(size * 0.6, 0.75)}rem`,
                        }}
                      >
                        <Hash className="h-3 w-3 mr-1" />
                        {tag.name}
                        <span className="ml-2 text-xs opacity-70">
                          {tag.count}
                        </span>
                      </Badge>
                    </Link>
                  );
                })}
              </div>
            </Card>
          </AnimatedElement>

          {/* 热门标签列表 */}
          <AnimatedElement animation="slideInUp" delay={0.6}>
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Tag className="h-6 w-6" />
                热门标签
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tags.slice(0, 12).map((tag, index) => (
                  <AnimatedElement
                    key={tag.slug}
                    animation="slideInUp"
                    delay={0.7 + index * 0.05}
                  >
                    <Link href={`/tags/${tag.slug}`}>
                      <Card className="p-4 border-2 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Hash
                              className="h-4 w-4"
                              style={{ color: getTagColor(index) }}
                            />
                            <span className="font-medium group-hover:text-primary transition-colors">
                              {tag.name}
                            </span>
                          </div>
                          <Badge
                            variant="secondary"
                            style={{
                              backgroundColor: `${getTagColor(index)}20`,
                              color: getTagColor(index),
                            }}
                          >
                            {tag.count}
                          </Badge>
                        </div>
                      </Card>
                    </Link>
                  </AnimatedElement>
                ))}
              </div>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </div>
  );
}
