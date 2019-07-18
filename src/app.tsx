import { Fabric, initializeIcons } from 'office-ui-fabric-react'
import React, { useReducer } from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

import {
  darkTheme,
  DispatchThemeChangeContext,
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
  const [isDark, dispatch] = useReducer(
    (state: boolean, value: any) => !state,
    choiceDark,
  )

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
