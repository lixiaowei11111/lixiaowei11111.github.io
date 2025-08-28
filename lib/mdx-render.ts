import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import type { BlogPost } from "./types";

export async function renderMDXToHTML(content: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        className: ["anchor"],
      },
    })
    .use(rehypeStringify)
    .process(content);

  return processedContent.toString();
}

export async function getRenderedPost(
  slug: string,
): Promise<(BlogPost & { renderedContent: string }) | null> {
  const { getPostBySlug } = await import("./mdx");
  const post = getPostBySlug(slug);

  if (!post) {
    return null;
  }

  const renderedContent = await renderMDXToHTML(post.content);

  return {
    ...post,
    renderedContent,
  };
}
