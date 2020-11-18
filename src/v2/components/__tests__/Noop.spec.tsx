import React from 'react'
import { render, cleanup } from 'test-utils'
import { Noop } from 'v2/components/Noop'

describe('Noop', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Noop />)
  })

  it('renders nothing', () => {
    const { container } = render(<Noop />)

    expect(container).toBeEmptyDOMElement()
  })
})
