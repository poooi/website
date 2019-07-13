import classNames from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'

import styles from './download-cards.module.css'

const BASE_URI = 'https://npm.taobao.org/mirrors/poi'

function getDownloadLink(version: string, target: string) {
  const pure = version.substring(1)
  switch (target) {
    case 'linux-x64':
      return `${BASE_URI}/${version}/poi-${pure}.7z`
    case 'linux-deb-x64':
      return `${BASE_URI}/${version}/poi_${pure}_amd64.deb`
    case 'linux-rpm-x64':
      return `${BASE_URI}/${version}/poi-${pure}.x86_64.rpm`
    case 'macos-x64':
      return `${BASE_URI}/${version}/poi-${pure}.dmg`
    case 'win-ia32':
      return `${BASE_URI}/${version}/poi-${pure}-ia32-win.7z`
    case 'win-ia32-setup':
      return `${BASE_URI}/${version}/poi-setup-${pure}.exe`
    case 'win-x64':
      return `${BASE_URI}/${version}/poi-${pure}-win.7z`
    case 'win-x64-setup':
      return `${BASE_URI}/${version}/poi-setup-${pure}.exe`
    default:
      return 'https://github.com/poooi/poi/releases'
  }
}

interface IVersion {
  stable: string
  beta: string
  betaAvailable: boolean
}

interface IProps {
  target: string
  version: IVersion
}

export const DownloadCards = ({ target, version }: IProps) => {
  const { t } = useTranslation()
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {t('download-for')} {t(target)}
      </div>
      <a href={getDownloadLink(version.stable, target)}>
        <button className={classNames(styles.button, styles.stable)}>
          <div>{version.stable}</div>
          <div className={styles.description}>{t('stable-hint')}</div>
        </button>
      </a>
      {version.betaAvailable && (
        <a href={getDownloadLink(version.beta, target)}>
          <button className={classNames(styles.button, styles.beta)}>
            <div>{version.beta}</div>
            <div className={styles.description}>{t('beta-hint')}</div>
          </button>
        </a>
      )}
    </div>
  )
}
