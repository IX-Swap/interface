import React from 'react'
import { render } from 'test-utils'
import { Noop } from 'components/Noop'

describe('Noop', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders nothing', () => {
    const { container } = render(<Noop />)

    expect(container).toBeEmptyDOMElement()
  })
})
