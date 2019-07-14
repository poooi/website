import { setIconOptions } from 'office-ui-fabric-react'

/* tslint:disable no-implicit-dependencies */
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import 'snapshot-diff' // for typings
import 'snapshot-diff/extend-expect'

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

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true,
})
