/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath: '/FromBirth',
  assetPrefix: '/FromBirth/',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: '/FromBirth',
  },
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
