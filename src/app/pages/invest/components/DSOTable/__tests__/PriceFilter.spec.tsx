import React from 'react'
import { render } from 'test-utils'
import { PriceFilter } from 'app/pages/invest/components/DSOTable/PriceFilter'
import { FormControlLabel } from '@mui/material'

jest.mock('@mui/material/FormControlLabel', () => jest.fn(() => null))

describe('Price Filter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders without any error', () => {
    render(<PriceFilter />)
  })
})
