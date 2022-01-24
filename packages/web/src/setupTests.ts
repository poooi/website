/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom/extend-expect'
import 'jest-canvas-mock'
import 'jest-styled-components'
import 'snapshot-diff' // for typings
import 'snapshot-diff/extend-expect'
import 'whatwg-fetch'

import './i18n'

window.matchMedia =
  window.matchMedia ||
  (() => ({
    matches: false,
    addListener() {
      /* do nothing */
    },
    removeListener() {
      /* do nothing */
    },
  }))
