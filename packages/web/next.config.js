/* eslint-disable @typescript-eslint/no-var-requires */
const withSourceMaps = require('@zeit/next-source-maps')
const { flow } = require('lodash')

module.exports = flow([withSourceMaps])({
  serverRuntimeConfig: {
    projectRoot: __dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
})
