import { FundingLinearProgress } from 'app/pages/educationCentre/components/Funding/FundingLinearProgress'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('FundingLinearProgress', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<FundingLinearProgress value={50} />)
  })
})
