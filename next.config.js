/* eslint-disable @typescript-eslint/no-var-requires */
const withImages = require('next-images')
const withCSS = require('@zeit/next-css')
const { flow } = require('lodash')

module.exports = flow([withImages, withCSS])({
  outDir: 'build',
})
