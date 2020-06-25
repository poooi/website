import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Background } from '../background'

import { darkTheme, lightTheme } from '../../theme'

export default {
  title: 'Background',
  component: Background,
}

export const Light = () => (
  <ThemeProvider theme={lightTheme}>
    <Background />
  </ThemeProvider>
)

export const Dark = () => (
  <ThemeProvider theme={darkTheme}>
    <Background />
  </ThemeProvider>
)
