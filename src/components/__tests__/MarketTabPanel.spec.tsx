import { MarketTabPanel } from 'components/MarketTabPanel'
import React from 'react'
import { cleanup, render } from 'test-utils'

describe('MarketTabPanel', () => {
  const props = {
    index: 0,
    value: 0
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<MarketTabPanel {...props} />)
  })
})
