import React, { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'

export const languages = {
  en: 'English',
  ja: '日本語',
  'zh-Hans': '简体中文',
  'zh-Hant': '繁體中文',
}

const HeaderCommand = lazy(() => import('./header-command'))

const Container = styled.div`
  height: 60px;

  background-color: ${props => props.theme.palette.white};
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

export const Header = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <Wrapper>
        <div>
          <LinkItem>{t('Explore')}</LinkItem>
          <LinkItem>{t('Plugins')}</LinkItem>
        </div>
        <Spacer />
        <Suspense fallback={<div />}>
          <HeaderCommand />
        </Suspense>
      </Wrapper>
    </Container>
  )
}
