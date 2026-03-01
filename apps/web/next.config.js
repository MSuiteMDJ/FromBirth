/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
const forcePagesBasePath = process.env.PAGES_BASE_PATH === '1';
const basePath = isProduction || forcePagesBasePath ? '/FromBirth' : '';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath,
  assetPrefix: isProduction ? '/FromBirth/' : undefined,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
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
