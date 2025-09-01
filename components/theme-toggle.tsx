"use client";

import { MonitorCog, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

  // 计算当前实际生效的主题
  const effectiveTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    // 检测系统主题
    const detectSystemTheme = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setSystemTheme(isDark ? "dark" : "light");
    };

    detectSystemTheme();

    // 监听系统主题变化
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else if (typeof mediaQuery.addListener === "function") {
      // 兼容旧版浏览器
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const themes = [
    {
      key: "light",
      icon: Sun,
    },
    {
      key: "dark",
      icon: Moon,
    },
    {
      key: "system",
      icon: MonitorCog,
    },
  ] as const;

  return (
    <div ref={ref} className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        title="主题设置"
        aria-label="主题设置"
        className={cn(
          "rounded-full",
          effectiveTheme === "dark"
            ? "hover:bg-white/30 hover:text-white" // 暗色模式下主按钮悬停效果
            : "hover:bg-black/20 hover:text-black", // 亮色模式下主按钮悬停效果
        )}
      >
        {theme === "system" ? (
          <MonitorCog className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </>
        )}
        <span className="sr-only">主题设置</span>
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-2 rounded-xl bg-popover shadow-lg ring-1 ring-border z-50 overflow-hidden">
          <div className="p-1 flex gap-1">
            {themes.map(({ key, icon: Icon }) => {
              const isSelected = theme === key;

              // 定义每个主题选项的样式
              let buttonStyle = "";

              // 选中项样式 - 根据当前生效的主题决定
              if (isSelected) {
                if (effectiveTheme === "light") {
                  buttonStyle =
                    "!bg-black !text-white hover:!bg-black hover:!text-white"; // 白天模式选中项：黑底白字
                } else {
                  buttonStyle =
                    "!bg-white !text-black hover:!bg-white hover:!text-black"; // 暗黑模式选中项：白底黑字
                }
              }
              // 非选中项样式 - 默认透明，hover时根据当前主题显示对应样式
              else {
                if (effectiveTheme === "light") {
                  buttonStyle = "hover:!bg-black hover:!text-white"; // 白天模式hover：黑底白字
                } else {
                  buttonStyle = "hover:!bg-white hover:!text-black"; // 暗黑模式hover：白底黑字
                }
              }

              return (
                <Button
                  key={key}
                  onClick={() => {
                    setTheme(key);
                    setOpen(false);
                  }}
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-lg transition-colors duration-200",
                    buttonStyle,
                  )}
                  title={
                    key === "light"
                      ? "亮色"
                      : key === "dark"
                        ? "暗色"
                        : "跟随系统"
                  }
                  aria-label={
                    key === "light"
                      ? "亮色"
                      : key === "dark"
                        ? "暗色"
                        : "跟随系统"
                  }
                >
                  <Icon className="h-4 w-4" />
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
