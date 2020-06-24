import React, { FC } from 'react'
import { GetStaticProps } from 'next'
import fs from 'fs-extra'
import path from 'path'

import { useTranslation } from 'react-i18next'
import { TargetList } from '../components/target-list'
import { Version } from '../model'
import { AnimatedContainer } from '../components/animated-container'
import { PageHeadTitle } from '../components/page-head-title'

interface Props {
  version: Version
}

const DownloadPage: FC<Props> = ({ version }) => {
  const { t } = useTranslation()
  return (
    <>
      <PageHeadTitle title={t('Downloads')} />
      <AnimatedContainer>
        <TargetList version={version} />
      </AnimatedContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const version = await fs.readJson(
    path.resolve(process.cwd(), 'public', 'update', 'latest.json'),
  )

  return {
    props: { version },
  }
}

export default DownloadPage
