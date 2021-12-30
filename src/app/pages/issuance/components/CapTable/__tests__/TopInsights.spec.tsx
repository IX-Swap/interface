import { TopInsights } from 'app/pages/issuance/components/CapTable/TopInsights'
import React from 'react'
import { render } from 'test-utils'
import { TopInvestors } from 'app/pages/issuance/components/IssuanceLanding/TopInvestors'

jest.mock('app/pages/issuance/components/IssuanceLanding/TopInvestors', () => ({
  TopInvestors: jest.fn(() => null)
}))

describe('TopInsights', () => {
  afterEach(async () => {
    jest.clearAllMocks()
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
