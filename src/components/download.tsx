import { Button } from '@blueprintjs/core'
import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'
import Link from 'next/link'

import { Version, targets } from '../model'
import { DownloadCards } from './download-cards'
import { detectTarget } from './utils'

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem auto;
`

interface Props {
  version: Version
}

export const Download: FC<Props> = ({ version }) => {
  const { t } = useTranslation()

  const [target, setTarget] = useState(targets.win64)

  useEffect(() => setTarget(detectTarget()), [])

  return (
    <>
      <DownloadCards target={target} version={version} />
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
