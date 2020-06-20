import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import { Button } from '@blueprintjs/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import compareVersions from 'compare-versions'
import styled from 'styled-components/macro'
import { Version, targets } from '../model'
import { autoDetectedTarget, getDownloadLink } from './utils'

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
      <h2>{t('Stable')}</h2>
      <DownloadList>
        {map(sortedTargets, (target) => (
          <Button
            primary={autoDetectedTarget === target}
            key={target}
            secondaryText={version.version}
            href={getDownloadLink(version.version, target)}
            ariaLabel={`${t('Stable')}, ${version.version}, ${target}`}
          >
            {t(target)}
          </Button>
        ))}
      </DownloadList>
      {version.version &&
        compareVersions.compare(version.version, version.betaVersion, '<') && (
          <>
            <h2>{t('Beta')}</h2>
            <DownloadList>
              {map(sortedTargets, (target) => (
                <Button
                  primary={autoDetectedTarget === target}
                  key={target}
                  secondaryText={version.betaVersion}
                  href={getDownloadLink(version.betaVersion, target)}
                  ariaLabel={`${t('Beta')}, ${version.betaVersion}, ${target}`}
                >
                  {t(target)}
                </Button>
              ))}
            </DownloadList>
          </>
        )}
      <h2>{t('Others')}</h2>
      <DownloadList>
        <Button
          href="https://npm.taobao.org/mirrors/poi"
          target="_blank"
          rel="noopener noreferrer"
          secondaryText={t('HostedAt', { site: 'TAONPM' })}
          ariaLabel={t('Old versions')}
        >
          {t('Old versions')}
        </Button>
        <Button
          href="https://ci.appveyor.com/project/KochiyaOcean/poi"
          target="_blank"
          rel="noopener noreferrer"
          secondaryText={t('HostedAt', { site: 'AppVeyor' })}
          ariaLabel={t('Windows nightlies')}
        >
          {t('Windows nightlies')}
        </Button>
        <Button
          href="https://nightly.poi.moe/"
          target="_blank"
          rel="noopener noreferrer"
          secondaryText={t('HostedAt', { site: 'poi.moe' })}
          ariaLabel={t('Linux and macOS nightlies')}
        >
          {t('Linux and macOS nightlies')}
        </Button>
        <Button
          href="https://github.com/poooi/poi"
          target="_blank"
          rel="noopener noreferrer"
          secondaryText={t('HostedAt', { site: 'GitHub' })}
          ariaLabel={t('Source code')}
        >
          {t('Source code')}
        </Button>
      </DownloadList>
    </>
  )
}
