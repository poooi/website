import { render } from '@testing-library/react'
import React from 'react'

import { Content } from '../content'

jest.mock('ua-parser-js')

describe('<Content />', () => {
  it('renders', () => {
    const { asFragment } = render(<Content />)
    expect(asFragment()).toMatchSnapshot()
  })
})
