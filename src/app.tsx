import React from 'react'

import { Content } from './components/content'
import { Footer } from './components/footer'
import { GitHubRibbon } from './components/github-ribbon'
import { Header } from './components/header'

import './i18n'

import styles from './app.module.css'

export const App = () => {
  return (
    <div className={styles.container}>
      <GitHubRibbon />
      <div className={styles.ground} />
      <div className={styles.wrapper}>
        <Header />
        <Content />
        <Footer />
      </div>
    </div>
  )
}
