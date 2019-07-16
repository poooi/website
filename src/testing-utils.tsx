import { render, RenderResult } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from './theme'

export const renderWithTheme = (node: ReactElement): RenderResult => {
  const result = render(
    <ThemeProvider theme={lightTheme}>{node}</ThemeProvider>,
  )
  return {
    ...result,
    rerender: (newNode: ReactElement) =>
      result.rerender(
        <ThemeProvider theme={lightTheme}>{newNode}</ThemeProvider>,
      ),
  }
}
