import { MyTrades } from 'app/pages/invest/components/Trades/MyTrades'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('MyTrades', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<MyTrades />)
  })
})
