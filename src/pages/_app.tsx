import React, { FC } from 'react'
import { AppProps } from 'next/app'

import '@blueprintjs/core/lib/css/blueprint.css'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App
