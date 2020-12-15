import React from 'react'
import { render, cleanup } from 'test-utils'
import { DistributionFrequencySelect } from 'components/form/DistributionFrequencySelect'

describe('DistributionFrequencySelect', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DistributionFrequencySelect />)
  })
})
