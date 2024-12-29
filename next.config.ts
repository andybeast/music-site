import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**", // Matches all paths under this domain
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        pathname: "/**", // Matches all paths under this domain
      },
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com', 
          pathname: '/a-/**', // Google profile image domain thing
        },
    ],
  },
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};

export default nextConfig;

