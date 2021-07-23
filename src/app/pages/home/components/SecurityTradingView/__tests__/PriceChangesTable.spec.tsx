import { sampleSecurity } from 'app/pages/home/components/Securities/__tests__/SecurityCard.spec'
import { PriceChangesTable } from 'app/pages/home/components/SecurityTradingView/PriceChangesTable'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('PriceChangesTable', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PriceChangesTable data={sampleSecurity} />)
  })
})
