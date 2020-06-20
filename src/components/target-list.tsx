import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import { Card, AnchorButton, Intent } from '@blueprintjs/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import compareVersions from 'compare-versions'
import styled from 'styled-components/macro'
import { Version, targets } from '../model'
import { autoDetectedTarget, getDownloadLink } from './utils'

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

const sortedTargets = sortBy(targets, (target) => target !== autoDetectedTarget)

export const TargetList = ({ version }: Props) => {
  const { t } = useTranslation()
  return (
    <>
      <Card>
        <DownloadCards target={autoDetectedTarget} version={version} />
      </Card>
      <Card>
        <h2>
          {t('Stable')} {version.version}
        </h2>
        <DownloadList>
          {map(sortedTargets, (target) => (
            <AnchorButton
              intent={
                autoDetectedTarget === target ? Intent.SUCCESS : Intent.NONE
              }
              key={target}
              href={getDownloadLink(version.version, target)}
            >
              {t(target)}
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
              {map(sortedTargets, (target) => (
                <AnchorButton
                  intent={
                    autoDetectedTarget === target ? Intent.SUCCESS : Intent.NONE
                  }
                  key={target}
                  href={getDownloadLink(version.betaVersion, target)}
                >
                  {t(target)}
                </AnchorButton>
              ))}
            </DownloadList>
          </Card>
        )}
      <Card>
        <h2>{t('Others')}</h2>
        <DownloadList>
          <AnchorButton
            href="https://npm.taobao.org/mirrors/poi"
            target="_blank"
            rel="noopener noreferrer"
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
