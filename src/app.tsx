import { Fabric } from 'office-ui-fabric-react/lib/Fabric'
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons'
import React from 'react'

import { Content } from './components/content'
import { Footer } from './components/footer'
import { GitHubRibbon } from './components/github-ribbon'
import { Header } from './components/header'

import './i18n'

import styles from './app.module.css'

initializeIcons()

export const App = () => {
  return (
    <Fabric className={styles.container}>
      <GitHubRibbon />
      <div className={styles.ground} />
      <div className={styles.wrapper}>
        <Header />
        <Content />
        <Footer />
      </div>
    </Fabric>
  )
}
