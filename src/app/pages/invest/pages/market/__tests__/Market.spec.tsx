import React from 'react'
import { render } from 'test-utils'
import { Market } from 'app/pages/invest/pages/market/Market'
import * as useMarketList from 'app/pages/invest/hooks/useMarketList'
import * as useParams from 'react-router'
import { history } from 'config/history'

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
      `/app/invest/exchange/${defaultPairId}`
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
})
