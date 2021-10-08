import React from 'react'
import { render, cleanup } from 'test-utils'
import { Market } from '../Market'
// import { TVChartContainer } from 'app/pages/invest/components/TVChartContainer/TVChartContainer'
// import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import * as useMarketList from 'app/pages/exchange/hooks/useMarketList'
// import * as useSymbol from 'app/pages/exchange/hooks/useSymbol'
// import { useParams, Redirect } from 'react-router'
import * as useParams from 'react-router'
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

// jest.mock('@material-ui/core/useMediaQuery', () => jest.fn(() => null))

describe('Market', () => {
  const defaultPairId = '1212'
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest.spyOn(useMarketList, 'useMarketList').mockReturnValue({
      data: {
        list: [{ _id: defaultPairId }]
      }
    } as any)

    render(<Market />)
  })

  // it('renders without error', () => {
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

    jest.spyOn(useParams, 'useParams').mockReturnValueOnce({
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

  // it('returns null when market list is loading', () => {
  //   // jest.spyOn(useParams, 'useParams').mockReturnValueOnce({
  //   //   pairId: '1233'
  //   // })
  //   // jest.spyOn(useTokenBalance, 'useTokenBalance').mockReturnValueOnce({
  //   //   data: 1000
  //   // })
  //   //
  //   // jest.spyOn(useMarketList, 'useMarketList').mockReturnValue({
  //   //   data: {
  //   //     list: [{ _id: defaultPairId }]
  //   //   },
  //   //   isLoading: false
  //   // } as any)
  //
  //   render(<Market />)
  //   expect(PlaceOrderForm).toHaveBeenCalledTimes(1)
  // })
})
