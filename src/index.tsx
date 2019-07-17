import * as Sentry from '@sentry/browser'
import React from 'react'
import { hydrate, render } from 'react-dom'

import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import 'modern-normalize/modern-normalize.css'

import { App } from './app'
import './index.css'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://119091520e0b47809be0b51bd6313c6d@sentry.io/1505313',
  })
}

const rootElement = document.getElementById('root')
if (rootElement!.hasChildNodes()) {
  hydrate(<App />, rootElement)
} else {
  render(<App />, rootElement)
}
