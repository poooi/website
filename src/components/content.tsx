import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'

import { ErrorBoundary } from './error-boundary'
import { TypeCat } from './type-cat'

import poi from '../assets/poi.png'

import Download from './download'
import IconLoader from './icon-loader'

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

const Logo = () => {
  return (
    <ImageContainer>
      <Image src={poi} />
    </ImageContainer>
  )
}

export const Content = () => {
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
        <IconLoader />
        <Download />
      </ErrorBoundary>
    </Container>
  )
}
