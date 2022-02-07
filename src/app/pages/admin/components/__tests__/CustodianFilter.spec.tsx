import React from 'react'
import { render } from 'test-utils'
import { FormControlLabel } from '@mui/material'
import { CustodianFilter } from 'app/pages/admin/components/CustodianFilter'

jest.mock('@mui/material/FormControlLabel', () => jest.fn(() => null))

describe('CustodianFilter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders label control component', () => {
    render(<CustodianFilter custodian={'HEX'} />)
    expect(FormControlLabel).toHaveBeenCalledTimes(1)
  })
})
