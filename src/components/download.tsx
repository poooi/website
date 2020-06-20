import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Dialog } from '@blueprintjs/core'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'

import { Version } from '../model'
import { DownloadCards } from './download-cards'
import { TargetList } from './target-list'
import { autoDetectedTarget } from './utils'

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
`

const FullListLink = styled(Button)`
  font-size: 1em;
`

const ModalContainer = styled.div`
  width: 80vw;
  height: 90vh;
  max-width: 1440px;
  max-height: 720px;
  padding: 2em;
`

const CloseButton = styled(Button)`
  position: absolute;
  right: 1em;
  top: 1ex;
  font-size: 2em;
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

  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <DownloadCards target={autoDetectedTarget} version={version} />
      <CenterContainer>
        {version.version && (
          <FullListLink
            onClick={() => setIsOpen(true)}
            data-testid="open-dialog"
          >
            {t('Choose another platform')}
          </FullListLink>
        )}
      </CenterContainer>
      <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        <ModalContainer data-testid="modal-container">
          <CloseButton
            data-testid="close-dialog"
            onClick={() => setIsOpen(false)}
            ariaLabel={t('Close dialog')}
          >
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
          <TargetList version={version} />
        </ModalContainer>
      </Dialog>
    </>
  )
}

export default Download
