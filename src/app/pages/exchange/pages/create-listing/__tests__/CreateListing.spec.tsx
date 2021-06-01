import React from 'react'
import { render, cleanup } from 'test-utils'
import { CreateListing } from 'app/pages/exchange/pages/create-listing/CreateListing'

jest.mock(
  'app/pages/invest/components/TVChartContainer/TVChartContainer',
  () => ({
    TVChartContainer: jest.fn(() => null)
  })
)

describe('CreateListing', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CreateListing />)
  })
})
