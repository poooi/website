import poiVersions from '@poi-web/data/update/latest.json'

import { handleFetch } from '../src'

const stableSemver = poiVersions.version.replace(/^v/, '')

describe('Router with /update', () => {
  it('handles normal requests', async () => {
    const req = new Request('http://example.com/update/latest.json')
    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(200)

    const result = await res.json<any>()
    expect(result.version).toBeTruthy()
  })

  it('handles requests with query', async () => {
    const req = new Request('http://example.com/update/latest.json?foo=bar#baz')
    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(200)

    const result = await res.json<any>()
    expect(result.version).toBeTruthy()
  })

  it('handles requests inexisting file', async () => {
    const req = new Request('http://example.com/update/lovelive.exe')
    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(404)

    const result = await res.json()
    expect(result).toMatchInlineSnapshot(`
      Object {
        "erorr": true,
        "message": "poi?",
      }
    `)
  })

  it('handles requests deeper path', async () => {
    const req = new Request('http://example.com/update/foo/bar')
    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(404)

    const result = await res.json()
    expect(result).toMatchInlineSnapshot(`
      Object {
        "erorr": true,
        "message": "poi?",
      }
    `)
  })
})

describe('Router with /fcd', () => {
  it('handles normal requests', async () => {
    const req = new Request('http://example.com/fcd/meta.json')
    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(200)

    const result = await res.json<any>()
    expect(result.length).toBeTruthy()
  })

  it('handles requests with query', async () => {
    const req = new Request('http://example.com/fcd/meta.json?foo=bar#baz')
    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(200)

    const result = await res.json<any>()
    expect(result.length).toBeTruthy()
  })

  it('handles requests inexisting file', async () => {
    const req = new Request('http://example.com/fcd/lovelive.exe')
    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(404)

    const result = await res.json()
    expect(result).toMatchInlineSnapshot(`
      Object {
        "erorr": true,
        "message": "poi?",
      }
    `)
  })

  it('handles requests deeper path', async () => {
    const req = new Request('http://example.com/fcd/foo/bar')
    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(404)

    const result = await res.json()
    expect(result).toMatchInlineSnapshot(`
      Object {
        "erorr": true,
        "message": "poi?",
      }
    `)
  })
})

describe('Router with /dist', () => {
  it('handles normal requests: redirect', async () => {
    const req = new Request(
      `http://example.com/dist/poi-${stableSemver}-arm64-mac.zip`,
    )
    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(301)
    expect(res.headers.get('Location')).toEqual(
      `https://github.com/poooi/poi/releases/download/v${stableSemver}/poi-${stableSemver}-arm64-mac.zip`,
    )
  })

  it('handles normal requests: CN redirect', async () => {
    const req = new Request(
      `http://example.com/dist/poi-${stableSemver}-arm64-mac.zip`,
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: mocking cf object
        cf: {
          country: 'CN',
        },
      },
    )

    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(301)
    expect(res.headers.get('Location')).toEqual(
      `https://registry.npmmirror.com/-/binary/poi/v${stableSemver}/poi-${stableSemver}-arm64-mac.zip`,
    )
  })

  it('handles normal requests: redirect with old releases', async () => {
    const req = new Request(
      `https://example.com/dist/poi-10.7.0-arm64.dmg.blockmap`,
    )
    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(301)
    expect(res.headers.get('Location')).toMatchInlineSnapshot(
      `"https://github.com/poooi/poi/releases/download/v10.7.0/poi-10.7.0-arm64.dmg.blockmap"`,
    )
  })

  it('handles normal requests: redirect with old deb', async () => {
    const req = new Request(`https://example.com/dist/poi_10.8.0_amd64.deb`)
    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(301)
    expect(res.headers.get('Location')).toMatchInlineSnapshot(
      `"https://github.com/poooi/poi/releases/download/v10.8.0/poi_10.8.0_amd64.deb"`,
    )
  })

  it('handles normal requests: yaml', async () => {
    const req = new Request('http://example.com/dist/latest.yml')
    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(200)
    const content = await res.text()
    expect(content.includes('size')).toBe(true)
  })

  it('handles normal requests: beta yaml', async () => {
    const req = new Request('http://example.com/dist/beta.yml')
    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(200)
    const content = await res.text()
    expect(content.includes('size')).toBe(true)
  })

  it('handles normal requests: /dist/mac', async () => {
    const req = new Request(
      `http://example.com/dist/mac/poi-${stableSemver}-arm64-mac.zip`,
    )
    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(301)
    expect(res.headers.get('Location')).toEqual(
      `https://github.com/poooi/poi/releases/download/v${stableSemver}/poi-${stableSemver}-arm64-mac.zip`,
    )
  })

  it('handles extra query strings: /dist/mac', async () => {
    const req = new Request(
      `http://example.com/dist/mac/poi-${stableSemver}-arm64-mac.zip?foo=bar#baz`,
    )
    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(301)
    expect(res.headers.get('Location')).toEqual(
      `https://github.com/poooi/poi/releases/download/v${stableSemver}/poi-${stableSemver}-arm64-mac.zip`,
    )
  })

  it('handles requests inexisting file', async () => {
    const req = new Request('http://example.com/dist/lovelive.exe')
    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(404)
    expect(res.url).toMatchInlineSnapshot(`""`)

    const result = await res.json()
    expect(result).toMatchInlineSnapshot(`
      Object {
        "erorr": true,
        "message": "poi?",
      }
    `)
  })

  it('handles requests deeper path', async () => {
    const req = new Request(
      `http://example.com/dist/next/poi-${stableSemver}-arm64-mac.zip`,
    )
    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(301)
    expect(res.headers.get('Location')).toEqual(
      `https://github.com/poooi/poi/releases/download/v${stableSemver}/poi-${stableSemver}-arm64-mac.zip`,
    )
  })
})

describe('Other methods than GET', () => {
  it('POST /dist/poi-10.7.0-arm64-mac.zip', async () => {
    const req = new Request(
      'http://example.com/dist/poi-10.7.0-arm64-mac.zip',
      { method: 'POST' },
    )
    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(404)

    const result = await res.json()
    expect(result).toMatchInlineSnapshot(`
      Object {
        "erorr": true,
        "message": "poi?",
      }
    `)
  })

  it('POST /', async () => {
    const req = new Request('http://example.com/', { method: 'POST' })
    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(404)

    const result = await res.json()
    expect(result).toMatchInlineSnapshot(`
      Object {
        "erorr": true,
        "message": "poi?",
      }
    `)
  })

  it('HEAD /dist/poi-10.7.0-arm64-mac.zip', async () => {
    const req = new Request(
      'http://example.com/dist/poi-10.7.0-arm64-mac.zip',
      { method: 'HEAD' },
    )
    const res = await handleFetch(req, {}, {} as ExecutionContext)

    expect(res.status).toBe(404)

    const result = await res.json()
    expect(result).toMatchInlineSnapshot(`
      Object {
        "erorr": true,
        "message": "poi?",
      }
    `)
  })
})
