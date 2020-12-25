/* eslint-disable import/no-extraneous-dependencies */

import { render, RenderResult } from '@testing-library/react'
import { ReactElement } from 'react'
import { ThemeProvider } from 'styled-components/macro'
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
