import React from 'react'
import { render, cleanup } from 'test-utils'
import { TransferTypesFilter } from 'app/pages/admin/components/TransferTypesFilter'
import { FormControlLabel } from '@material-ui/core'

jest.mock('@material-ui/core/FormControlLabel', () => jest.fn(() => null))

describe('TransferTypesFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TransferTypesFilter type={'PP'} />)
  })

  it('renders without errors', () => {
    render(<TransferTypesFilter type={'PP'} />)
    expect(FormControlLabel).toHaveBeenCalledTimes(1)
  })
})
