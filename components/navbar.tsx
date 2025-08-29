"use client";

import { Github, Linkedin, Menu, Twitter, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { siteConfig } from "../lib/config";
import { AnimatedElement } from "./animated-element";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <AnimatedElement animation="fadeInLeft" className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              {siteConfig.name}
            </Link>
          </AnimatedElement>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                {siteConfig.navigation.map((item, index) => (
                  <NavigationMenuItem key={item.href}>
                    <AnimatedElement animation="fadeInUp" delay={index * 0.1}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                            isActiveRoute(item.href)
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-primary hover:bg-accent",
                          )}
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    </AnimatedElement>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Social Links - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <AnimatedElement animation="fadeInRight" delay={0.2}>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transform duration-200"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            </AnimatedElement>
            {siteConfig.social.twitter && (
              <AnimatedElement animation="fadeInRight" delay={0.3}>
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href={siteConfig.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transform duration-200"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </a>
                </Button>
              </AnimatedElement>
            )}
            {siteConfig.social.linkedin && (
              <AnimatedElement animation="fadeInRight" delay={0.4}>
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transform duration-200"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
              </AnimatedElement>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "关闭菜单" : "打开主菜单"}
            >
              <span className="sr-only">
                {isOpen ? "关闭菜单" : "打开主菜单"}
              </span>
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden",
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md border-b border-border/50">
          {siteConfig.navigation.map((item) => (
            <Button
              key={item.href}
              variant={isActiveRoute(item.href) ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            </Button>
          ))}

          {/* Mobile Social Links */}
          <div className="flex items-center space-x-2 px-3 py-2">
            <Button variant="ghost" size="icon" asChild>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
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
                  aria-label="Twitter"
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
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
