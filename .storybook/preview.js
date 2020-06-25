import React, { useState } from 'react'
import { addDecorator } from '@storybook/react'
import styled, { ThemeProvider } from 'styled-components'
import Router from 'next/router'
import { Switch, Card } from '@blueprintjs/core'
import { RouterContext } from 'next/dist/next-server/lib/router-context'

import { darkTheme, lightTheme } from '../src/theme'

import 'modern-normalize/modern-normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'

const Center = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem;
`

const Wrapper = ({ children }) => {
  const [isDark, setIsDark] = useState(true)
  return (
    <RouterContext.Provider value={{}}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Center>
          <Card>
            <Switch checked={isDark} onChange={() => setIsDark((v) => !v)}>
              Dark theme
            </Switch>
          </Card>
        </Center>
        <Center>
          <div>{children}</div>
        </Center>
      </ThemeProvider>
    </RouterContext.Provider>
  )
}

addDecorator((storyFn) => <Wrapper>{storyFn()}</Wrapper>)

Router.router = {
  push: async () => true,
  prefetch: async () => {},
}
