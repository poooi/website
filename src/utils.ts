import first from 'lodash/first'
import split from 'lodash/split'

export const localeMap = {
  'zh-CN': 'zh-Hans',
  'zh-HK': 'zh-Hant',
  'zh-Hans': 'zh-Hans',
  'zh-Hant': 'zh-Hant',
  'zh-MO': 'zh-Hant',
  'zh-MY': 'zh-Hans',
  'zh-SG': 'zh-Hans',
  'zh-TW': 'zh-Hant',
}

export const getExactLanguage = (language: string): string => {
  const pure = first(split(language, '-'))
  if (pure !== 'zh') {
    return pure || 'en'
  }
  return localeMap[language as keyof typeof localeMap] || 'zh-Hant'
}
