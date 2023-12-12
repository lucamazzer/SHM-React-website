/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  future: { webpack5: true },
  webpack: config => {
    config.resolve.alias.canvas = false;

    return config;
  },
};

module.exports = nextConfig;
