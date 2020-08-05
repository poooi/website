/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { NormalModuleReplacementPlugin } = require('webpack')
const withImages = require('next-images')
const withSourceMaps = require('@zeit/next-source-maps')
const { flow, set } = require('lodash')

module.exports = flow([withImages, withSourceMaps])({
  webpack: (config) => {
    config.plugins.push(
      new NormalModuleReplacementPlugin(
        /.*\/generated\/iconSvgPaths.*/,
        path.resolve(__dirname, 'src', 'empty-blueprint-icons.js'),
      ),
    )
    set(config, ['resolve', 'alias', 'path'], false)
    return config
  },
})
