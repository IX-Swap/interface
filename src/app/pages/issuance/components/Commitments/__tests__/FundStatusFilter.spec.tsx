import React from 'react'
import { render } from 'test-utils'
import { FundStatusFilter } from 'app/pages/issuance/components/Commitments/FundStatusFilter'
import InputLabel from '@mui/material/InputLabel'
import { FundStatusSelect } from 'app/pages/issuance/components/Commitments/FundStatusSelect'

jest.mock('app/pages/issuance/components/Commitments/FundStatusSelect', () => ({
  FundStatusSelect: jest.fn(() => null)
}))

jest.mock('@mui/material/InputLabel', () => jest.fn(() => null))

describe('FundStatusFilter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders FundStatusSelect with correct props', () => {
    render(<FundStatusFilter />)
    expect(FundStatusSelect).toHaveBeenCalledTimes(1)
    expect(FundStatusSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        inputProps: { id: 'sortBy', 'data-testid': 'select' },
        value: undefined
      }),
      {}
    )
  })
})
