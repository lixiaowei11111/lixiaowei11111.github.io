import type { Metadata } from "next";
import { BlogCardGrid } from "@/components/blog-card";
import { ClickEffects } from "@/components/click-effects";
import { ParticleBackground } from "@/components/particle-background";
import { ScrollProgress } from "@/components/scroll-progress";
import { AnimatedHeading, GradientText } from "@/components/text-effects";
import { getAllPosts, getFeaturedPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "博客",
  description: "探索最新的技术文章和教程",
};

export default function BlogPage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();

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
            <AnimatedHeading level={1} className="text-4xl sm:text-5xl mb-4">
              技术博客
            </AnimatedHeading>
            <div className="text-lg text-muted-foreground max-w-2xl mx-auto">
              <GradientText className="text-lg">
                分享前端开发、全栈技术、工程实践等方面的经验和思考
              </GradientText>
            </div>
          </div>

          {/* 博客网格 */}
          <BlogCardGrid posts={allPosts} featuredPosts={featuredPosts} />
        </div>
      </div>
    </div>
  );
}
