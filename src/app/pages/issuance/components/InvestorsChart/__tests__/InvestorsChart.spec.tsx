import React from 'react'
import { render } from 'test-utils'
import { InvestorsChart } from 'app/pages/issuance/components/InvestorsChart/InvestorsChart'

jest.mock(
  'app/pages/issuance/components/NetAssetValueChart/PeriodicalFilter',
  () => ({
    PeriodicalFilter: jest.fn(() => null)
  })
)

describe('InvestorsChart', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<InvestorsChart />)
  })
})
