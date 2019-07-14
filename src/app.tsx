import { Fabric, initializeIcons } from 'office-ui-fabric-react'
import React from 'react'
import styled from 'styled-components'

import { Content } from './components/content'
import { Footer } from './components/footer'
import { GitHubRibbon } from './components/github-ribbon'
import { Header } from './components/header'

import './i18n'

import Background from './assets/background.png'

initializeIcons()

const Container = styled(Fabric)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`

const Ground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -10;
  background: url(${Background});
  opacity: 0.05;
  background-size: cover;
`

const Wrapper = styled.div`
  color: #333;
  flex: 1;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
`

export const App = () => {
  return (
    <Container>
      <GitHubRibbon />
      <Ground />
      <Wrapper>
        <Header />
        <Content />
        <Footer />
      </Wrapper>
    </Container>
  )
}
