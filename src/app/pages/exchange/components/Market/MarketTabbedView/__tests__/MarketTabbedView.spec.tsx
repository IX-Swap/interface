import React from 'react'
import { render } from 'test-utils'
import { MarketTabbedView } from 'app/pages/exchange/components/Market/MarketTabbedView/MarketTabbedView'
import { MarketViewProps } from 'app/pages/exchange/components/Market/MarketGridView'

jest.mock(
  'app/pages/exchange/components/Market/MarketTabbedView/TopSection',
  () => ({
    TopSection: jest.fn(() => null)
  })
)

jest.mock('app/pages/exchange/components/MyOrders/MyOrders', () => ({
  MyOrders: jest.fn(() => null)
}))

describe('MarketTabbedView', () => {
  const props: MarketViewProps = {
    symbol: 'SYMBOL',
    datafeed: undefined,
    createOrderStatus: 'success',
    isFetching: false,
    currencyName: 'SGD',
    tokenName: 'Token Name',
    currencyBalance: 10000,
    tokenBalance: { data: { amount: 1000 } },
    submitForm: jest.fn()
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<MarketTabbedView {...props} />)
  })
})
