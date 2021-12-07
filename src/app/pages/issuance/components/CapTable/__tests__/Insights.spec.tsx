import { Insights } from 'app/pages/issuance/components/CapTable/Insights'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { PricePerToken } from 'app/pages/issuance/components/CapTable/PricePerToken'
import { TotalTokens } from 'app/pages/issuance/components/CapTable/TotalTokens'
import { TotalInvestors } from 'app/pages/issuance/components/CapTable/TotalInvestors'
import { AmountRaised } from 'app/pages/issuance/components/CapTable/AmountRaised'

jest.mock('app/pages/issuance/components/CapTable/PricePerToken', () => ({
  PricePerToken: jest.fn(() => null)
}))

jest.mock('app/pages/issuance/components/CapTable/TotalTokens', () => ({
  TotalTokens: jest.fn(() => null)
}))

jest.mock('app/pages/issuance/components/CapTable/AmountRaised', () => ({
  AmountRaised: jest.fn(() => null)
}))

jest.mock('app/pages/issuance/components/CapTable/TotalInvestors', () => ({
  TotalInvestors: jest.fn(() => null)
}))

describe('Insights', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Insights />)
  })

  it('renders correct components', () => {
    render(<Insights />)
    expect(PricePerToken).toHaveBeenCalled()
    expect(TotalTokens).toHaveBeenCalled()
    expect(AmountRaised).toHaveBeenCalled()
    expect(TotalInvestors).toHaveBeenCalled()
  })
})
