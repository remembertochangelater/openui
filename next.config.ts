import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Pin the root to this project. Otherwise Next infers it from the outermost
  // lockfile it finds, which on this machine is the user profile directory.
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/docs/table",
        destination: "/docs/components/table",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
