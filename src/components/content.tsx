import React, { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { TypeCat } from './type-cat'

import poi from '../assets/poi.png'

const Download = lazy(() => import('./download'))
const IconLoader = lazy(() => import('./icon-loader'))

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: normal;
`

const Logo = styled.img`
  height: 150px;

  @media screen and (min-width: 768px) {
    height: 300px;
  }
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

export const Content = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <Title>
        <Logo src={poi} alt="poi" />
        <Name>{t('name')}</Name>
      </Title>
      <Description>
        <TypeCat text={t('description')} />
      </Description>
      <Suspense fallback={<div />}>
        <IconLoader />
        <Download />
      </Suspense>
    </Container>
  )
}
