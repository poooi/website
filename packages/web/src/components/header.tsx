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

const Wrapper = styled.nav`
  margin: 0 auto;
  max-width: 960px;
  display: flex;
  font-size: 20px;
`

const Spacer = styled.div`
  flex: 1;
`

const Image = styled.img`
  height: 40px;
`

const HomeNav = styled(Button)<{ $hidden: boolean }>`
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  transition: 0.3s;
`

export const Header = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Container id="header">
      <Wrapper>
        <ButtonGroup minimal>
          <Link href="/" passHref>
            <HomeNav $hidden={router.pathname === '/'}>
              <Image src={poi.src} />
            </HomeNav>
          </Link>
          <Link href="/explore" passHref>
            <Button>{t('Explore')}</Button>
          </Link>
          <Link href="/downloads" passHref>
            <Button>{t('Downloads')}</Button>
          </Link>
          {/* <Link href="/plugins" passHref>
            <Button>{t('Plugins')}</Button>
          </Link> */}
        </ButtonGroup>
        <Spacer />
        <HeaderCommand />
      </Wrapper>
    </Container>
  )
}
