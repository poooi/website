import { createFontStyles, createTheme, IPalette } from '@uifabric/styling'
import { createContext } from 'react'
import { DefaultTheme } from 'styled-components/macro'

import colorDark from './resources/colors/dark.json'
import colorLight from './resources/colors/light.json'

export const enFontStyles = createFontStyles(null)
export const frFontStyles = createFontStyles('fr')
export const jaFontStyles = createFontStyles('ja')
export const zhHansFontStyles = createFontStyles('zh-hans')
export const zhHantFontStyles = createFontStyles('zh-hant')

const localeFontFamilyMap = {
  en: enFontStyles.medium.fontFamily,
  fr: frFontStyles.medium.fontFamily,
  ja: jaFontStyles.medium.fontFamily,
  'zh-Hans': zhHansFontStyles.medium.fontFamily,
  'zh-Hant': zhHansFontStyles.medium.fontFamily,
}

export const getLocaleFontFamily = (locale: string) =>
  localeFontFamilyMap[locale as keyof typeof localeFontFamilyMap] ||
  localeFontFamilyMap.en

export const darkTheme: DefaultTheme = createTheme({
  palette: colorDark as IPalette,
})

export const lightTheme: DefaultTheme = createTheme({
  palette: colorLight as IPalette,
})

export const DispatchThemeChangeContext = createContext<(value: any) => void>(
  () => {
    /* */
  },
)

export const ThemeIsDarkContext = createContext<boolean>(true)
