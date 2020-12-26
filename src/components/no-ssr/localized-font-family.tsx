import { useTranslation } from 'react-i18next'
import { createGlobalStyle } from 'styled-components'

import Head from 'next/head'
import { getExactLanguage } from '../../utils'

const FontFamily = createGlobalStyle<{ $family: string }>`
  body {
    font-family: ${(props) => props.$family}, system-ui, sans-serif;
  }
`

const resources = {
  en: `'Open Sans'`,
  fr: `'Open Sans'`,
  ja: `'Open Sans', 'Noto Sans JP'`,
  'zh-Hans': `'Open Sans', 'Noto Sans SC'`,
  'zh-Hant': `'Open Sans', 'Noto Sans TC'`,
}

const googleFontlink = {
  en: 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap',
  fr: 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap',
  ja:
    'https://fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Open+Sans&display=swap',
  'zh-Hans':
    'https://fonts.googleapis.com/css2?family=Noto+Sans+SC&family=Open+Sans&display=swap',
  'zh-Hant':
    'https://fonts.googleapis.com/css2?family=Noto+Sans+TC&family=Open+Sans&display=swap',
}

export const LocalizedFontFamily = () => {
  const { i18n } = useTranslation()

  const { language } = i18n
  const lang = getExactLanguage(language)

  return (
    <>
      <FontFamily $family={resources[lang as keyof typeof resources]} />
      <Head>
        <link
          href={googleFontlink[lang as keyof typeof googleFontlink]}
          rel="stylesheet"
        />
      </Head>
    </>
  )
}
