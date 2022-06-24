import { OTCMarketCard } from 'app/pages/invest/components/OTCMarketCard/OTCMarketCard'
import * as useStyles from 'app/pages/invest/components/styles/OTCMarket.style'
import * as useTableWithPagination from 'components/TableWithPagination/hooks/useTableWithPagination'
import * as useQueryFilter from 'hooks/filters/useQueryFilter'
import { render } from '@testing-library/react'
import { OTCMarket as OTCMarketSection } from 'app/pages/invest/components/OTCMarkets'
import * as useFeaturedPair from 'app/pages/invest/hooks/useFeaturedPair'
import React from 'react'
import { dso } from '__fixtures__/issuance'
import { fakeOTCMarket } from '__fixtures__/otcOrders'
import { InvestRoute } from 'app/pages/invest/router/config'

jest.mock('app/pages/invest/components/OTCMarketCard/OTCMarketCard', () => ({
  OTCMarketCard: jest.fn(() => null)
}))
jest.mock('@mui/material/Typography', () => jest.fn(() => null))
describe('OTCMarket', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })
  const objResponse = {
    total: 1,
    status: undefined,
    items: [dso]
  }
  it('renders AppRouterLink disabled if dso does not have subscriptionDocument', () => {
    const getFilterValueFn = jest.fn(() => 'search')

    jest
      .spyOn(useQueryFilter, 'useQueryFilter')
      .mockImplementation(() => ({ getFilterValue: getFilterValueFn } as any))
    jest
      .spyOn(useFeaturedPair, 'useFeaturedPair')
      .mockImplementation(
        () => ({ data: fakeOTCMarket, isLoading: false } as any)
      )
    jest
      .spyOn(useTableWithPagination, 'useTableWithPagination')
      .mockImplementation(() => objResponse as any)
    jest
      .spyOn(useStyles, 'useStyles')
      .mockReturnValueOnce({ container: 'abc' } as any)

    render(<OTCMarketSection />)

    expect(OTCMarketCard).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'OTC',
        data: dso,
        viewURL: InvestRoute.trading
      }),
      {}
    )
  })
})
