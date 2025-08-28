"use client";

import confetti from "canvas-confetti";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export function ClickEffects() {
  const rippleContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // 创建水波纹效果
      createRipple(e.clientX, e.clientY);

      // 特殊元素的庆祝效果
      if (target.closest('[data-confetti="true"]')) {
        triggerConfetti(e.clientX, e.clientY);
      }

      // 按钮点击的粒子效果
      if (target.closest('button, [role="button"]')) {
        createParticleEffect(e.clientX, e.clientY);
      }
    };

    const createRipple = (x: number, y: number) => {
      if (!rippleContainer.current) return;

      const ripple = document.createElement("div");
      ripple.className =
        "absolute rounded-full bg-primary/20 pointer-events-none";
      ripple.style.width = "20px";
      ripple.style.height = "20px";
      ripple.style.left = `${x - 10}px`;
      ripple.style.top = `${y - 10}px`;
      ripple.style.transform = "scale(0)";
      ripple.style.opacity = "0.7";

      rippleContainer.current.appendChild(ripple);

      gsap.to(ripple, {
        scale: 6, // 减小水波纹扩散范围
        opacity: 0,
        duration: 0.8, // 增加持续时间
        ease: "power2.out",
        onComplete: () => {
          ripple.remove();
        },
      });
    };

    const createParticleEffect = (x: number, y: number) => {
      const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

      for (let i = 0; i < 4; i++) {
        // 减少粒子数量
        const particle = document.createElement("div");
        particle.className =
          "absolute w-0.5 h-0.5 rounded-full pointer-events-none"; // 减小粒子尺寸
        particle.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / 4;
        const distance = 30 + Math.random() * 30; // 减少扩散距离

        gsap.to(particle, {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          opacity: 0,
          scale: 0,
          duration: 1.2, // 增加持续时间
          ease: "power2.out",
          onComplete: () => {
            particle.remove();
          },
        });
      }
    };

    const triggerConfetti = (x: number, y: number) => {
      confetti({
        particleCount: 50, // 减少彩屑数量
        spread: 50, // 减少扩散范围
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
      });
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      ref={rippleContainer}
      className="fixed inset-0 pointer-events-none z-40"
    />
  );
}

// 成功/庆祝动画的Hook
export function useCelebration() {
  const celebrate = (element?: HTMLElement) => {
    const rect = element?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    confetti({
      particleCount: 80, // 减少粒子数量
      spread: 70, // 减少扩散范围
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      },
      colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
    });

    // 额外的烟花效果 - 减少强度
    setTimeout(() => {
      confetti({
        particleCount: 25, // 减少粒子数量
        angle: 60,
        spread: 40, // 减少扩散范围
        origin: { x: 0 },
        colors: ["#3b82f6", "#10b981", "#f59e0b"],
      });
      confetti({
        particleCount: 25,
        angle: 120,
        spread: 40,
        origin: { x: 1 },
        colors: ["#ef4444", "#8b5cf6", "#f59e0b"],
      });
    }, 300); // 增加延迟
  };

  return { celebrate };
}
