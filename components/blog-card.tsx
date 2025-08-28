"use client";

import { Calendar, Clock, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ViewCounter } from "@/components/view-counter";
import { cn } from "@/lib/utils";
import { animationManager } from "../lib/animations";
import type { BlogPost } from "../lib/types";
import { AnimatedElement } from "./animated-element";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  className?: string;
}

export function BlogCard({ post, featured = false, className }: BlogCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current && !animationManager.isMobile()) {
      animationManager.cardHoverAnimation(cardRef.current);
    }
  }, []);

  const getCategoryColor = (category: string) => {
    const colors = {
      frontend: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      backend: "bg-green-500/10 text-green-600 border-green-500/20",
      devops: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      tools: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      tutorial: "bg-pink-500/10 text-pink-600 border-pink-500/20",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-500/10 text-gray-600 border-gray-500/20"
    );
  };

  return (
    <AnimatedElement
      animation="fadeInUp"
      className={cn("group h-full", className)}
    >
      <Card
        ref={cardRef}
        className={cn(
          "h-full overflow-hidden border-0 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5",
          featured && "ring-1 ring-primary/20",
        )}
      >
        {post.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            {featured && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                精选
              </Badge>
            )}
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="outline"
              className={cn("text-xs", getCategoryColor(post.category))}
            >
              {post.category === "frontend" && "前端开发"}
              {post.category === "backend" && "后端开发"}
              {post.category === "devops" && "DevOps"}
              {post.category === "tools" && "开发工具"}
              {post.category === "tutorial" && "教程"}
            </Badge>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h3 className="font-bold text-lg leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>
        </CardHeader>

        <CardContent className="pt-0 card-content">
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("zh-CN")}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readingTime} 分钟阅读</span>
            </div>
            <ViewCounter slug={post.slug} increment={false} />
          </div>

          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs py-0 px-2 h-5"
              >
                <Tag className="h-2 w-2 mr-1" />
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs py-0 px-2 h-5">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </AnimatedElement>
  );
}

interface BlogCardGridProps {
  posts: BlogPost[];
  featuredPosts?: BlogPost[];
  className?: string;
}

export function BlogCardGrid({
  posts,
  featuredPosts,
  className,
}: BlogCardGridProps) {
  return (
    <div className={cn("space-y-12", className)}>
      {/* Featured Posts */}
      {featuredPosts && featuredPosts.length > 0 && (
        <section>
          <AnimatedElement animation="fadeInUp">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              精选文章
            </h2>
          </AnimatedElement>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                featured
                className="md:first:col-span-2"
              />
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section>
        <AnimatedElement animation="fadeInUp">
          <h2 className="text-2xl font-bold mb-6 text-foreground">最新文章</h2>
        </AnimatedElement>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
