import React from 'react'
import { render, cleanup } from 'test-utils'
import { FormControlLabel } from '@material-ui/core'
import { CustodianFilter } from 'app/pages/admin/components/CustodianFilter'

jest.mock('@material-ui/core/FormControlLabel', () => jest.fn(() => null))

describe('CustodianFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CustodianFilter custodian={'HEX'} />)
  })

  it('renders label control component', () => {
    render(<CustodianFilter custodian={'HEX'} />)
    expect(FormControlLabel).toHaveBeenCalledTimes(1)
  })
})
