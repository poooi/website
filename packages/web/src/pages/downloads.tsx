import { FC } from 'react'
import version from '@poi-web/data/update/latest.json'

import { useTranslation } from 'react-i18next'
import { TargetList } from '../components/target-list'
import { AnimatedContainer } from '../components/animated-container'
import { PageHeadTitle } from '../components/page-head-title'

const DownloadPage: FC = () => {
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

export default DownloadPage
