import type { Metadata } from "next";
import { ClickEffects } from "@/components/click-effects";
import { ParticleBackground } from "@/components/particle-background";
import { ScrollProgress } from "@/components/scroll-progress";
import { Card } from "@/components/ui/card";
import { getRenderedAbout } from "@/lib/mdx-render";

export const metadata: Metadata = {
  title: "关于我",
  description: "了解更多关于我的信息、技能和经历",
};

export default async function AboutPage() {
  const renderedAbout = await getRenderedAbout();

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
            <div
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-m-20 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-primary prose-pre:bg-muted prose-pre:text-foreground prose-code:text-foreground"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: MDX content is pre-processed and safe
              dangerouslySetInnerHTML={{
                __html: renderedAbout.renderedContent,
              }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
