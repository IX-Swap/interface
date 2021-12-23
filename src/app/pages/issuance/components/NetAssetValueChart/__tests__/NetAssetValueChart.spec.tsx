import { NetAssetValueChart } from 'app/pages/issuance/components/NetAssetValueChart/NetAssetValueChart'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock(
  'app/pages/issuance/components/NetAssetValueChart/PeriodicalFilter',
  () => ({
    PeriodicalFilter: jest.fn(() => null)
  })
)

describe('NetAssetValueChart', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<NetAssetValueChart />)
  })
})
