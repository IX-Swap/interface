import { FundingLinearProgress } from 'app/pages/educationCentre/components/Funding/FundingLinearProgress'
import React from 'react'
import { render } from 'test-utils'

describe('FundingLinearProgress', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<FundingLinearProgress value={50} />)
  })
})
