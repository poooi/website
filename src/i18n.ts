import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './resources/i18n/en.json'
import fr from './resources/i18n/fr.json'
import ja from './resources/i18n/ja.json'
import zhHans from './resources/i18n/zh-hans.json'
import zhHant from './resources/i18n/zh-hant.json'

export const resources = {
  en: { translation: en },
  fr: { translation: fr },
  ja: { translation: ja },
  'zh-Hans': { translation: zhHans },
  'zh-Hant': { translation: zhHant },
}

const SFallback = ['zh-Hans', 'zh-Hant', 'en']
const TFallback = ['zh-Hant', 'zh-Hans', 'en']

export const languageFallback = {
  default: ['en'],
  'zh-CN': SFallback,
  'zh-HK': TFallback,
  'zh-MO': TFallback,
  'zh-MY': SFallback,
  'zh-SG': SFallback,
  'zh-TW': TFallback,
}

export const i18n = i18next.createInstance()

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: languageFallback,
    interpolation: {
      escapeValue: false,
    },
    resources,
  })
