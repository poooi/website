import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { AnchorButton, ButtonGroup } from '@blueprintjs/core'

import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faTelegram } from '@fortawesome/free-brands-svg-icons/faTelegram'
import { faWeibo } from '@fortawesome/free-brands-svg-icons/faWeibo'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'

import { getExactLanguage } from '../../utils'

const Icon = ({ icon }: { icon: IconProp }) => (
  <FontAwesomeIcon icon={icon} size="lg" fixedWidth />
)

const Container = styled.div`
  text-align: center;
  min-height: 50px;

  a {
    cursor: pointer;
    white-space: nowrap;
  }
`

const Copyright = styled.span`
  margin-right: 4em;
  white-space: nowrap;
`

export const Footer = () => {
  const { t, i18n } = useTranslation()

  const { language } = i18n
  const lang = getExactLanguage(language)

  return (
    <Container>
      <Copyright>{`© ${new Date().getFullYear()} poi Contributors`}</Copyright>
      <ButtonGroup minimal>
        {['zh-Hans', 'zh-Hant'].includes(lang) ? (
          <>
            <AnchorButton
              href="http://weibo.com/letspoi"
              target="_blank"
              rel="noopener"
            >
              <Icon icon={faWeibo} />
              {t('weibo')}
            </AnchorButton>
            <AnchorButton
              href={t('telegram-group-link')}
              target="_blank"
              rel="noopener"
            >
              <Icon icon={faTelegram} />
              {t('telegram')}
            </AnchorButton>
          </>
        ) : (
          <AnchorButton
            href={t('discord-channel-link')}
            target="_blank"
            rel="noopener"
          >
            <Icon icon={faDiscord} />
            {t('Discord sub-channel')}
          </AnchorButton>
        )}
        <AnchorButton
          href="https://github.com/poooi/poi"
          target="_blank"
          rel="noopener"
        >
          <Icon icon={faGithub} />
          {t('github')}
        </AnchorButton>
        <AnchorButton
          href="https://opencollective.com/poi"
          target="_blank"
          rel="noopener"
        >
          <Icon icon={faHeart} />
          {t('opencollective')}
        </AnchorButton>
      </ButtonGroup>
    </Container>
  )
}
