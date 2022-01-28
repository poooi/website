import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import manifestJSON from '__STATIC_CONTENT_MANIFEST'
import { Router } from 'itty-router'
import { makeErrorMessage } from './make-error'

const assetManifest = JSON.parse(manifestJSON)

export const router = Router()

const safeFetch = async (url: string) => {
  try {
    const resp = await fetch(url)
    if (resp.ok) {
      return resp
    }
    return new Response(makeErrorMessage('poi?'), { status: 404 })
  } catch (e) {
    console.error(e)
    return new Response(makeErrorMessage('poi???'), { status: 502 })
  }
}

interface RequestWithPossibleParams {
  params: {
    filename: string
  }
}

router.get(
  '/update/:filename',
  async ({ params: { filename } }: RequestWithPossibleParams) =>
    safeFetch(`https://poi.moe/update/${filename}`),
)

router.get(
  '/fcd/:filename',
  async ({ params: { filename } }: RequestWithPossibleParams) =>
    safeFetch(
      `https://raw.githubusercontent.com/poooi/poi/master/assets/data/fcd/${filename}`,
    ),
)

const distRegExp = [
  /^\/dist\/mac\/poi-(.*)-mac.zip$/,
  /^\/dist\/mac\/poi-(.*)-mac.dmg$/,
  /^\/dist\/poi-(.*)-mac.zip$/,
  /^\/dist\/poi-(.*)-mac.dmg$/,
  /^\/dist\/poi-setup-(.*).exe$/,
  /^\/dist\/poi-(.*)-x86_64.appImage$/,
]

// eslint-disable-next-line consistent-return
router.get('/dist/*?', async ({ url }: Request) => {
  const uri = new URL(url)
  const filename = uri.pathname.split('/').pop()!
  if (filename.endsWith('.yml')) {
    return safeFetch(`https://poi.moe/dist/${filename}`)
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const exp of distRegExp) {
    const match = exp.exec(uri.pathname)
    if (match) {
      const version = match[1]
      return Response.redirect(
        `https://npmmirror.com/mirrors/poi/${version}/${filename}`,
        301,
      )
    }
  }
})

router.all('*', async (request: Request, env, ctx) => {
  try {
    const page = await getAssetFromKV(
      {
        request,
        waitUntil: (promise) => ctx.waitUntil(promise),
      },
      {
        // eslint-disable-next-line no-underscore-dangle
        ASSET_NAMESPACE: env.__STATIC_CONTENT,
        ASSET_MANIFEST: assetManifest,
      },
    )
    // allow headers to be altered
    return new Response(page.body, page)
  } catch (e) {
    return new Response(makeErrorMessage('poi?'), { status: 404 })
  }
})

interface WorkerEnv {
  __STATIC_CONTENT: string
}

export const handleFetch: ExportedHandlerFetchHandler<WorkerEnv> = async (
  request,
  env,
  ctx,
) => {
  try {
    const response = await router.handle(request, env, ctx)

    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('Referrer-Policy', 'unsafe-url')
    response.headers.set('Feature-Policy', 'none')

    return response
  } catch (e: any) {
    return new Response(`${e.message}\n${e.stack}`, { status: 500 })
  }
}
