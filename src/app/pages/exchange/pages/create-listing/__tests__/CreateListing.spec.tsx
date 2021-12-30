import React from 'react'
import { render } from 'test-utils'
import { CreateListing } from 'app/pages/exchange/pages/create-listing/CreateListing'

jest.mock(
  'app/pages/invest/components/TVChartContainer/TVChartContainer',
  () => ({
    TVChartContainer: jest.fn(() => null)
  })
)

describe('CreateListing', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<CreateListing />)
  })
})
