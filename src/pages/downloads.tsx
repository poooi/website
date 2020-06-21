import React, { FC } from 'react'
import { GetStaticProps } from 'next'
import fs from 'fs-extra'
import path from 'path'

import { TargetList } from '../components/target-list'
import { Version } from '../model'
import { AnimatedContainer } from '../components/animated-container'

interface Props {
  version: Version
}

const DownloadPage: FC<Props> = ({ version }) => {
  return (
    <AnimatedContainer>
      <TargetList version={version} />
    </AnimatedContainer>
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
