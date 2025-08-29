"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      setScrollProgress(progress);
      setIsVisible(scrollTop > 300);
    };

    const handleScroll = () => {
      requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll);
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
        scale: isVisible ? 1 : 0.8,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    }
  }, [isVisible]);

  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 1,
      ease: "power2.inOut",
    });
  };

  return (
    <>
      {/* 顶部进度条 */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted/50 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 回到顶部按钮 */}
      <Button
        ref={buttonRef}
        onClick={scrollToTop}
        size="icon"
        className={cn(
          "fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full shadow-lg",
          "hover:shadow-xl hover:scale-110 transition-all duration-300",
          "opacity-0 pointer-events-none relative overflow-hidden",
        )}
        style={{
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? "auto" : "none",
        }}
        aria-label="回到顶部"
        title="回到顶部"
      >
        {/* 环形进度指示器 */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, hsl(var(--primary-foreground)) ${scrollProgress * 3.6}deg, transparent ${scrollProgress * 3.6}deg)`,
            padding: "2px",
          }}
        >
          <div className="w-full h-full bg-primary rounded-full" />
        </div>

        <ArrowUp className="w-4 h-4 relative z-10" />
        <span className="sr-only">回到顶部</span>
      </Button>
    </>
  );
}
