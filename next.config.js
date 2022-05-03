const path = require('path')
const { withPlausibleProxy } = require('next-plausible')

module.exports = withPlausibleProxy()({
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
})
