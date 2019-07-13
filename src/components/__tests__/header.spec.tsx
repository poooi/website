import { act, fireEvent, render } from '@testing-library/react'
import _ from 'lodash'
import React from 'react'

import { i18n } from '../../i18n'
import { Header, languages } from '../header'

describe('<Header />', () => {
  it('renders', () => {
    const { asFragment, getByText } = render(<Header />)
    expect(asFragment()).toMatchSnapshot()
    expect(getByText('English')).toMatchInlineSnapshot(`
      <a
        class="active"
      >
        English
      </a>
    `)
  })

  it('changes language', () => {
    const { getByText, asFragment } = render(<Header />)
    const origin = asFragment()
    _.each(languages, (value, name) => {
      fireEvent.click(getByText(value))
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
