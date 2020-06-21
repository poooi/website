import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import React, { FC, useEffect, useReducer } from 'react'
import styled, {
  createGlobalStyle,
  ThemeProvider,
} from 'styled-components/macro'
import classNames from 'classnames'
import { config } from '@fortawesome/fontawesome-svg-core'
import * as Sentry from '@sentry/browser'

import {
  darkTheme,
  DispatchThemeChangeContext,
  lightTheme,
  ThemeIsDarkContext,
} from '../theme'

import { ModernNormalize } from '../components/modern-normalize'
import { Background } from '../components/background'
import { Footer } from '../components/footer'
import { Header } from '../components/header'

import '../i18n'

import '@blueprintjs/core/lib/css/blueprint.css'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://119091520e0b47809be0b51bd6313c6d@sentry.io/1505313',
  })
}

const FoucFix = dynamic<any>(
  () => import('../components/no-ssr/fouc-fix').then((mod) => mod.FoucFix),
  { ssr: false },
)

const ThemeDetection = dynamic<any>(
  () =>
    import('../components/no-ssr/theme-detection').then(
      (mod) => mod.ThemeDetection,
    ),
  { ssr: false },
)

config.autoAddCss = false

const GlobalStyle = createGlobalStyle`
  html, body {
    font-size: 16px;
  }

  body {
    display: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`

const Wrapper = styled.div`
  color: ${(props) => props.theme.text};
  flex: 1;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
`

const ContentWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  flex: 1;
  padding-top: 2rem;
`

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [isDark, dispatch] = useReducer(
    (state: boolean, value: any) => value,
    true,
  )

  // useEffect(() => {
  //   localStorage.setItem('theme', isDark ? 'dark' : 'light')
  // }, [isDark])

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <DispatchThemeChangeContext.Provider value={dispatch}>
        <ThemeIsDarkContext.Provider value={isDark}>
          <ModernNormalize />
          <GlobalStyle />
          <FoucFix />
          <ThemeDetection />
          <Background />
          <Container className={classNames({ 'bp3-dark': isDark })}>
            <Wrapper>
              <Header />
              <ContentWrapper>
                <Component {...pageProps} />
              </ContentWrapper>
              <Footer />
            </Wrapper>
          </Container>
        </ThemeIsDarkContext.Provider>
      </DispatchThemeChangeContext.Provider>
    </ThemeProvider>
  )
}

export default App
