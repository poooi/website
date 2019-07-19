import { faLanguage } from '@fortawesome/free-solid-svg-icons/faLanguage'
import { faSwatchbook } from '@fortawesome/free-solid-svg-icons/faSwatchbook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import map from 'lodash/map'
import { CommandBarButton, loadTheme } from 'office-ui-fabric-react'
import React, { useContext, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

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

  const fontFamily = getLocaleFontFamily(i18n.language)

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
      ...(isDark ? darkTheme : lightTheme),
      defaultFontStyle: {
        fontFamily,
      },
    })
  }, [i18n.language, isDark])

  return (
    <CommandBar>
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
