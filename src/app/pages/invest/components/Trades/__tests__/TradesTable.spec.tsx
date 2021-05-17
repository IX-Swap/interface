import { TradesTable } from 'app/pages/invest/components/Trades/TradesTable'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('TradesTable', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TradesTable data={[]} />)
  })
})
