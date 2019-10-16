import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import { CompoundButton } from 'office-ui-fabric-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { lt } from 'semver'
import styled from 'styled-components/macro'
import { IVersion, targets } from '../model'
import { autoDetectedTarget, getDownloadLink } from './utils'

const DownloadList = styled.div`
  display: flex;
  flex-wrap: wrap;
  button,
  a {
    margin: 1ex 1ex;
  }
`

interface IProps {
  version: IVersion
}

const sortedTargets = sortBy(targets, target => target !== autoDetectedTarget)

export const TargetList = ({ version }: IProps) => {
  const { t } = useTranslation()
  return (
    <>
      <h2>{t('Stable')}</h2>
      <DownloadList>
        {map(sortedTargets, target => (
          <CompoundButton
            primary={autoDetectedTarget === target}
            key={target}
            secondaryText={version.version}
            href={getDownloadLink(version.version, target)}
            ariaLabel={`${t('Stable')}, ${version.version}, ${target}`}
          >
            {t(target)}
          </CompoundButton>
        ))}
      </DownloadList>
      {version.version && lt(version.version, version.betaVersion) && (
        <>
          <h2>{t('Beta')}</h2>
          <DownloadList>
            {map(sortedTargets, target => (
              <CompoundButton
                primary={autoDetectedTarget === target}
                key={target}
                secondaryText={version.betaVersion}
                href={getDownloadLink(version.betaVersion, target)}
                ariaLabel={`${t('Beta')}, ${version.betaVersion}, ${target}`}
              >
                {t(target)}
              </CompoundButton>
            ))}
          </DownloadList>
        </>
      )}
      <h2>{t('Others')}</h2>
      <DownloadList>
        <CompoundButton
          href="https://npm.taobao.org/mirrors/poi"
          target="_blank"
          rel="noopener noreferrer"
          secondaryText={t('HostedAt', { site: 'TAONPM' })}
          ariaLabel={t('Old versions')}
        >
          {t('Old versions')}
        </CompoundButton>
        <CompoundButton
          href="https://ci.appveyor.com/project/KochiyaOcean/poi"
          target="_blank"
          rel="noopener noreferrer"
          secondaryText={t('HostedAt', { site: 'AppVeyor' })}
          ariaLabel={t('Windows nightlies')}
        >
          {t('Windows nightlies')}
        </CompoundButton>
        <CompoundButton
          href="https://poidb.0u0.moe/nightly"
          target="_blank"
          rel="noopener noreferrer"
          secondaryText={t('HostedAt', { site: 'poi.moe' })}
          ariaLabel={t('Linux and macOS nightlies')}
        >
          {t('Linux and macOS nightlies')}
        </CompoundButton>
        <CompoundButton
          href="https://github.com/poooi/poi"
          target="_blank"
          rel="noopener noreferrer"
          secondaryText={t('HostedAt', { site: 'GitHub' })}
          ariaLabel={t('Source code')}
        >
          {t('Source code')}
        </CompoundButton>
      </DownloadList>
    </>
  )
}
