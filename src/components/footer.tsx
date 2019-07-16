import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import {
  faDiscord,
  faGithub,
  faTelegram,
  faWeibo,
} from '@fortawesome/free-brands-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import { getExactLanguage } from '../utils'

const Icon = ({ icon }: { icon: IconProp }) => (
  <FontAwesomeIcon icon={icon} size="2x" fixedWidth={true} />
)

const Container = styled.div`
  text-align: center;
  min-height: 50px;
  line-height: 50px;
  margin-top: 50px;
  margin-bottom: 1em;

  a {
    margin: 0 10px;
    transition: 0.3s;

    :hover {
      opacity: 0.8;
    }
  }

  img {
    height: 30px;
    width: 30px;
  }
`

export const Footer = () => {
  const { t, i18n } = useTranslation()

  const { language } = i18n
  const exact = getExactLanguage(language)

  return (
    <Container>
      <a href="http://weibo.com/letspoi" title={t('weibo')}>
        <Icon icon={faWeibo} />
      </a>
      {['zh-Hans', 'zh-Hant'].includes(exact) ? (
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
    </Container>
  )
}
