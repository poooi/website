import { AppProps } from 'next/app'

import React, { FC, useEffect, useReducer } from 'react'
import styled, {
  createGlobalStyle,
  ThemeProvider,
} from 'styled-components/macro'
import classNames from 'classnames'
import { config } from '@fortawesome/fontawesome-svg-core'

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

config.autoAddCss = false

const GlobalStyle = createGlobalStyle`
  html, body {
    font-size: 16px;
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

// const getDefaultIsDark = (): boolean => {
//   if (window.localStorage?.getItem('theme')) {
//     return localStorage.getItem('theme') === 'dark'
//   }
//   return (
//     window.matchMedia &&
//     window.matchMedia('(prefers-color-scheme: dark)').matches
//   )
// }

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [isDark, dispatch] = useReducer(
    (state: boolean, value: any) => !state,
    true,
  )

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <DispatchThemeChangeContext.Provider value={dispatch}>
        <ThemeIsDarkContext.Provider value={isDark}>
          <ModernNormalize />
          <GlobalStyle />
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
