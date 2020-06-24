import { waitFor } from '@testing-library/dom'
import React from 'react'
import { renderWithTheme } from '../../testing-utils'

import { Content } from '../content'

jest.mock('ua-parser-js')

describe('<Content /> with beta > stable', () => {
  let fetch: jest.SpyInstance
  beforeAll(() => {
    fetch = jest.spyOn(window, 'fetch').mockImplementation(
      async () =>
        new Response(
          JSON.stringify({
            betaVersion: 'v10.5.0-beta.0',
            version: 'v10.4.0',
          }),
        ),
    )
  })

  afterAll(() => {
    fetch.mockReset()
  })

  it('renders', async () => {
    const { asFragment, getByTestId } = renderWithTheme(<Content />)
    await waitFor(() => getByTestId('download-stable-version'))
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('<Content /> with beta < stable', () => {
  let fetch: jest.SpyInstance
  beforeAll(() => {
    fetch = jest.spyOn(window, 'fetch').mockImplementation(
      async () =>
        new Response(
          JSON.stringify({
            betaVersion: 'v10.3.0-beta.0',
            version: 'v10.4.0',
          }),
        ),
    )
  })

  afterAll(() => {
    fetch.mockReset()
  })

  it('renders', async () => {
    const { asFragment, getByTestId } = renderWithTheme(<Content />)
    await waitFor(() => getByTestId('download-stable-version'))
    expect(asFragment()).toMatchSnapshot()
  })
})
