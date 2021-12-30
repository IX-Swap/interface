import { PairList } from 'app/pages/exchange/components/PairList/PairList'
import * as useMarketList from 'app/pages/exchange/hooks/useMarketList'
import React from 'react'
import { render } from 'test-utils'

describe('PairList', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    const objResponse = {
      data: {
        list: []
      }
    }

    jest
      .spyOn(useMarketList, 'useMarketList')
      .mockImplementation(() => objResponse as any)
    render(<PairList />)
  })

  it('renders null when data is undefined', () => {
    const objResponse = {
      data: undefined
    }

    jest
      .spyOn(useMarketList, 'useMarketList')
      .mockImplementation(() => objResponse as any)
    const { container } = render(<PairList />)
    expect(container).toBeEmptyDOMElement()
  })
})
