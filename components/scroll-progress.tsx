"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";

// 注册GSAP的插件
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export function ScrollProgress() {
  // 使用React状态跟踪滚动进度
  const [scrollProgress, setScrollProgress] = useState(0);

  // 按钮引用
  const buttonRef = useRef<HTMLDivElement>(null);

  // 创建两个intersection observers:
  // 1. 一个用于检测页面是否滚动到了显示按钮的阈值
  // 2. 一个用于检测页面顶部是否在视图中
  const { ref: scrollTriggerRef, inView: shouldHideButton } = useInView({
    threshold: 0,
    rootMargin: "-300px 0px 0px 0px", // 当页面顶部300px内可见时，按钮隐藏
  });

  const { ref: topRef } = useInView({
    threshold: 0.05,
    initialInView: true,
  });

  // 使用GSAP和React的useEffect管理滚动进度和按钮显示
  useEffect(() => {
    console.log("ScrollProgress组件已挂载，使用GSAP和Intersection Observer");

    if (typeof window === "undefined") return;

    // 创建GSAP上下文
    const ctx = gsap.context(() => {
      // 设置按钮的初始状态
      gsap.set(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        display: "none",
      });

      // 创建ScrollTrigger来跟踪滚动进度
      ScrollTrigger.create({
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          // 更新滚动进度
          setScrollProgress(self.progress * 100);

          // 当滚动超过300px时显示按钮
          if (self.scroll() > 300) {
            if (
              buttonRef.current &&
              window.getComputedStyle(buttonRef.current).display === "none"
            ) {
              gsap.set(buttonRef.current, { display: "block" });
              gsap.to(buttonRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          } else {
            if (
              buttonRef.current &&
              window.getComputedStyle(buttonRef.current).display !== "none"
            ) {
              gsap.to(buttonRef.current, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                  gsap.set(buttonRef.current, { display: "none" });
                },
              });
            }
          }
        },
      });
    });

    // 清理函数
    return () => {
      ctx.revert(); // 重置所有GSAP动画
    };
  }, []);

  // 监听shouldHideButton状态变化，使用GSAP动画显示/隐藏按钮
  useEffect(() => {
    if (!buttonRef.current) return;

    if (shouldHideButton) {
      gsap.to(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(buttonRef.current, { display: "none" });
        },
      });
    } else if (window.scrollY > 300) {
      gsap.set(buttonRef.current, { display: "block" });
      gsap.to(buttonRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [shouldHideButton]);

  // 滚动到顶部处理函数，使用GSAP实现平滑滚动
  const scrollToTop = () => {
    console.log("使用GSAP滚动到顶部");

    // 获取当前滚动位置
    const currentScroll = window.scrollY;

    // 优化动画时间，让滚动更快更平滑
    const scrollDuration = Math.min(1.2, Math.max(0.3, currentScroll / 3000));

    gsap.to(window, {
      scrollTo: 0,
      duration: scrollDuration,
      ease: "power2.out", // 使用更快的缓动效果
      overwrite: true, // 防止多次点击时动画叠加
    });
  };

  return (
    <>
      {/* 页面顶部检测器 - 一个不可见的元素 */}
      <div
        ref={topRef}
        className="absolute top-0 h-[100px] w-full pointer-events-none opacity-0"
        aria-hidden="true"
      />

      {/* 滚动触发检测器 - 用于控制按钮显示/隐藏 */}
      <div
        ref={scrollTriggerRef}
        className="absolute top-0 h-[300px] w-full pointer-events-none opacity-0"
        aria-hidden="true"
      />

      {/* 顶部进度条 */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200/30 backdrop-blur-sm">
        <div
          className="h-full transition-all duration-300 ease-out"
          style={{
            width: `${scrollProgress}%`,
            background:
              "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 30%, #f59e0b 60%, #ef4444 100%)",
          }}
        />
      </div>

      {/* 回到顶部按钮 - GSAP融合设计 */}
      <div ref={buttonRef} className="fixed bottom-8 right-8 z-[100]">
        <Button
          onClick={scrollToTop}
          className="relative w-16 h-16 rounded-full group cursor-pointer outline-none focus:outline-none"
          style={{
            background: `
              conic-gradient(from 0deg, 
                rgba(59, 130, 246, 0.8) 0deg, 
                rgba(59, 130, 246, 0.9) ${scrollProgress * 3.6}deg,
                rgba(255, 255, 255, 0.08) ${scrollProgress * 3.6}deg
              ), 
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.9) 0%, 
                rgba(248, 250, 252, 0.85) 50%,
                rgba(241, 245, 249, 0.8) 100%
              )
            `,
            boxShadow: `
              0 4px 24px rgba(59, 130, 246, 0.15),
              0 2px 8px rgba(0, 0, 0, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 0.7),
              0 0 0 1px rgba(59, 130, 246, 0.1)
            `,
            backdropFilter: "blur(16px) saturate(1.1)",
          }}
          aria-label="回到顶部"
          title="回到顶部"
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1.1,
              rotation: 5,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(e.currentTarget.querySelector(".arrow-icon"), {
              y: -2,
              scale: 1.1,
              duration: 0.3,
              ease: "power2.out",
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(e.currentTarget.querySelector(".arrow-icon"), {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }}
        >
          {/* 内部光晕效果 */}
          <div
            className="absolute inset-2 rounded-full opacity-60"
            style={{
              background: `radial-gradient(circle, 
                rgba(59, 130, 246, 0.2) 0%, 
                rgba(139, 92, 246, 0.1) 50%, 
                transparent 70%
              )`,
            }}
          />

          {/* 动态脉冲效果 */}
          <div
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background: `conic-gradient(from 0deg, 
                transparent 0deg,
                rgba(59, 130, 246, 0.3) ${scrollProgress * 3.6}deg,
                transparent ${scrollProgress * 3.6}deg
              )`,
              filter: "blur(4px)",
            }}
          />

          {/* 箭头图标 */}
          <ArrowUp
            className="arrow-icon w-7 h-7 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-700 drop-shadow-sm"
            style={{
              filter: `hue-rotate(${scrollProgress * 2}deg) saturate(1.2)`,
            }}
          />

          {/* 进度文字 */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {Math.round(scrollProgress)}%
          </div>

          <span className="sr-only">回到顶部</span>
        </Button>
      </div>
    </>
  );
}
