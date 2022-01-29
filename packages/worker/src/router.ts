/* eslint-disable consistent-return */

import { getAssetFromKV, NotFoundError } from '@cloudflare/kv-asset-handler'
import { Router } from 'itty-router'
import manifestJSON from '__STATIC_CONTENT_MANIFEST'
import mime from 'mime'

import { ensureRemoteFile, fetchPoiVersions, safeFetch } from './utils'
import { RouteContext, WorkerEnv } from './types'

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
        `https://raw.githubusercontent.com/poooi/website/master/packages/web/public/update/${filename}`,
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

const distRegExp = [
  /^\/dist\/poi-setup-(.*).exe$/,
  /^\/dist\/mac\/poi-(.*)-arm64-mac.zip$/,
  /^\/dist\/mac\/poi-(.*)-arm64-mac.dmg$/,
  /^\/dist\/mac\/poi-(.*)-mac.zip$/,
  /^\/dist\/mac\/poi-(.*)-mac.dmg$/,
  /^\/dist\/poi-(.*)-arm64-mac.zip$/,
  /^\/dist\/poi-(.*)-mac.zip$/,
  /^\/dist\/poi-(.*)-arm64-mac.dmg$/,
  /^\/dist\/poi-(.*)-mac.dmg$/,
]

router.get(
  '/dist/*?',
  async ({ url, cf }: Request, { sentry }: RouteContext) => {
    const uri = new URL(url)
    const filename = uri.pathname.split('/').pop()!

    let resp
    if (filename.endsWith('.yml')) {
      const poiVersions = await fetchPoiVersions()
      if (filename.startsWith('beta')) {
        const distFileName = filename.replace('beta', 'latest')
        resp = await safeFetch(sentry)(
          `https://github.com/poooi/poi/releases/download/${poiVersions.betaVersion}/${distFileName}`,
        )
      }
      if (filename.startsWith('latest')) {
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

    const destination = (() => {
      // eslint-disable-next-line no-restricted-syntax
      for (const exp of distRegExp) {
        const match = exp.exec(uri.pathname)
        if (match) {
          const version = match[1]

          return cf?.country === 'CN'
            ? `https://npmmirror.com/mirrors/poi/${version}/${filename}`
            : `https://github.com/poooi/poi/releases/download/v${version}/${filename}`
        }
      }
    })()

    if (!destination) {
      return
    }

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
      if (e instanceof NotFoundError) {
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
