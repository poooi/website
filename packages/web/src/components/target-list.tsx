import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import { Card, AnchorButton, Intent } from '@blueprintjs/core'
import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import compareVersions from 'compare-versions'
import styled from 'styled-components/macro'
import { Version, targets } from '../model'
import { detectTarget, getDownloadLink } from './utils'

import { DownloadCards } from './download-cards'

const DownloadList = styled.div`
  display: flex;
  flex-wrap: wrap;
  button,
  a {
    margin: 1ex 1ex;
  }
`

interface Props {
  version: Version
}

export const TargetList = ({ version }: Props) => {
  const { t } = useTranslation()

  const [target, setTarget] = useState(targets.win64)

  useEffect(() => setTarget(detectTarget()), [])

  const sortedTargets = useMemo(
    () => sortBy(targets, (s) => s !== target),
    [target],
  )
  return (
    <>
      <Card>
        <DownloadCards target={target} version={version} />
      </Card>
      <Card>
        <h2>
          {t('Stable')} {version.version}
        </h2>
        <DownloadList>
          {map(sortedTargets, (s) => (
            <AnchorButton
              intent={s === target ? Intent.SUCCESS : Intent.NONE}
              key={s}
              href={getDownloadLink(version.version, s)}
            >
              {t(s)}
            </AnchorButton>
          ))}
        </DownloadList>
      </Card>
      {version.version &&
        compareVersions.compare(version.version, version.betaVersion, '<') && (
          <Card>
            <h2>
              {t('Beta')} {version.betaVersion}
            </h2>
            <DownloadList>
              {map(sortedTargets, (s) => (
                <AnchorButton
                  intent={s === target ? Intent.SUCCESS : Intent.NONE}
                  key={s}
                  href={getDownloadLink(version.betaVersion, s)}
                >
                  {t(s)}
                </AnchorButton>
              ))}
            </DownloadList>
          </Card>
        )}
      <Card>
        <h2>{t('Others')}</h2>
        <DownloadList>
          <AnchorButton
            href="https://npmmirror.com//mirrors/poi"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="old-versions"
          >
            {t('Old versions')}
            <br />
            {t('HostedAt', { site: 'TAONPM' })}
          </AnchorButton>
          <AnchorButton
            href="https://ci.appveyor.com/project/KochiyaOcean/poi"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('Windows nightlies')}
            <br />
            {t('HostedAt', { site: 'AppVeyor' })}
          </AnchorButton>
          <AnchorButton
            href="https://nightly.poi.moe/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('Linux and macOS nightlies')}
            <br />
            {t('HostedAt', { site: 'poi.moe' })}
          </AnchorButton>
          <AnchorButton
            href="https://github.com/poooi/poi"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('Source code')}
            <br />
            {t('HostedAt', { site: 'GitHub' })}
          </AnchorButton>
        </DownloadList>
      </Card>
    </>
  )
}
