import { act, render, waitForElement } from '@testing-library/react'
import React from 'react'

import { Content } from '../content'

jest.mock('ua-parser-js')

describe('<Content />', () => {
  let fetch: jest.SpyInstance
  beforeAll(() => {
    fetch = jest.spyOn(window, 'fetch').mockImplementation(
      async () =>
        new Response(
          JSON.stringify({
            betaVersion: 'v10.5.0',
            version: 'v10.4.0',
          }),
        ),
    )
  })

  afterAll(() => {
    fetch.mockReset()
  })

  it('renders', async () => {
    const { asFragment, getByTestId } = render(<Content />)
    await waitForElement(() => getByTestId('download-stable-version'))
    expect(asFragment()).toMatchSnapshot()
  })
})
