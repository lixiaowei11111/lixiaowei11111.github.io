import type { Metadata } from "next";
import { ClickEffects } from "@/components/click-effects";
import { ParticleBackground } from "@/components/particle-background";
import { ScrollProgress } from "@/components/scroll-progress";
import { Card } from "@/components/ui/card";
// 直接导入 MDX 文件
import AboutContent from "@/content/pages/about.mdx";

export const metadata: Metadata = {
  title: "关于我",
  description: "了解更多关于我的信息、技能和经历",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen relative">
      {/* 背景特效 */}
      <ParticleBackground />

      {/* 滚动进度 */}
      <ScrollProgress />

      {/* 点击效果 */}
      <ClickEffects />

      <div className="pt-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-8 md:p-12 border-2">
            <div className="prose prose-lg max-w-none">
              <AboutContent />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
