import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './resources/i18n/en.json'
import ja from './resources/i18n/ja.json'
import zhCN from './resources/i18n/zh-CN.json'
import zhTW from './resources/i18n/zh-TW.json'

const resources = {
  en: { translation: en },
  ja: { translation: ja },
  'zh-CN': { translation: zhCN },
  'zh-TW': { translation: zhTW },
}

export const i18n = i18next.createInstance()

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources,
  })
