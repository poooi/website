import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import fs from 'fs-extra'
import path from 'path'
import pprops from 'p-props'
import { GetStaticProps } from 'next'
import { NonIdealState } from '@blueprintjs/core'

import { resources } from '../i18n'

interface Props {
  contents: {
    [key: string]: string
  }
}

const ExplorePage: FC<Props> = ({ contents }) => {
  const { i18n, t } = useTranslation()

  return contents[i18n.language] ? (
    <ReactMarkdown source={contents[i18n.language]} />
  ) : (
    <NonIdealState
      title={t('lsc')}
      description={<div>{t('no-content')}</div>}
    />
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const contents = await pprops(resources, async (_, lang) => {
    try {
      const md = await fs.readFile(
        path.resolve(process.cwd(), 'src', 'data', 'explore', `${lang}.md`),
      )
      return md.toString()
    } catch {
      return ''
    }
  })

  return {
    props: { contents },
  }
}

export default ExplorePage
