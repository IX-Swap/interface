import { FinancialSummary } from 'app/pages/exchange/components/FinancialSummary/FinancialSummary'
import React from 'react'
import { render } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'
import * as useMarket from 'app/pages/exchange/hooks/useMarket'
import { AppRouterLink } from 'components/AppRouterLink'

jest.mock('components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(() => null)
}))

describe('FinancialSummary', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders view details link when marketData is undefined', () => {
    jest.spyOn(useMarket, 'useMarket').mockReturnValue(
      generateQueryResult({
        data: undefined
      })
    )

    render(<FinancialSummary />)
    expect(AppRouterLink).toHaveBeenCalledTimes(0)
  })

  it('renders view details link when marketData is not undefined', () => {
    jest.spyOn(useMarket, 'useMarket').mockReturnValue(
      generateQueryResult({
        data: {
          listing: {
            markets: [{ currency: 'SGD' }, { currency: 'USD' }],
            _id: '1234',
            createdBy: '12345'
          }
        }
      })
    )

    render(<FinancialSummary />)
    expect(AppRouterLink).toHaveBeenCalledTimes(1)
  })
})
