"use client";

import type { VariantProps } from "class-variance-authority";
import { gsap } from "gsap";
import type { ComponentProps } from "react";
import { forwardRef, useEffect, useRef } from "react";
import { Button, type buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MagneticButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  strength?: number;
  asChild?: boolean;
}

export const MagneticButton = forwardRef<
  HTMLButtonElement,
  MagneticButtonProps
>(
  (
    { children, className, strength = 0.3, disabled = false, ...props },
    ref,
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      const button = buttonRef.current;
      const text = textRef.current;
      if (!button || !text || disabled) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // 磁性效果
        gsap.to(button, {
          x: x * strength,
          y: y * strength,
          duration: 0.3,
          ease: "power2.out",
        });

        // 文字稍微反向移动创造深度感
        gsap.to(text, {
          x: x * strength * 0.5,
          y: y * strength * 0.5,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });

        gsap.to(text, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      };

      const handleMouseEnter = () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);
      button.addEventListener("mouseenter", handleMouseEnter);

      return () => {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
        button.removeEventListener("mouseenter", handleMouseEnter);
      };
    }, [strength, disabled]);

    return (
      <Button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        disabled={disabled}
        className={cn(
          "relative overflow-hidden",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/0 before:via-primary/10 before:to-primary/0",
          "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
          className,
        )}
        {...props}
      >
        <span
          ref={textRef}
          className="relative z-10 flex items-center justify-center gap-2"
        >
          {children}
        </span>
      </Button>
    );
  },
);

MagneticButton.displayName = "MagneticButton";
