import React from 'react'
import { render } from 'test-utils'
import { EditListing } from 'app/pages/exchange/pages/edit-listing/EditListing'

jest.mock(
  'app/pages/invest/components/TVChartContainer/TVChartContainer',
  () => ({
    TVChartContainer: jest.fn(() => null)
  })
)

describe('EditListing', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<EditListing />)
  })
})
