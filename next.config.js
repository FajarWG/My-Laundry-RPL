/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['www.archify.com'],
  },
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
