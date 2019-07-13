import { render } from '@testing-library/react'
import React from 'react'

import { DownloadCards } from '../download-cards'

describe('<DownloadCards />', () => {
  const { asFragment, rerender } = render(
    <DownloadCards
      target="linux-x64"
      version={{
        beta: 'v10.4.0',
        betaAvailable: true,
        stable: 'v10.3.0',
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
          beta: 'v10.4.0',
          betaAvailable: false,
          stable: 'v10.3.0',
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
          beta: 'v10.4.0',
          betaAvailable: true,
          stable: 'v10.3.0',
        }}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
