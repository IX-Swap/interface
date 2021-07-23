import { sampleSecurity } from 'app/pages/home/components/Securities/__tests__/SecurityCard.spec'
import { YearlyAnalysis } from 'app/pages/home/components/SecurityTradingView/YearlyAnalysis'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('YearlyAnalysis', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<YearlyAnalysis data={sampleSecurity} />)
  })
})
