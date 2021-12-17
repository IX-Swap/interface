import React from 'react'
import { render, cleanup } from 'test-utils'
import { InvestorsChart } from 'app/pages/issuance/components/InvestorsChart/InvestorsChart'

jest.mock(
  'app/pages/issuance/components/NetAssetValueChart/PeriodicalFilter',
  () => ({
    PeriodicalFilter: jest.fn(() => null)
  })
)

jest.mock('app/pages/issuance/components/NetAssetValueChart/NoData', () => ({
  NoData: jest.fn(() => null)
}))

describe('InvestorsChart', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<InvestorsChart />)
  })
})
