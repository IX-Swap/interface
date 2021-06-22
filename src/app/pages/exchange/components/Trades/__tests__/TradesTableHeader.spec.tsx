import { TradesTableHeader } from 'app/pages/exchange/components/Trades/TradesTableHeader'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('TradesTableHeader', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TradesTableHeader tokenSymbol='IXPS' />)
  })
})
