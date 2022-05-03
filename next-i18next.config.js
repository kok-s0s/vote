const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['zh', 'en'],
    localeDetection: false,
    localePath: path.resolve('./public/locales'),
  },
}
