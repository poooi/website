import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useTranslation } from 'react-i18next'

import {
  faDiscord,
  faGithub,
  faTelegram,
  faWeibo,
} from '@fortawesome/free-brands-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import { getPurelanguage } from '../utils'

import styles from './footer.module.scss'

const Icon = ({ icon }: { icon: IconProp }) => (
  <FontAwesomeIcon icon={icon} size="2x" fixedWidth={true} />
)

export const Footer = () => {
  const { t, i18n } = useTranslation()

  const { language } = i18n
  const pureLanguage = getPurelanguage(language)

  return (
    <div className={styles.footer}>
      <a href="http://weibo.com/letspoi" title={t('weibo')}>
        <Icon icon={faWeibo} />
      </a>
      {pureLanguage === 'zh' ? (
        <a href={t('telegram-group-link')} title={t('telegram')}>
          <Icon icon={faTelegram} />
        </a>
      ) : (
        <a href={t('discord-channel-link')} title={t('Discord sub-channel')}>
          <Icon icon={faDiscord} />
        </a>
      )}
      <a href="https://github.com/poooi/poi" title={t('github')}>
        <Icon icon={faGithub} />
      </a>
      <a href="https://opencollective.com/poi" title={t('opencollective')}>
        <Icon icon={faHeart} />
      </a>
    </div>
  )
}
