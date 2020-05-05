import { fireEvent } from '@testing-library/react'
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

  it('opens target list', async () => {
    const { getByTestId, baseElement } = renderWithTheme(<Content />)
    await waitFor(() => getByTestId('download-stable-version'))
    fireEvent.click(getByTestId('open-dialog'))
    await waitFor(() => getByTestId('modal-container'))
    expect(
      baseElement.querySelector('[data-testid="modal-container"]'),
    ).toMatchSnapshot()
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

  it('opens target list', async () => {
    const { getByTestId, baseElement } = renderWithTheme(<Content />)
    await waitFor(() => getByTestId('download-stable-version'))
    fireEvent.click(getByTestId('open-dialog'))
    await waitFor(() => getByTestId('modal-container'))
    expect(
      baseElement.querySelector('[data-testid="modal-container"]'),
    ).toMatchSnapshot()
  })
})
