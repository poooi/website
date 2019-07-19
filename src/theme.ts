import { createFontStyles, IPalette } from '@uifabric/styling'
import { createContext } from 'react'
import { DefaultTheme } from 'styled-components'

import colorDark from './resources/colors/dark.json'
import colorLight from './resources/colors/light.json'

export const enFontStyles = createFontStyles(null)
export const jaFontStyles = createFontStyles('ja')
export const zhHansFontStyles = createFontStyles('zh-hans')
export const zhHantFontStyles = createFontStyles('zh-hant')

const localeFontFamilyMap = {
  en: enFontStyles.medium.fontFamily,
  ja: jaFontStyles.medium.fontFamily,
  'zh-Hans': zhHansFontStyles.medium.fontFamily,
  'zh-Hant': zhHansFontStyles.medium.fontFamily,
}

export const getLocaleFontFamily = (locale: string) =>
  localeFontFamilyMap[locale as keyof typeof localeFontFamilyMap] ||
  localeFontFamilyMap.en

export const darkTheme: DefaultTheme = {
  palette: colorDark as IPalette,
}

export const lightTheme: DefaultTheme = {
  palette: colorLight as IPalette,
}

export const DispatchThemeChangeContext = createContext<(value: any) => void>(
  () => {
    /* */
  },
)

export const ThemeIsDarkContext = createContext<boolean>(true)
