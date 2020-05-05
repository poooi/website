import { getByText, waitFor } from '@testing-library/dom'
import { act, fireEvent } from '@testing-library/react'
import _ from 'lodash'
import React from 'react'

import { i18n } from '../../i18n'
import { renderWithTheme } from '../../testing-utils'
import { Header, languages } from '../header'

describe('<Header />', () => {
  it('renders', async () => {
    const { asFragment, getByTestId, baseElement } = renderWithTheme(<Header />)
    await waitFor(() => getByTestId('language-dropdown'))
    fireEvent.click(getByTestId('language-dropdown'))
    const layer = baseElement.querySelector('.ms-Layer')
    expect(layer).toBeDefined()
    expect(asFragment()).toMatchSnapshot()
    expect(layer).toMatchSnapshot()
  })

  it('changes language', () => {
    const { getByTestId, asFragment, baseElement, debug } = renderWithTheme(
      <Header />,
    )
    const origin = asFragment()
    _.each(languages, (value, name) => {
      fireEvent.click(getByTestId('language-dropdown'))
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
