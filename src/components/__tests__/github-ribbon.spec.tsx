import { render, wait } from '@testing-library/react'
import React from 'react'

import { GitHubRibbon } from '../github-ribbon'

describe('<GitHubRibbon />', () => {
  it('renders', () => {
    const { asFragment } = render(<GitHubRibbon />)
    expect(asFragment()).toMatchSnapshot()
  })
})
