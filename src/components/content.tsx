import classnames from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Slider from 'react-slick'
import { UAParser } from 'ua-parser-js'

import { DownloadCards } from './download-cards'
import { TypeCat } from './type-cat'

import poi from '../assets/poi.png'
import styles from './content.module.css'

function getSettings() {
  const { os, cpu } = new UAParser().getResult()
  let initialSlide = 0
  if (os.name === 'Linux') {
    initialSlide = 0
  } else if (os.name === 'Debian' || os.name === 'Ubuntu') {
    initialSlide = 1
  } else if (os.name === 'CentOS' || os.name === 'Fedora') {
    initialSlide = 2
  } else if (os.name === 'Mac OS') {
    initialSlide = 3
  } else if (os.name === 'Windows') {
    initialSlide = 5
    if (cpu.architecture === 'ia64' || cpu.architecture === 'amd64') {
      initialSlide = 7
    }
  }
  return {
    infinite: true,
    initialSlide,
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 500,
  }
}

const version = {
  beta: 'v10.4.0',
  betaAvailable: true,
  stable: 'v10.3.0',
}

export const Content = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <img
          src={poi}
          className={classnames(styles.logo, {
            [styles.aprilfoolsday]:
              new Date().getMonth() === 3 && new Date().getDate() === 1,
          })}
        />
        <span className={styles.name}>{t('name')}</span>
      </div>
      <div className={styles.description}>
        <TypeCat text={t('description')} />
      </div>
      <div className={styles.slider}>
        <Slider {...getSettings()}>
          <div>
            <DownloadCards target="linux-x64" version={version} />
          </div>
          <div>
            <DownloadCards target="linux-deb-x64" version={version} />
          </div>
          <div>
            <DownloadCards target="linux-rpm-x64" version={version} />
          </div>
          <div>
            <DownloadCards target="macos-x64" version={version} />
          </div>
          <div>
            <DownloadCards target="win-ia32" version={version} />
          </div>
          <div>
            <DownloadCards target="win-ia32-setup" version={version} />
          </div>
          <div>
            <DownloadCards target="win-x64" version={version} />
          </div>
          <div>
            <DownloadCards target="win-x64-setup" version={version} />
          </div>
        </Slider>
      </div>
      <div className={styles.others}>
        <a href="https://npm.taobao.org/mirrors/poi" target="_blank">
          {t('other-versions')}
        </a>
      </div>
    </div>
  )
}
