import { NotFoundError } from '@cloudflare/kv-asset-handler'
import Toucan from 'toucan-js'

import { PoiVersions } from './types'

export const makeErrorMessage = (message: string) =>
  JSON.stringify({
    erorr: true,
    message,
  })

export const safeFetch = (sentry: Toucan | null) => async (url: string) => {
  const resp = await fetch(url)
  if (resp.ok) {
    const response = new Response(resp.body)
    response.headers.set('X-Poi-Real-Url', url)
    return response
  }
  sentry?.addBreadcrumb({ message: `${url} not available with ${resp.status}` })
  if (resp.status < 500 || resp.status >= 400) {
    throw new NotFoundError(`${url} not available with ${resp.status}`)
  }
  throw new Error(`${url} not available with ${resp.status}`)
}

export const fetchPoiVersions = async (): Promise<PoiVersions> => {
  const resp = await fetch(
    'https://raw.githubusercontent.com/poooi/website/master/packages/web/public/update/latest.json',
  )

  return resp.json()
}

export const ensureRemoteFile =
  (sentry: Toucan | null) => async (url: string) => {
    sentry?.addBreadcrumb({ message: `detecting ${url}` })
    const resp = await fetch(url, { method: 'HEAD' })

    if (!resp.ok) {
      throw new NotFoundError(`${url} not available with ${resp.status}`)
    }
  }
