import React from 'react'
import { render, cleanup } from 'test-utils'
import { EditListing } from 'app/pages/exchange/pages/edit-listing/EditListing'

jest.mock(
  'app/pages/invest/components/TVChartContainer/TVChartContainer',
  () => ({
    TVChartContainer: jest.fn(() => null)
  })
)

describe('EditListing', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<EditListing />)
  })
})
