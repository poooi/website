import { Spinner, SpinnerSize } from 'office-ui-fabric-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { lt } from 'semver'
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
  min-height: 150px;

  .ms-Spinner-label {
    font-size: 20px;
  }
`

const Header = styled.div`
  font-size: 22px;
  margin-bottom: 2vh;

  @media screen and (min-width: 768px) {
    font-size: 26px;
  }
`

const Button = styled.button<{ isBeta?: boolean }>`
  background-color: rgba(255, 255, 255, 0.75);
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

export interface IVersion {
  version: string
  betaVersion: string
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
      {version.version ? (
        <>
          <a
            href={getDownloadLink(version.version, target)}
            data-testid="download-stable-version"
          >
            <Button>
              <div>{version.version}</div>
              <Description>{t('stable-hint')}</Description>
            </Button>
          </a>
          {lt(version.betaVersion, version.version) && (
            <a href={getDownloadLink(version.betaVersion, target)}>
              <Button isBeta={true}>
                <div>{version.betaVersion}</div>
                <Description>{t('beta-hint')}</Description>
              </Button>
            </a>
          )}
        </>
      ) : (
        <Spinner label={t('lsc')} size={SpinnerSize.large} />
      )}
    </Container>
  )
}
