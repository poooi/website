/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { NormalModuleReplacementPlugin } = require('webpack')
const withImages = require('next-images')
const withCSS = require('@zeit/next-css')
const { flow } = require('lodash')

module.exports = flow([withImages, withCSS])({
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
