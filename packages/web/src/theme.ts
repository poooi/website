import { createContext } from 'react'

import { Colors } from '@blueprintjs/core'

export const darkTheme = {
  colors: Colors,
  name: 'bp4-dark',
  variant: 'dark',
  text: Colors.LIGHT_GRAY1,
  background: Colors.DARK_GRAY3,
}

export const lightTheme = {
  colors: Colors,
  name: 'bp4-light',
  variant: 'light',
  text: Colors.DARK_GRAY1,
  background: Colors.LIGHT_GRAY5,
}

export const DispatchThemeChangeContext = createContext<(value: any) => void>(
  () => {
    /* */
  },
)

export const ThemeIsDarkContext = createContext<boolean>(true)
