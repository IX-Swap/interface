import React from 'react'
import { render } from 'test-utils'
import { PriceFilter } from 'app/pages/invest/components/DSOTable/PriceFilter'
import { FormControlLabel } from '@mui/material'

jest.mock('@mui/material/FormControlLabel', () => jest.fn(() => null))

describe('Price Filter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without any error', () => {
    render(<PriceFilter />)
  })

  it('renders FormControlLabel with correct props', async () => {
    render(<PriceFilter />)
    expect(FormControlLabel).toHaveBeenCalledTimes(2)
    expect(FormControlLabel).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Low - High',
        value: 'yes'
      }),
      {}
    )
    expect(FormControlLabel).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'High - Low',
        value: 'no'
      }),
      {}
    )
  })
})
