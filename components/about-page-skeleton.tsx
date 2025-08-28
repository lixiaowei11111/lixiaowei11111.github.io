"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card } from "@/components/ui/card";

export function AboutPageSkeleton() {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb" enableAnimation>
      <div className="min-h-screen relative">
        <div className="pt-24 relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Card className="p-8 md:p-12 border-2">
              <div className="prose prose-lg max-w-none space-y-8">
                {/* 主标题 */}
                <div className="space-y-4">
                  <Skeleton height={48} width="60%" />
                  <div className="space-y-3">
                    <Skeleton height={24} />
                    <Skeleton height={24} width="85%" />
                    <Skeleton height={24} width="70%" />
                  </div>
                </div>

                {/* 副标题1 */}
                <div className="space-y-4 pt-6">
                  <Skeleton height={32} width="40%" />
                  <div className="space-y-3">
                    <Skeleton height={20} />
                    <Skeleton height={20} width="90%" />
                    <Skeleton height={20} width="80%" />
                    <Skeleton height={20} width="95%" />
                  </div>
                </div>

                {/* 技能列表 */}
                <div className="space-y-4 pt-6">
                  <Skeleton height={32} width="35%" />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} height={36} />
                    ))}
                  </div>
                </div>

                {/* 副标题2 */}
                <div className="space-y-4 pt-6">
                  <Skeleton height={32} width="45%" />
                  <div className="space-y-3">
                    <Skeleton height={20} />
                    <Skeleton height={20} width="88%" />
                    <Skeleton height={20} width="92%" />
                  </div>
                </div>

                {/* 经历列表 */}
                <div className="space-y-6 pt-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="border-l-4 border-gray-200 pl-6 space-y-2"
                    >
                      <Skeleton height={24} width="70%" />
                      <Skeleton height={18} width="50%" />
                      <div className="space-y-2">
                        <Skeleton height={16} />
                        <Skeleton height={16} width="85%" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* 联系信息 */}
                <div className="space-y-4 pt-6">
                  <Skeleton height={32} width="30%" />
                  <div className="flex flex-wrap gap-4">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} height={40} width={120} />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
