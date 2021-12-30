import React from 'react'
import { render } from 'test-utils'
import { DistributionFrequencySelect } from 'components/form/DistributionFrequencySelect'

describe('DistributionFrequencySelect', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DistributionFrequencySelect />)
  })
})
