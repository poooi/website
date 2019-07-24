import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'
import { UAParser } from 'ua-parser-js'

import { DownloadCards, IVersion } from './download-cards'

const getTargetIndex = () => {
  const { os, cpu } = new UAParser().getResult()
  if (os.name === 'Linux') {
    return 0
  } else if (os.name === 'Debian' || os.name === 'Ubuntu') {
    return 1
  } else if (os.name === 'CentOS' || os.name === 'Fedora') {
    return 2
  } else if (os.name === 'Mac OS') {
    return 3
  } else if (os.name === 'Windows') {
    if (cpu.architecture === 'ia64' || cpu.architecture === 'amd64') {
      return 7
    }
    return 5
  }
  return 0
}

const targets = [
  'linux-x64',
  'linux-deb-x64',
  'linux-rpm-x64',
  'macos-x64',
  'win-ia32',
  'win-ia32-setup',
  'win-x64',
  'win-x64-setup',
]

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
`

const FullListLink = styled.a`
  line-height: 300%;
`

const StyledDropdown = styled(Dropdown)`
  width: 20em;
`

const Download = () => {
  const { t } = useTranslation()

  const options: IDropdownOption[] = useMemo(
    () =>
      targets.map(target => ({
        key: target,
        text: t(target),
      })),
    [t],
  )

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

  const [selected, setSelected] = useState(targets[getTargetIndex()])
  return (
    <>
      <DownloadCards target={selected} version={version} />
      <CenterContainer>
        <StyledDropdown
          label={t('Choose another platform')}
          options={options}
          selectedKey={selected}
          onChange={(_, item) => setSelected(item!.key as string)}
        />
      </CenterContainer>
      <CenterContainer>
        <FullListLink
          href="https://npm.taobao.org/mirrors/poi"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('other-versions')} <FontAwesomeIcon icon={faExternalLinkAlt} />
        </FullListLink>
      </CenterContainer>
    </>
  )
}

export default Download
