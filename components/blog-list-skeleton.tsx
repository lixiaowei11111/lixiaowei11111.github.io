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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* 页面标题 */}
            <AnimatedElement className="text-center mb-12">
              <div className="space-y-4">
                <Skeleton height={48} width={200} className="mx-auto" />
                <Skeleton height={24} width={300} className="mx-auto" />
              </div>
            </AnimatedElement>

            {/* 精选博客 */}
            <AnimatedElement className="mb-12">
              <Skeleton height={32} width={120} className="mb-6" />
              <div className="grid gap-6 md:grid-cols-2">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="p-6 border">
                    <div className="space-y-4">
                      {/* 分类和精选徽章 */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <Skeleton width={60} height={16} />
                        <Skeleton width={40} height={16} />
                      </div>

                      {/* 标题 */}
                      <Skeleton height={24} />

                      {/* 摘要 */}
                      <div className="space-y-2">
                        <Skeleton height={16} />
                        <Skeleton height={16} />
                        <Skeleton height={16} width="80%" />
                      </div>

                      {/* 元数据 */}
                      <div className="flex items-center gap-4">
                        <Skeleton width={80} height={14} />
                        <Skeleton width={100} height={14} />
                        <Skeleton width={60} height={14} />
                      </div>

                      {/* 标签 */}
                      <div className="flex gap-1">
                        <Skeleton width={50} height={18} />
                        <Skeleton width={60} height={18} />
                        <Skeleton width={40} height={18} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </AnimatedElement>

            {/* 最新博客 */}
            <AnimatedElement>
              <Skeleton height={32} width={120} className="mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="p-6 border">
                    <div className="space-y-4">
                      {/* 分类标签 */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <Skeleton width={60} height={16} />
                      </div>

                      {/* 标题 */}
                      <Skeleton height={24} />

                      {/* 摘要 */}
                      <div className="space-y-2">
                        <Skeleton height={16} />
                        <Skeleton height={16} />
                        <Skeleton height={16} width="80%" />
                      </div>

                      {/* 元数据 */}
                      <div className="flex items-center gap-4">
                        <Skeleton width={80} height={14} />
                        <Skeleton width={100} height={14} />
                        <Skeleton width={60} height={14} />
                      </div>

                      {/* 标签 */}
                      <div className="flex gap-1">
                        <Skeleton width={50} height={18} />
                        <Skeleton width={60} height={18} />
                        <Skeleton width={40} height={18} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export function BlogCardSkeleton() {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb" enableAnimation>
      <Card className="p-6 border">
        <div className="space-y-4">
          {/* 分类标签 */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <Skeleton width={60} height={16} />
          </div>

          {/* 标题 */}
          <Skeleton height={24} />

          {/* 摘要 */}
          <div className="space-y-2">
            <Skeleton height={16} />
            <Skeleton height={16} />
            <Skeleton height={16} width="80%" />
          </div>

          {/* 元数据 */}
          <div className="flex items-center gap-4">
            <Skeleton width={80} height={14} />
            <Skeleton width={100} height={14} />
            <Skeleton width={60} height={14} />
          </div>

          {/* 标签 */}
          <div className="flex gap-1">
            <Skeleton width={50} height={18} />
            <Skeleton width={60} height={18} />
            <Skeleton width={40} height={18} />
          </div>
        </div>
      </Card>
    </SkeletonTheme>
  );
}
