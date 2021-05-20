import { MyHoldings } from 'app/pages/exchange/pages/MyHoldings'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('MyHoldings', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<MyHoldings />)
  })
})
