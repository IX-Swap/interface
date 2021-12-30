import { NetAssetValueChart } from 'app/pages/issuance/components/NetAssetValueChart/NetAssetValueChart'
import React from 'react'
import { render } from 'test-utils'

jest.mock(
  'app/pages/issuance/components/NetAssetValueChart/PeriodicalFilter',
  () => ({
    PeriodicalFilter: jest.fn(() => null)
  })
)

describe('NetAssetValueChart', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<NetAssetValueChart />)
  })
})
