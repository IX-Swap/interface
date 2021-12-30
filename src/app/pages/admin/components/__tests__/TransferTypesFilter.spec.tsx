import React from 'react'
import { render } from 'test-utils'
import { TransferTypesFilter } from 'app/pages/admin/components/TransferTypesFilter'
import { FormControlLabel } from '@material-ui/core'

jest.mock('@material-ui/core/FormControlLabel', () => jest.fn(() => null))

describe('TransferTypesFilter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<TransferTypesFilter type={'PP'} />)
  })

  it.skip('renders without errors', () => {
    render(<TransferTypesFilter type={'PP'} />)
    expect(FormControlLabel).toHaveBeenCalledTimes(1)
  })
})
