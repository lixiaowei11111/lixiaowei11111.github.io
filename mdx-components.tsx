import type { MDXComponents } from "mdx/types";
import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 基础样式组件
    h1: ({
      children,
      ...props
    }: HTMLAttributes<HTMLHeadingElement> & { children: ReactNode }) => (
      <h1
        className="scroll-m-20 text-4xl font-bold tracking-tight mb-6"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({
      children,
      ...props
    }: HTMLAttributes<HTMLHeadingElement> & { children: ReactNode }) => (
      <h2
        className="scroll-m-20 text-3xl font-semibold tracking-tight mb-4 mt-8"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({
      children,
      ...props
    }: HTMLAttributes<HTMLHeadingElement> & { children: ReactNode }) => (
      <h3
        className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3 mt-6"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({
      children,
      ...props
    }: HTMLAttributes<HTMLParagraphElement> & { children: ReactNode }) => (
      <p className="leading-7 mb-4 text-muted-foreground" {...props}>
        {children}
      </p>
    ),
    ul: ({
      children,
      ...props
    }: HTMLAttributes<HTMLUListElement> & { children: ReactNode }) => (
      <ul className="ml-6 list-disc mb-4" {...props}>
        {children}
      </ul>
    ),
    li: ({
      children,
      ...props
    }: HTMLAttributes<HTMLLIElement> & { children: ReactNode }) => (
      <li className="mb-1" {...props}>
        {children}
      </li>
    ),
    blockquote: ({
      children,
      ...props
    }: HTMLAttributes<HTMLQuoteElement> & { children: ReactNode }) => (
      <blockquote
        className="border-l-4 border-primary pl-6 italic my-6 text-muted-foreground"
        {...props}
      >
        {children}
      </blockquote>
    ),
    strong: ({
      children,
      ...props
    }: HTMLAttributes<HTMLElement> & { children: ReactNode }) => (
      <strong className="font-semibold text-foreground" {...props}>
        {children}
      </strong>
    ),
    a: ({
      children,
      href,
      ...props
    }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) => (
      <a
        href={href}
        className="text-primary hover:underline font-medium"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    ),
    hr: (props: HTMLAttributes<HTMLHRElement>) => (
      <hr className="my-8 border-border" {...props} />
    ),
    ...components,
  };
}
