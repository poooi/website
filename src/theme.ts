import { createFontStyles } from '@uifabric/styling'

export const enFontStyles = createFontStyles(null)
export const jaFontStyles = createFontStyles('ja')
export const zhHansFontStyles = createFontStyles('zh-hans')
export const zhHantFontStyles = createFontStyles('zh-hant')

const localeFontFamilyMap = {
  en: enFontStyles.medium.fontFamily,
  ja: jaFontStyles.medium.fontFamily,
  'zh-CN': zhHansFontStyles.medium.fontFamily,
  'zh-TW': zhHansFontStyles.medium.fontFamily,
}

export const getLocaleFontFamily = (locale: string) =>
  localeFontFamilyMap[locale as keyof typeof localeFontFamilyMap] ||
  localeFontFamilyMap.en
