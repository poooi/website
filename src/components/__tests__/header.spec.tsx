import { getByText } from '@testing-library/dom'
import { act, fireEvent, render } from '@testing-library/react'
import _ from 'lodash'
import React from 'react'

import { i18n } from '../../i18n'
import { Header, languages } from '../header'

const noop = () => {
  /* */
}

describe('<Header />', () => {
  it('renders', () => {
    const { asFragment, getByTestId, baseElement } = render(
      <Header isDark={true} onChangeTheme={noop} />,
    )
    const dropdown = getByTestId('language-dropdown')
    fireEvent.click(dropdown)
    const layer = baseElement.querySelector('.ms-Layer')
    expect(layer).toBeDefined()
    expect(asFragment()).toMatchSnapshot()
    expect(layer).toMatchSnapshot()
  })

  it('changes language', () => {
    const { getByTestId, asFragment, baseElement, debug } = render(
      <Header isDark={true} onChangeTheme={noop} />,
    )
    const origin = asFragment()
    _.each(languages, (value, name) => {
      const dropdown = getByTestId('language-dropdown')
      fireEvent.click(dropdown)
      const layer = baseElement.querySelector('.ms-ContextualMenu-list.is-open')
      expect(layer).toBeTruthy()
      fireEvent.click(getByText(layer as HTMLElement, value))
      expect(i18n.language).toBe(name)
      expect(origin).toMatchDiffSnapshot(asFragment(), {}, name)
    })

    _.each(languages, async (value, name) => {
      act(() => {
        i18n.changeLanguage(name)
      })
      expect(origin).toMatchDiffSnapshot(asFragment(), {}, name)
    })
  })
})
