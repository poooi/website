import {
  MethodNotAllowedError,
  NotFoundError,
} from '@cloudflare/kv-asset-handler'
import Toucan from 'toucan-js'

import { makeErrorMessage } from './utils'
import { WorkerEnv } from './types'
import { router } from './router'

export const handleFetch: ExportedHandlerFetchHandler<WorkerEnv> = async (
  request,
  env,
  context,
) => {
  let sentry: Toucan | null = null

  if (env.SENTRY_DSN) {
    sentry = new Toucan({
      dsn: env.SENTRY_DSN,
      context,
      request,
      allowedHeaders: ['user-agent'],
      allowedSearchParams: /(.*)/,
    })
  }

  try {
    const response = await router.handle(request, { env, context, sentry })

    sentry?.addBreadcrumb({ message: 'data fetched' })
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('Referrer-Policy', 'unsafe-url')
    response.headers.set('Feature-Policy', 'none')
    response.headers.set('X-Poi-Greetings', 'poi?')

    return response
  } catch (e: any) {
    if (e instanceof NotFoundError) {
      return new Response(makeErrorMessage('poi?'), { status: 404 })
    }
    if (e instanceof MethodNotAllowedError) {
      return new Response(makeErrorMessage('poi?'), { status: 405 })
    }
    sentry?.captureException(e)
    return new Response(makeErrorMessage('poi???'), { status: 500 })
  }
}

export const handleFetchWithLogs: ExportedHandlerFetchHandler<
  WorkerEnv
> = async (request, ...args) => {
  const resp = await handleFetch(request, ...args)
  // eslint-disable-next-line no-console
  console.log(`${request.method} ${request.url} - ${resp.status}`)
  return resp
}
