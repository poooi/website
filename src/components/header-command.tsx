import { faLanguage } from '@fortawesome/free-solid-svg-icons/faLanguage'
import { faSwatchbook } from '@fortawesome/free-solid-svg-icons/faSwatchbook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import map from 'lodash/map'
import {
  CommandBarButton,
  CustomizerContext,
  getTheme,
  loadTheme,
} from 'office-ui-fabric-react'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { createGlobalStyle } from 'styled-components/macro'

import {
  darkTheme,
  DispatchThemeChangeContext,
  getLocaleFontFamily,
  lightTheme,
  ThemeIsDarkContext,
} from '../theme'

export const languages = {
  en: 'English',
  ja: '日本語',
  'zh-Hans': '简体中文',
  'zh-Hant': '繁體中文',
}

const GlobalFontFamily = createGlobalStyle<{ fontFamily?: string }>`
  body {
    font-family: ${props => props.fontFamily};
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

  const [fontFamily, setFontfamily] = useState(
    getLocaleFontFamily(i18n.language),
  )

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
    [i18n.changeLanguage],
  )

  useEffect(() => {
    loadTheme({
      defaultFontStyle: {
        fontFamily,
      },
    })
    setFontfamily(getLocaleFontFamily(i18n.language))
  }, [i18n.language])

  return (
    <CommandBar>
      <GlobalFontFamily fontFamily={fontFamily} />
      <CommandBarButton onClick={dispatch}>
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
  )
}

export default HeaderCommand
