import { getLanguageFallbackContent } from '../utils'

describe('getLanguageFallbackContent', () => {
  const contents = {
    'zh-Hans': '简体中文',
  }

  it('should get content without fallback', () => {
    expect(
      getLanguageFallbackContent(contents, 'zh-Hans'),
    ).toMatchInlineSnapshot(`"简体中文"`)
  })

  it('should get fallback content', () => {
    expect(getLanguageFallbackContent(contents, 'zh-MY')).toMatchInlineSnapshot(
      `"简体中文"`,
    )
  })

  it('should get empty string if no fllback found', () => {
    expect(getLanguageFallbackContent(contents, 'fr-FR')).toMatchInlineSnapshot(
      `""`,
    )
  })
})
