import classnames from 'classnames'
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { UAParser } from 'ua-parser-js'

import { DownloadCards } from './download-cards'
import { TypeCat } from './type-cat'

import poi from '../assets/poi.png'
import styles from './content.module.css'

export const getSettings = () => {
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

const getTargetIndex = () => {
  const { os, cpu } = new UAParser().getResult()
  if (os.name === 'Linux') {
    return 0
  } else if (os.name === 'Debian' || os.name === 'Ubuntu') {
    return 1
  } else if (os.name === 'CentOS' || os.name === 'Fedora') {
    return 2
  } else if (os.name === 'Mac OS') {
    return 3
  } else if (os.name === 'Windows') {
    if (cpu.architecture === 'ia64' || cpu.architecture === 'amd64') {
      return 7
    }
    return 5
  }
  return 0
}

const version = {
  beta: 'v10.4.0',
  betaAvailable: true,
  stable: 'v10.3.0',
}

const targets = [
  'linux-x64',
  'linux-x64',
  'linux-rpm-x64',
  'macos-x64',
  'win-ia32',
  'win-ia32-setup',
  'win-x64',
  'win-x64-setup',
]

const StyledDropdown = styled(Dropdown)`
  width: 20em;
`

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
`

const Description = styled.div`
  font-size: 36px;
  text-align: center;
  white-space: pre-line;

  @media screen and (min-width: 768px) {
    font-size: 48px;
  }
`

export const Content = () => {
  const { t } = useTranslation()

  const options: IDropdownOption[] = useMemo(
    () =>
      targets.map(target => ({
        key: target,
        text: t(target),
      })),
    [t],
  )

  const [selected, setSelected] = useState(targets[getTargetIndex()])

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
      <Description>
        <TypeCat text={t('description')} />
      </Description>
      <DownloadCards target={selected} version={version} />
      <CenterContainer>
        {t('Choose another platform')}
        <StyledDropdown
          options={options}
          selectedKey={selected}
          onChange={(_, item) => setSelected(item!.key as string)}
        />
      </CenterContainer>
      <CenterContainer>
        <a href="https://npm.taobao.org/mirrors/poi" target="_blank">
          {t('other-versions')}
        </a>
      </CenterContainer>
    </div>
  )
}
