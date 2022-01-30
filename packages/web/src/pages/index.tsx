import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'
import dynamic from 'next/dynamic'

import version from '@poi-web/data/update/latest.json'

import { ErrorBoundary } from '../components/error-boundary'

import poi from '../assets/poi.png'

const TypeCat = dynamic<any>(() =>
  import('../components/type-cat').then((mod) => mod.TypeCat),
)

const Download = dynamic<any>(() =>
  import('../components/download').then((mod) => mod.Download),
)

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: normal;
`

const Name = styled.span`
  font-size: 100px;

  @media screen and (min-width: 768px) {
    font-size: 200px;
  }
`

const Description = styled.div`
  font-size: 36px;
  text-align: center;
  white-space: pre-line;

  @media screen and (min-width: 768px) {
    font-size: 48px;
  }
`

const Image = styled.img`
  transition: 0.3s;
  position: absolute;
`

const ImageContainer = styled.div`
  position: relative;

  height: 150px;
  width: 150px;

  img {
    height: 150px;
    width: 150px;
  }

  @media screen and (min-width: 768px) {
    width: 300px;
    height: 300px;

    img {
      height: 300px;
      width: 300px;
    }
  }
`

const Logo = () => (
  <ImageContainer>
    <Image src={poi.src} />
  </ImageContainer>
)

const Content: FC = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <ErrorBoundary>
        <Title>
          <Logo />
          <Name>{t('name')}</Name>
        </Title>
        <Description>
          <TypeCat text={t('description')} />
        </Description>
        <Download version={version} />
      </ErrorBoundary>
    </Container>
  )
}

export default Content
