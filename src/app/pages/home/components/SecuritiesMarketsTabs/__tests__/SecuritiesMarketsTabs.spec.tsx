import { SecuritiesMarketsTabs } from 'app/pages/home/components/SecuritiesMarketsTabs/SecuritiesMarketsTabs'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Securities } from 'app/pages/home/components/Securities/Securities'

jest.mock('app/pages/home/components/Charts/Charts', () => ({
  Charts: jest.fn(() => null)
}))

jest.mock('app/pages/home/components/Securities/Securities', () => ({
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
