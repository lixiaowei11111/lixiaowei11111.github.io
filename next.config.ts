import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

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

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: process.cwd(),
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

  // 性能优化配置
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-avatar",
      "gsap",
      "canvas-confetti",
      "@mdx-js/react",
    ],
  },

  // 将 turbo 配置从 experimental 移到顶层的 turbopack
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*",
      },
    },
  },

  // Webpack 优化
  webpack: (config, { isServer }) => {
    // 代码分割优化
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
          },
          gsap: {
            test: /[\\/]node_modules[\\/]gsap[\\/]/,
            name: "gsap",
            chunks: "all",
            priority: 20,
          },
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
    }

    // 压缩优化
    config.optimization.minimize = true;

    return config;
  },

  // 编译器优化
  compiler: {
    // 移除 console.log
    removeConsole: process.env.NODE_ENV === "production",
  },

  // 静态资源优化
  assetPrefix: process.env.NODE_ENV === "production" ? "" : undefined,
};

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
