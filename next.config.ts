import type { NextConfig } from "next";

/**
 * The public preview (GitHub Pages) is a static export served from a repo
 * subpath, so it needs `output: export` + a basePath. Both are opt-in via env
 * vars set by the deploy workflow — `next dev` and a normal `next build` are
 * unaffected and keep the proxy-based locale redirect.
 */
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = staticExport
  ? {
      output: "export",
      trailingSlash: true,
      basePath: process.env.BASE_PATH ?? "",
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
