import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
      },
      {
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "ik.imagekit.io", pathname: "/**" },
    ],
  },
};

export default nextConfig;
