import { FC } from 'react'
import Head from 'next/head'

interface Props {
  title: string
}

export const PageHeadTitle: FC<Props> = ({ title }) => {
  return (
    <Head>
      <title>
        {title} - poi | KanColle Browser | 舰娘专用浏览器 | 艦これ専ブラ
      </title>
    </Head>
  )
}
