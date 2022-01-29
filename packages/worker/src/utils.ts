import { NotFoundError } from '@cloudflare/kv-asset-handler'
import Toucan from 'toucan-js'

export const makeErrorMessage = (message: string) =>
  JSON.stringify({
    erorr: true,
    message,
  })

export const safeFetch = (sentry: Toucan | null) => async (url: string) => {
  const resp = await fetch(url)
  if (resp.ok) {
    const response = new Response(resp.body, resp)
    response.headers.set('X-Poi-Real-Url', url)
    return response
  }
  sentry?.addBreadcrumb({ message: `${url} not available with ${resp.status}` })
  if (resp.status < 500 || resp.status >= 400) {
    throw new NotFoundError(`${url} not available with ${resp.status}`)
  }
  throw new Error(`${url} not available with ${resp.status}`)
}
