import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { AnimationConfig, ScrollTriggerConfig } from "./types";

// 注册 GSAP 插件
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export class AnimationManager {
  private static instance: AnimationManager;
  private timeline: gsap.core.Timeline | null = null;

  static getInstance(): AnimationManager {
    if (!AnimationManager.instance) {
      AnimationManager.instance = new AnimationManager();
    }
    return AnimationManager.instance;
  }

  // 页面加载动画
  pageEnterAnimation(elements: string[] | Element[]): gsap.core.Timeline {
    const tl = gsap.timeline();

    elements.forEach((element, index) => {
      tl.from(
        element,
        {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.1,
        },
        index === 0 ? 0 : "-=0.6",
      );
    });

    return tl;
  }

  // 卡片悬停动画
  cardHoverAnimation(element: Element): void {
    const card = element as HTMLElement;
    const image = card.querySelector("img");
    const content = card.querySelector(".card-content");

    gsap.set(card, { transformStyle: "preserve-3d" });

    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        rotationY: 5,
        rotationX: 5,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
      });

      if (image) {
        gsap.to(image, {
          scale: 1.1,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      if (content) {
        gsap.to(content, {
          y: -5,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      if (image) {
        gsap.to(image, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      if (content) {
        gsap.to(content, {
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });
  }

  // 滚动触发动画
  scrollTriggerAnimation(
    config: ScrollTriggerConfig & { animation: object },
  ): ScrollTrigger {
    return ScrollTrigger.create({
      trigger: config.trigger,
      start: config.start,
      end: config.end,
      scrub: config.scrub,
      pin: config.pin,
      markers: config.markers,
      animation: gsap.from(config.trigger, config.animation),
    });
  }

  // 文本打字机效果 - 优化为更平缓的动画
  typewriterEffect(
    element: string | Element,
    text: string,
    config?: AnimationConfig,
  ): gsap.core.Timeline {
    const tl = gsap.timeline();
    const duration = config?.duration || 3; // 增加默认持续时间

    gsap.set(element, { text: "" });

    tl.to(element, {
      duration,
      text: {
        value: text,
        delimiter: "",
      },
      ease: config?.ease || "power2.inOut", // 使用更平缓的缓动
    });

    return tl;
  }

  // 视差滚动效果
  parallaxEffect(
    elements: { element: string | Element; speed: number }[],
  ): void {
    elements.forEach(({ element, speed }) => {
      gsap.to(element, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  // 路径绘制动画
  drawSVGPath(
    path: string | Element,
    config?: AnimationConfig,
  ): gsap.core.Timeline {
    const tl = gsap.timeline();

    gsap.set(path, { strokeDasharray: "1000", strokeDashoffset: "1000" });

    tl.to(path, {
      strokeDashoffset: 0,
      duration: config?.duration || 2,
      ease: config?.ease || "power2.inOut",
      delay: config?.delay || 0,
    });

    return tl;
  }

  // 清理函数
  cleanup(): void {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    if (this.timeline) {
      this.timeline.kill();
    }
  }

  // 响应式动画控制
  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  // 移动端优化的动画配置 - 进一步减缓移动端动画
  getMobileConfig(config: AnimationConfig): AnimationConfig {
    if (this.isMobile()) {
      return {
        ...config,
        duration: config.duration * 1.2, // 移动端动画更慢更流畅
        delay: (config.delay || 0) * 0.8,
      };
    }
    return config;
  }
}

// 便捷函数
export const animationManager = AnimationManager.getInstance();

// 通用动画预设 - 更加平缓的动画
export const animationPresets = {
  fadeInUp: {
    from: { opacity: 0, y: 30 }, // 减少移动距离
    to: { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, // 增加持续时间
  },
  fadeInLeft: {
    from: { opacity: 0, x: -30 },
    to: { opacity: 1, x: 0, duration: 1.2, ease: "power2.out" },
  },
  fadeInRight: {
    from: { opacity: 0, x: 30 },
    to: { opacity: 1, x: 0, duration: 1.2, ease: "power2.out" },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.8 }, // 减少缩放幅度
    to: { opacity: 1, scale: 1, duration: 1.0, ease: "power2.out" }, // 使用更平缓的缓动
  },
  slideInUp: {
    from: { y: 50, opacity: 0 }, // 减少移动距离
    to: { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" }, // 更平缓的缓动
  },
} as const;
