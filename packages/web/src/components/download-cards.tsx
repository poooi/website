import { useTranslation } from 'react-i18next'
import compareVersions from 'compare-versions'
import styled from 'styled-components'
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

const Description = styled.span`
  display: block;
  font-size: 1rem;
`

const DownloadButton = styled(AnchorButton)`
  padding: 1rem 2em;
  font-size: 1.5rem;

  && {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    background-image: none;
    border: 1px solid ${({ theme }) => theme.text};
  }

  & + & {
    margin-left: 2rem;
  }
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
            <span>{t('download', { version: version.version })}</span>
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
