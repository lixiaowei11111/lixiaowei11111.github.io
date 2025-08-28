import {
  CreditCard as CardIcon,
  Loader,
  MousePointer,
  Sparkles,
  Target,
  Type,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import { ClickEffects } from "@/components/click-effects";
import { BlogCardSkeleton, Skeleton } from "@/components/loading-animations";
import { MagneticButton } from "@/components/magnetic-button";
import { ParticleBackground } from "@/components/particle-background";
import { ScrollProgress } from "@/components/scroll-progress";
import {
  AnimatedHeading,
  GlitchText,
  GradientText,
  TextEffect,
} from "@/components/text-effects";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "特效演示",
  description: "展示博客中使用的各种令人惊艳的特效",
};

function EffectsShowcase() {
  return (
    <div className="min-h-screen relative">
      {/* 背景特效 */}
      <ParticleBackground />

      {/* 滚动进度和回到顶部 */}
      <ScrollProgress />

      {/* 点击效果 */}
      <ClickEffects />

      <div className="pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 页面标题 */}
          <div className="text-center mb-16">
            <AnimatedHeading level={1} className="text-4xl sm:text-5xl mb-4">
              特效演示
            </AnimatedHeading>
            <div className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              <GradientText className="text-lg">
                体验这些令人惊艳的交互特效和动画效果
              </GradientText>
            </div>
            <Badge className="animate-pulse-slow">
              <Sparkles className="w-3 h-3 mr-1" />
              所有特效均基于 GSAP 构建
            </Badge>
          </div>

          <div className="grid gap-8 md:gap-12">
            {/* 文字特效区域 */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  文字特效
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">打字机效果</h3>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <TextEffect effect="typewriter" duration={3}>
                        欢迎来到未来的技术世界！
                      </TextEffect>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">字符上升动画</h3>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <TextEffect effect="slideUp" duration={1.5}>
                        每个字符都有生命力
                      </TextEffect>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">渐变文字</h3>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <GradientText className="text-xl font-bold">
                        彩虹般的渐变色彩
                      </GradientText>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">故障效果</h3>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <GlitchText className="text-xl">
                        CYBER PUNK 2077
                      </GlitchText>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 按钮特效区域 */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MousePointer className="w-5 h-5" />
                  交互按钮
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-semibold">磁性按钮</h3>
                    <MagneticButton className="w-full">
                      跟随鼠标移动
                    </MagneticButton>
                  </div>

                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-semibold">庆祝效果</h3>
                    <MagneticButton
                      className="w-full"
                      variant="secondary"
                      data-confetti="true"
                    >
                      点击有惊喜 🎉
                    </MagneticButton>
                  </div>

                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-semibold">霓虹效果</h3>
                    <MagneticButton
                      className="w-full neon animate-glow"
                      strength={0.5}
                    >
                      科幻风格
                    </MagneticButton>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 卡片特效区域 */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CardIcon className="w-5 h-5" />
                  卡片动画
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="floating-3d cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">3D 悬浮效果</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        鼠标悬停时展现 3D 立体效果
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shimmer cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">闪烁动画</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        光影流动的视觉效果
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="animate-pulse-slow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">呼吸效果</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        温和的脉冲动画
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* 加载动画区域 */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Loader className="w-5 h-5" />
                  加载动画
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">骨架屏效果</h3>
                    <BlogCardSkeleton />
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">基础骨架组件</h3>
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 使用说明 */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  交互指南
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Badge variant="outline" className="w-fit">
                      <MousePointer className="w-3 h-3 mr-1" />
                      鼠标操作
                    </Badge>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• 移动鼠标查看自定义光标</li>
                      <li>• 悬停按钮体验磁性效果</li>
                      <li>• 点击按钮触发粒子特效</li>
                      <li>• 悬停卡片查看 3D 效果</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <Badge variant="outline" className="w-fit">
                      <Zap className="w-3 h-3 mr-1" />
                      滚动交互
                    </Badge>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• 顶部进度条显示滚动进度</li>
                      <li>• 滚动时元素逐渐显现</li>
                      <li>• 右下角回到顶部按钮</li>
                      <li>• 背景粒子随滚动变化</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EffectsShowcase;
