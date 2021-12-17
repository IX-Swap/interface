import { PeriodicalFilter } from 'app/pages/issuance/components/NetAssetValueChart/PeriodicalFilter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('PeriodicFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PeriodicalFilter />)
  })
})
