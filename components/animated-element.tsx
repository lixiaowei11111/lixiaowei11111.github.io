"use client";

import { createElement, type JSX, useEffect, useRef } from "react";
import { animationManager } from "../lib/animations";

interface AnimatedElementProps {
  children: React.ReactNode;
  animation?:
    | "fadeInUp"
    | "fadeInLeft"
    | "fadeInRight"
    | "scaleIn"
    | "slideInUp"
    | "slideInLeft";
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function AnimatedElement({
  children,
  animation = "fadeInUp",
  delay = 0,
  className = "",
  as = "div",
}: AnimatedElementProps) {
  const elementRef = useRef<HTMLElement | SVGElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const config = animationManager.getMobileConfig({
      duration: 0.8,
      ease: "power2.out",
      delay,
    });

    // 确保元素有样式属性（HTMLElement 和 SVGElement 都有 style 属性）
    const elementStyle = element.style;

    // 根据动画类型设置初始状态和动画
    switch (animation) {
      case "fadeInUp":
        elementStyle.opacity = "0";
        elementStyle.transform = "translateY(50px)";
        break;
      case "fadeInLeft":
        elementStyle.opacity = "0";
        elementStyle.transform = "translateX(-50px)";
        break;
      case "fadeInRight":
        elementStyle.opacity = "0";
        elementStyle.transform = "translateX(50px)";
        break;
      case "scaleIn":
        elementStyle.opacity = "0";
        elementStyle.transform = "scale(0.5)";
        break;
      case "slideInUp":
        elementStyle.opacity = "0";
        elementStyle.transform = "translateY(100px)";
        break;
      case "slideInLeft":
        elementStyle.opacity = "0";
        elementStyle.transform = "translateX(-100px)";
        break;
    }

    // 使用 Intersection Observer 触发动画
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 触发动画
            elementStyle.transition = `all ${config.duration}s ${config.ease}`;
            elementStyle.transitionDelay = `${config.delay}s`;
            elementStyle.opacity = "1";
            elementStyle.transform = "translateY(0) translateX(0) scale(1)";

            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [animation, delay]);

  return createElement(
    as,
    {
      ref: elementRef,
      className,
    },
    children,
  );
}
