/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DistributionFrequencySelect } from 'v2/components/form/DistributionFrequencySelect'

describe('DistributionFrequencySelect', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DistributionFrequencySelect />)
  })
})
