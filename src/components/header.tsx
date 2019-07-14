import classNames from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import { getPurelanguage } from '../utils'

export const languages = {
  en: 'English',
  ja: '日本語',
  'zh-CN': '简体中文',
  'zh-TW': '正體中文',
}

const Container = styled.div`
  min-height: 40px;

  background-color: white;
  border-bottom: 1px solid #eee;
`

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  display: flex;
`

const LanguageList = styled.div``

const LanguageItem = styled.a<{ active: boolean }>`
  padding: 0 5px;
  line-height: 40px;
  display: inline-block;
  cursor: pointer;
  position: relative;

  ${props =>
    props.active &&
    css`
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
    `}
`

export const Header = () => {
  const { i18n } = useTranslation()

  const pureLangue = getPurelanguage(i18n.language)

  return (
    <Container>
      <Wrapper>
        <LanguageList data-testid="language-list">
          {Object.keys(languages).map(lang => (
            <LanguageItem
              key={lang}
              title={languages[lang as keyof typeof languages]}
              onClick={() => i18n.changeLanguage(lang)}
              active={lang === pureLangue || i18n.language === lang}
            >
              {languages[lang as keyof typeof languages]}
            </LanguageItem>
          ))}
        </LanguageList>
      </Wrapper>
    </Container>
  )
}
