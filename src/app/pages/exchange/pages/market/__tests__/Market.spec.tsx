import React from 'react'
import { render } from 'test-utils'
import { Market } from '../Market'
// import { TVChartContainer } from 'app/pages/invest/components/TVChartContainer/TVChartContainer'
// import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import * as useMarketList from 'app/pages/exchange/hooks/useMarketList'
// import * as useSymbol from 'app/pages/exchange/hooks/useSymbol'
import * as useParams from 'react-router-dom'
import { history } from 'config/history'
// import { PlaceOrderForm } from 'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm'
// import * as useTokenBalance from 'app/pages/exchange/hooks/useTokenBalance'

jest.mock(
  'app/pages/invest/components/TVChartContainer/TVChartContainer',
  () => ({
    TVChartContainer: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm',
  () => ({
    PlaceOrderForm: jest.fn(() => null)
  })
)

const defaultPairId = '60d2a03508a1f73d1aadebe2'

describe('Market', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  // it('renders tv chart container with correct props', () => {
  //   jest.spyOn(useSymbol, 'useSymbol').mockReturnValueOnce({
  //     symbol: 'RHTC/SGD'
  //   })
  //
  //   jest.spyOn(useMarketList, 'useMarketList').mockReturnValue({
  //     data: {
  //       list: [{ _id: '1212' }]
  //     }
  //   } as any)
  //
  //   jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
  //     theme: {
  //       palette: { type: 'dark' }
  //     }
  //   } as any)
  //
  //   render(<Market />)
  //   expect(TVChartContainer).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       theme: 'Dark',
  //       toolbarBg: '#292929',
  //       customCssUrl: './trading-view_dark.css'
  //     }),
  //     {}
  //   )
  // })
  it('returns redirect when pairId is falsy', () => {
    jest.spyOn(useMarketList, 'useMarketList').mockReturnValue({
      data: {
        list: [{ _id: defaultPairId }]
      }
    } as any)

    jest.spyOn(useParams, 'useParams').mockReturnValue({
      pairId: undefined
    })

    render(<Market />)
    expect(history.location.pathname).toBe(
      `/app/otc-market/market/${defaultPairId}`
    )
  })

  it('returns null when market list is loading', () => {
    jest.spyOn(useMarketList, 'useMarketList').mockReturnValue({
      data: {
        list: [{ _id: defaultPairId }]
      },
      isLoading: true
    } as any)

    const { container } = render(<Market />)
    expect(container).toBeEmptyDOMElement()
  })

  // it('renders place order form with correct props', () => {
  //   jest.spyOn(useParams, 'useParams').mockReturnValue({
  //     pairId: '60d2a03508a1f73d1aadebe2'
  //   })
  //   jest.spyOn(useTokenBalance, 'useTokenBalance').mockReturnValue({
  //     data: 1000
  //   })
  //   jest.spyOn(useSymbol, 'useSymbol').mockReturnValue({
  //     symbol: 'RHTC/SGD'
  //   })
  //
  //   jest.spyOn(useMarketList, 'useMarketList').mockReturnValue({
  //     data: {
  //       list: [{ _id: defaultPairId }]
  //     },
  //     isLoading: false
  //   } as any)
  //
  //   render(<Market />)
  //   expect(PlaceOrderForm).toBeCalled()
  // })
})
