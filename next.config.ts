import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployments
  // This creates a minimal self-contained production build
  output: "standalone",
};

export default nextConfig;
