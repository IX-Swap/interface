import { TradesTableHeader } from 'app/pages/exchange/components/Trades/TradesTableHeader'
import React from 'react'
import { render } from 'test-utils'

describe('TradesTableHeader', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<TradesTableHeader tokenSymbol='IXPS' />)
  })
})
