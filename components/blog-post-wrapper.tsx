"use client";

import { Suspense, useEffect, useState } from "react";
import { BlogPostSkeleton } from "./blog-post-skeleton";

interface BlogPostWrapperProps {
  children: React.ReactNode;
  loadingDelay?: number;
}

export function BlogPostWrapper({
  children,
  loadingDelay = 500,
}: BlogPostWrapperProps) {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    // 模拟内容加载时间
    const timer = setTimeout(() => {
      setContentLoaded(true);
      // 添加一个短暂的延迟来显示过渡效果
      setTimeout(() => {
        setShowSkeleton(false);
      }, 200);
    }, loadingDelay);

    return () => clearTimeout(timer);
  }, [loadingDelay]);

  if (showSkeleton && !contentLoaded) {
    return <BlogPostSkeleton />;
  }

  return (
    <div
      className={`transition-opacity duration-300 ${
        contentLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

// 用于懒加载的高阶组件
export function withBlogPostSkeleton<P extends object>(
  Component: React.ComponentType<P>,
  loadingDelay?: number,
) {
  return function WrappedComponent(props: P) {
    return (
      <Suspense fallback={<BlogPostSkeleton />}>
        <BlogPostWrapper loadingDelay={loadingDelay}>
          <Component {...props} />
        </BlogPostWrapper>
      </Suspense>
    );
  };
}
