import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionButton, Modal } from 'office-ui-fabric-react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'
import { UAParser } from 'ua-parser-js'

import { IVersion, targets } from '../model'
import { DownloadCards } from './download-cards'
import { TargetList } from './target-list'

const getTarget = () => {
  const { os, cpu } = new UAParser().getResult()
  if (os.name === 'Linux') {
    return targets.linux
  } else if (os.name === 'Debian' || os.name === 'Ubuntu') {
    return targets.linuxDeb
  } else if (os.name === 'CentOS' || os.name === 'Fedora') {
    return targets.linuxRpm
  } else if (os.name === 'Mac OS') {
    return targets.macos
  } else if (os.name === 'Windows') {
    if (cpu.architecture === 'ia64' || cpu.architecture === 'amd64') {
      return targets.win64Setup
    }
    return targets.win32Setup
  }
  return targets.linux
}

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
`

const FullListLink = styled(ActionButton)`
  font-size: 1em;
`

const ModalContainer = styled.div`
  width: 80vw;
  height: 90vh;
  max-width: 1440px;
  max-height: 720px;
  padding: 2em;
`

const CloseButton = styled(ActionButton)`
  position: absolute;
  right: 1em;
  top: 1ex;
  font-size: 2em;
`

const Download = () => {
  const { t } = useTranslation()

  const [version, setVersion] = useState<IVersion>(({} as any) as IVersion)

  useEffect(() => {
    const getUpdate = async () => {
      try {
        const resp = await fetch('https://poi.io/update/latest.json')
        const result: IVersion = await resp.json()
        setVersion(result)
      } catch (e) {
        console.error(e)
      }
    }

    getUpdate()
  }, [])

  const [selected, setSelected] = useState(getTarget())
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <DownloadCards target={selected} version={version} />
      <CenterContainer>
        <FullListLink onClick={() => setIsOpen(true)}>
          {t('Choose another platform')}
        </FullListLink>
      </CenterContainer>
      <Modal isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        <ModalContainer>
          <CloseButton
            onClick={() => setIsOpen(false)}
            ariaLabel={t('Close dialog')}
          >
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
          <TargetList version={version} />
        </ModalContainer>
      </Modal>
    </>
  )
}

export default Download
