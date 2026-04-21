import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // @ts-expect-error: Next.js suggests this config but hasn't updated its typings for it yet.
  allowedDevOrigins: ['192.168.1.17', 'localhost', '0.0.0.0'],
};

export default nextConfig;
