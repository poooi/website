import { ComponentType } from 'react'
import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { dom } from '@fortawesome/fontawesome-svg-core'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: ComponentType) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            <style id="fontawesome">{dom.css()}</style>
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
