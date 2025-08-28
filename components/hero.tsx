"use client";

import { ArrowDown, Code } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { animationManager } from "../lib/animations";
import { siteConfig } from "../lib/config";
import { AnimatedElement } from "./animated-element";
import { MagneticButton } from "./magnetic-button";
import { AnimatedHeading, GradientText, TextEffect } from "./text-effects";

// 浮动元素组件 - 客户端渲染以避免水合错误
function FloatingElements() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 服务器端渲染时不显示任何内容，避免水合错误
  if (!isMounted) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 占位元素，避免布局偏移 */}
      </div>
    );
  }

  // 客户端挂载后生成随机元素
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={`floating-${i}`}
          className={cn(
            "absolute w-1 h-1 bg-primary/10 rounded-full animate-float",
            "opacity-0 animate-pulse",
          )}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current && typeof window !== "undefined") {
      // 打字机效果
      animationManager.typewriterEffect(
        titleRef.current,
        "创造 • 分享 • 成长",
        { duration: 2, ease: "power2.inOut" },
      );

      // 视差效果
      if (heroRef.current) {
        animationManager.parallaxEffect([
          { element: heroRef.current, speed: 0.5 },
        ]);
      }
    }
  }, []);

  const scrollToContent = () => {
    const contentSection = document.querySelector("#content");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        />
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* 主标题 */}
        <div className="mb-6">
          <AnimatedHeading
            level={1}
            className="text-4xl sm:text-5xl lg:text-7xl mb-4"
          >
            {siteConfig.author.name}
          </AnimatedHeading>
          <div className="text-2xl sm:text-3xl lg:text-4xl">
            <GradientText className="text-2xl sm:text-3xl lg:text-4xl">
              创造 • 分享 • 成长
            </GradientText>
          </div>
        </div>

        {/* 副标题 */}
        <AnimatedElement animation="fadeInUp" delay={0.8}>
          <div className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            <TextEffect effect="typewriter" duration={2} delay={1}>
              {siteConfig.description}
            </TextEffect>
          </div>
        </AnimatedElement>

        {/* 技术标签 */}
        <AnimatedElement animation="fadeInUp" delay={1.0}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Node.js",
              "GSAP",
              "Tailwind CSS",
            ].map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className={cn(
                  "px-3 py-1 text-sm hover:scale-105 transition-all duration-300 cursor-default",
                  "hover:shadow-sm hover:bg-secondary/80", // 替换弹跳动画为悬停效果
                )}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </AnimatedElement>

        {/* CTA 按钮 */}
        <AnimatedElement animation="fadeInUp" delay={1.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MagneticButton
              size="lg"
              className="px-8 py-3 text-lg gap-2"
              onClick={scrollToContent}
              data-confetti="true"
            >
              <Code className="w-5 h-5" />
              <span>探索文章</span>
            </MagneticButton>
            <MagneticButton
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg"
              asChild
            >
              <a href="/about">了解更多</a>
            </MagneticButton>
          </div>
        </AnimatedElement>

        {/* 向下箭头 */}
        <AnimatedElement animation="fadeInUp" delay={1.4}>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <MagneticButton
              variant="ghost"
              size="icon"
              className="animate-bounce"
              onClick={scrollToContent}
              strength={0.2}
            >
              <ArrowDown className="w-5 h-5" />
            </MagneticButton>
          </div>
        </AnimatedElement>
      </div>

      {/* 浮动元素 */}
      <FloatingElements />
    </section>
  );
}
