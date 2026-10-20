/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repoName = "abhijit-karale-Portfolio";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? `/${repoName}` : ""),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
