import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Dialog } from '@blueprintjs/core'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'
import Link from 'next/link'

import { Version } from '../model'
import { DownloadCards } from './download-cards'
import { TargetList } from './target-list'
import { autoDetectedTarget } from './utils'

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem auto;
`

const Download = () => {
  const { t } = useTranslation()

  const [version, setVersion] = useState<Version>(({} as any) as Version)

  useEffect(() => {
    const getUpdate = async () => {
      try {
        const resp = await fetch('/update/latest.json')
        const result: Version = await resp.json()
        setVersion(result)
      } catch (e) {
        console.error(e)
      }
    }

    getUpdate()
  }, [])

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
