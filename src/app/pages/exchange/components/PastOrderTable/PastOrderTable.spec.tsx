import React from 'react'
import { renderWithUserStore, cleanup } from 'test-utils'
import { TableView } from 'components/TableWithPagination/TableView'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { exchangeMarketQueryKeys } from 'config/queryKeys'
import { PastOrderTable } from 'app/pages/exchange/components/PastOrderTable/PastOrderTable'
import { columns } from 'app/pages/exchange/components/PastOrderTable/columns'
import { exchangeMarket } from 'config/apiURL'
import { PastOrderFilter } from 'app/pages/exchange/components/PastOrderFilter/PastOrderFilter'

jest.mock('__tests__/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

jest.mock(
  'app/pages/exchange/market/__tests__/PastOrderFilter/PastOrderFilter',
  () => ({
    PastOrderFilter: jest.fn(() => null)
  })
)

describe('PastOrderTable', () => {
  const initialFilterValues = {
    to: undefined,
    from: undefined,
    pair: '1'
  }

  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', async () => {
    renderWithUserStore(<PastOrderTable pairId={'1'} />)
  })

  it('renders PastOrderFilter without error', () => {
    renderWithUserStore(<PastOrderTable pairId={initialFilterValues.pair} />)

    expect(PastOrderFilter).toHaveBeenCalled()
  })

  it('renders TableView with correct props if user exists', () => {
    jest.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      isAuthenticated: true,
      user
    })

    renderWithUserStore(<PastOrderTable pairId={initialFilterValues.pair} />)

    expect(TableView).toHaveBeenCalledWith(
      {
        size: 'small',
        name: exchangeMarketQueryKeys.getOrdersList(initialFilterValues.pair),
        uri: exchangeMarket.getOrdersList(user._id),
        columns,
        filter: initialFilterValues
      },
      {}
    )
  })
})
