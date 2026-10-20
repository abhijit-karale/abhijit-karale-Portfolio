/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repoName = "abhijit-karale-Portfolio";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? `/${repoName}` : "");

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
