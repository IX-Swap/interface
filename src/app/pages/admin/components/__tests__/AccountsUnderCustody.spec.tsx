import React from 'react'
import { Chart } from 'react-google-charts'
import { render, cleanup } from 'test-utils'
import { AccountsUnderCustody } from 'app/pages/admin/components/AccountsUnderCustody'
import { baseAccountsUnderCustodyChartOptions } from '__fixtures__/chart'
import * as useGetCustodianCount from 'app/pages/admin/hooks/useGetCustodiansCount'
import { fakeCustodiansCount } from '__fixtures__/custodyAccount'

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

  it('renders Chart component correctly when data is undefined', () => {
    jest.spyOn(useGetCustodianCount, 'useGetCustodiansCount').mockReturnValue({
      data: undefined,
      isLoading: false
    } as any)

    const { container } = render(<AccountsUnderCustody />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders Chart component correctly when data is loading', () => {
    jest.spyOn(useGetCustodianCount, 'useGetCustodiansCount').mockReturnValue({
      data: fakeCustodiansCount,
      isLoading: true
    } as any)

    const { container } = render(<AccountsUnderCustody />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders Chart component with correct props', () => {
    jest.spyOn(useGetCustodianCount, 'useGetCustodiansCount').mockReturnValue({
      data: fakeCustodiansCount,
      isLoading: false
    } as any)

    render(<AccountsUnderCustody />)
    expect(Chart).toHaveBeenCalledWith(
      expect.objectContaining({
        ...baseAccountsUnderCustodyChartOptions,
        data: [
          ['HEX', 'InvestaX'],
          ['HEX', fakeCustodiansCount.hexCount],
          ['InvestaX', fakeCustodiansCount.investaxCount]
        ]
      }),
      {}
    )
  })
})
