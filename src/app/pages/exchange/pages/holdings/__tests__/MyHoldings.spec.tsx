import { MyHoldings } from 'app/pages/exchange/pages/holdings/MyHoldings'
import React from 'react'
import { render } from 'test-utils'

describe('MyHoldings', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<MyHoldings />)
  })
})
