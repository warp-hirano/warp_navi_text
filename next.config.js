const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const nextConfig = {
  sass: true,
  modules: true,
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en-us', 'fr-fr', 'ja-jp'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en-us',
  },
  experimental: { scriptLoader: true },
  images: {
    domains: ['images.prismic.io'],
    disableStaticImages: true,
  },
};

module.exports = withPlugins([withImages], nextConfig);
