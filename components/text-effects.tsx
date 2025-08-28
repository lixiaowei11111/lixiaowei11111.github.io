"use client";

import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import type { ElementType } from "react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

// 注册 GSAP 插件
if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

interface TextEffectProps {
  children: string;
  effect?: "typewriter" | "slideUp" | "fadeIn" | "glitch" | "gradient";
  className?: string;
  delay?: number;
  duration?: number;
  triggerOnce?: boolean;
}

export function TextEffect({
  children,
  effect = "fadeIn",
  className,
  delay = 0,
  duration = 1,
  triggerOnce = true,
}: TextEffectProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const { ref: intersectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce,
  });

  useEffect(() => {
    const element = textRef.current;
    if (!element || !inView || (triggerOnce && hasAnimated)) return;

    setHasAnimated(true);

    switch (effect) {
      case "typewriter":
        gsap.fromTo(
          element,
          { text: "" },
          {
            text: children,
            duration,
            delay,
            ease: "none",
          },
        );
        break;

      case "slideUp": {
        const chars = children
          .split("")
          .map((char) => (char === " " ? "&nbsp;" : char));
        element.innerHTML = chars
          .map((char) => `<span class="inline-block">${char}</span>`)
          .join("");

        gsap.fromTo(
          element.children,
          { y: 30, opacity: 0 }, // 减少移动距离
          {
            y: 0,
            opacity: 1,
            duration: 0.12, // 增加单个字符动画时间
            delay,
            stagger: 0.05, // 增加错开时间，让动画更平缓
            ease: "power2.out", // 使用更平缓的缓动
          },
        );
        break;
      }

      case "fadeIn":
        gsap.fromTo(
          element,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: "power2.out",
          },
        );
        break;

      case "glitch": {
        const glitchTl = gsap.timeline({ delay });
        glitchTl
          .set(element, { opacity: 1 })
          .to(element, {
            x: -1, // 减少晃动幅度
            duration: 0.08, // 增加持续时间
            repeat: 2, // 减少重复次数
            yoyo: true,
            ease: "power2.inOut",
          })
          .to(
            element,
            {
              x: 1,
              duration: 0.08,
              repeat: 1,
              yoyo: true,
              ease: "power2.inOut",
            },
            "-=0.1",
          )
          .set(element, { x: 0 });
        break;
      }

      case "gradient":
        gsap.fromTo(
          element,
          {
            backgroundPosition: "-200% 0",
            opacity: 0,
          },
          {
            backgroundPosition: "200% 0",
            opacity: 1,
            duration,
            delay,
            ease: "power2.inOut",
          },
        );
        break;
    }
  }, [inView, children, effect, delay, duration, triggerOnce, hasAnimated]);

  return (
    <span
      ref={(node) => {
        textRef.current = node;
        intersectionRef(node);
      }}
      className={cn(
        "inline-block",
        effect === "gradient" &&
          "bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent bg-[length:200%_100%]",
        effect === "glitch" && "relative",
        className,
      )}
      style={{ opacity: effect === "fadeIn" || effect === "glitch" ? 0 : 1 }}
    >
      {effect === "typewriter" ? "" : children}

      {effect === "glitch" && (
        <>
          <span className="absolute top-0 left-0 text-red-500 opacity-70 animate-pulse">
            {children}
          </span>
          <span className="absolute top-0 left-0 text-blue-500 opacity-70 animate-pulse delay-75">
            {children}
          </span>
        </>
      )}
    </span>
  );
}

// 预设的文字效果组合
export function AnimatedHeading({
  children,
  className,
  level = 1,
}: {
  children: string;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}) {
  const Tag = `h${level}` as ElementType;

  return (
    <Tag className={cn("font-bold", className)}>
      <TextEffect effect="slideUp" duration={1.2}>
        {children}
      </TextEffect>
    </Tag>
  );
}

export function GlitchText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <TextEffect
      effect="glitch"
      className={cn("font-mono font-bold", className)}
      duration={0.5}
    >
      {children}
    </TextEffect>
  );
}

export function GradientText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <TextEffect
      effect="gradient"
      className={cn("font-bold", className)}
      duration={2}
    >
      {children}
    </TextEffect>
  );
}
