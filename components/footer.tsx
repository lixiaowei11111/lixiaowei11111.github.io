import { Github, Heart, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "../lib/config";
import { AnimatedElement } from "./animated-element";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 站点信息 */}
          <div className="md:col-span-2">
            <AnimatedElement animation="fadeInUp">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {siteConfig.name}
              </h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                {siteConfig.description}
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform"
                  >
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                {siteConfig.social.twitter && (
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={siteConfig.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform"
                    >
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </a>
                  </Button>
                )}
                {siteConfig.social.linkedin && (
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={siteConfig.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </Button>
                )}
              </div>
            </AnimatedElement>
          </div>

          {/* 快速链接 */}
          <div>
            <AnimatedElement animation="fadeInUp" delay={0.1}>
              <h4 className="text-sm font-semibold text-foreground mb-4">
                快速链接
              </h4>
              <ul className="space-y-2">
                {siteConfig.navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimatedElement>
          </div>

          {/* 分类 */}
          <div>
            <AnimatedElement animation="fadeInUp" delay={0.2}>
              <h4 className="text-sm font-semibold text-foreground mb-4">
                技术分类
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/categories/frontend"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    前端开发
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/backend"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    后端开发
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/devops"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    DevOps
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/tools"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    开发工具
                  </Link>
                </li>
              </ul>
            </AnimatedElement>
          </div>
        </div>

        <Separator className="my-8" />

        {/* 版权信息 */}
        <AnimatedElement animation="fadeInUp" delay={0.3}>
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>© {currentYear}</span>
              <span>{siteConfig.author.name}</span>
              <span>•</span>
              <span className="flex items-center">
                Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> and
                Next.js
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                隐私政策
              </Link>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                使用条款
              </Link>
              <a
                href="/sitemap.xml"
                className="hover:text-primary transition-colors"
              >
                网站地图
              </a>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </footer>
  );
}
