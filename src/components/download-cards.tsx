import { rgba } from 'polished'
import React from 'react'
import { useTranslation } from 'react-i18next'
import compareVersions from 'compare-versions'
import styled from 'styled-components/macro'
import { AnchorButton, Intent } from '@blueprintjs/core'

import { Version, targets } from '../model'
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

const Description = styled.div`
  font-size: 1.2rem;
`

const DownloadButton = styled(AnchorButton)`
  padding: 1rem 3em;
  font-size: 2rem;
`

interface Props {
  target: targets
  version: Version
}

export const DownloadCards = ({ target, version }: Props) => {
  const { t } = useTranslation()

  return (
    <Container>
      {version.version ? (
        <>
          <DownloadButton
            href={getDownloadLink(version.version, target)}
            data-testid="download-stable-version"
            intent={Intent.PRIMARY}
          >
            <div>{t('download', { version: version.version })}</div>
            <Description>{t(target)}</Description>
            <Description>{t('stable-hint')}</Description>
          </DownloadButton>
          {compareVersions.compare(
            version.version,
            version.betaVersion,
            '<',
          ) && (
            <DownloadButton href={getDownloadLink(version.betaVersion, target)}>
              <div>{t('download', { version: version.betaVersion })}</div>
              <Description>{t(target)}</Description>
              <Description>{t('beta-hint')}</Description>
            </DownloadButton>
          )}
        </>
      ) : (
        <div>{t('lsc')}</div>
      )}
    </Container>
  )
}
