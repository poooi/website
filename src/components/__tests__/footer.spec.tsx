import { render } from '@testing-library/react'
import React from 'react'
import { i18n } from '../../i18n'

import { Footer } from '../footer'

describe('<Footer />', () => {
  it('renders with non zh', () => {
    i18n.changeLanguage('en-US')
    const { asFragment } = render(<Footer />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with zh', () => {
    i18n.changeLanguage('zh')
    const { asFragment } = render(<Footer />)
    expect(asFragment()).toMatchSnapshot()
  })
})
