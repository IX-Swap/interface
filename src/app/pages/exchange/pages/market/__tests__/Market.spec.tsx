import React from 'react'
import { render, cleanup } from 'test-utils'
import { Market } from '../Market'
// import { TVChartContainer } from 'app/pages/invest/components/TVChartContainer/TVChartContainer'
// import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
// import * as useMarketList from 'app/pages/exchange/hooks/useMarketList'
// import useMediaQuery from '@material-ui/core/useMediaQuery'
// import * as useSymbol from 'app/pages/exchange/hooks/useSymbol'

// jest.mock(
//   'app/pages/invest/components/TVChartContainer/TVChartContainer',
//   () => ({
//     TVChartContainer: jest.fn(() => null)
//   })
// )
//
// jest.mock('@material-ui/core/useMediaQuery', () => jest.fn(() => null))

describe('Market', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Market />)
  })

  // it('renders without error', () => {
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
  //   jest.spyOn(useSymbol, 'useSymbol').mockReturnValueOnce({
  //     symbol: 'RHTC/SGD'
  //   })
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
})
