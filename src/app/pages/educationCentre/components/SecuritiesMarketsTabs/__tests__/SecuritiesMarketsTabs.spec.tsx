import { SecuritiesMarketsTabs } from 'app/pages/educationCentre/components/SecuritiesMarketsTabs/SecuritiesMarketsTabs'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Securities } from 'app/pages/educationCentre/components/Securities/Securities'

jest.mock('app/pages/educationCentre/components/Charts/Charts', () => ({
  Charts: jest.fn(() => null)
}))

jest.mock('app/pages/educationCentre/components/Securities/Securities', () => ({
  Securities: jest.fn(() => null)
}))

describe('SecuritiesMarketsTabs', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SecuritiesMarketsTabs />)
  })

  it('renders Securities as default Tab', () => {
    render(<SecuritiesMarketsTabs />)
    expect(Securities).toHaveBeenCalled()
  })
})
