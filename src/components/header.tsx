import { faLanguage } from '@fortawesome/free-solid-svg-icons/faLanguage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

const LanguageList = styled.div`
  display: flex;
  align-items: center;
  .svg-inline--fa {
    padding-right: 1ex;
  }
`

const LanguageItem = styled.a<{ active?: boolean }>`
  padding: 0 1ex;
  line-height: 60px;
  display: inline-block;
  cursor: pointer;
  position: relative;
  font-size: 16px;

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
  const { t, i18n } = useTranslation()

  const pureLangue = getPurelanguage(i18n.language)

  return (
    <Container>
      <Wrapper>
        <div>
          <LinkItem>{t('Explore')}</LinkItem>
          <LinkItem>{t('Plugins')}</LinkItem>
        </div>
        <Spacer />
        <LanguageList data-testid="language-list">
          <FontAwesomeIcon icon={faLanguage} />
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
