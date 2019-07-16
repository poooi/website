import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Sentry from '@sentry/browser'
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { UAParser } from 'ua-parser-js'

import { DownloadCards, IVersion } from './download-cards'
import { TypeCat } from './type-cat'

import poi from '../assets/poi.png'

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

const targets = [
  'linux-x64',
  'linux-deb-x64',
  'linux-rpm-x64',
  'macos-x64',
  'win-ia32',
  'win-ia32-setup',
  'win-x64',
  'win-x64-setup',
]

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: normal;
`

const Logo = styled.img`
  height: 150px;

  @media screen and (min-width: 768px) {
    height: 300px;
  }
`

const Name = styled.span`
  font-size: 100px;

  @media screen and (min-width: 768px) {
    font-size: 200px;
  }
`

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

const FullListLink = styled.a`
  line-height: 300%;
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

  const [version, setVersion] = useState<IVersion>(({} as any) as IVersion)

  useEffect(() => {
    const getUpdate = async () => {
      try {
        const resp = await fetch('https://poi.io/update/latest.json')
        const result: IVersion = await resp.json()
        setVersion(result)
      } catch (e) {
        console.error(e)
        Sentry.captureException(e)
      }
    }

    getUpdate()
  }, [])

  return (
    <Container>
      <Title>
        <Logo src={poi} alt="poi" />
        <Name>{t('name')}</Name>
      </Title>
      <Description>
        <TypeCat text={t('description')} />
      </Description>
      <DownloadCards target={selected} version={version} />
      <CenterContainer>
        <StyledDropdown
          label={t('Choose another platform')}
          options={options}
          selectedKey={selected}
          onChange={(_, item) => setSelected(item!.key as string)}
        />
      </CenterContainer>
      <CenterContainer>
        <FullListLink
          href="https://npm.taobao.org/mirrors/poi"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('other-versions')} <FontAwesomeIcon icon={faExternalLinkAlt} />
        </FullListLink>
      </CenterContainer>
    </Container>
  )
}
