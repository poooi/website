import { Spinner, SpinnerSize } from 'office-ui-fabric-react'
import { rgba } from 'polished'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { lt } from 'semver'
import styled from 'styled-components/macro'

import { IVersion, targets } from '../model'
import { getDownloadLink } from './utils'

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
  background-color: ${props => rgba(props.theme.palette.white, 0.75)};
  border: ${props => props.theme.palette.neutralDark} solid 1px;
  border-radius: 1px;
  color: ${props => props.theme.palette.neutralDark};
  cursor: pointer;
  display: inline;
  display: ${props => props.isBeta && 'none'};
  font-size: 22px;
  padding: 8px 12px;
  margin: 4px 8px;
  transition: all 300ms;
  min-width: 12em;

  :hover {
    background-color: ${props => rgba(props.theme.palette.themePrimary, 0.75)};
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

interface IProps {
  target: targets
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
          {lt(version.version, version.betaVersion) && (
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
