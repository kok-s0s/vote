const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const { withPlausibleProxy } = require('next-plausible')
const { i18n } = require('./next-i18next.config')

module.exports = withBundleAnalyzer(withPlausibleProxy()({
  i18n,
  images: {
    domains: ['raw.githubusercontent.com'],
    minimumCacheTTL: 6000000,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/': path.resolve(__dirname),
    }
    return config
  },
}))
