const path = require('path')
const toPath = filePath => path.join(process.cwd(), filePath)

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-dark-mode'
  ],
  core: {
    builder: 'webpack5'
  },
  framework: '@storybook/react',
  webpackFinal: async config => {
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test.test('.svg')
    )
    fileLoaderRule.exclude = /\.svg$/
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader']
    })
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve('src')
    ]
    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/core': toPath('node_modules/@emotion/react'),
      'emotion-theming': toPath('node_modules/@emotion/react')
    }
    return config
  }
}
