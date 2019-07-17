import { faLanguage } from '@fortawesome/free-solid-svg-icons/faLanguage'
import { faSwatchbook } from '@fortawesome/free-solid-svg-icons/faSwatchbook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import map from 'lodash/map'
import { CommandBarButton } from 'office-ui-fabric-react'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { getExactLanguage } from '../utils'

export const languages = {
  en: 'English',
  ja: '日本語',
  'zh-Hans': '简体中文',
  'zh-Hant': '繁體中文',
}

const Container = styled.div`
  height: 60px;

  background-color: white;
  border-bottom: 1px solid #eee;
`

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  display: flex;
  font-size: 20px;
`

const LinkItem = styled.a`
  padding: 0 1ex;
  line-height: 60px;
  display: inline-block;
  cursor: pointer;
  transition: 0.3s;
  position: relative;

  display: none;

  :hover {
    ::before {
      content: '';
      display: block;
      background-color: #333;
      position: absolute;
      height: 2px;
      width: 100%;
      bottom: 0;
      left: 0;
    }
  }
`

const Spacer = styled.div`
  flex: 1;
`

const CommandBar = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  line-height: 60px;

  button {
    height: 60px;
    padding: 0 1ex;
  }
`

const Icon = styled(FontAwesomeIcon)`
  margin-right: 1ex;
`

interface IProps {
  onChangeTheme: () => void
  isDark: boolean
}

export const Header = ({ onChangeTheme, isDark }: IProps) => {
  const { t, i18n } = useTranslation()

  const lang = getExactLanguage(i18n.language)

  const options = useMemo(
    () =>
      map(languages, (value, key) => ({
        key,
        onClick: () => {
          i18n.changeLanguage(key)
        },
        text: value,
      })),
    [i18n.changeLanguage],
  )

  return (
    <Container>
      <Wrapper>
        <div>
          <LinkItem>{t('Explore')}</LinkItem>
          <LinkItem>{t('Plugins')}</LinkItem>
        </div>
        <Spacer />
        <CommandBar>
          <CommandBarButton onClick={onChangeTheme}>
            <Icon icon={faSwatchbook} />
            {t('current-theme')}
            {t(isDark ? 'Chibaheit' : 'Lilywhite')}
          </CommandBarButton>
          <CommandBarButton
            menuProps={{
              items: options,
            }}
            data-testid="language-dropdown"
          >
            <Icon icon={faLanguage} />
            {t('language')}
          </CommandBarButton>
        </CommandBar>
      </Wrapper>
    </Container>
  )
}
