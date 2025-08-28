"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

interface ViewCounterProps {
  slug: string;
  increment?: boolean;
}

export function ViewCounter({ slug, increment = true }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const viewKey = `blog_views_${slug}`;

    // 获取当前访问次数
    const currentViews = parseInt(localStorage.getItem(viewKey) || "0", 10);

    if (increment) {
      // 检查是否是同一会话的重复访问（简单防刷）
      const sessionKey = `session_${slug}`;
      const hasVisitedInSession = sessionStorage.getItem(sessionKey);

      if (!hasVisitedInSession) {
        const newViews = currentViews + 1;
        localStorage.setItem(viewKey, newViews.toString());
        sessionStorage.setItem(sessionKey, "true");
        setViews(newViews);
      } else {
        setViews(currentViews);
      }
    } else {
      setViews(currentViews);
    }

    setLoading(false);
  }, [slug, increment]);

  if (loading) {
    return (
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Eye className="h-4 w-4" />
        <span>加载中...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      <Eye className="h-4 w-4" />
      <span>{views?.toLocaleString()} 次浏览</span>
    </div>
  );
}

// 获取所有文章的访问统计
export function getAllViewCounts(): Record<string, number> {
  if (typeof window === "undefined") return {};

  const viewCounts: Record<string, number> = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("blog_views_")) {
      const slug = key.replace("blog_views_", "");
      const count = parseInt(localStorage.getItem(key) || "0", 10);
      viewCounts[slug] = count;
    }
  }

  return viewCounts;
}

// 重置特定文章的访问次数（管理员功能）
export function resetViewCount(slug: string) {
  const viewKey = `blog_views_${slug}`;
  localStorage.removeItem(viewKey);
  sessionStorage.removeItem(`session_${slug}`);
}
