"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const lastFrameTime = useRef<number>(0);
  const isVisible = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 检测设备性能和偏好设置
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isLowEndDevice = navigator.hardwareConcurrency <= 4;

    // 如果用户偏好减少动画或低端设备，则不显示粒子
    if (prefersReducedMotion || isLowEndDevice) {
      canvas.style.display = "none";
      return;
    }

    // 页面可见性检测
    const handleVisibilityChange = () => {
      isVisible.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 设置画布尺寸
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 2); // 限制设备像素比
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 创建粒子 - 进一步优化
    const createParticles = () => {
      const particles: Particle[] = [];
      // 根据屏幕尺寸和性能动态调整粒子数量
      const isMobile = window.innerWidth < 768;
      const baseCount = isMobile ? 8 : 15; // 大幅减少粒子数量
      const particleCount = Math.min(
        baseCount,
        Math.floor(window.innerWidth / 80),
      );

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 1.5 + 0.5, // 进一步减小粒子尺寸
          speedX: (Math.random() - 0.5) * 0.1, // 进一步减慢速度
          speedY: (Math.random() - 0.5) * 0.1,
          opacity: Math.random() * 0.2 + 0.05, // 进一步降低透明度
          color: `hsl(${Math.random() * 60 + 200}, 40%, 65%)`, // 降低饱和度
        });
      }

      particlesRef.current = particles;
    };

    // 优化的动画循环 - 使用节流和更高效的渲染
    const animate = (currentTime: number) => {
      if (!isVisible.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // 节流到 30fps 以减少 CPU 负担
      if (currentTime - lastFrameTime.current < 33) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime.current = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 使用更高效的渲染方式
      ctx.save();

      particlesRef.current.forEach((particle, index) => {
        // 更新位置
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // 边界检查
        if (particle.x < 0 || particle.x > window.innerWidth)
          particle.speedX *= -1;
        if (particle.y < 0 || particle.y > window.innerHeight)
          particle.speedY *= -1;

        // 绘制粒子
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // 只在较少的粒子间绘制连接线，并优化距离计算
        if (index % 2 === 0) {
          // 只处理一半的粒子连接
          for (let i = index + 1; i < particlesRef.current.length; i += 2) {
            const otherParticle = particlesRef.current[i];
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distanceSquared = dx * dx + dy * dy; // 避免开方运算

            if (distanceSquared < 4000) {
              // 距离平方 < 63^2
              const distance = Math.sqrt(distanceSquared);
              ctx.globalAlpha = (63 - distance) / 630; // 更低的连线透明度
              ctx.strokeStyle = particle.color;
              ctx.lineWidth = 0.2;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        }
      });

      ctx.restore();
      animationRef.current = requestAnimationFrame(animate);
    };

    createParticles();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-15" // 进一步降低透明度
      style={{ background: "transparent" }}
    />
  );
}
