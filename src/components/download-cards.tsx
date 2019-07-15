import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

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

const Container = styled.div`
  text-align: center;
  margin-bottom: 3em;
`

const Header = styled.div`
  font-size: 22px;
  margin-bottom: 2vh;

  @media screen and (min-width: 768px) {
    font-size: 26px;
  }
`

const Button = styled.button<{ isBeta?: boolean }>`
  background-color: rgba(0, 0, 0, 0);
  border: #333 solid 1px;
  border-radius: 1px;
  color: #333;
  cursor: pointer;
  display: inline;
  display: ${props => props.isBeta && 'none'};
  font-size: 22px;
  padding: 8px 12px;
  margin: 4px 8px;
  transition: all 300ms;
  min-width: 12em;

  :hover {
    background-color: #333;
    color: #fff;
  }

  @media screen and (min-width: 768px) {
    display: ${props => props.isBeta && 'inline'};
  }
}
`

const Description = styled.div`
  font-size: 14px;
`

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
    <Container>
      <Header>
        {t('download-for')} {t(target)}
      </Header>
      <a href={getDownloadLink(version.stable, target)}>
        <Button>
          <div>{version.stable}</div>
          <Description>{t('stable-hint')}</Description>
        </Button>
      </a>
      {version.betaAvailable && (
        <a href={getDownloadLink(version.beta, target)}>
          <Button isBeta={true}>
            <div>{version.beta}</div>
            <Description>{t('beta-hint')}</Description>
          </Button>
        </a>
      )}
    </Container>
  )
}
