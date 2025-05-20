/** @type {import("next").NextConfig} */
const nextConfig = { 
  output: "export", 
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  }, 
  basePath: "", 
  trailingSlash: false 
};

module.exports = nextConfig;
