// @ts-check

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['source.unsplash.com', 'cdn.discordapp.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;
