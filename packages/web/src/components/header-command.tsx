import { faLanguage } from '@fortawesome/free-solid-svg-icons/faLanguage'
import { faSwatchbook } from '@fortawesome/free-solid-svg-icons/faSwatchbook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import map from 'lodash/map'
import { Button, ButtonGroup, Popover, Menu, MenuItem } from '@blueprintjs/core'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'

import { DispatchThemeChangeContext, ThemeIsDarkContext } from '../theme'

export const languages = {
  en: 'English',
  fr: 'français',
  ja: '日本語',
  ko: '한국어',
  'zh-Hans': '简体中文',
  'zh-Hant': '繁體中文',
}

const CommandBar = styled(ButtonGroup)`
  height: 60px;
  line-height: 60px;
`

const Icon = styled(FontAwesomeIcon)`
  margin-right: 1ex;
`

const HeaderCommand = () => {
  const { t, i18n } = useTranslation()

  const dispatch = useContext(DispatchThemeChangeContext)
  const isDark = useContext(ThemeIsDarkContext)

  return (
    <CommandBar minimal>
      <Button
        onClick={() => {
          dispatch(!isDark)
          localStorage.setItem('theme', isDark ? 'light' : 'dark')
        }}
      >
        <Icon icon={faSwatchbook} />
        {t('current-theme')}
        {t(isDark ? 'Chibaheit' : 'Lilywhite')}
      </Button>
      <Popover
        minimal
        content={
          <Menu>
            {
              // eslint-disable-next-line react/no-unstable-nested-components
              map(languages, (value, key) => (
                <MenuItem
                  text={value}
                  key={key}
                  onClick={() => {
                    i18n.changeLanguage(key)
                  }}
                />
              ))
            }
          </Menu>
        }
      >
        <Button data-testid="language-dropdown">
          <Icon icon={faLanguage} />
          {t('language')}
        </Button>
      </Popover>
    </CommandBar>
  )
}

export default HeaderCommand
