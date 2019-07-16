import { faLanguage } from '@fortawesome/free-solid-svg-icons/faLanguage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import map from 'lodash/map'
import { Dropdown } from 'office-ui-fabric-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { getExactLanguage } from '../utils'

export const languages = {
  en: 'English',
  ja: '日本語',
  'zh-Hans': '简体中文',
  'zh-Hant': '繁體中文',
}

const options = map(languages, (value, key) => ({
  key,
  text: value,
}))

const Container = styled.div`
  height: 60px;

  background-color: white;
  border-bottom: 1px solid #eee;
`

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  display: flex;
  font-size: 20px;
`

const LinkItem = styled.a`
  padding: 0 1ex;
  line-height: 60px;
  display: inline-block;
  cursor: pointer;
  transition: 0.3s;
  position: relative;

  display: none;

  :hover {
    ::before {
      content: '';
      display: block;
      background-color: #333;
      position: absolute;
      height: 2px;
      width: 100%;
      bottom: 0;
      left: 0;
    }
  }
`

const Spacer = styled.div`
  flex: 1;
`

const LanguageList = styled.div`
  display: flex;
  align-items: center;
  height: 60px;

  .svg-inline--fa {
    padding-right: 1ex;
  }
`

const StyledDropdown = styled(Dropdown)`
  width: 6em;
`

export const Header = () => {
  const { t, i18n } = useTranslation()

  const exact = getExactLanguage(i18n.language)

  return (
    <Container>
      <Wrapper>
        <div>
          <LinkItem>{t('Explore')}</LinkItem>
          <LinkItem>{t('Plugins')}</LinkItem>
        </div>
        <Spacer />
        <LanguageList data-testid="language-list">
          <FontAwesomeIcon icon={faLanguage} />
          <StyledDropdown
            data-testid="language-dropdown"
            options={options}
            placeholder="Language"
            selectedKey={exact}
            onChange={(event, item) => i18n.changeLanguage(item!.key as string)}
          />
        </LanguageList>
      </Wrapper>
    </Container>
  )
}
