"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  tween?: gsap.core.Tween;
  direction?: number; // 粒子运动方向的随机变化
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const observerRef = useRef<ResizeObserver | null>(null);
  const visibilityObserverRef = useRef<IntersectionObserver | null>(null);
  const isVisible = useRef<boolean>(true);
  const mousePosition = useRef({ x: 0, y: 0 });
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const lastFrameTime = useRef<number>(0);
  const targetFPS = useRef<number>(60);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 创建GSAP时间线
    timelineRef.current = gsap.timeline();

    // 检测设备性能和偏好设置
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isLowEndDevice = navigator.hardwareConcurrency <= 4;

    // 如果用户偏好减少动画或低端设备，则显示简化版粒子
    const useSimplifiedEffect = prefersReducedMotion || isLowEndDevice;

    // 根据设备性能调整目标帧率
    targetFPS.current = useSimplifiedEffect ? 30 : 60;

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

    // 使用ResizeObserver替代resize事件
    observerRef.current = new ResizeObserver(resizeCanvas);
    observerRef.current.observe(document.body);

    // 使用IntersectionObserver检测可见性
    visibilityObserverRef.current = new IntersectionObserver(
      (entries) => {
        isVisible.current = entries[0].isIntersecting;
        if (isVisible.current) {
          // 如果变为可见，恢复动画
          timelineRef.current?.play();
        } else {
          // 如果变为不可见，暂停动画
          timelineRef.current?.pause();
        }
      },
      { threshold: 0 },
    );
    visibilityObserverRef.current.observe(canvas);

    // 追踪鼠标位置
    const updateMousePosition = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    // 只用一个事件监听器用于鼠标移动
    window.addEventListener("mousemove", updateMousePosition, {
      passive: true,
    });

    // 创建粒子 - 增强版
    const createParticles = () => {
      const particles: Particle[] = [];
      // 根据屏幕尺寸和性能动态调整粒子数量
      const isMobile = window.innerWidth < 768;
      // 增加粒子数量，但如果是低端设备仍然保持较少数量
      const baseCount = useSimplifiedEffect
        ? isMobile
          ? 30 // 增加粒子数量（原来是15）
          : 60 // 增加粒子数量（原来是30）
        : isMobile
          ? 80 // 增加粒子数量（原来是40）
          : 160; // 增加粒子数量（原来是80）
      const particleCount = Math.min(
        baseCount,
        Math.floor(window.innerWidth / 20), // 减小除数以增加粒子数量（原来是30）
      );

      // 扩展颜色数组，添加更多不同色系的颜色
      const colors = [
        // 蓝色系
        "rgba(100, 149, 237, 0.7)", // 矢车菊蓝
        "rgba(65, 105, 225, 0.7)", // 宝蓝色
        "rgba(70, 130, 180, 0.7)", // 钢蓝色
        "rgba(135, 206, 235, 0.7)", // 天蓝色
        "rgba(135, 206, 250, 0.7)", // 淡蓝色
        // 紫色系
        "rgba(138, 43, 226, 0.7)", // 紫罗兰
        "rgba(148, 0, 211, 0.7)", // 深紫色
        "rgba(186, 85, 211, 0.7)", // 中兰花紫
        // 绿色系
        "rgba(60, 179, 113, 0.7)", // 中海绿
        "rgba(46, 139, 87, 0.7)", // 海绿色
        "rgba(32, 178, 170, 0.7)", // 浅海绿
        // 粉色系
        "rgba(255, 105, 180, 0.7)", // 热粉红
        "rgba(219, 112, 147, 0.7)", // 浅珊瑚色
        // 橙色系
        "rgba(255, 165, 0, 0.7)", // 橙色
        "rgba(255, 140, 0, 0.7)", // 深橙色
      ];

      // 更加均匀地分布粒子
      for (let i = 0; i < particleCount; i++) {
        // 使用网格分布而不是完全随机，确保更均匀的覆盖
        const gridSize = Math.sqrt(particleCount);
        const gridX = i % gridSize;
        const gridY = Math.floor(i / gridSize);

        // 在网格单元内添加随机偏移
        const cellWidth = window.innerWidth / gridSize;
        const cellHeight = window.innerHeight / gridSize;

        const x = gridX * cellWidth + Math.random() * cellWidth;
        const y = gridY * cellHeight + Math.random() * cellHeight;

        const size = useSimplifiedEffect
          ? Math.random() * 2 + 1
          : Math.random() * 3 + 1.5;

        // 使用更多动态的速度
        const speedX =
          (Math.random() - 0.5) * (useSimplifiedEffect ? 0.3 : 0.6); // 增加速度
        const speedY =
          (Math.random() - 0.5) * (useSimplifiedEffect ? 0.3 : 0.6); // 增加速度

        // 更高的基础透明度
        const opacity = useSimplifiedEffect
          ? Math.random() * 0.4 + 0.2 // 增加基础透明度
          : Math.random() * 0.6 + 0.3; // 增加基础透明度

        // 随机选择一个预定义的颜色
        const color = colors[Math.floor(Math.random() * colors.length)];

        // 添加方向随机变化
        const direction = Math.random() * Math.PI * 2;

        particles.push({
          x,
          y,
          size,
          speedX,
          speedY,
          opacity,
          color,
          direction,
        });
      }

      particlesRef.current = particles;

      // 使用GSAP为粒子添加随机动画
      particles.forEach((particle, index) => {
        // 为一些粒子添加尺寸脉动效果
        if (index % 3 === 0) {
          particle.tween = gsap.to(particle, {
            size: particle.size * 1.5,
            opacity: particle.opacity * 1.2,
            duration: 1 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        // 为另一些粒子添加方向变化
        if (index % 4 === 0) {
          gsap.to(particle, {
            direction: `+=${Math.PI * 2}`,
            duration: 15 + Math.random() * 10,
            repeat: -1,
            ease: "none",
          });
        }

        // 为一些粒子添加位置微调动画
        if (index % 5 === 0) {
          const xOffset = (Math.random() - 0.5) * 50;
          const yOffset = (Math.random() - 0.5) * 50;

          gsap.to(particle, {
            x: `+=${xOffset}`,
            y: `+=${yOffset}`,
            duration: 5 + Math.random() * 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      });
    };

    // 优化的动画循环 - 添加帧率控制
    const animate = (currentTime: number) => {
      // 帧率限制
      const frameInterval = 1000 / targetFPS.current;
      const elapsed = currentTime - lastFrameTime.current;

      if (elapsed < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // 计算帧率平滑系数
      const deltaTime = elapsed / frameInterval;
      lastFrameTime.current = currentTime - (elapsed % frameInterval);

      if (!isVisible.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      // 使用更生动的粒子渲染
      particlesRef.current.forEach((particle, index) => {
        // 如果粒子有方向属性，使用它来影响速度
        if (particle.direction !== undefined) {
          const directionInfluence = 0.01 * deltaTime;
          particle.speedX += Math.cos(particle.direction) * directionInfluence;
          particle.speedY += Math.sin(particle.direction) * directionInfluence;

          // 限制最大速度
          particle.speedX = Math.max(Math.min(particle.speedX, 1), -1);
          particle.speedY = Math.max(Math.min(particle.speedY, 1), -1);
        } else {
          // 添加一些随机性，使粒子移动更自然
          if (Math.random() > 0.95) {
            particle.speedX += (Math.random() - 0.5) * 0.05 * deltaTime;
            particle.speedY += (Math.random() - 0.5) * 0.05 * deltaTime;

            // 限制最大速度
            particle.speedX = Math.max(Math.min(particle.speedX, 1), -1);
            particle.speedY = Math.max(Math.min(particle.speedY, 1), -1);
          }
        }

        // 更新位置 - 应用deltaTime使动画速度与帧率无关
        particle.x += particle.speedX * deltaTime;
        particle.y += particle.speedY * deltaTime;

        // 边界检查 - 从另一侧重新进入
        if (particle.x < -50) particle.x = window.innerWidth + 50;
        if (particle.x > window.innerWidth + 50) particle.x = -50;
        if (particle.y < -50) particle.y = window.innerHeight + 50;
        if (particle.y > window.innerHeight + 50) particle.y = -50;

        // 计算与鼠标的距离并添加互动效果
        const dx = particle.x - mousePosition.current.x;
        const dy = particle.y - mousePosition.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          // 在鼠标附近的粒子会被排斥或吸引
          const force = (maxDistance - distance) / maxDistance;

          // 每隔一个粒子吸引，每隔一个粒子排斥
          const repel = index % 2 === 0 ? 1 : -0.5;

          particle.x += dx * force * 0.02 * repel * deltaTime;
          particle.y += dy * force * 0.02 * repel * deltaTime;
        }

        // 绘制粒子 - 使用径向渐变使粒子更有光泽
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size,
        );

        // 解析当前颜色以创建渐变
        const baseColor = particle.color
          .replace("rgba(", "")
          .replace(")", "")
          .split(",");
        const r = baseColor[0].trim();
        const g = baseColor[1].trim();
        const b = baseColor[2].trim();

        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${particle.opacity})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.globalAlpha = 1;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // 为粒子之间绘制连接线
        for (let i = index + 1; i < particlesRef.current.length; i++) {
          const otherParticle = particlesRef.current[i];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distanceSquared = dx * dx + dy * dy;

          // 增加连线距离和可见性
          if (distanceSquared < 8000) {
            // 约90像素的距离
            const distance = Math.sqrt(distanceSquared);
            // 使线条更明显
            const opacity = useSimplifiedEffect
              ? (90 - distance) / 900
              : (90 - distance) / 450;

            // 基于两个粒子的颜色创建线条颜色
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = useSimplifiedEffect ? 0.3 : 0.6;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        }
      });

      ctx.restore();
      animationRef.current = requestAnimationFrame(animate);
    };

    createParticles();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      // 清理
      observerRef.current?.disconnect();
      visibilityObserverRef.current?.disconnect();
      window.removeEventListener("mousemove", updateMousePosition);

      // 停止所有GSAP动画
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      gsap.killTweensOf(particlesRef.current);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-90" // 提高透明度，使粒子更明显（原来是opacity-60）
      style={{ background: "transparent" }}
    />
  );
}
