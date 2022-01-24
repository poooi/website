/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { NormalModuleReplacementPlugin } = require('webpack')
const withSourceMaps = require('@zeit/next-source-maps')
const { flow, set } = require('lodash')

module.exports = flow([withSourceMaps])({
  serverRuntimeConfig: {
    projectRoot: __dirname,
  },
  webpack: (config) => {
    config.plugins.push(
      new NormalModuleReplacementPlugin(
        /.*\/generated\/iconSvgPaths.*/,
        path.resolve(__dirname, 'src', 'empty-blueprint-icons.js'),
      ),
    )
    return config
  },
})
