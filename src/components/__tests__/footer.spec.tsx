import React from 'react'
import { i18n } from '../../i18n'

import { renderWithTheme } from '../../testing-utils'
import { Footer } from '../footer'

describe('<Footer />', () => {
  it('renders with non zh', () => {
    i18n.changeLanguage('en-US')
    const { asFragment } = renderWithTheme(<Footer />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with zh', () => {
    i18n.changeLanguage('zh')
    const { asFragment } = renderWithTheme(<Footer />)
    expect(asFragment()).toMatchSnapshot()
  })
})
