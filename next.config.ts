import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["http://192.168.4.52:3001", "http://10.5.0.2:3001"],
  images: {
    domains: ['picsum.photos'],
  },
};

export default nextConfig;
