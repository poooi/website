import { router } from '../src'

describe('Router with /update', () => {
  it('handles normal requests', async () => {
    const req = new Request('http://example.com/update/latest.json')
    const res = await router.handle(req)

    expect(res.status).toBe(200)
    expect(res.url).toMatchInlineSnapshot(
      `"https://poi.moe/update/latest.json"`,
    )

    const result = await res.json()
    expect(result.version).toBeTruthy()
  })

  it('handles requests with query', async () => {
    const req = new Request('http://example.com/update/latest.json?foo=bar#baz')
    const res = await router.handle(req)

    expect(res.status).toBe(200)
    expect(res.url).toMatchInlineSnapshot(
      `"https://poi.moe/update/latest.json"`,
    )

    const result = await res.json()
    expect(result.version).toBeTruthy()
  })

  it('handles requests inexisting file', async () => {
    const req = new Request('http://example.com/update/lovelive.exe')
    const res = await router.handle(req)

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
    const req = new Request('http://example.com/update/foo/bar')
    const res = await router.handle(req)

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
})

describe('Router with /fcd', () => {
  it('handles normal requests', async () => {
    const req = new Request('http://example.com/fcd/meta.json')
    const res = await router.handle(req)

    expect(res.status).toBe(200)
    expect(res.url).toMatchInlineSnapshot(
      `"https://raw.githubusercontent.com/poooi/poi/master/assets/data/fcd/meta.json"`,
    )

    const result = await res.json()
    expect(result.length).toBeTruthy()
  })

  it('handles requests with query', async () => {
    const req = new Request('http://example.com/fcd/meta.json?foo=bar#baz')
    const res = await router.handle(req)

    expect(res.status).toBe(200)
    expect(res.url).toMatchInlineSnapshot(
      `"https://raw.githubusercontent.com/poooi/poi/master/assets/data/fcd/meta.json"`,
    )

    const result = await res.json()
    expect(result.length).toBeTruthy()
  })

  it('handles requests inexisting file', async () => {
    const req = new Request('http://example.com/fcd/lovelive.exe')
    const res = await router.handle(req)

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
    const req = new Request('http://example.com/fcd/foo/bar')
    const res = await router.handle(req)

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
})

describe('Router with /dist', () => {
  it('handles normal requests: redirect', async () => {
    const req = new Request('http://example.com/dist/poi-10.7.0-arm64-mac.zip')
    const res = await router.handle(req)

    expect(res.status).toBe(301)
    expect(res.headers.get('Location')).toMatchInlineSnapshot(
      `"https://npmmirror.com/mirrors/poi/10.7.0-arm64/poi-10.7.0-arm64-mac.zip"`,
    )
  })

  it('handles normal requests: yaml', async () => {
    const req = new Request('http://example.com/dist/latest.yml')
    const res = await router.handle(req)

    expect(res.status).toBe(200)
    const content = await res.text()
    expect(content.includes('size')).toBe(true)
  })

  it('handles normal requests: /dist/mac', async () => {
    const req = new Request(
      'http://example.com/dist/mac/poi-10.7.0-arm64-mac.zip',
    )
    const res = await router.handle(req)

    expect(res.status).toBe(301)
    expect(res.headers.get('Location')).toMatchInlineSnapshot(
      `"https://npmmirror.com/mirrors/poi/10.7.0-arm64/poi-10.7.0-arm64-mac.zip"`,
    )
  })

  it('handles extra query strings: /dist/mac', async () => {
    const req = new Request(
      'http://example.com/dist/mac/poi-10.7.0-arm64-mac.zip?foo=bar#baz',
    )
    const res = await router.handle(req)

    expect(res.status).toBe(301)
    expect(res.headers.get('Location')).toMatchInlineSnapshot(
      `"https://npmmirror.com/mirrors/poi/10.7.0-arm64/poi-10.7.0-arm64-mac.zip"`,
    )
  })

  it('handles requests inexisting file', async () => {
    const req = new Request('http://example.com/dist/lovelive.exe')
    const res = await router.handle(req)

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
      'http://example.com/dist/next/poi-10.7.0-arm64-mac.zip',
    )
    const res = await router.handle(req)

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
})
