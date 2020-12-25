import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import fs from 'fs-extra'
import path from 'path'
import pprops from 'p-props'
import { GetStaticProps } from 'next'
import { NonIdealState } from '@blueprintjs/core'

import { resources } from '../i18n'
import { Contents } from '../model'
import { getLanguageFallbackContent } from '../components/utils'
import { AnimatedContainer } from '../components/animated-container'
import { PageHeadTitle } from '../components/page-head-title'

interface Props {
  contents: Contents
}

const ExplorePage: FC<Props> = ({ contents }) => {
  const { i18n, t } = useTranslation()

  const content = getLanguageFallbackContent(contents, i18n.language)

  return (
    <>
      <PageHeadTitle title={t('Explore')} />
      <AnimatedContainer>
        {content ? (
          <ReactMarkdown source={content} />
        ) : (
          <NonIdealState
            title={t('lsc')}
            description={<div>{t('no-content')}</div>}
          />
        )}
      </AnimatedContainer>
    </>
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
