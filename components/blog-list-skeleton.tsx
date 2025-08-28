"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AnimatedElement } from "@/components/animated-element";
import { Card } from "@/components/ui/card";

export function BlogListSkeleton() {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb" enableAnimation>
      <div className="min-h-screen relative">
        <div className="pt-24 relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* 页面标题 */}
            <AnimatedElement className="text-center mb-12">
              <div className="space-y-4">
                <Skeleton height={48} width={200} className="mx-auto" />
                <Skeleton height={24} width={300} className="mx-auto" />
              </div>
            </AnimatedElement>

            {/* 博客卡片网格 */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(9)].map((_, i) => (
                <AnimatedElement key={i} animation="slideInUp" delay={i * 0.1}>
                  <Card className="group h-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-300">
                    <div className="p-6 space-y-4">
                      {/* 分类标签 */}
                      <div className="flex items-center gap-2">
                        <Skeleton width={16} height={16} />
                        <Skeleton width={60} height={16} />
                      </div>

                      {/* 标题 */}
                      <div className="space-y-2">
                        <Skeleton height={24} />
                        <Skeleton height={24} width="80%" />
                      </div>

                      {/* 摘要 */}
                      <div className="space-y-2">
                        <Skeleton height={18} />
                        <Skeleton height={18} width="90%" />
                        <Skeleton height={18} width="60%" />
                      </div>

                      {/* 标签 */}
                      <div className="flex flex-wrap gap-2">
                        <Skeleton width={50} height={20} />
                        <Skeleton width={60} height={20} />
                        <Skeleton width={45} height={20} />
                      </div>

                      {/* 元信息 */}
                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-4">
                          <Skeleton width={80} height={14} />
                          <Skeleton width={60} height={14} />
                        </div>
                        <Skeleton width={40} height={14} />
                      </div>
                    </div>
                  </Card>
                </AnimatedElement>
              ))}
            </div>

            {/* 分页 */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Skeleton width={40} height={40} />
                <Skeleton width={40} height={40} />
                <Skeleton width={40} height={40} />
                <Skeleton width={40} height={40} />
                <Skeleton width={40} height={40} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export function BlogCardSkeleton() {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb" enableAnimation>
      <Card className="group h-full overflow-hidden border-2">
        <div className="p-6 space-y-4">
          {/* 分类标签 */}
          <div className="flex items-center gap-2">
            <Skeleton width={16} height={16} />
            <Skeleton width={60} height={16} />
          </div>

          {/* 标题 */}
          <div className="space-y-2">
            <Skeleton height={24} />
            <Skeleton height={24} width="80%" />
          </div>

          {/* 摘要 */}
          <div className="space-y-2">
            <Skeleton height={18} />
            <Skeleton height={18} width="90%" />
            <Skeleton height={18} width="60%" />
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2">
            <Skeleton width={50} height={20} />
            <Skeleton width={60} height={20} />
            <Skeleton width={45} height={20} />
          </div>

          {/* 元信息 */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-4">
              <Skeleton width={80} height={14} />
              <Skeleton width={60} height={14} />
            </div>
            <Skeleton width={40} height={14} />
          </div>
        </div>
      </Card>
    </SkeletonTheme>
  );
}
