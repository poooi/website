import { Button } from '@blueprintjs/core'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'
import Link from 'next/link'

import { Version } from '../model'
import { DownloadCards } from './download-cards'
import { autoDetectedTarget } from './utils'

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem auto;
`

interface Props {
  version: Version
}

const Download: FC<Props> = ({ version }) => {
  const { t } = useTranslation()

  return (
    <>
      <DownloadCards target={autoDetectedTarget} version={version} />
      <CenterContainer>
        {version.version && (
          <Link href="/downloads" passHref>
            <Button minimal data-testid="open-dialog">
              {t('Choose another platform')}
            </Button>
          </Link>
        )}
      </CenterContainer>
    </>
  )
}

export default Download
