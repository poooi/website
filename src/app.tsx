import { Fabric, initializeIcons, loadTheme } from 'office-ui-fabric-react'
import React, { useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

import {
  darkTheme,
  DispatchThemeChangeContext,
  getLocaleFontFamily,
  lightTheme,
  ThemeIsDarkContext,
} from './theme'

import { Background } from './components/background'
import { Content } from './components/content'
import { Footer } from './components/footer'
import { Header } from './components/header'

import './i18n'

initializeIcons()

const GlobalStyle = createGlobalStyle`
  a {
    color: inherit;
    text-decoration: none;
  }
`

const Container = styled(Fabric)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`

const Wrapper = styled.div`
  color: ${props => props.theme.palette.neutralPrimary};
  flex: 1;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
`

const choiceDark = localStorage.getItem('theme') === 'dark'

export const App = () => {
  const { i18n } = useTranslation()

  const fontFamily = getLocaleFontFamily(i18n.language)

  const [isDark, dispatch] = useReducer(
    (state: boolean, value: any) => !state,
    choiceDark,
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
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <DispatchThemeChangeContext.Provider value={dispatch}>
        <ThemeIsDarkContext.Provider value={isDark}>
          <GlobalStyle />
          <Background />
          <Container>
            <Wrapper>
              <Header />
              <Content />
              <Footer />
            </Wrapper>
          </Container>
        </ThemeIsDarkContext.Provider>
      </DispatchThemeChangeContext.Provider>
    </ThemeProvider>
  )
}
