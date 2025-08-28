"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AnimatedElement } from "@/components/animated-element";
import { Card } from "@/components/ui/card";

export function BlogPostSkeleton() {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb" enableAnimation>
      <div className="min-h-screen">
        <div className="pt-20 relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* 返回按钮骨架 */}
            <AnimatedElement animation="fadeInLeft">
              <div className="mb-8">
                <Skeleton width={100} height={20} />
              </div>
            </AnimatedElement>

            {/* 文章头部骨架 */}
            <AnimatedElement animation="slideInUp" className="mb-8">
              <Card className="p-8 border-2">
                <div className="space-y-6">
                  {/* 分类标签骨架 */}
                  <div className="flex items-center gap-2">
                    <Skeleton width={60} height={16} />
                  </div>

                  {/* 标题骨架 */}
                  <div className="space-y-3">
                    <Skeleton height={40} />
                    <Skeleton height={40} width="80%" />
                  </div>

                  {/* 摘要骨架 */}
                  <div className="space-y-2">
                    <Skeleton height={24} />
                    <Skeleton height={24} width="90%" />
                    <Skeleton height={24} width="70%" />
                  </div>

                  {/* 元信息骨架 */}
                  <div className="flex flex-wrap items-center gap-4">
                    <Skeleton width={80} height={16} />
                    <Skeleton width={120} height={16} />
                    <Skeleton width={100} height={16} />
                  </div>

                  {/* 标签骨架 */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Skeleton width={50} height={24} />
                    <Skeleton width={70} height={24} />
                    <Skeleton width={60} height={24} />
                  </div>
                </div>
              </Card>
            </AnimatedElement>

            {/* 文章内容骨架 */}
            <Card className="p-8 border-2">
              <div className="prose prose-lg max-w-none space-y-6">
                {/* 模拟段落 */}
                <div className="space-y-3">
                  <Skeleton height={20} />
                  <Skeleton height={20} />
                  <Skeleton height={20} width="85%" />
                </div>

                {/* 模拟标题 */}
                <div className="pt-4">
                  <Skeleton height={28} width="60%" />
                </div>

                {/* 模拟更多段落 */}
                <div className="space-y-3">
                  <Skeleton height={20} />
                  <Skeleton height={20} width="92%" />
                  <Skeleton height={20} />
                  <Skeleton height={20} width="88%" />
                </div>

                {/* 模拟代码块 */}
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <Skeleton height={18} width="40%" />
                  <Skeleton height={18} width="60%" />
                  <Skeleton height={18} width="30%" />
                </div>

                {/* 模拟更多内容 */}
                <div className="space-y-3">
                  <Skeleton height={20} />
                  <Skeleton height={20} width="90%" />
                  <Skeleton height={20} width="80%" />
                </div>

                {/* 模拟另一个标题 */}
                <div className="pt-4">
                  <Skeleton height={28} width="50%" />
                </div>

                {/* 模拟列表 */}
                <div className="space-y-2">
                  <Skeleton height={18} width="70%" />
                  <Skeleton height={18} width="65%" />
                  <Skeleton height={18} width="75%" />
                </div>

                {/* 模拟最后的段落 */}
                <div className="space-y-3">
                  <Skeleton height={20} />
                  <Skeleton height={20} width="85%" />
                </div>
              </div>
            </Card>

            {/* 相关文章骨架 */}
            <AnimatedElement
              animation="slideInUp"
              delay={0.4}
              className="mt-12"
            >
              <div>
                <div className="mb-8">
                  <Skeleton height={2} />
                </div>
                <Skeleton height={32} width={150} className="mb-6" />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-6 border-2">
                      <div className="space-y-4">
                        <Skeleton height={24} />
                        <div className="space-y-2">
                          <Skeleton height={16} />
                          <Skeleton height={16} width="80%" />
                        </div>
                        <div className="flex justify-between items-center">
                          <Skeleton width={80} height={14} />
                          <Skeleton width={60} height={14} />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export function BlogPostContentSkeleton() {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb" enableAnimation>
      <Card className="p-8 border-2">
        <div className="prose prose-lg max-w-none space-y-6">
          {/* 模拟段落 */}
          <div className="space-y-3">
            <Skeleton height={20} />
            <Skeleton height={20} />
            <Skeleton height={20} width="85%" />
          </div>

          {/* 模拟标题 */}
          <div className="pt-4">
            <Skeleton height={28} width="60%" />
          </div>

          {/* 模拟更多段落 */}
          <div className="space-y-3">
            <Skeleton height={20} />
            <Skeleton height={20} width="92%" />
            <Skeleton height={20} />
            <Skeleton height={20} width="88%" />
          </div>

          {/* 模拟代码块 */}
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <Skeleton height={18} width="40%" />
            <Skeleton height={18} width="60%" />
            <Skeleton height={18} width="30%" />
          </div>

          {/* 模拟更多内容 */}
          <div className="space-y-3">
            <Skeleton height={20} />
            <Skeleton height={20} width="90%" />
            <Skeleton height={20} width="80%" />
          </div>
        </div>
      </Card>
    </SkeletonTheme>
  );
}
