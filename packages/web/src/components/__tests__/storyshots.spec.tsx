import initStoryshots from '@storybook/addon-storyshots'
import { render } from '@testing-library/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import type { Plugin } from 'pretty-format'

const reactTestingLibrarySerializer: Plugin = {
  print: (val: any, serialize) =>
    serialize(val.getByTestId('storybook-content')),
  test: (val: any) =>
    val && Object.prototype.hasOwnProperty.call(val, 'container'),
}

initStoryshots({
  framework: 'react',
  renderer: render,
  snapshotSerializers: [reactTestingLibrarySerializer],
})
