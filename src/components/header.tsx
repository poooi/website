import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'
import Link from 'next/link'
import { Button, ButtonGroup } from '@blueprintjs/core'
import { useRouter } from 'next/router'

import HeaderCommand from './header-command'

import poi from '../assets/poi.png'

export const languages = {
  en: 'English',
  ja: '日本語',
  'zh-Hans': '简体中文',
  'zh-Hant': '繁體中文',
}

const Container = styled.div`
  height: 60px;

  background-color: ${(props) => props.theme.background};
`

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  display: flex;
  font-size: 20px;
`

const LinkItem = styled.a``

const Spacer = styled.div`
  flex: 1;
`

const Image = styled.img`
  height: 40px;
`

export const Header = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Container>
      <Wrapper>
        <ButtonGroup minimal>
          {router.pathname !== '/' && (
            <Link href="/" passHref>
              <Button>
                <Image src={poi} />
              </Button>
            </Link>
          )}
          <Link href="/explore" passHref>
            <Button>{t('Explore')}</Button>
          </Link>
          <Link href="/download" passHref>
            <Button>{t('Download')}</Button>
          </Link>
          <Link href="/plugins" passHref>
            <Button>{t('Plugins')}</Button>
          </Link>
        </ButtonGroup>
        <Spacer />
        <HeaderCommand />
      </Wrapper>
    </Container>
  )
}
