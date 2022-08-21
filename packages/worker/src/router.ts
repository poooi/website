/* eslint-disable consistent-return */

import { getAssetFromKV, NotFoundError } from '@cloudflare/kv-asset-handler'
import { Router } from 'itty-router'
import manifestJSON from '__STATIC_CONTENT_MANIFEST'
import mime from 'mime'

import poiVersions from '@poi-web/data/update/latest.json'

import { ensureRemoteFile, safeFetch } from './utils'
import { RouteContext, WorkerEnv } from './types'
import { getUpdateFromMediaWiki } from './translator'

const assetManifest = JSON.parse(manifestJSON)

export const router = Router()

interface RequestWithPossibleParams extends Request {
  params: {
    filename: string
  }
}

router.get(
  '/status',
  async (_, { sentry }: RouteContext) =>
    new Response(
      JSON.stringify({
        sentry: sentry ? 'up' : 'down',
      }),
    ),
)

router.get(
  '/update/:filename',
  async (
    { params: { filename } }: RequestWithPossibleParams,
    { sentry }: RouteContext,
  ) => {
    sentry?.addBreadcrumb({ message: '/update' })
    if (filename.endsWith('.json') || filename.endsWith('.md')) {
      return safeFetch(sentry)(
        `https://raw.githubusercontent.com/poooi/website/master/packages/data/update/${filename}`,
      )
    }
  },
)

router.get(
  '/fcd/:filename',
  async (
    { params: { filename } }: RequestWithPossibleParams,
    { sentry }: RouteContext,
  ) => {
    if (filename.endsWith('.json')) {
      return safeFetch(sentry)(
        `https://raw.githubusercontent.com/poooi/poi/master/assets/data/fcd/${filename}`,
      )
    }
  },
)

router.get(
  '/translator/en-US.json',
  async (request, { sentry }: RouteContext) => {
    const result = await getUpdateFromMediaWiki()
    const resp = new Response(JSON.stringify(result))

    return resp
  },
)

router.get(
  '/dist/*?',
  async ({ url, cf }: Request, { sentry }: RouteContext) => {
    const uri = new URL(url)
    const filename = uri.pathname.split('/').pop()!

    let resp
    if (filename.endsWith('.yml')) {
      if (filename.startsWith('beta')) {
        const distFileName = filename.replace('beta', 'latest')
        resp = await safeFetch(sentry)(
          `https://github.com/poooi/poi/releases/download/${poiVersions.betaVersion}/${distFileName}`,
        )
      } else if (filename.startsWith('latest')) {
        resp = await safeFetch(sentry)(
          `https://github.com/poooi/poi/releases/download/${poiVersions.version}/${filename}`,
        )
      } else {
        return
      }

      resp.headers.append(
        'Content-Type',
        mime.getType(filename) || 'text/plain',
      )

      return resp
    }

    const tag = /(\d+\.\d+\.\d+(-beta\.\d)?)/.exec(filename)?.[1]

    sentry?.addBreadcrumb({
      message: `guessing tag: ${tag} from filename ${filename}`,
    })

    if (!tag) {
      return
    }

    const destination =
      cf?.country === 'CN'
        ? `https://registry.npmmirror.com/-/binary/poi/v${tag}/${filename}`
        : `https://github.com/poooi/poi/releases/download/v${tag}/${filename}`

    await ensureRemoteFile(sentry)(destination)

    const response = new Response('', { status: 301 })
    response.headers.set('Location', destination)
    return response
  },
)

router.all(
  '*',
  async (
    request: Request,
    { env = {} as WorkerEnv, context, sentry }: RouteContext,
  ) => {
    // we call this object event because of service worker version
    const event = {
      request,
      waitUntil: (promise: Promise<any>) => context.waitUntil(promise),
    }

    try {
      const page = await getAssetFromKV(event, {
        // eslint-disable-next-line no-underscore-dangle
        ASSET_NAMESPACE: env.__STATIC_CONTENT,
        ASSET_MANIFEST: assetManifest,
      })
      return new Response(page.body, page)
    } catch (e) {
      sentry?.addBreadcrumb({ message: 'first KV search failed' })
      const uri = new URL(request.url)
      const filename = uri.pathname.split('/').pop()!
      if (e instanceof NotFoundError && !filename.includes('.')) {
        // next.js will build an HTML for each route, try with html extension
        const indexPage = await getAssetFromKV(event, {
          // eslint-disable-next-line no-underscore-dangle
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: assetManifest,
          mapRequestToAsset: (req) => {
            const uri = new URL(req.url)
            return new Request(`${uri.origin}${uri.pathname}.html`, req)
          },
        })
        sentry?.addBreadcrumb({ message: 'KV fallback search succeeded' })
        return new Response(indexPage.body, indexPage)
      }
      throw e
    }
  },
)
