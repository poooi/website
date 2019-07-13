import classNames from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { getPurelanguage } from '../utils'
import styles from './header.module.css'

export const languages = {
  'en-US': 'English',
  'ja-JP': '日本語',
  'zh-CN': '简体中文',
  'zh-TW': '正體中文',
}

export const Header = () => {
  const { i18n } = useTranslation()

  const pureLangue = getPurelanguage(i18n.language)

  return (
    <div className={styles.header}>
      <div className={styles.languages} data-testid="language-list">
        {Object.keys(languages).map(lang => (
          <a
            key={lang}
            onClick={() => i18n.changeLanguage(lang)}
            className={classNames({
              [styles.active]: getPurelanguage(lang) === pureLangue,
            })}
          >
            {languages[lang as keyof typeof languages]}
          </a>
        ))}
      </div>
    </div>
  )
}
