import React from 'react'
import { render } from 'test-utils'
import { Noop } from 'components/Noop'

describe('Noop', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<Noop />)
  })

  it('renders nothing', () => {
    const { container } = render(<Noop />)

    expect(container).toBeEmptyDOMElement()
  })
})
