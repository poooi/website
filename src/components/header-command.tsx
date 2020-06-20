import { faLanguage } from '@fortawesome/free-solid-svg-icons/faLanguage'
import { faSwatchbook } from '@fortawesome/free-solid-svg-icons/faSwatchbook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import map from 'lodash/map'
import { Button } from '@blueprintjs/core'
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

const CommandBar = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  line-height: 60px;

  button {
    height: 44px;
    padding: 0 1ex;
  }
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
    <CommandBar>
      <Button onClick={dispatch}>
        <Icon icon={faSwatchbook} />
        {t('current-theme')}
        {t(isDark ? 'Chibaheit' : 'Lilywhite')}
      </Button>
      <Button
        menuProps={{
          items: options,
        }}
        data-testid="language-dropdown"
      >
        <Icon icon={faLanguage} />
        {t('language')}
      </Button>
    </CommandBar>
  )
}

export default HeaderCommand
