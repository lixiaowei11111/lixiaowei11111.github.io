//! https://nextjs.org/docs/app/api-reference/file-conventions/mdx-components

import { File } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";
import { Children, isValidElement } from "react";

// 为代码元素的props定义接口
interface CodeElementProps {
  className?: string;
  "data-filename"?: string;
  metastring?: string;
  children?: ReactNode;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 基础样式组件
    h1: ({
      children,
      ...props
    }: HTMLAttributes<HTMLHeadingElement> & { children: ReactNode }) => (
      <h1
        className="scroll-m-20 text-4xl font-bold tracking-tight mb-6"
        style={{ fontSize: "2.25rem", lineHeight: "2.5rem" }}
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
    // 添加代码块支持 - Rspack风格
    pre: ({
      children,
      ...props
    }: HTMLAttributes<HTMLPreElement> & { children: ReactNode }) => {
      // 尝试提取代码块的语言和文件名
      let language: string | null = null;
      let filename: string | null = null;

      // 检查子元素是否为code并获取className和元数据
      const childArray = Children.toArray(children);
      if (childArray.length === 1 && isValidElement(childArray[0])) {
        // 使用类型断言指定codeElement的类型
        const codeElement = childArray[0] as ReactElement<CodeElementProps>;
        if (codeElement.type === "code" && codeElement.props.className) {
          // 提取语言
          const langMatch = /language-(\w+)/.exec(codeElement.props.className);
          if (langMatch) {
            language = langMatch[1];
          }

          // 仅从明确指定的属性中提取文件名
          if (codeElement.props["data-filename"]) {
            filename = codeElement.props["data-filename"];
          } else if (codeElement.props.metastring) {
            // 从元数据字符串中提取文件名
            const filenameMatch = /filename="([^"]+)"/.exec(
              codeElement.props.metastring,
            );
            if (filenameMatch) {
              filename = filenameMatch[1];
            }
          }
        }
      }

      return (
        <div className="mb-6 mt-6 overflow-hidden rounded-lg border border-border bg-muted">
          {/* 只在有文件名时才显示文件名栏 */}
          {filename && (
            <div className="flex items-center justify-between bg-muted/80 px-4 py-2 border-b border-border">
              <div className="flex items-center gap-2">
                <File className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  {filename}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {language && (
                  <div className="text-xs px-2 py-0.5 rounded-md bg-muted-foreground/10 text-muted-foreground font-medium">
                    {language}
                  </div>
                )}
              </div>
            </div>
          )}
          {!filename && language && (
            <div className="flex items-center justify-between bg-muted/80 px-4 py-2 border-b border-border">
              <div className="flex-1"></div>
              <div className="flex items-center gap-3">
                <div className="text-xs px-2 py-0.5 rounded-md bg-muted-foreground/10 text-muted-foreground font-medium">
                  {language}
                </div>
              </div>
            </div>
          )}
          {/* 代码内容区域 */}
          <pre className="overflow-x-auto p-4 text-sm m-0" {...props}>
            {children}
          </pre>
        </div>
      );
    },
    ...components,
  };
}
