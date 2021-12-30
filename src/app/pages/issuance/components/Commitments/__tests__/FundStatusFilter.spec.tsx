import React from 'react'
import { render } from 'test-utils'
import { FundStatusFilter } from 'app/pages/issuance/components/Commitments/FundStatusFilter'
import InputLabel from '@material-ui/core/InputLabel'
import { FundStatusSelect } from 'app/pages/issuance/components/Commitments/FundStatusSelect'

jest.mock('app/pages/issuance/components/Commitments/FundStatusSelect', () => ({
  FundStatusSelect: jest.fn(() => null)
}))

jest.mock('@material-ui/core/InputLabel', () => jest.fn(() => null))

describe('FundStatusFilter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<FundStatusFilter />)
  })

  it('renders InputLabel with correct props', () => {
    render(<FundStatusFilter />)
    expect(InputLabel).toHaveBeenCalledTimes(1)
    expect(InputLabel).toHaveBeenCalledWith(
      expect.objectContaining({
        htmlFor: 'sortBy',
        children: 'Sort By'
      }),
      {}
    )
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
