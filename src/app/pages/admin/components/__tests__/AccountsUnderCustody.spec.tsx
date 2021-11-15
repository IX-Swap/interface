import React from 'react'
import { Chart } from 'react-google-charts'
import { render, cleanup } from 'test-utils'
import { AccountsUnderCustody } from 'app/pages/admin/components/AccountsUnderCustody'
import { accountsUnderCustodyChartOptions } from '__fixtures__/chart'

jest.mock('react-google-charts', () => ({
  Chart: jest.fn(() => null)
}))

describe('AccountsUnderCustody', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AccountsUnderCustody />)
  })

  it('renders Chart component with correct props', () => {
    render(<AccountsUnderCustody />)
    expect(Chart).toHaveBeenCalledWith(
      expect.objectContaining(accountsUnderCustodyChartOptions),
      {}
    )
  })
})
