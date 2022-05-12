const path = require('path')
const { withPlausibleProxy } = require('next-plausible')
const withPWA = require('next-pwa')
const { i18n } = require('./next-i18next.config')

module.exports = withPWA(withPlausibleProxy()({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
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
