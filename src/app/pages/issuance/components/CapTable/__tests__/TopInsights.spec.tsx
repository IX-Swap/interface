import { TopInsights } from 'app/pages/issuance/components/CapTable/TopInsights'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { TopInvestors } from 'app/pages/issuance/components/IssuanceLanding/TopInvestors'

jest.mock('app/pages/issuance/components/IssuanceLanding/TopInvestors', () => ({
  TopInvestors: jest.fn(() => null)
}))

describe('TopInsights', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TopInsights />)
  })

  it('renders components correctly', () => {
    render(<TopInsights />)
    expect(TopInvestors).toHaveBeenCalledWith(
      {
        position: 'right',
        title: 'Top Five Investors'
      },
      {}
    )
  })
})
