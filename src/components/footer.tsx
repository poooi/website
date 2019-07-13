import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { first, split } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'

import {
  faDiscord,
  faGithub,
  faTelegram,
  faWeibo,
} from '@fortawesome/free-brands-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import styles from './footer.module.css'

export const Footer = () => {
  const { t, i18n } = useTranslation()

  const { language } = i18n
  const pureLanguage = first(split(language, '-'))

  return (
    <div className={styles.footer}>
      <a href="http://weibo.com/letspoi" title={t('weibo')}>
        <FontAwesomeIcon icon={faWeibo} />
      </a>
      {pureLanguage === 'zh' ? (
        <a href={t('telegram-group-link')} title={t('telegram')}>
          <FontAwesomeIcon icon={faTelegram} />
        </a>
      ) : (
        <a href={t('discord-channel-link')} title={t('Discord sub-channel')}>
          <FontAwesomeIcon icon={faDiscord} />
        </a>
      )}
      <a href="https://github.com/poooi/poi" title={t('github')}>
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a href="https://opencollective.com/poi" title={t('opencollective')}>
        <FontAwesomeIcon icon={faHeart} />
      </a>
    </div>
  )
}
