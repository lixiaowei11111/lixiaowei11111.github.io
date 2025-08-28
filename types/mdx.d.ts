declare module "*.mdx" {
  import type { ComponentType } from "react";

  interface MDXProps {
    [key: string]: unknown;
  }

  const MDXComponent: ComponentType<MDXProps>;
  export default MDXComponent;
}
