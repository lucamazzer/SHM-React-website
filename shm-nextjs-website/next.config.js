/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpackDevMiddleware: (config) => {
    // Solve compiling problem via vagrant
    config.watchOptions = {
      poll: 1000,   // Check for changes every second
      aggregateTimeout: 300,   // delay before rebuilding
    };
    return config;
  }
}

// module.exports = nextConfig
module.exports = nextConfig;