/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'https://startuphub-beta.vercel.app/', 'https://startuphublk.netlify.app'],
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '.',
    }
    return config
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
}

module.exports = nextConfig 