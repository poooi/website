import { render } from '@testing-library/react'

import { TypeCat } from '../type-cat'

describe('<TypeCat />', () => {
  it('renders', () => {
    const { asFragment } = render(<TypeCat text="Hello World" />)
    expect(asFragment()).toMatchSnapshot()
  })
})
