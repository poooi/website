import { render } from '@testing-library/react'
import React from 'react'

import { DownloadCards } from '../download-cards'

describe('<DownloadCards />', () => {
  const { asFragment, rerender } = render(
    <DownloadCards
      target="linux-x64"
      version={{
        betaVersion: 'v10.5.0',
        version: 'v10.4.0',
      }}
    />,
  )

  it('renders with beta', () => {
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders without beta', () => {
    rerender(
      <DownloadCards
        target="linux-x64"
        version={{
          betaVersion: 'v10.3.0',
          version: 'v10.4.0',
        }}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with invalid target', () => {
    rerender(
      <DownloadCards
        target="chiba"
        version={{
          betaVersion: 'v10.5.0',
          version: 'v10.4.0',
        }}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
