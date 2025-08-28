import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-avatar"],
    mdxRs: false, // 确保使用 @next/mdx 而不是实验性的 MDX
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeHighlight,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
