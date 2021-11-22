import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { FC, useReducer, useEffect } from 'react'
import styled, {
  createGlobalStyle,
  ThemeProvider,
} from 'styled-components/macro'
import classNames from 'classnames'
import { config } from '@fortawesome/fontawesome-svg-core'
import * as Sentry from '@sentry/browser'
import Head from 'next/head'
import ReactGA from 'react-ga'
import Router from 'next/router'

import {
  darkTheme,
  DispatchThemeChangeContext,
  lightTheme,
  ThemeIsDarkContext,
} from '../theme'

import { Background } from '../components/background'
import { ErrorBoundary } from '../components/error-boundary'

import '../i18n'

import 'modern-normalize/modern-normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://119091520e0b47809be0b51bd6313c6d@sentry.io/1505313',
  })
}

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
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

const Footer = dynamic<any>(
  () => import('../components/no-ssr/footer').then((mod) => mod.Footer),
  { ssr: false },
)

const LocalizedFontFamily = dynamic<any>(
  () =>
    import('../components/no-ssr/localized-font-family').then(
      (mode) => mode.LocalizedFontFamily,
    ),
  { ssr: false },
)

const Header = dynamic<any>(() =>
  import('../components/header').then((mode) => mode.Header),
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

  useEffect(() => {
    ReactGA.initialize('UA-83274947-1')
    logPageView()
    Router.events.on('routeChangeComplete', logPageView)
  }, [])

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <DispatchThemeChangeContext.Provider value={dispatch}>
        <ThemeIsDarkContext.Provider value={isDark}>
          <Head>
            <meta charSet="utf-8" />
            <link rel="shortcut icon" href="favicon.ico" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="theme-color" content={darkTheme.background} />
            <link rel="manifest" href="manifest.json" />
            <meta
              name="description"
              content="Scalable KanColle browser and tool, for Windows, macOS and Linux. 一个可扩展的舰队Collection浏览器。拡張可能な艦隊これくしょんブラウザ。"
            />
            <title>
              poi | KanColle Browser | 舰娘专用浏览器 | 艦これ専ブラ
            </title>
          </Head>
          <GlobalStyle />
          <FoucFix />
          <ThemeDetection />
          <LocalizedFontFamily />
          <Background />
          <Container className={classNames({ 'bp3-dark': isDark })}>
            <Wrapper>
              <ErrorBoundary>
                <Header />
                <ContentWrapper>
                  <Component {...pageProps} />
                </ContentWrapper>
                <Footer />
              </ErrorBoundary>
            </Wrapper>
          </Container>
        </ThemeIsDarkContext.Provider>
      </DispatchThemeChangeContext.Provider>
    </ThemeProvider>
  )
}

export default App
