import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: "15mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.mingpromo.com",
      },
      {
        protocol: "https",
        hostname: "mingpromo.com",
      },
      {
        protocol: "https",
        hostname: "www.mingpromo.com",
      },
      {
        protocol: "https",
        hostname: "www.v2.mingpromo.com",
      },
      {
        protocol: "https",
        hostname: "v2.mingpromo.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  // Trigger restart for prisma update
};

export default nextConfig;
