import { faLanguage } from '@fortawesome/free-solid-svg-icons/faLanguage'
import { faSwatchbook } from '@fortawesome/free-solid-svg-icons/faSwatchbook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import map from 'lodash/map'
import { Button, ButtonGroup, Popover, Menu, MenuItem } from '@blueprintjs/core'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { createGlobalStyle } from 'styled-components/macro'

import { DispatchThemeChangeContext, ThemeIsDarkContext } from '../theme'

export const languages = {
  en: 'English',
  fr: 'français',
  ja: '日本語',
  'zh-Hans': '简体中文',
  'zh-Hant': '繁體中文',
}

const GlobalFontFamily = createGlobalStyle<{ fontFamily?: string }>`
  body {
    font-family: ${(props) => props.fontFamily};
  }
`

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

  const options = useMemo(
    () =>
      map(languages, (value, key) => ({
        key,
        onClick: () => {
          i18n.changeLanguage(key)
        },
        text: value,
      })),
    [i18n.changeLanguage], // eslint-disable-line
  )

  return (
    <CommandBar minimal>
      <Button onClick={dispatch}>
        <Icon icon={faSwatchbook} />
        {t('current-theme')}
        {t(isDark ? 'Chibaheit' : 'Lilywhite')}
      </Button>
      <Popover
        minimal
        content={
          <Menu>
            {map(languages, (value, key) => (
              <MenuItem
                text={value}
                key={key}
                onClick={() => {
                  i18n.changeLanguage(key)
                }}
              />
            ))}
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
